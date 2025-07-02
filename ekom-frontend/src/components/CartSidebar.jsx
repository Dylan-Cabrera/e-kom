import { useEffect, useState } from "react";
import "./CartSidebar.css";
import ekomApi from "../api/ekomApi";

export default function CartSidebar({ show, onClose, productos = [], onRemove, onChangeCantidad }) {
  const [precios, setPrecios] = useState({});
  const [totales, setTotales] = useState({});

  useEffect(() => {
    let mounted = true;
    async function fetchPrecios() {
      let preciosTemp = {};
      for (const prod of productos) {
        try {
          const res = await ekomApi.get(`/products/${prod.id}/prices`);
          preciosTemp[prod.id] = res.data;
        } catch {
          preciosTemp[prod.id] = [];
        }
      }
      if (mounted) {
        setPrecios(preciosTemp);
        console.log("Precios cargados", preciosTemp);
      }
    }
    fetchPrecios();
    return () => (mounted = false);
  }, [productos]);

  useEffect(() => {
    const totalPorTienda = {};
    productos.forEach((prod) => {
      (precios[prod.id] || []).forEach((p) => {
        totalPorTienda[p.tienda] = (totalPorTienda[p.tienda] || 0) + Number(p.precio) * (prod.cantidad || 1);
      });
    });
    setTotales(totalPorTienda);
  }, [precios, productos]);

  if (!show) return null;

  return (
    <div className="ekom-sidebar-overlay" onClick={onClose}>
      <aside className="ekom-cart-sidebar" onClick={e => e.stopPropagation()}>
        <div className="ekom-cart-sidebar__header">
          <h3>Mi lista ({productos.reduce((acc, p) => acc + (p.cantidad || 1), 0)})</h3>
          <button onClick={onClose} className="close-btn" aria-label="Cerrar">×</button>
        </div>
        <div className="ekom-cart-sidebar__list">
          {productos.length === 0 && <div className="ekom-cart-sidebar__empty">Tu lista está vacía.</div>}
          {productos.map(prod => (
            <div className="ekom-cart-sidebar__item" key={prod.id}>
              <img src={prod.imagen} alt={prod.nombre} />
              <div style={{ flex: 1 }}>
                <div className="item-title">{prod.nombre}</div>
                <div className="item-marca">{prod.marca} | {prod.categoria}</div>
                <div className="item-cantidad">
                  <button
                    className="cantidad-btn"
                    onClick={() => onChangeCantidad(prod.id, Math.max(1, (prod.cantidad || 1) - 1))}
                    disabled={prod.cantidad <= 1}
                  >−</button>
                  <span>{prod.cantidad || 1}</span>
                  <button
                    className="cantidad-btn"
                    onClick={() => onChangeCantidad(prod.id, (prod.cantidad || 1) + 1)}
                  >+</button>
                </div>
                <button onClick={() => onRemove(prod.id)} className="remove-btn">Quitar</button>
              </div>
            </div>
          ))}
        </div>
        <div className="ekom-cart-sidebar__footer">
          <h4>Totales por negocio</h4>
          {Object.keys(totales).length === 0 && <div style={{color:"#888"}}>No hay precios</div>}
          <ul>
            {Object.entries(totales).map(([tienda, total]) => (
              <li key={tienda}><b>{tienda}:</b> ${total.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}