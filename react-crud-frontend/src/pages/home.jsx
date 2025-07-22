import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/4a/90/24/4a9024e40184e2d79b7e2dbad943d1c6.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-xl">
          <h1 className="mb-5 text-5xl font-bold">Sistema de Medallería</h1>
          <p className="mb-5 text-lg">
            Administra los países participantes y asigna medallas a los eventos destacados.
            Visualiza fácilmente el historial de medallas por país y gestiona el tablero de naciones.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/country-dashboard")}
          >
            Ir al panel de países
          </button>
        </div>
      </div>
    </div>
  );
}
