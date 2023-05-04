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
  image: string;

}

export default RouteModel;
  