import { Link } from "react-router-dom";

const WelcomePage = () => {
  const buttonStyle = {
    marginLeft: "75px",
    fontSize: "0.84em"
  };
  return (
    <div className="welcomePage">
      <h1 style={{ textShadow: "0px 10px 400px rgb(20, 47, 145)", color: "rgb(20, 47, 145)", fontSize: "2.2em" }}>CodeSwap</h1>
      <div style={{display: "flex"}}>
        <h1 style={buttonStyle}><Link to="/login">Login</Link></h1>
        <h1 style={buttonStyle}><Link to="/signin">Sign in</Link></h1>
      </div>

    </div>
  )
};

export default WelcomePage;