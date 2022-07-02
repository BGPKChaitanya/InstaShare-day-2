import {Link} from 'react-router-dom'
import './index.css'

const SliderItem = props => {
  const {eachLogo} = props
  const {userId, userName, storyUrl} = eachLogo

  return (
    <li>
      <Link to={`/users/${userId}`} className="slick-item">
        <img className="logo-image" src={storyUrl} alt="company logo" />
        <span>{userName}</span>
      </Link>
    </li>
  )
}

export default SliderItem
