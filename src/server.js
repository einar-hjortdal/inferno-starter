import { resolve } from 'node:path'
import { stat } from 'node:fs/promises'
import { App as TinyhttpApp } from '@tinyhttp/app'
import { renderToString } from 'inferno-server'
import { StaticRouter, traverseLoaders, resolveLoaders } from 'inferno-router'
import { config } from '../config'

import { Routes, App as InfernoApp } from './components'

const app = new TinyhttpApp()

// peony sends the client a JWT, but a JWT cannot be provided by the browser on its first request.
// The solution is to let the frontend server put the JWT in a cookie and give the cookie to the browser.
app.get('/auth', async (req, res) => {
  res.send('use this route for setting cookies')
})

// Serve static files
// Note: in production, configure lighttpd to serve static files instead for better security and performance.
app.get('/static/*', async (req, res) => {
  return await fileResponse(req.path, res)
})

// Serve static files during development.
// Note: in production, configure lighttpd to serve static files instead.
app.get('/favicon.ico', async (req, res) => {
  const adjustedPath = `static${req.path}`
  return await fileResponse(adjustedPath, res)
})

// Every other route can be handled by inferno-router
app.get('/*', async (req, res) => {
  return await infernoServerResponse(req, res)
})

app.listen(config.PORT)

async function fileResponse (path, res) {
  const filePath = resolve(`dist${path}`)

  try {
    const stats = await stat(filePath)

    if (!stats.isFile()) {
      res.sendStatus(404)
    } else {
      res.sendFile(filePath)
    }
  } catch (err) {
    // TODO handle errors correctly
    res.sendStatus(404)
  }
}

async function infernoServerResponse (req, res) {
  // Problem #1: can't pass App component, must pass Route component.
  // No errors are thrown when App component is passed. Components are not rendered.
  const appInstance = InfernoApp()
  const loaderEntries = traverseLoaders(req.url, appInstance, config.BASE_URL)

  // This works fine.
  // const routesInstance = Routes()
  // const loaderEntries = traverseLoaders(req.url, routesInstance, config.BASE_URL)

  const initialData = await resolveLoaders(loaderEntries)

  const context = {}
  const renderedApp = renderToString(
    <StaticRouter
      context={context}
      location={req.url}
      initialData={initialData}
    >
      <InfernoApp />
    </StaticRouter>
  )

  if (context.url) {
    return res.redirect(context.url)
  }

  const language = 'en'

  // Using initialData to manage head elements works fine
  // The shape of the initialData object seems a bit unpredictable
  let title = 'Coachonko\'s Inferno Starter'
  if (initialData[req.url] && initialData[req.url].res && initialData[req.url].res.title) {
    title = initialData[req.url].res.title
  }

  const description = 'Starter for Inferno applications'

  return res.send(`
<!DOCTYPE html>
<html lang="${language}">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">

  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" type="text/css" href="static/bundle.css">

  <script>window.__initialData__ = ${JSON.stringify(initialData)};</script>
  <script src="static/client.js" defer></script>
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root">${renderedApp}</div>
</body>

</html>`)
}
