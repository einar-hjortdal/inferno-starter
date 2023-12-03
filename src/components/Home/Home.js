import { Component } from 'inferno'
import { useLoaderData, useLoaderError } from 'inferno-router'

export default class Home extends Component {
  static async getInitialData ({ request }) {
    return fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
      signal: request?.signal
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      lastError: null,
      fetchedData: null
    }
  }

  async componentDidMount () {
    const data = useLoaderData(this.props)
    const err = useLoaderError(this.props)
    if (data || err) {
      await this.handleLoaderResult(data, err)
    } else {
      // handle situation
    }
  }

  async handleLoaderResult (data, err) {
    if (err) {
      this.setState({ lastError: err })
    }
    if (data) {
      this.setState({ fetchedData: data })
    }
  }

  render () {
    if (!this.state.fetchedData) {
      return null
    }

    // Problem #2: server does not actually render this. Why?
    const displayData = JSON.stringify(this.state.fetchedData)
    return (
      <>
        <div>
          <h1>Coachonko's Inferno starter</h1>
          {displayData}
        </div>
      </>
    )
  }
}
