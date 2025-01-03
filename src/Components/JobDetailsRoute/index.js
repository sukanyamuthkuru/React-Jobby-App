import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    details: '',
  }

  componentDidMount() {
    const jwt = Cookies.get('jwt_token')
    console.log(jwt)
    this.getJobdetails()
  }

  getJobdetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatusConstants: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      header: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs/${id}`

    try {
      const response = await fetch(url, options)
      const data = await response.json()
    } catch {
      console.log('kkkk')
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="jobs-details-route-container">
        <Header />
        <div className="job-details-container">
          <div className="details-container">
            <div className="job-details-logo-rating-role-container">
              <h>hiii</h>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobDetailsRoute
