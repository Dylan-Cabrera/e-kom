import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import ProductosPage from "./pages/ProductosPage";
import ListaComprasPage from "./pages/ListaComprasPage";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

export default function App() {
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem("ekom-carrito");
    let arr = saved ? JSON.parse(saved) : [];
    return arr.map(p => ({
      ...p,
      cantidad: typeof p.cantidad === "number" ? p.cantidad : 1
    }));
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const saved = localStorage.getItem("ekom-carrito");
      let arr = saved ? JSON.parse(saved) : [];
      setCarrito(arr.map(p => ({
        ...p,
        cantidad: typeof p.cantidad === "number" ? p.cantidad : 1
      })));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Quitar producto
  const quitarProducto = (id) => {
    const nuevoCarrito = carrito.filter(p => p.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('ekom-carrito', JSON.stringify(nuevoCarrito));
  };

  // Cambiar cantidad
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

  // Agregar producto al carrito
  const agregarProducto = (producto) => {
    const existe = carrito.find(p => p.id === producto.id);
    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carrito.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: (p.cantidad || 1) + (producto.cantidad || 1) }
          : p
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: producto.cantidad || 1 }];
    }
    setCarrito(nuevoCarrito);
    localStorage.setItem('ekom-carrito', JSON.stringify(nuevoCarrito));
  };

  return (
    <Router>
      <Navbar
        carritoCount={carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0)}
        onCartClick={() => setSidebarOpen(true)}
      />
      <CartSidebar
        show={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        productos={carrito}
        onRemove={quitarProducto}
        onChangeCantidad={cambiarCantidad}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosPage onAddToCart={agregarProducto} />} />
        <Route path="/lista" element={<ListaComprasPage />} />
      </Routes>
    </Router>
  );
}