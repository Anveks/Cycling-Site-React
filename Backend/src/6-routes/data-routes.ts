import express, { Request, Response, NextFunction } from "express";
import ItemModel from "../2-models/route-model";
import dataService from "../5-services/data-service";
import imageHandler from "../4-utils/image-handler";
import cyber from "../4-utils/cyber";

const router = express.Router();

router.get("/routes", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const header = request.headers; // get the authorization header
      // const token = header?.substring(7); // extract token
      // const user = await cyber.decodeToken(token); // decode it and extract the user
      console.log(header);
      // if (user) {
      //   let routes = await dataService.getAllRoutes();
      // }
      // const routes = await dataService.getAllRoutes(user?.userId);
      const routes = await dataService.getAllRoutes();
      response.json(routes);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/routes/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
  try {
      const imageName = request.params.imageName;
      const imagePath = imageHandler.getImagePath(imageName);
      response.sendFile(imagePath);
  }
  catch(err: any) {
      next(err);
  }
});

// router.get(
//   "/items-per-categories/:categoryId",
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const categoryId = +request.params.categoryId;
//       const items = await dataService.getItemsByCategory(categoryId);
//       response.json(items);
//     } catch (err: any) {
//       next(err);
//     }
//   }
// );

// router.post(
//   "/items",
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const item = new ItemModel(request.body);
//       const addedItem = await dataService.addItem(item);
//       response.status(201).json(addedItem);
//     } catch (err: any) {
//       next(err);
//     }
//   }
// );

// router.delete(
//   "/items/:itemId([0-9]+)",
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const itemId = +request.params.itemId;
//       await dataService.deleteItem(itemId);
//       response.sendStatus(204);
//     } catch (err: any) {
//       next(err);
//     }
//   }
// );

// router.put("/items/:itemId([0-9]+)",  async (request: Request, response: Response, next: NextFunction) => {
//   try {
//       request.body.itemId = +request.params.itemId;
//       const item = new ItemModel(request.body);
//       const updatedItem = await dataService.updateItem(item);
//       response.json(updatedItem);
//   }
//   catch (err: any) {
//       next(err);
//   }
// });

// router.get("/items/:itemId([0-9]+)",  async (request: Request, response: Response, next: NextFunction) => {
//   try {
//       const itemId = +request.params.itemId;
//       const item = await dataService.getOneItem(itemId);
//       response.json(item);
//   }
//   catch (err: any) {
//       next(err);
//   }
// });


export default router;
