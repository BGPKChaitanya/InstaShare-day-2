import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({
      errorMsg: errMsg,
      username: '',
      password: '',
      showSubmitError: true,
    })
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value, showSubmitError: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showSubmitError: false})
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="display-container">
        <img
          src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656090745/Layer_2_jdwyjj.png"
          alt="loginImage"
        />
        <div className="login-form-container">
          <img
            src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656091353/Standard_Collection_8_vblsmr.png"
            alt="website login"
          />
          <h1 className="webpage-name">Insta Share</h1>
          <form className="form-container" onSubmit={this.onClickSubmit}>
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input-text"
              placeholder="USERNAME"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input-text"
              placeholder="PASSWORD"
              value={password}
              onChange={this.onChangePassword}
            />
            {showSubmitError && <p className="errorMsg">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
