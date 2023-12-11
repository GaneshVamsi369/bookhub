import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footerclass">
    <div>
      <FaGoogle className="footericons" />
      <FaTwitter className="footericons" />
      <FaInstagram className="footericons" />
      <FaYoutube className="footericons" />
    </div>
    <p>Contact Us</p>
  </div>
)
export default Footer
