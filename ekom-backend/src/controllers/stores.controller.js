import { Store } from '../models/index.js';

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar tiendas" });
  }
};