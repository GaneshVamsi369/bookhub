import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound">
    <img
      src="https://res.cloudinary.com/dwqcnoig0/image/upload/v1702217537/Group_7484_vgjjqs.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="logoutbutton">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
