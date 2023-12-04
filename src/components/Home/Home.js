import { Component } from 'inferno'

export default class Home extends Component {
  static async getInitialData () {
    return fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET'
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      isFetching: true
    }
  }

  render () {
    const data = JSON.stringify(this.props.staticContext.initialData)
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
