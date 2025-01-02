import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-page-Heading">Find The Job That Fits Your Life</h1>
        <p className="home-page-paragraph">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your ablities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
