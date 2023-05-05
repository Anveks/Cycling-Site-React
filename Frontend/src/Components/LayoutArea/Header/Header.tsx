import "./Header.css";
import logo from '../../../Assets/logo.jpg';
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import Logout from "../../AuthArea/Logout/Logout";

function Header(): JSX.Element {

    const user: any = authStore.getState().user;

    return (
        <div className="Header">

            <p className="logo">
                <img src={logo} alt="cycling logo" />
                World of Cycling
            </p>

            <div className="navigation">
                <NavLink to="#">About</NavLink>
                <NavLink to="#">Community</NavLink>
                {user && <Logout />}
            </div>

            {!user && <div className="navigation">
                && <NavLink to="/login">Login</NavLink>
                |
                <NavLink to="/register">Sign Up</NavLink>
            </div>}

        </div>
    );
}

export default Header;
