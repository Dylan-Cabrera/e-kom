import Product from '../models/Product.model.js';
import Store from '../models/Store.model.js';
import ProductStore from '../models/ProductStore.model.js';
import sequelize from '../config/db.js';
import { readFile } from 'fs/promises';

const storesRaw = [
  { nombre: "Carrefour", direccion: "Av. Siempre Viva 123" },
  { nombre: "Coto", direccion: "Av. Cabildo 456" },
  { nombre: "Jumbo", direccion: "Av. Libertador 789" }
];

const productosRaw = JSON.parse(
  await readFile(
    new URL('./productos.json', import.meta.url)
  )
);

(async () => {
  await sequelize.sync({ force: true });

  const products = await Product.bulkCreate(productosRaw);
  const stores = await Store.bulkCreate(storesRaw);

  for (let product of products) {
    for (let store of stores) {
      try {
        const rel = await ProductStore.create({
          ProductId: product.id,
          StoreId: store.id,
          precio: Math.round(product.precio * (0.9 + 0.2 * Math.random()))
        });
        console.log(`Relacionada: producto ${product.id} con tienda ${store.id}`);
      } catch (err) {
        console.error("Error al crear relación", err);
      }
    }
  }

  console.log("Se cargaron los datos a la base de datos correctamente!");
  process.exit();
})();