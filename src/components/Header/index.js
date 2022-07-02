import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'

import searchContext from '../../context/searchContext'
import './index.css'

class Header extends Component {
  state = {inputSearch: ''}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onChangeInputSearch = event => {
    console.log(event.target.value)
    this.setState({inputSearch: event.target.value})
  }

  renderHeaderData = () => (
    <searchContext.Consumer>
      {value => {
        const {updateSRList} = value
        const {inputSearch} = this.state
        const onEnterSearchInput = event => {
          if (event.key === 'Enter') {
            updateSRList(inputSearch)
          }
        }

        const onClickSearchInput = () => {
          updateSRList(inputSearch)
        }
        const emptyInputSearch = () => {
          updateSRList('')
        }

        return (
          <div className="navBarMiniContainer">
            <div className="navBarLogoContainer">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656091353/Standard_Collection_8_vblsmr.png"
                  alt="website logo"
                  className="website-logo"
                  onClick={emptyInputSearch}
                />
              </Link>
              <h1>Insta Share</h1>
            </div>
            <div className="navBarMiniContents">
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search Caption"
                  className="searchInput"
                  value={inputSearch}
                  onChange={this.onChangeInputSearch}
                  onKeyDown={onEnterSearchInput}
                />
                <button
                  type="button"
                  className="buttonSearch"
                  onClick={onClickSearchInput}
                >
                  <FaSearch className="searchButton" testid="searchIcon" />
                </button>
              </div>
              <ul className="navBarListContents">
                <li className="listItem">
                  <Link
                    to="/"
                    className="listItemStyle"
                    onClick={emptyInputSearch}
                  >
                    Home
                  </Link>
                </li>
                <li className="listItem">
                  <Link to="/profile" className="listItemStyle">
                    Profile
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="LogOutButton"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </searchContext.Consumer>
  )

  render() {
    return <nav className="navBarContainer">{this.renderHeaderData()}</nav>
  }
}

export default withRouter(Header)
