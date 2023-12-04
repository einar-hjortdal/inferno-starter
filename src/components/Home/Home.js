import { Component } from 'inferno'

export default class Home extends Component {
  static async getInitialData () {
    return fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET'
    })
  }

  constructor (props) {
    super(props)

    let initialData
    if (typeof window === 'undefined') {
      initialData = props.staticContext.initialData
    } else {
      initialData = window.___initialData
      delete window.___initialData
    }

    this.state = {
      isFetching: true,
      homeData: initialData
    }
  }

  render () {
    return (
      <>
        <div>
          <h1>Coachonko's Inferno starter</h1>
          {JSON.stringify(this.state.homeData)}
        </div>
      </>
    )
  }
}
