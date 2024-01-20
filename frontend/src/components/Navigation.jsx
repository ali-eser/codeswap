import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Navigation = ({ handleLogout }) => {
  const user = useSelector(({ user }) => user);

  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      {!user && (
        <div>
          <Link style={padding} to="/login">Login</Link>
          <Link style={padding} to="/signin">Sign in</Link>
        </div>
      )}
      {user && (
        <div>
          <Link style={padding} to={`/users/${user.username}`}>{user.username}</Link>
          <Link style={padding} to="/home">Your Feed</Link>
          <Link style={padding} to="/create">Create New Project</Link>
          <a href="" style={padding} onClick={handleLogout}>Log out</a>
        </div>
      )}
    </div>
  );
};

Navigation.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default Navigation;
