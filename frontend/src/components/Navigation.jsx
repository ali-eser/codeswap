import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Navigation = ({ handleLogout }) => {
  const user = useSelector(({ user }) => user);

  const padding = {
    paddingRight: 15,
  };

  if (user) {
    return (
      <div className={"navbar"+ " " + "general-item"}>
          <div>
            <Link style={padding} to={`/users/${user.username}`}>{user.username}</Link>
            <Link style={padding} to="/home">Your Feed</Link>
            <Link style={padding} to="/home/following">Following</Link>
            <Link style={padding} to="/create">Create New Project</Link>
            <a href="" onClick={handleLogout}>Log out</a>
          </div>
      </div>
    );
  } else {
    return null;
  }
};

Navigation.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default Navigation;
