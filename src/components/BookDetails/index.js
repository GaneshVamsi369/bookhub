import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class BookDetails extends Component {
  state = {status: '', book: {}}

  componentDidMount = () => {
    this.getbook()
  }

  getbook = async () => {
    this.setState({status: 'LOAD'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookDetailsApi = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(bookDetailsApi, options)
    if (response.ok) {
      const data = await response.json()
      const update = {
        id: data.book_details.id,
        authorname: data.book_details.author_name,
        coverpic: data.book_details.cover_pic,
        aboutbook: data.book_details.about_book,
        rating: data.book_details.rating,
        readstatus: data.book_details.read_status,
        title: data.book_details.title,
        aboutauthor: data.book_details.about_author,
      }
      this.setState({book: update, status: 'SUCCESS'})
    } else {
      this.setState({status: 'FAIL'})
    }
  }

  loading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={50} width={50} />
    </div>
  )

  successcall = () => {
    const {book} = this.state
    const {
      title,
      authorname,
      coverpic,
      aboutbook,
      rating,
      readstatus,
      aboutauthor,
    } = book

    return (
      <div className="fullclass">
        <div className="successcall">
          <img src={coverpic} alt={title} />
          <div className="bookitemdetails">
            <h1 className="itemhead">{title}</h1>
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
        </div>
        <hr className="line" />
        <h1 className="itemhead">About Author</h1>
        <p className="itempara">{aboutauthor}</p>
        <h1 className="itemhead">About Book</h1>
        <p className="itempara">{aboutbook}</p>

        <Footer />
      </div>
    )
  }

  failcall = () => (
    <div className="failureview">
      <img
        src="https://res.cloudinary.com/dwqcnoig0/image/upload/v1702135344/Group_7522_tebdpe.png"
        alt="failure view"
      />
      <p className="top-rated-book-author">
        Something went wrong, Please try again.
      </p>
      <button type="button" className="logoutbutton" onClick={this.getbook}>
        Try Again
      </button>
    </div>
  )

  renderbookitem = () => {
    const {status} = this.state
    switch (status) {
      case 'LOAD':
        return this.loading()
      case 'SUCCESS':
        return this.successcall()
      case 'FAIL':
        return this.failcall()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bookitembg">
        <Header />
        <div className="itembody">{this.renderbookitem()}</div>
      </div>
    )
  }
}
export default BookDetails
