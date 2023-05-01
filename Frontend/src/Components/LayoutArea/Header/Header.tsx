import "./Header.css";
import logo from '../../../Assets/logo.jpg';
import { NavLink } from "react-router-dom";

function Header(): JSX.Element {
    return (
        <div className="Header">

            <p className="logo">
                <img src={logo} alt="cycling logo" />
                World of Cycling
            </p>

            <div className="navigation">
                <NavLink to="#">About</NavLink>
                <NavLink to="#">Community</NavLink>
                <NavLink to="#">Login | Sign Up</NavLink>
            </div>

        </div>
    );
}

export default Header;
