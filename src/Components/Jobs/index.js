import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import ProfileSection from '../ProfileSection'

import './index.css'

const Jobs = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />

      <ProfileSection />
    </>
  )
}

export default Jobs
