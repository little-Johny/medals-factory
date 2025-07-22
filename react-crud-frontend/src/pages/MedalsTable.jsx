import React, { useEffect, useState } from "react";

export default function MedalTable() {
  const [medals, setMedals] = useState([]);
  const [countries, setCountries] = useState([]);
  const [newMedal, setNewMedal] = useState({
    type: "",
    event: "",
    year: "",
    country_id: "",
  });

  const fetchMedals = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/medals");
      const result = await response.json();
      setMedals(result.data || []);
    } catch (error) {
      console.error("Error al obtener las medallas:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/countries");
      const result = await response.json();
      setCountries(result || []);
    } catch (error) {
      console.error("Error al obtener los países:", error);
    }
  };

  useEffect(() => {
    fetchMedals();
    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    setNewMedal({
      ...newMedal,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateMedal = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/medals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMedal),
      });
      if (response.ok) {
        await fetchMedals();
        document.getElementById("create_medal_modal").close();
        setNewMedal({ type: "", event: "", year: "", country_id: "" });
      } else {
        console.error("Error al crear la medalla");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tabla de Medallas</h2>
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("create_medal_modal").showModal()
          }
        >
          Crear Medalla
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo</th>
              <th>Evento</th>
              <th>Año</th>
              <th>País</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {medals.map((medal, index) => (
              <tr key={medal.id}>
                <td>{index + 1}</td>
                <td className="capitalize">{medal.type}</td>
                <td>{medal.event}</td>
                <td>{medal.year}</td>
                <td>{medal.country?.name || "Sin país"}</td>
                <td>{medal.country?.code || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear medalla */}
      <dialog id="create_medal_modal" className="modal">
        <div className="modal-box w-full max-w-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            🎖 Registrar nueva medalla
          </h3>

          <div className="space-y-4">
            <div>
              <label className="label font-medium">Tipo</label>
              <select
                name="type"
                value={newMedal.type}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="">Selecciona tipo</option>
                <option value="gold">🥇 Oro</option>
                <option value="silver">🥈 Plata</option>
                <option value="bronze">🥉 Bronce</option>
              </select>
            </div>

            <div>
              <label className="label font-medium">Evento</label>
              <input
                type="text"
                name="event"
                value={newMedal.event}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Nombre del evento"
              />
            </div>

            <div>
              <label className="label font-medium">Año</label>
              <input
                type="number"
                name="year"
                value={newMedal.year}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="2024"
              />
            </div>

            <div>
              <label className="label font-medium">País</label>
              <select
                name="country_id"
                value={newMedal.country_id}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="">Selecciona país</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-action flex justify-end gap-3 mt-6">
            <button
              onClick={handleCreateMedal}
              className="btn btn-success px-6"
            >
              ✅ Crear
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() =>
                document.getElementById("create_medal_modal").close()
              }
            >
              Cancelar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
