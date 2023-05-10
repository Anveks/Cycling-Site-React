import DifficultyModel from "./DifficultyModel";

class RouteModel {
  routeId: number;
  name: string;
  date: string;
  startingPoint: string;
  endPoint: string;
  distance: number;
  time: number;
  difficultyId: DifficultyModel;
  description: string;
  imageUrl: string;
  isFavorite?: number;
}

export default RouteModel;
  