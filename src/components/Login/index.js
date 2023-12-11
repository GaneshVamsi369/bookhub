import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showerror: false, error: ''}

  onsuccesscall = jwt => {
    const {history} = this.props
    Cookies.set('jwt_token', jwt, {
      expires: 30,
    })
    history.replace('/')
  }

  onfailcall = error => {
    this.setState({showerror: true, error})
  }

  loginformsubmitted = async event => {
    let {username, password} = this.state
    event.preventDefault()
    if (username === 'lucifer') {
      username = 'rahul'
    }
    if (password === 'lucifer') {
      password = 'rahul@2021'
    }
    const url = 'https://apis.ccbp.in/login'
    const userdetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onsuccesscall(data.jwt_token)
    } else {
      this.onfailcall(data.error_msg)
    }
  }

  passwordchanged = event => {
    this.setState({password: event.target.value})
  }

  usernamechanged = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showerror, error} = this.state

    return (
      <div className="loginpage">
        <div className="logincontainer">
          <img
            src="https://res.cloudinary.com/dwqcnoig0/image/upload/v1702011650/Rectangle_1467_jizj5v.png"
            alt="website login"
            className="loginimage"
          />
          <div className="loginform">
            <form onSubmit={this.loginformsubmitted} className="formcontainer">
              <img
                src="https://res.cloudinary.com/dwqcnoig0/image/upload/v1702013174/Group_7731_ckopkw.png"
                alt="login website logo"
              />
              <div className="inputcontainer">
                <label htmlFor="username">Username*</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter 'lucifer' to login"
                  value={username}
                  onChange={this.usernamechanged}
                />
              </div>
              <div className="inputcontainer">
                <label htmlFor="password">Password*</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter 'lucifer' to login"
                  value={password}
                  onChange={this.passwordchanged}
                />
                {showerror && <p className="errormsg">{error}</p>}
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
