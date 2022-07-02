import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class Profile extends Component {
  state = {profileData: [], isLoading: true}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiProfileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responseProfile = await fetch(apiProfileUrl, options)
    const DataProfileDB = await responseProfile.json()
    const ProfileData = DataProfileDB.profile
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
    console.log(updatedData)
    this.setState({profileData: updatedData, isLoading: false})
  }

  renderAllStories = () => {
    const {profileData} = this.state
    const story = profileData.stories
    return (
      <ul className="storyContainer">
        {story.map(each => (
          <li>
            <img src={each.image} alt="storyImage" className="storyImage" />
          </li>
        ))}
      </ul>
    )
  }

  renderAllPosts = () => {
    const {profileData} = this.state

    return (
      <ul className="postsContainer">
        {profileData.posts.map(eachPost => (
          <li>
            <img src={eachPost.image} alt="PostImage" className="PostImage" />
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

  render() {
    const {profileData, isLoading} = this.state
    const {
      followersCount,
      followingCount,
      postsCount,
      profilePic,
      userBio,
      userId,
      userName,
    } = profileData

    return (
      <div>
        <Header />
        <div className="profileContainer">
          <div className="profileInfo">
            <img src={profilePic} alt="profilePic" className="profile_image" />
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
            <img
              src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656340566/Vector_r5jnxp.png"
              alt="postImage"
            />
            <p className="postWord">Posts</p>
          </div>
          <div>{isLoading ? this.getLoaderView() : this.renderAllPosts()}</div>
        </div>
      </div>
    )
  }
}

export default Profile
