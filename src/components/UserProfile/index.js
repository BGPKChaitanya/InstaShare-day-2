import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import Header from '../Header/index'
import './index.css'

const apiPostStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    userProfileData: [],
    apiPostStatus: apiPostStatusConstants.initial,
    isLoading: true,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiPostStatus: apiPostStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiProfileUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responseProfile = await fetch(apiProfileUrl, options)
    const DataProfileDB = await responseProfile.json()
    const ProfileData = DataProfileDB.user_details
    const updatedData = {
      followersCount: ProfileData.followers_count,
      followingCount: ProfileData.following_count,
      id: ProfileData.id,
      posts: ProfileData.posts,
      postsCount: ProfileData.posts_count,
      profilePic: ProfileData.profile_pic,
      stories: ProfileData.stories,
      userBio: ProfileData.user_bio,
      userId: ProfileData.user_id,
      userName: ProfileData.user_name,
    }
    this.setState({
      userProfileData: updatedData,
      isLoading: false,
    })
    if (updatedData.postsCount === 0) {
      this.setState({apiPostStatus: apiPostStatusConstants.failure})
    }
    this.setState({apiPostStatus: apiPostStatusConstants.success})
  }

  renderAllStories = () => {
    const {userProfileData} = this.state
    const story = userProfileData.stories
    return (
      <ul className="storyContainer">
        {story.map(each => (
          <li key={each.id}>
            <img src={each.image} alt="user story" className="storyImage" />
          </li>
        ))}
      </ul>
    )
  }

  renderAllPosts = () => {
    const {userProfileData} = this.state

    return (
      <ul className="postsContainer">
        {userProfileData.posts.map(eachPost => (
          <li key={eachPost.id}>
            <img src={eachPost.image} alt="user post" className="PostImage" />
          </li>
        ))}
      </ul>
    )
  }

  getLoaderView = () => (
    <div className="loader-container" testId="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderPostFailureView = () => (
    <div className="postFailureContainer">
      <BiCamera className="postImage" />
      <h1 className="noPosts">No Posts</h1>
    </div>
  )

  renderPostDetails = () => {
    const {apiPostStatus} = this.state

    switch (apiPostStatus) {
      case apiPostStatusConstants.success:
        return this.renderAllPosts()
      case apiPostStatusConstants.failure:
        return this.renderPostFailureView()
      case apiPostStatusConstants.inProgress:
        return this.getLoaderView()
      default:
        return null
    }
  }

  render() {
    const {userProfileData, isLoading} = this.state
    const {
      followersCount,
      followingCount,
      postsCount,
      profilePic,
      userBio,
      userId,
      userName,
    } = userProfileData

    return (
      <div>
        <Header />
        <div className="profileContainer">
          <div className="profileInfo">
            <img
              src={profilePic}
              alt="user profile"
              className="profile_image"
            />
            <div className="profileDetails">
              <h1 className="userName">{userName}</h1>
              <div className="followerDetails">
                <p className="followerItem">{postsCount} posts</p>
                <p className="followerItem">{followersCount} Followers</p>
                <p className="followerItem">{followingCount} Following</p>
              </div>
              <p className="userId">{userId}</p>
              <p className="userId">{userBio}</p>
            </div>
          </div>
          <div>
            {isLoading ? this.getLoaderView() : this.renderAllStories()}
          </div>
          <hr />
          <div className="postContainer1">
            <BsGrid3X3 />
            <h1 className="postWord">Posts</h1>
          </div>
          <div>{this.renderPostDetails()}</div>
        </div>
      </div>
    )
  }
}

export default UserProfile
