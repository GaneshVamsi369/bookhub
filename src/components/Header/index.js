import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMenu, IoCloseOutline} from 'react-icons/io5'
import './index.css'

class Header extends Component {
  state = {menudisplay: false}

  onlogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    console.log(history)
    history.replace('/login')
  }

  menuclicked = () => {
    this.setState(prev => ({menudisplay: !prev.menudisplay}))
  }

  closebtn = () => {
    this.setState({menudisplay: false})
  }

  render() {
    const {menudisplay} = this.state
    const {history} = this.props
    const loca = history.location.pathname
    const homeli = loca === '/' ? `${'active'} headerlistli` : 'headerlistli'
    const bookshelvesli =
      loca === '/shelf' ? `${'active'} headerlistli` : 'headerlistli'

    return (
      <nav>
        <div className="largenav">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dwqcnoig0/image/upload/v1702013174/Group_7731_ckopkw.png"
              alt="website logo"
            />
          </Link>
          <ul className="headerlist">
            <Link to="/" className="linkstyle">
              <li className={homeli}> Home</li>
            </Link>

            <Link to="/shelf" className="linkstyle">
              <li className={bookshelvesli}> Bookshelves</li>
            </Link>

            <button
              type="button"
              onClick={this.onlogout}
              className="logoutbutton"
            >
              Logout
            </button>
          </ul>
        </div>
        <div className="shortnav">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dwqcnoig0/image/upload/v1702013174/Group_7731_ckopkw.png"
              alt="website logo"
            />
          </Link>
          <button
            type="button"
            className="hamburgerbtn"
            onClick={this.menuclicked}
          >
            <IoMenu />
          </button>
        </div>
        {menudisplay && (
          <div className="menu">
            <ul className="headerlist">
              <Link to="/" className="linkstyle">
                <li className={homeli}> Home</li>
              </Link>

              <Link to="/shelf" className="linkstyle">
                <li className={bookshelvesli}> Bookshelves</li>
              </Link>

              <button
                type="button"
                onClick={this.onlogout}
                className="logoutbutton"
              >
                Logout
              </button>
              <button
                type="button"
                className="hamburgerbtn"
                onClick={this.closebtn}
              >
                <IoCloseOutline />
              </button>
            </ul>
          </div>
        )}
      </nav>
    )
  }
}
export default withRouter(Header)
