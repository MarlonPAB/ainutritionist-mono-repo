import Toggleable from './Toggleable'
import PropTypes from 'prop-types'

export default function LoginForm (props) {
  return (
    <Toggleable buttonLabel='Show Login'>
      <form onSubmit={props.handleSubmit}>
        <div>
          <input
            type='text'
            value={props.setUsername}
            name='Username'
            placeholder='Username'
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          <input
            type='email'
            value={props.email}
            name='Email'
            placeholder='Email'
            onChange={props.handleEmailChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={props.password}
            name='Password'
            placeholder='Password'
            onChange={props.handlePasswordChange}
          />
        </div>
        <div>
          <button id='form-login-button'>
            Login
          </button>
        </div>
      </form>
    </Toggleable>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string
}
