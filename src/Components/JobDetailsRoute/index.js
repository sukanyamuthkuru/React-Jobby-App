import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsStarFill} from 'react-icons/bs'
import {MdPlace, MdWork} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header'
import JobDetailsSkills from '../JobDetailsSkills'
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

      this.setState({
        details: updatedDataJobData,
        similarJobs: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderjobDetailsSuccessView = () => {
    const {details} = this.state
    console.log(details)
    return (
      <div className="details-container">
        <div className="job-details-logo-rating-role-container">
          <img
            src={details.companyLogoUrl}
            alt={details.id}
            className="job-details-company-logo"
          />
          <div className="job-details-role-rating-container">
            <p className="job-detail-role-heading">{details.title}</p>
            <div className="job-detail-rating-container">
              <BsStarFill className="star-rating" />
              <p className="rating-text-job-detail">{details.rating}</p>
            </div>
          </div>
        </div>
        <div className="job-detail-location-type-ctc-continer">
          <div className="job-detail-location-type-container">
            <div className="job-detail-location-logo-container">
              <MdPlace className="job-detail-location-logo" />
              <p className="job-detail-location-text">{details.location}</p>
            </div>
            <div className="job-detail-location-logo-container">
              <MdWork className="job-detail-location-logo" />
              <p className="job-detail-location-text">
                {details.employmentType}
              </p>
            </div>
          </div>
          <p className="job-detail-ctc">{details.packagePerAnnum}</p>
        </div>
        <hr className="job-detail-horizontal-rural" />
        <div className="job-detail-description-visit-container">
          <p className="job-details-description-text">Description</p>
          <a
            href={details.companyWebsiteUrl}
            className="job-detail-anchor-text"
          >
            Visit
            <span>
              <FaExternalLinkAlt className="link" />
            </span>
          </a>
        </div>
        <p className="job-detail-description">{details.jobDescription}</p>
        <p className="job-details-description-text">Skills</p>

        <ul className="job-detail-skills-container">
          {details.skills.map(each => (
            <JobDetailsSkills key={each.name} skill={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderjobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderjobDetailsSuccessView()

      default:
        return null
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
        <div className="job-details-container">{this.renderjobDetails()}</div>
      </div>
    )
  }
}

export default JobDetailsRoute
