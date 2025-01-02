import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import TypeOfEmpList from '../TypeOfEmpList'
import SalaryRangeList from '../SalaryRangeList'
import DisplayJobs from '../DisplayJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  typeArray: [],
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const typeArray = []

class ProfileSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: '',
    typeOfEmpInput: '',
    salaryRangeInput: '',
    searchInput: '',
    jobsApiStatus: apiStatusConstants.initial,
    jobs: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeTypeEmp = (checked, string) => {
    if (checked === true) {
      if (typeArray.includes(string)) {
        console.log('found')
      } else {
        typeArray.push(string)
      }
    } else {
      if (typeArray.includes(string)) {
        typeArray.splice(typeArray.indexOf(string), 1)
      }
      console.log('done')
    }
    this.setState({typeOfEmpInput: typeArray.join(',')}, this.getJobs)
    console.log(typeArray)
  }

  onChangesalaryRange = string => {
    this.setState({salaryRangeInput: string}, this.getJobs)
  }

  onClickSearch = async () => {
    this.getJobs()
  }

  getJobs = async () => {
    const {typeOfEmpInput, salaryRangeInput, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    this.setState({jobsApiStatus: apiStatusConstants.inProgress})

    try {
      const jobsUrl = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${typeOfEmpInput}&minimum_package=${salaryRangeInput}`
      const response = await fetch(jobsUrl, options)
      const data = await response.json()
      console.log(data)
      const jobsDataUpdated = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        title: each.title,
        rating: each.rating,
      }))

      console.log(jobsDataUpdated)

      this.setState({
        jobsApiStatus: apiStatusConstants.success,
        jobs: jobsDataUpdated,
      })
    } catch {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch('https://apis.ccbp.in/profile', options)

      const data = await response.json()

      const updatedData = {
        name: data.profile_details.name,
        ProfileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        profileDetails: updatedData,
      })
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsSuccessView = () => {
    const {jobs} = this.state

    return (
      <ul className="job-list-container">
        {jobs.map(each => (
          <DisplayJobs key={each.id} job={each} />
        ))}
      </ul>
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-view-para">
        We cannot seem to findthe page you are looking for.
      </p>
      <button
        className="profileSection-retry-button"
        type="button"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {jobsApiStatus, jobs} = this.state

    if (jobs !== '' && jobs.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="jobs-failure-view-heading">No Jobs Found</h1>
          <p className="jobs-failure-view-para">
            We could not find any jobs. Try another filters.
          </p>
        </div>
      )
    }

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.initial:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state

    return (
      <div className="profileSection-success-container">
        <img
          src={profileDetails.ProfileImageUrl}
          alt="profile"
          className="profile-image"
        />
        <h1 className="profile-heading">{profileDetails.name}</h1>
        <p className="profile-description">{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <button
        type="button"
        className="profileSection-retry-button"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="BallTriangle" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus, jobs} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-container">
        <div className="profile-and-filters-container">
          {this.renderProfileDetails()}
          <hr className="jobs-horizontal-rular" />
          <div className="type-of-employment-container">
            <p className="filetrs-heading">Type of Employment</p>
            <ul>
              {employmentTypesList.map(each => (
                <TypeOfEmpList
                  key={each.employmentTypeId}
                  list={each}
                  inputType={this.onChangeTypeEmp}
                />
              ))}
            </ul>
          </div>
          <hr className="jobs-horizontal-rular" />
          <div className="type-of-employment-container">
            <p className="filetrs-heading">Salary Range</p>
            <ul>
              {salaryRangesList.map(each => (
                <SalaryRangeList
                  key={each.salaryRangeId}
                  list={each}
                  salaryRangeF={this.onChangesalaryRange}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="search-input-and-jobs-container">
          <div className="search-input-container">
            <input
              type="search"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <div>
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon"
                onClick={this.onClickSearch}
              >
                <BsSearch />
              </button>
            </div>
          </div>
          <div className="fetched-jobs-container">{this.renderJobs()}</div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileSection)
