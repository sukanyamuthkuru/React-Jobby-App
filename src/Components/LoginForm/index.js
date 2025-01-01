import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log('loginform')
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwtToken')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-form-logo"
          />

          <form className="loginform-container" onSubmit={this.submitForm}>
            <div className="login-form-username-input-container">
              <label
                htmlFor="login-form-user-name-input"
                className="loginform-username-and-password-text"
              >
                USERNAME
              </label>
              <input
                id="login-form-user-name-input"
                type="text"
                className="login-form-username-password-input"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="login-form-username-input-container">
              <label
                htmlFor="login-form-user-name-input"
                className="loginform-username-and-password-text"
              >
                PASSWORD
              </label>
              <input
                id="login-form-user-password-input"
                type="password"
                className="login-form-username-password-input"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && (
              <p className="login-form-error-Msg">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
