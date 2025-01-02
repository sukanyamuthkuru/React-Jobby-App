import {BsStarFill} from 'react-icons/bs'
import {MdPlace, MdWork} from 'react-icons/md'
import './index.css'

const DisplayJobs = props => {
  const {job} = props
  return (
    <li className="jobs-list-item-container">
      <div className="company-logo-designation-rating-container">
        <img
          src={job.companyLogoUrl}
          alt={job.title}
          className="jobs-company-logo"
        />
        <div className="designation-rating-container">
          <p className="job-title">{job.title}</p>
          <div className="rating-container">
            <BsStarFill className="star-icon" />
            <p className="rating-text">{job.rating}</p>
          </div>
        </div>
      </div>
      <div className="location-type-ctc-container">
        <div className="location-and-type-container">
          <div className="location-text-container">
            <MdPlace className="place-icon" />
            <p className="place-text">{job.location}</p>
          </div>
          <div className="location-text-container">
            <MdWork className="place-icon" />
            <p className="place-text">{job.employmentType}</p>
          </div>
        </div>
        <p className="ctc">{job.packagePerAnnum}</p>
      </div>
      <hr className="hr-line" />
      <p className="description-job-heading">Description</p>
      <p className="des-para-job">{job.jobDescription}</p>
    </li>
  )
}

export default DisplayJobs
