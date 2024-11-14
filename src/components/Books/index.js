import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const Books = props => {
  const {item} = props
  const {id, title, readstatus, rating, authorname, coverpic} = item
  return (
    <Link to={`/books/${id}`} className="link">
      <li className="booklistli">
        <img src={coverpic} alt={title} />
        <div className="bookdetails">
          <h1>{title}</h1>
          <p>{authorname}</p>
          <div className="rating">
            <p>Avg Rating</p>
            <BsFillStarFill className="star" />
            <p>{rating}</p>
          </div>
          <p>
            Status: <span className="spanclass">{readstatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}
export default Books
