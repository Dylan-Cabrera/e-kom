import React, { useEffect, useState } from "react";
import ekomApi from "../api/ekomApi";
import "../styles/ekom.css";
import Navbar from "../components/Navbar";

function atributosToString(atributos) {
  if (Array.isArray(atributos)) return atributos.join(", ");
  if (typeof atributos === "string" && atributos.startsWith("[")) {
    try {
      const arr = JSON.parse(atributos);
      if (Array.isArray(arr)) return arr.join(", ");
    } catch {}
  }
  return "";
}

export default function ListaComprasPage() {
  const [productos, setProductos] = useState([]);
  const [precios, setPrecios] = useState({});

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("ekom-carrito") || "[]");
    setProductos(Array.isArray(carrito) ? carrito : []);

    carrito.forEach(async (prod) => {
      try {
        const res = await ekomApi.get(`/products/${prod.id}/prices`);
        setPrecios((prev) => ({ ...prev, [prod.id]: res.data }));
      } catch (err) {
        setPrecios((prev) => ({ ...prev, [prod.id]: [] }));
      }
    });
  }, []);

  const quitar = (id) => {
    const nuevaLista = productos.filter((p) => p.id !== id);
    setProductos(nuevaLista);
    localStorage.setItem("ekom-carrito", JSON.stringify(nuevaLista));
  };

  // Cambiar cantidad (sumar/restar)
  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      quitar(id);
      return;
    }
    const nuevaLista = productos.map(p =>
      p.id === id ? { ...p, cantidad: nuevaCantidad } : p
    );
    setProductos(nuevaLista);
    localStorage.setItem("ekom-carrito", JSON.stringify(nuevaLista));
  };

  return (
    <>
    <section className="ekom-lista-section">
      <h2 className="section-title" style={{ marginBottom: 30 }}>Mi Lista de Compras</h2>
      <div className="ekom-lista-grid">
        {productos.length === 0 && (
          <div style={{ color: "var(--colorMuted)", fontSize: "1.12rem", padding: "30px" }}>
            No tienes productos en tu lista.
          </div>
        )}
        {productos.map((prod) => (
          <div className="ekom-lista-card" key={prod.id}>
            <img src={prod.imagen} alt={prod.nombre} className="ekom-lista-card__img" />
            <div className="ekom-lista-card__info">
              <div className="ekom-lista-card__title">{prod.nombre}</div>
              <div style={{ color: "var(--colorMuted)", fontSize: "1rem" }}>
                {prod.marca} | {prod.categoria}
              </div>
              <div style={{ color: "var(--colorPrimary)", fontSize: "0.98rem" }}>
                {atributosToString(prod.atributos)}
              </div>
              {/* SECCIÓN DE CANTIDAD */}
              <div style={{ marginTop: 10, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontWeight: 700,
                  color: "var(--colorAccent)",
                  fontSize: "1.06rem"
                }}>Cantidad:</span>
                <button
                  className="cantidad-btn"
                  onClick={() => cambiarCantidad(prod.id, (prod.cantidad || 1) - 1)}
                  disabled={prod.cantidad <= 1}
                  style={{ marginRight: 5 }}
                >−</button>
                <span style={{ minWidth: 18, textAlign: "center", fontWeight: 600 }}>{prod.cantidad || 1}</span>
                <button
                  className="cantidad-btn"
                  onClick={() => cambiarCantidad(prod.id, (prod.cantidad || 1) + 1)}
                  style={{ marginLeft: 5 }}
                >+</button>
              </div>
              {/* FIN SECCIÓN DE CANTIDAD */}
              <div className="ekom-lista-card__price-list">
                <b>Precios en tiendas:</b>
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {(precios[prod.id] || []).map((p, i) => (
                    <li key={i}>
                      <b>{p.tienda}:</b> ${(Number(p.precio) * (prod.cantidad || 1)).toFixed(2)}
                      {prod.cantidad > 1 && (
                        <span style={{ color: "#888", fontSize: "0.97em", marginLeft: 4 }}>
                          ({prod.cantidad} x ${Number(p.precio).toFixed(2)})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="ekom-lista-card__btn" onClick={() => quitar(prod.id)}>
                Quitar de mi lista
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
    
    </>
  );
}