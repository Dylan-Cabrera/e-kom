import { useEffect, useState } from 'react';
import ekomApi from '../api/ekomApi';
import "../styles/ekom.css";
import CartSidebar from "../components/CartSidebar";
import ConfirmAddModal from "../components/ConfirmAddModal";


function atributosToString(atributos) {
  if (Array.isArray(atributos)) return atributos.join(", ");
  if (typeof atributos === "string" && atributos.startsWith("[")) {
    try {
      const arr = JSON.parse(atributos);
      if (Array.isArray(arr)) return arr.join(", ");
    } catch { }
  }
  return "";
}

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem('ekom-carrito');
    return saved ? JSON.parse(saved) : [];
  });
  const [modal, setModal] = useState({ show: false, producto: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    ekomApi.get('/products')
      .then(r => setProductos(Array.isArray(r.data) ? r.data : []))
      .catch(() => setProductos([]));
  }, []);

  // Añadir un producto: si ya está, suma uno
  const agregarALista = (prod) => setModal({ show: true, producto: prod });

  const confirmarAdd = () => {
    const prod = modal.producto;
    let existe = carrito.find(p => p.id === prod.id);
    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carrito.map(p =>
        p.id === prod.id ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
      );
    } else {
      nuevoCarrito = [...carrito, { ...prod, cantidad: 1 }];
    }
    setCarrito(nuevoCarrito);
    localStorage.setItem('ekom-carrito', JSON.stringify(nuevoCarrito));
    setModal({ show: false, producto: null });
  };

  // Quitar todo el producto del carrito
  const quitarProducto = (id) => {
    const nuevoCarrito = carrito.filter(p => p.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('ekom-carrito', JSON.stringify(nuevoCarrito));
  };

  // Cambiar cantidad (desde el sidebar)
  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      quitarProducto(id);
      return;
    }
    const nuevoCarrito = carrito.map(p =>
      p.id === id ? { ...p, cantidad: nuevaCantidad } : p
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem('ekom-carrito', JSON.stringify(nuevoCarrito));
  };

  return (

    <>
    <section className="ekom-products-section">
      <h2 className="section-title" style={{marginBottom: 30}}>Catálogo de Productos</h2>

      <div className="ekom-products-grid">
        {productos.map(prod => (
          <div className="ekom-product-card" key={prod.id}>
            <img src={prod.imagen} alt={prod.nombre} className="ekom-product-card__img" />
            <div className="ekom-product-card__info">
              <div className="ekom-product-card__title">{prod.nombre}</div>
              <div className="ekom-product-card__brand">{prod.marca}</div>
              <div className="ekom-product-card__price">${prod.precio}</div>
              <div className="ekom-product-card__category">{prod.categoria}</div>
              <div className="ekom-product-card__atributos">{atributosToString(prod.atributos)}</div>
              <button className="ekom-product-card__btn" onClick={() => agregarALista(prod)}>
                Añadir a mi lista
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmAddModal
        show={modal.show}
        producto={modal.producto}
        onConfirm={confirmarAdd}
        onCancel={() => setModal({ show: false, producto: null })}
      />
    </section>
    
    </>

  );
}