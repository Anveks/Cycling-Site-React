import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client-errors";
import { default as ItemModel, default as RouteModel } from "../2-models/route-model";
import dal from "../4-utils/dal";
import appConfig from "../4-utils/app-config";

async function getAllRoutes(userId?: number): Promise<RouteModel[]> {
  let sql = `SELECT *, CONCAT('${appConfig.imageUrl}', routes.image) AS imageUrl FROM routes`;

  if (userId) sql = `SELECT R.*, CONCAT('${appConfig.imageUrl}', routes.image) AS imageUrl
      CASE 
          WHEN F.routeId IS NULL THEN false 
          ELSE true 
      END AS isFavorite
    FROM routes R
    LEFT JOIN favorites F ON R.routeId = F.routeId AND F.userId = ${userId};`;

  const routes = await dal.execute(sql);
  return routes;
}

async function getImgName(routeId: number): Promise<string> {
  const sql = `SELECT image AS imageFileName FROM routes WHERE routeId = ?`;
  const result = await dal.execute(sql, [routeId]);
  const imageName = result[0]?.imageFileName;
  return imageName;
}

// async function getItemsByCategory(categoryId: number): Promise<ItemModel[]> {
//   const sql = "SELECT * FROM items WHERE categoryId = ? ";
//   const itemsByCategory = await dal.execute(sql, [categoryId]);
//   return itemsByCategory;
// }

// async function getOneItem(itemId: number): Promise<ItemModel>{
//   const sql = `SELECT * FROM movies WHERE itemId = ${itemId}`
//   const items = await dal.execute(sql);
//   const item = items[0]
//   if (!item) throw new ResourceNotFoundError(itemId);
//   return item
// }



// async function addItem(item: ItemModel): Promise<ItemModel> {
//   const sql = "INSERT INTO items VALUES(DEFAULT, ?, ?, ?)";
//   const result: OkPacket = await dal.execute(sql, [
//     item.categoryId,
//     item.name,
//     item.something,
//   ]);
//   item.itemId = result.insertId;
//   return item;
// }

// async function deleteItem(itemId: number): Promise<void> {
//   const sql = "DELETE FROM items WHERE itemId = ?";
//   const result: OkPacket = await dal.execute(sql, [itemId]);
//   if (result.affectedRows === 0) throw new ResourceNotFoundError(itemId);
// }

// async function updateItem(item: ItemModel): Promise<ItemModel> {
//   const sql = `UPDATE items SET name = ?, something = ? WHERE itemId = ?`;

//   const result: OkPacket = await dal.execute(sql, [item.name, item.something, item.itemId, ]);

//   if (result.affectedRows === 0) throw new ResourceNotFoundError(item.itemId);

//   return item;
// }

export default {
  getAllRoutes,
  getImgName
  // getItemsByCategory,
  // addItem,
  // deleteItem,
  // updateItem,
  // getOneItem
};
