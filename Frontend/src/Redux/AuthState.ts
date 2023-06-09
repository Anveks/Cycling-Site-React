import { createStore } from "redux";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

export class AuthState {

    public token: string = null;
    public user: UserModel = null;
    public isLoggedIn: boolean = false;
    
    public constructor() {
        this.token = localStorage.getItem("token");
        if(this.token) {
            const jwtPayload = jwtDecode(this.token);
            this.user = (jwtPayload as any).user;
        }
    }
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
    UpdateToken = "UpdateToken",
    UpdateLoggedIn = "UpdateLoggedIn"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {

        case AuthActionType.Register:
        case AuthActionType.UpdateToken: // updating the token here
        case AuthActionType.Login:
            newState.token = action.payload;
            const jwtPayload = jwtDecode(newState.token);
            newState.user = (jwtPayload as any).user;
            localStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;

        case AuthActionType.UpdateLoggedIn:
            newState.isLoggedIn = action.payload;
            break;

        // case AuthActionType.UpdateToken:
        //     localStorage.removeItem("token");
        //     newState.token = action.payload;
        //     localStorage.setItem("token", newState.token);
        //     break;

    }

    return newState;
}

export const authStore = createStore(authReducer);