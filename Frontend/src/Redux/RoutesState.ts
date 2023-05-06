import { createStore } from "redux";
import RouteModel from "../Models/RouteModel";

export class RoutesState {
  public routes: RouteModel[] = [];
}

export enum RoutesActionType {
  FetchRoutes,
  RemoveRoutes,
  UpdateFavorite
}

export interface RouteAction {
  type: RoutesActionType,
  payload?: any;
}

export function routesReducer(currentState = new RoutesState(), action: RouteAction): RoutesState {
  const newState = { ...currentState };

  switch(action.type){
    case RoutesActionType.FetchRoutes:
      newState.routes = action.payload;
      break;

    case RoutesActionType.RemoveRoutes:
      newState.routes = [];
      break;

    case RoutesActionType.UpdateFavorite:
        const indexToUpdate = newState.routes.findIndex((r) => r.routeId === action.payload.routeId);
        newState.routes[indexToUpdate].isFavorite = action.payload.follow;
        break;
  }

  return newState;
}

export const routesStore = createStore(routesReducer);