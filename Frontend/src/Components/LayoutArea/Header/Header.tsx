import "./Header.css";
import logo from '../../../Assets/logo.jpg';
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import Logout from "../../AuthArea/Logout/Logout";
import { useEffect, useState } from "react";

function Header(): JSX.Element {

    const [loggedIn, setIsLoggedIn] = useState<boolean>(authStore.getState().isLoggedIn);
    const [currentUser, setCurrentUser] = useState<any>(authStore.getState().user);

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setIsLoggedIn(authStore.getState().isLoggedIn);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const user: any = authStore.getState().user;
    console.log(user);
    console.log(loggedIn);

    return (
        <div className="Header">

            <p className="logo">
                <img src={logo} alt="cycling logo" />
                World of Cycling
            </p>

            <div className="navigation">
                <div className="about-community">
                    <NavLink to="#">About</NavLink>
                    <NavLink to="#">Community</NavLink>
                    {user !== null && <Logout />}
                </div>

                {!loggedIn && <div className="login-register">
                    <NavLink to="/login"> Login </NavLink>
                    |
                    <NavLink to="/register"> Sign Up </NavLink>
                </div>}
            </div>

        </div>
    );
}

export default Header;
