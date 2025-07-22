import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AppLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-md p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">Medal Factory</h1>
          <nav className="flex flex-col gap-2">
            <Link to="/country-dashboard" className="btn btn-ghost justify-start">
              Países
            </Link>
            <Link to="/medals" className="btn btn-ghost justify-start">
              Medallas
            </Link>
          </nav>
        </div>

        {/* Botón tipo logout */}
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline btn-error mt-6"
        >
          Volver al inicio
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
