import { UploadedFile } from "express-fileupload";
import DifficultyModel from "./difficulty-model";

class RouteModel {
  routeId: number;
  name: string;
  date: string;
  startingPoint: string;
  endPoint: string;
  distance: number;
  time: number;
  difficulty: DifficultyModel;
  description: string;
  image: string;
  imageFile: UploadedFile;
  isFavorite?: number;

  public constructor(route: RouteModel) {
    this.routeId = route.routeId;
    this.name = route.name;
    this.date = route.date;
    this.startingPoint = route.startingPoint;
    this.endPoint = route.endPoint;
    this.distance = route.distance;
    this.time = route.time;
    this.difficulty = route.difficulty;
    this.description = route.description;
    this.image = route.image;
    this.imageFile = route.imageFile;
  }
}

export default RouteModel;
