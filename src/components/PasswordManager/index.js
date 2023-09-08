import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const passwordBackgroundClass = [
  'cyan-blue',
  'vivid-orange',
  'lime-green',
  'vivid-red',
  'cyan',
  'maroon',
]

const initialPasswordList = []
class PasswordManager extends Component {
  state = {
    passwordList: initialPasswordList,
    websiteInput: '',
    nameInput: '',
    passwordInput: '',
    showPassword: false,
    count: 0,
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, nameInput, passwordInput} = this.state
    const initialBackgroundColor = `initial-para ${
      passwordBackgroundClass[
        Math.ceil(Math.random() * passwordBackgroundClass.length - 1)
      ]
    }`

    const addPassword = {
      id: v4(),
      website: websiteInput,
      name: nameInput,
      password: passwordInput,
      backgroundClassName: initialBackgroundColor,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, addPassword],
      websiteInput: '',
      nameInput: '',
      passwordInput: '',
      count: prevState.count + 1,
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onDeletePassword = id => {
    const {passwordList, count} = this.state
    const newPasswordList = passwordList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordList: newPasswordList, count: count - 1})
  }

  changeShowPassword = () => {
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  onFilterList = event => {
    const {passwordList} = this.state
    const filteredPasswordList = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState({
      passwordList: filteredPasswordList,
      count: passwordList.length,
    })
  }

  render() {
    const {
      passwordList,
      websiteInput,
      nameInput,
      passwordInput,
      showPassword,
      count,
    } = this.state

    return (
      <div className="bg-container">
        <div className="app-logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-img"
          />
        </div>
        <div className="top-card">
          <picture className="picture">
            <source
              media="(min-width:576px)"
              srcSet="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </picture>
          <div className="form-container">
            <h1 className="main-head">Add New Password</h1>
            <form onSubmit={this.onAddPassword}>
              <div className="website-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-img"
                />
                <input
                  type="text"
                  value={websiteInput}
                  onChange={this.onChangeWebsiteInput}
                  placeholder="Enter Website"
                  className="website-input"
                />
              </div>
              <div className="username-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="username-img"
                />
                <input
                  type="text"
                  value={nameInput}
                  onChange={this.onChangeNameInput}
                  placeholder="Enter Username"
                  className="username-input"
                />
              </div>
              <div className="password-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="password-img"
                />
                <input
                  type="password"
                  onChange={this.onChangePasswordInput}
                  value={passwordInput}
                  placeholder="Enter Password"
                  className="password-input"
                />
              </div>
              <div className="btn-card">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="bottom-card">
          <div className="bottom-top-card">
            <div className="password-count-card">
              <h1 className="password-count-head">Your Passwords</h1>
              <p className="password-count-para">{count}</p>
            </div>
            <div className="search-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <input
                type="search"
                onChange={this.onFilterList}
                className="search-input"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="bottom-bottom-card">
            <div className="show-password-card">
              <input
                type="checkbox"
                id="password"
                onClick={this.changeShowPassword}
                className="show-password-input"
              />
              <label htmlFor="password" className="password-label">
                Show Passwords
              </label>
            </div>
            {count === 0 ? (
              <div className="no-password-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-img"
                />
                <p className="no-password-para">No Passwords</p>
              </div>
            ) : (
              <ul className="password-list-container">
                {passwordList.map(eachItem => (
                  <PasswordItem
                    key={eachItem.id}
                    passwordItem={eachItem}
                    passwordStatus={showPassword}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
