import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {toprated: [], topratedstatus: ''}

  componentDidMount = () => {
    this.gettoprated()
  }

  gettoprated = async () => {
    this.setState({topratedstatus: 'LOAD'})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const list = data.books
      const update = list.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({toprated: update, topratedstatus: 'SUCCESS'})
    } else {
      this.setState({topratedstatus: 'FAIL'})
    }
  }

  loading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={50} width={50} />
    </div>
  )

  successcall = () => {
    const {toprated} = this.state

    return (
      <Slider {...settings}>
        {toprated.map(eachBook => {
          const {id, title, coverPic, authorName} = eachBook
          const onClickedTopRatedBook = () => {
            const {history} = this.props
            history.push(`/books/${id}`)
          }

          return (
            <div className="top-rated-book-item-container" key={id}>
              <button
                onClick={onClickedTopRatedBook}
                className="top-rated-card-btn"
                type="button"
              >
                <div className="top-rated-book-image-container">
                  <img
                    className="top-rated-book-image"
                    src={coverPic}
                    alt={title}
                  />
                </div>
                <h1 className="top-rated-book-name">{title}</h1>
                <p className="top-rated-book-author">{authorName}</p>
              </button>
            </div>
          )
        })}
      </Slider>
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
      <button type="button" className="logoutbutton" onClick={this.gettoprated}>
        Try Again
      </button>
    </div>
  )

  rendertoprated = () => {
    const {topratedstatus} = this.state
    switch (topratedstatus) {
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

  renderlink = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  render() {
    return (
      <div className="homebagkground">
        <Header />
        <div className="homebody">
          <h1 className="hometitle">Find Your Next Favorite Books?</h1>
          <p className="homepara">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            type="button"
            className="logoutbutton btn1"
            onClick={this.renderlink}
          >
            Find Books
          </button>
          <div>
            <div className="cardcontainer">
              <div className="cardtitle">
                <h3 className="titleheading">Top Rated Books</h3>
                <button
                  type="button"
                  className="logoutbutton btn2"
                  onClick={this.renderlink}
                >
                  Find Books
                </button>
              </div>
              <div className="cardbody">{this.rendertoprated()}</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
