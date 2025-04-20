import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Logo = () => (
  <Link className="navbar-brand mx-auto" to="/">
    <img src={logo} alt="CookBook" width="150px" />
  </Link>
);

export default Logo;
