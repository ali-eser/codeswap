import PropTypes from "prop-types";

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} placeholder="username"/>
        <br />
        <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="password"/>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;