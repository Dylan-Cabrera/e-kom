import { useNavigate, useLocation } from "react-router-dom";
import "./EkomNavbar.css";

export default function Navbar({ carritoCount = 0, onCartClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Para marcar activa la página actual
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="ekom-navbar">
      <div
        className="ekom-navbar__logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
        aria-label="Ir a inicio"
      >
        E<span>•</span>kom
      </div>
      <div className="ekom-navbar__links">
        <button
          className={`ekom-navbar__link-btn${isActive("/") ? " active" : ""}`}
          onClick={() => navigate("/")}
        >
          Inicio
        </button>
        <button
          className={`ekom-navbar__link-btn${isActive("/productos") ? " active" : ""}`}
          onClick={() => navigate("/productos")}
        >
          Productos
        </button>
        <button
          className={`ekom-navbar__link-btn${isActive("/lista") ? " active" : ""}`}
          onClick={() => navigate("/lista")}
        >
          Mi lista
        </button>
        {/* Botón de carrito SIEMPRE visible */}
        <button
          className="ekom-navbar__cart-btn"
          onClick={onCartClick}
          aria-label="Abrir carrito"
        >
          🛒
          {carritoCount > 0 && (
            <span className="ekom-navbar__cart-badge">{carritoCount}</span>
          )}
        </button>
        <button
          className="cta-btn"
          style={{ marginLeft: 7, fontSize: "1rem", padding: "7px 19px" }}
          onClick={() => navigate("/registro")}
        >
          Regístrate
        </button>
      </div>
    </nav>
  );
}