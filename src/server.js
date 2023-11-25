import { resolve } from 'node:path'
import { App as TinyhttpApp } from '@tinyhttp/app'
import { renderToString } from 'inferno-server'
import { StaticRouter } from 'inferno-router'
import { App as InfernoApp } from './components'

const app = new TinyhttpApp()

// peony sends the client a JWT, but a JWT cannot be provided by the browser on its first request.
// The solution is to let the frontend server put the JWT in a cookie and give the cookie to the browser.
app.get('/auth', (req, res) => {
  res.send('use this route for setting cookies')
})

// Serve static files
app.get('/static/*', (req, res) => {
  res.sendFile(resolve(`dist/${req.path}`))
})

// Every other route can be handled by the inferno router
app.get('/*', (req, res) => {
  res.send(infernoServerResponse(req.url))
})

app.listen(29200)

function infernoServerResponse ({ url }) {
  const renderedApp = renderToString(
    <StaticRouter location={url}>
      <InfernoApp />
    </StaticRouter>
  )

  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Coachonko's blog</title>
  <meta name="description" content="Starter for Inferno applications">
  <link rel="stylesheet" type="text/css" href="static/bundle.css">
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root">${renderedApp}</div>
  <script src="static/client.js"></script>
</body>

</html>`
}
