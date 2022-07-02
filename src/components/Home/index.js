import {Component} from 'react'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import CreatePost from '../CreatePost'
import Header from '../Header/index'
import SliderItem from '../SliderItem'

import searchContext from '../../context/searchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  infinite: false,
  dots: false,
  slidesToShow: 6,
  slidesToScroll: 1,
}

class Home extends Component {
  state = {
    StoriesList: [],
    apiPostStatus: apiStatusConstants.initial,
    apiSliderStatus: apiStatusConstants.initial,
    searchInput: '',
    searchResultList: [],
  }

  componentDidMount() {
    this.getStoriesList()
    this.getPostList()
  }

  getPostList = async () => {
    this.setState({apiPostStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const PostResponse = await fetch(apiUrl, options)
    const dataDB = await PostResponse.json()
    const dataDBPosts = dataDB.posts
    const updatedDataPosts = dataDBPosts.map(eachPost => ({
      comments: eachPost.comments,
      createdAt: eachPost.created_at,
      likesCount: eachPost.likes_count,
      postDetails: eachPost.post_details,
      postId: eachPost.post_id,
      profilePic: eachPost.profile_pic,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
    }))
    if (PostResponse.ok === true) {
      this.setState({
        searchResultList: updatedDataPosts,
        apiPostStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiPostStatus: apiStatusConstants.failure})
    }
  }

  updateSRList = product => {
    console.log(product)
    this.setState({searchInput: product}, this.getPostList)
  }

  renderSlider = () => {
    const {StoriesList} = this.state

    return (
      <ul>
        <Slider {...settings}>
          {StoriesList.map(eachLogo => (
            <SliderItem key={eachLogo.userId} eachLogo={eachLogo} />
          ))}
        </Slider>
      </ul>
    )
  }

  getStoriesList = async () => {
    this.setState({apiSliderStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const dataDB = await response.json()
    const dataDbResponse = dataDB.users_stories
    const updatedDataStories = dataDbResponse.map(eachStory => ({
      storyUrl: eachStory.story_url,
      userId: eachStory.user_id,
      userName: eachStory.user_name,
    }))
    if (response.ok === true) {
      this.setState({
        StoriesList: updatedDataStories,
        apiSliderStatus: apiStatusConstants.success,
      })
    }
  }

  getPostData = () => (
    <searchContext.Consumer>
      {value => {
        const {searchResultList} = value
        const lengthSearchList = searchResultList.length
        return lengthSearchList === 0 ? (
          <div className="searchNotFoundContainer">
            <img
              src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656677492/Group_dsga9l.png"
              alt="SearchNotFound"
              className="searchNotFoundImage"
            />
            <h1>Search Not Found</h1>
            <p>Try different keyword or search again</p>
          </div>
        ) : (
          <ul>
            {searchResultList.map(eachPost => (
              <CreatePost post={eachPost} key={eachPost.postId} />
            ))}
          </ul>
        )
      }}
    </searchContext.Consumer>
  )

  getLoaderView = () => (
    <div className="loader-container" testId="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getFailureView = () => (
    <div className="failureImageContainer">
      <img
        src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656307482/alert-triangle_dsbpxy.png"
        alt="failureImage"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="tryAgainButton">
        Try Again
      </button>
    </div>
  )

  getNonSliderView = () => (
    <div>
      <h1>Search Results</h1>
    </div>
  )

  renderHomeSlider = () => {
    const {apiSliderStatus} = this.state

    switch (apiSliderStatus) {
      case apiStatusConstants.success:
        return this.renderSlider()
      case apiStatusConstants.failure:
        return this.getNonSliderView()
      case apiStatusConstants.inProgress:
        return this.getLoaderView()
      default:
        return null
    }
  }

  renderHomePost = () => {
    const {apiPostStatus} = this.state

    switch (apiPostStatus) {
      case apiStatusConstants.success:
        return this.getPostData()
      case apiStatusConstants.failure:
        return this.getFailureView()
      case apiStatusConstants.inProgress:
        return this.getLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, searchResultList} = this.state

    return (
      <searchContext.Provider
        value={{
          searchInput,
          searchResultList,
          updateSRList: this.updateSRList,
          getPostList: this.getPostList,
        }}
      >
        <div className="homeMegaContainer">
          <Header />
          <div className="home-container">{this.renderHomeSlider()}</div>
          <div className="postContainer">{this.renderHomePost()}</div>
        </div>
      </searchContext.Provider>
    )
  }
}

export default Home
