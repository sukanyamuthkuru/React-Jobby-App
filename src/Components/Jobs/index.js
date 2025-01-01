import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import ProfileSection from '../ProfileSection'

import './index.css'

const Jobs = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="profile-section-container">
        <ProfileSection />
      </div>
    </>
  )
}

export default Jobs
