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
    let data = this.state.fetchedData
    // this.state.fetchedData is null on the server because lifecycle methods do not work.
    if (!this.state.fetchedData) {
      data = useLoaderData(this.props)
    }
    data = JSON.stringify(data)

    return (
      <>
        <div>
          <h1>Coachonko's Inferno starter</h1>
          {data}
        </div>
      </>
    )
  }
}
