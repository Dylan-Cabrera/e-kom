// src/models/ProductStore.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductStore = sequelize.define('ProductStore', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  precio: { type: DataTypes.FLOAT, allowNull: false }
}, {
  tableName: 'ProductStores',
  timestamps: true
});

export default ProductStore;