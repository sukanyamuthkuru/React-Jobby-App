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
    similarJobs: '',
  }

  componentDidMount() {
    this.getJobdetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: data.life_at_company,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills,
    title: data.title,
  })

  getFormattedSimilarJobsData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobdetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatusConstants: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const url = `https://apis.ccbp.in/jobs/${id}`

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      const updatedDataJobData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(each =>
        this.getFormattedSimilarJobsData(each),
      )
      console.log(updatedSimilarJobsData)
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
              <h1>hiii</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobDetailsRoute
