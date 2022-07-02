import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

const CreatePost = props => {
  const {post} = props
  const {
    comments,
    createdAt,
    likesCount,
    postDetails,
    profilePic,
    userName,
  } = post
  const updatedPostDetails = {
    caption: postDetails.caption,
    imageUrl: postDetails.image_url,
  }
  const {caption, imageUrl} = updatedPostDetails

  const renderComments = () => (
    <ul>
      {comments.map(eachComment => (
        <li className="Comment">
          <p className="commentName">{eachComment.user_name}</p>
          <p className="userComment">{eachComment.comment}</p>
        </li>
      ))}
    </ul>
  )

  return (
    <li className="bgContainer">
      <div className="userContainer">
        <img src={profilePic} alt={userName} className="profilePic" />
        <h1 className="usersName">{userName}</h1>
      </div>
      <img src={imageUrl} alt={caption} className="postDetails" />
      <div className="commentsContainer">
        <div className="CommentSymbols">
          <BsHeart className="icon" />
          <FaRegComment className="icon" />
          <BiShareAlt className="icon" />
        </div>
        <p className="like">{likesCount} likes</p>
        <p className="postCaption">{caption}</p>
        {renderComments()}
        <p className="createdAt">{createdAt}</p>
      </div>
    </li>
  )
}

export default CreatePost
