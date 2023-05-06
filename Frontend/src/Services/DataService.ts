import axios from "axios";
import appConfig from "../Utils/AppConfig";
import RouteModel from "../Models/RouteModel";
import { RoutesActionType, routesStore } from "../Redux/RoutesState";
import { authStore } from "../Redux/AuthState";

class DataService {
  public async getAllRoutes(): Promise<RouteModel[]> {
    let routes = routesStore.getState().routes;
    const user = authStore.getState().user;
    const userId = user?.userId;
    

    const headers = {
      "user-id": userId // custom header name is "user-id", value sent is userId from authStore
    };

    if(routes.length === 0) {
      const response = user === null
        ? await axios.get<RouteModel[]>(appConfig.routesURL) 
        : await axios.get<RouteModel[]>(appConfig.routesURL, { headers })
      routes = response.data;
      routesStore.dispatch({ type: RoutesActionType.FetchRoutes, payload: routes })
    }
    return routes;
  }

  public async setFavorite(routeId: number, follow: number){
    const data = { routeId, follow }
    console.log(data);
    
    await axios.post(appConfig.favURL, data);
  }

  // public async getItemsByCategory(categoryId: number): Promise<ItemModel[]> {
  //   const response = await axios.get<ItemModel[]>(
  //     appConfig.itemsByCategoriesUrl + categoryId
  //   );
  //   const items = response.data;
  //   return items;
  // }

  // public async addItem(item: ItemModel): Promise<void> {
  //   const response = await axios.post<ItemModel>(appConfig.itemsUrl, item);
  //   const addedItem = response.data;
  // }

  // public async deleteItem(itemId: number): Promise<void> {
  //   await axios.delete(appConfig.itemsUrl + itemId);
  // }

  // public async updateItem(item: ItemModel): Promise<void> {
  //   const response = await axios.put<ItemModel>(
  //     appConfig.itemsUrl + item.itemId,
  //     item
  //   );
  //   const updatedItem = response.data;
  // }

  // public async getOneItem(itemId: number): Promise<ItemModel> {
  //   const response = await axios.get<ItemModel>(appConfig.itemsUrl + itemId);
  //   const item = response.data;
  //   return item;
  // }
}

const dataService = new DataService();

export default dataService;
