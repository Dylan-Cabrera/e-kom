import { useEffect } from "react";
import "../styles/Home.css"
import Navbar from '../components/Navbar';

export default function Home() {
  useEffect(() => {
    // Carrusel de testimonios
    const dots = document.querySelectorAll(".dot");
    const testimonialCards = [
      {
        quote: "Gracias a E-kom ahorro 20% en mi mercado mensual",
        author: "María, 32 años",
        role: "Madre de familia",
        initial: "M",
      },
      {
        quote: "Perfecto para seguir mi dieta sin gluten",
        author: "Carlos, 45 años",
        role: "Persona con celiaquía",
        initial: "C",
      },
      {
        quote: "Ahora puedo planear mis compras con mi presupuesto limitado",
        author: "Luisa, 28 años",
        role: "Estudiante universitaria",
        initial: "L",
      },
    ];
    if (dots.length) {
      dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
          dots.forEach((d) => d.classList.remove("active"));
          this.classList.add("active");
          const testimonial = testimonialCards[index];
          document.querySelector(".testimonial-quote").textContent = `"${testimonial.quote}"`;
          document.querySelector(".author-avatar").textContent = testimonial.initial;
          document.querySelector(".author-info h4").textContent = testimonial.author;
          document.querySelector(".author-info p").textContent = testimonial.role;
        });
      });
    }
  }, []);

  const productos = [
    {
      titulo: "Fideos Favorita",
      descripcion: "",
      imagen: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=500&q=60",
      color: "var(--colorAccent)",
    },
    {
      titulo: "Pure de tomates Molto",
      descripcion: "",
      imagen: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=500&q=60",
      color: "var(--colorWarning)",
    },
    {
      titulo: "Aceite de girasol Los Molinos",
      descripcion: "",
      imagen: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=500&q=60",
      color: "var(--colorPrimary)",
    },
  ];

  return (
    <>

      {/* Hero Section */}
      <header className="ekom-hero">
        <div className="ekom-hero__content">
          <h1>
            <span>Organiza tus compras</span>
            <br />
            <span>con inteligencia colectiva</span>
          </h1>
          <p>
            La nueva forma de ahorrar, elegir y compartir experiencias de supermercado. 
            ¡Nunca más pagues de más!
          </p>
          <div className="ekom-hero__actions">
            <a href="#cta" className="cta-btn cta-btn--main">Comienza gratis</a>
            <a href="#demo" className="cta-btn cta-btn--ghost">Ver demo</a>
          </div>
        </div>
        <div className="ekom-hero__imgwrap">
          <img
            src="e-kom.png"
            className=""
            alt="Hero"
            height={300}
          />
          <div className="ekom-hero__blob" />
        </div>
      </header>

              {/* NUEVA SECCIÓN: Explora productos */}
      <section className="ekom-products-section" style={{ marginTop: 80 }}>
        <div style={{textAlign: "center"}}>
          <h2 className="section-title" style={{marginBottom: 18}}>Explora los productos</h2>
          <p style={{ color: "var(--colorMuted)", fontSize: "1.15rem", marginBottom: 32 }}>Busca y compara tus productos favoritos, agregalos a tu lista y descubrí precios inteligentes.</p>
          <a
            className="cta-btn cta-btn--main"
            style={{ fontSize: "1.12rem", padding: "14px 40px", marginBottom: 30 }}
            onClick={() => navigate("/productos")}
          >
            Ir a productos →
          </a>
        </div>
      </section>

      {/* Ofertas Destacadas */}
      <section id="ofertas" className="ekom-ofertas">
        <h2 className="section-title">Ofertas destacadas</h2>
        <div className="ekom-ofertas__grid">
          {productos.map((prod, i) => (
            <div className="ekom-oferta-card" key={i}>
              <div
                className="ekom-oferta-card__img"
                style={{ backgroundImage: `url(${prod.imagen})` }}
              />
              <div className="ekom-oferta-card__info">
                <h4>{prod.titulo}</h4>
                <button style={{ background: prod.color }}>Ver oferta</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="ekom-features">
        <h2 className="section-title">¿Por qué E-kom?</h2>
        <div className="ekom-features__grid">
          <div className="ekom-feature">
            <span className="ekom-feature__icon">🤖</span>
            <h3>Comparación Automatizada</h3>
            <p>Ve los mejores precios según tu lista y ubicación al instante.</p>
          </div>
          <div className="ekom-feature">
            <span className="ekom-feature__icon">👩‍👩‍👦‍👦</span>
            <h3>Comunidad Real</h3>
            <p>Descubre qué compran y recomiendan otras personas como vos.</p>
          </div>
          <div className="ekom-feature">
            <span className="ekom-feature__icon">🌱</span>
            <h3>Más que Precios</h3>
            <p>Filtra por saludable, eco, sin TACC, y personaliza tu experiencia.</p>
          </div>
        </div>
      </section>

      {/* Video Demo Moderno */}
      <section id="demo" className="ekom-demo">
        <div className="ekom-demo__content">
          <h2>Descubre E-kom en acción</h2>
          <div className="ekom-demo__video">
            <div className="ekom-demo__video-placeholder">
              {/* Aquí puedes insertar un iframe de YouTube o video real */}
              <span>🎬</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="ekom-testimonios">
        <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
        <div className="ekom-testimonio-card">
          <p className="testimonial-quote">
            "Gracias a E-kom ahorro 20% en mi mercado mensual"
          </p>
          <div className="testimonial-author">
            <div className="author-avatar">M</div>
            <div className="author-info">
              <h4>María, 32 años</h4>
              <p>Madre de familia</p>
            </div>
          </div>
          <div className="testimonial-dots">
            <div className="dot active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="ekom-cta">
        <div className="ekom-cta__content">
          <h2>¿Listo para unirte a la revolución del supermercado?</h2>
          <p>Registrate gratis y empieza a ahorrar y compartir inteligencia colectiva hoy mismo.</p>
          <form className="ekom-cta__form">
            <input type="email" placeholder="Tu correo electrónico" />
            <button type="submit">Enviar invitación</button>
          </form>
        </div>
      </section>

      {/* Footer Moderno */}
      <footer className="ekom-footer">
        <div>
          <h3>
            E<span>•</span>kom
          </h3>
          <p>Compras inteligentes para todos © 2025</p>
        </div>
        <div className="ekom-footer__links">
          <a href="#">Funciones</a>
          <a href="#">Comunidad</a>
          <a href="#">Precios</a>
          <a href="#">Legal</a>
        </div>
      </footer>
    </>
  );
}