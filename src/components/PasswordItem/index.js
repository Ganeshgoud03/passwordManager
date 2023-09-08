import './index.css'

const PasswordItem = props => {
  const {passwordItem, onDeletePassword, passwordStatus} = props
  const {website, name, password, id, backgroundClassName} = passwordItem
  const initial = website.slice(0, 1).toUpperCase()

  const deletePassword = () => {
    onDeletePassword(id)
  }

  return (
    <li className="list-item">
      <p className={backgroundClassName}>{initial}</p>
      <div className="para-card">
        <p className="website-para">{website}</p>
        <p className="name-para">{name}</p>
        {passwordStatus ? (
          <p className="password-para">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="hide-password-img"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-btn"
        data-testid="delete"
        onClick={deletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
