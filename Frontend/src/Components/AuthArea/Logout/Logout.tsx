import { useNavigate } from "react-router-dom";
import "./Logout.css";
import LogoutIcon from '@mui/icons-material/Logout';
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { RoutesActionType, routesStore } from "../../../Redux/RoutesState";
import { AuthActionType, authStore } from "../../../Redux/AuthState";


function Logout(): JSX.Element {
    const navigate = useNavigate();
    function logout(): void {
        authService.logout();
        notifyService.success("Come back soon!");

        navigate('/');
        authStore.dispatch({ type: AuthActionType.UpdateLoggedIn, payload: false })
        routesStore.dispatch({ type: RoutesActionType.RemoveRoutes })
        // routesStore.dispatch({ type: VacationsActionType.ResetVacations });

    }
    return (
        <div className="Logout">
            <button className="logout" onClick={logout}> <LogoutIcon /></button>
        </div>
    );
}

export default Logout;
