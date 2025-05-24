import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export async function openDb() {
  return open({
    filename: path.resolve(__dirname, "../../shopping.db"),
    driver: sqlite3.Database,
  });
}

export async function initializeDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      category TEXT,
      image TEXT
    )
  `);

// Sample data
const row = await db.get("SELECT COUNT(*) as count FROM products");
if (row.count === 0) {
  await db.run(`
    INSERT INTO products (title, price, description, category, image) VALUES
    ('Sample Product 1', 29.99, 'A great product', 'electronics', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'),
    ('Sample Product 2', 15.99, 'Another cool product', 'jewelery', 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg'),
    ('Sample Product 3', 45.00, 'New cool gadget', 'electronics', 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg'),
    ('Sample Product 4', 12.50, 'Stylish watch', 'jewelery', 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg'),
    ('Sample Product 5', 25.00, 'Elegant bracelet', 'jewelery', 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg'),
    ('Sample Product 6', 99.99, 'Premium headphones', 'electronics', 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg'),
    ('Sample Product 7', 49.99, 'Trendy sunglasses', 'accessories', 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg'),
    ('Sample Product 8', 39.00, 'Smart fitness band', 'electronics', 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg')
  `);
}

  return db;
}
