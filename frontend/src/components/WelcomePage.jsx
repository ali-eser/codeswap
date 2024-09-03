import { Link } from "react-router-dom";

const WelcomePage = () => {
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