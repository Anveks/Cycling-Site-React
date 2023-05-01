import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client-errors";
import { default as ItemModel, default as RouteModel } from "../2-models/route-model";
import dal from "../4-utils/dal";

async function getAllRoutes(): Promise<RouteModel[]> {
  const sql = "SELECT * FROM routes";
  const routes = await dal.execute(sql);
  return routes;
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
  // getItemsByCategory,
  // addItem,
  // deleteItem,
  // updateItem,
  // getOneItem
};
