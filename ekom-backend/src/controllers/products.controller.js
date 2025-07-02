import { Product, Store } from '../models/index.js';

export const getAllProducts = async (req, res) => {
  const { categoria, nombre } = req.query;
  const where = {};
  if (categoria) where.categoria = categoria;
  if (nombre) where.nombre = nombre;

  try {
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar producto" });
  }
};

export const getProductPrices = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    const stores = await product.getStores();
        console.log("----------------------------------------------------------------------------------")
    console.log(stores)
            console.log("----------------------------------------------------------------------------------")
    res.json(
      stores.map(store => ({
        tienda: store.nombre,
        direccion: store.direccion,
        precio: store.ProductStore?.precio // usa optional chaining
      }))
    );
  } catch (err) {
    console.error("Error al buscar precios del producto", err);
    res.status(500).json({ error: "Error al buscar precios del producto" });
  }
};