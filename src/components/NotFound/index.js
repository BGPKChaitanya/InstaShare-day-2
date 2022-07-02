import './index.css'

const NotFound = props => {
  const onClickHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="notFound-Container">
      <img
        src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656231514/erroring_1_art4en.png"
        alt="notFoundImage"
      />
      <h1 className="heading">Page Not Found</h1>
      <p className="para">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button type="button" className="homeButton" onClick={onClickHomePage}>
        Home Page
      </button>
    </div>
  )
}
export default NotFound
