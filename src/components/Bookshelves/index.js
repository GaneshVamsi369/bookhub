import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import Books from '../Books'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    searchinput: '',
    bookslist: [],
    bookstatus: '',
    activelabel: bookshelvesList[0].label,
    activeoptionname: bookshelvesList[0].value,
    activeoption: bookshelvesList[0].id,
  }

  componentDidMount = () => {
    this.getbooks()
  }

  getbooks = async () => {
    this.setState({bookstatus: 'LOAD'})
    const {searchinput, activeoptionname} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeoptionname}&search=${searchinput}`
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
      const filtered = data.books.map(each => ({
        id: each.id,
        title: each.title,
        readstatus: each.read_status,
        rating: each.rating,
        authorname: each.author_name,
        coverpic: each.cover_pic,
      }))
      this.setState({bookslist: filtered, bookstatus: 'SUCCESS'})
    } else {
      this.setState({bookstatus: 'FAIL'})
    }
  }

  inputchange = event => {
    this.setState({searchinput: event.target.value}, this.getbooks)
  }

  loading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={50} width={50} />
    </div>
  )

  successcall = () => {
    const {bookslist, searchinput} = this.state

    if (bookslist.length > 0) {
      return (
        <ul className="booklist">
          {bookslist.map(each => (
            <Books key={each.id} item={each} />
          ))}
        </ul>
      )
    }
    return (
      <div className="nobooks">
        <img
          src="https://res.cloudinary.com/dwqcnoig0/image/upload/v1702196208/Asset_1_1_ghy4qf.png"
          alt="no books"
        />
        <p>Your search for {searchinput} did not find any matches.</p>
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
      <button type="button" className="logoutbutton" onClick={this.getbooks}>
        Try Again
      </button>
    </div>
  )

  renderbookbody = () => {
    const {bookstatus} = this.state

    switch (bookstatus) {
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

  getbooksitem = () => {
    this.getbooks()
  }

  render() {
    const {searchinput, activeoption, activelabel} = this.state

    return (
      <div className="bookshelvesbg">
        <Header />
        <div className="bookshelvesmain">
          <div className="sidenav">
            <ul className="bookshelvesoption">
              <h3 className="optiontitle">Bookshelves</h3>
              {bookshelvesList.map(each => {
                const optionclicked = () => {
                  this.setState(
                    {
                      activeoption: each.id,
                      activeoptionname: each.value,
                      activelabel: each.label,
                    },
                    this.getbooks,
                  )
                }
                const optionclass =
                  each.id === activeoption ? 'activeoptionbtn' : 'optionbtn'

                return (
                  <li key={each.id}>
                    <button
                      type="button"
                      className={optionclass}
                      onClick={optionclicked}
                    >
                      {each.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="bookshelvesbody">
            <div className="searchtitle">
              <h1 className="searchtitlehead">{activelabel} Books</h1>
              <div className="searchbar">
                <input
                  type="search"
                  className="searchinput"
                  placeholder="Search"
                  value={searchinput}
                  onChange={this.inputchange}
                />
                <button
                  type="button"
                  className="searchbtn"
                  onClick={this.getbooksitem}
                  testid="searchButton"
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            <ul className="bookshelvesoptionsm">
              <h3 className="optiontitle">Bookshelves</h3>
              <div className="optionssm">
                {bookshelvesList.map(each => {
                  const optionclicked = () => {
                    this.setState(
                      {
                        activeoption: each.id,
                        activeoptionname: each.value,
                        activelabel: each.label,
                      },
                      this.getbooks,
                    )
                  }
                  const optionclass =
                    each.id === activeoption
                      ? 'activeoptionbtnsm'
                      : 'optionbtnsm'

                  return (
                    <li key={each.id}>
                      <button
                        type="button"
                        className={optionclass}
                        onClick={optionclicked}
                      >
                        {each.label}
                      </button>
                    </li>
                  )
                })}
              </div>
            </ul>
            {this.renderbookbody()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Bookshelves
