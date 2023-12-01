import { Component } from 'inferno'
import { useLoaderData, useLoaderError } from 'inferno-router'

import { config } from '../../../config'

export default class Home extends Component {
  static async getInitialData ({ request }) {
    return fetch(`${config.DATA_SOURCE}`, {
      method: 'GET',
      signal: request?.signal
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      temp: null
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
    // do what you want with loader data or error
  }

  render () {
    return (
      <>
        <div>
          <h1>Coachonko's Inferno starter</h1>
        </div>
      </>
    )
  }
}
