import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const user = useSelector(({ user }) => user);

  useEffect(() => {
      if (user) {
        navigate("/home")
      }
  }, [navigate, user]);

  return (
    <div id="welcome-page">
      <h1 id="codeswap">CodeSwap</h1>
      <div className="welcome-buttons">
          <h1><Link to="/login">Login</Link></h1>
          <h1><Link to="/signin">Sign in</Link></h1>
      </div>
    </div>
  )
};

export default WelcomePage;