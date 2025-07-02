import Product from './Product.model.js';
import Store from './Store.model.js';
import ProductStore from './ProductStore.model.js';

// models/Product.js
Product.belongsToMany(Store, {
  through: 'ProductStore',
  foreignKey: 'id', // esta columna en ProductStore apunta a Product
});

// models/Store.js
Store.belongsToMany(Product, {
  through: 'ProductStore',
  foreignKey: 'id', // esta columna en ProductStore apunta a Store
});


export { Product, Store, ProductStore };