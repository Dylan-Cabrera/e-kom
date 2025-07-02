import React from "react";
import "./ConfirmAddModal.css";

export default function ConfirmAddModal({ show, producto, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="ekom-modal-overlay">
      <div className="ekom-modal">
        <h3>¿Agregar a tu lista?</h3>
        <p>
          ¿Quieres añadir <b>{producto?.nombre}</b> a tu lista de compras?
        </p>
        <div className="ekom-modal__actions">
          <button className="ekom-modal__cancel" onClick={onCancel}>Cancelar</button>
          <button className="ekom-modal__confirm" onClick={onConfirm}>Sí, agregar</button>
        </div>
      </div>
    </div>
  );
}