import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [newCountry, setNewCountry] = useState({ name: "", code: "" });
  const [availableMedals, setAvailableMedals] = useState([]);
  const [selectedMedalId, setSelectedMedalId] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/countries");
      const data = await response.json();
      console.log("🌍 Países cargados:", data);
      setCountries(data);
    } catch (error) {
      console.error("❌ Error al obtener los países:", error);
    }
  };

  const fetchMedalsCountry = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/countries/${id}/medals`
      );
      const data = await response.json();
      console.log(`🥇 Medallas para país ${id}:`, data);
      return data;
    } catch (error) {
      console.error("❌ Error al obtener la info de medallas", error);
      return null;
    }
  };

  // Reemplaza este fragmento en tu función openModal:
  const openModal = async (country) => {
    console.group("🔍 Abriendo modal para país");
    console.log("País seleccionado:", country);
    const fullCountry = await fetchMedalsCountry(country.id);

    try {
      const res = await fetch("http://localhost:8001/api/medals/available");
      const medalData = await res.json();
      console.log("🎖️ Medallas disponibles:", medalData.data);
      setAvailableMedals(medalData.data || []);
    } catch (error) {
      console.error("❌ Error cargando medallas disponibles:", error);
      setAvailableMedals([]);
    }

    if (fullCountry) {
      // ✅ Asegura que se conserven todos los datos originales
      setSelectedCountry({
        ...country, // mantiene id, name, code, etc.
        ...fullCountry, // sobrescribe/añade medals y total
      });

      setSelectedMedalId("");
      document.getElementById("country_modal").showModal();
    }
    console.groupEnd();
  };

  const openCreateModal = () => {
    console.log("➕ Abriendo modal de creación de país");
    setNewCountry({ name: "", code: "" });
    document.getElementById("create_modal").showModal();
  };

  const handleCreateCountry = async (e) => {
    e.preventDefault();
    console.log("🚀 Enviando país nuevo:", newCountry);
    try {
      const response = await fetch("http://localhost:8001/api/countries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCountry),
      });

      if (response.ok) {
        console.log("✅ País creado exitosamente");
        await fetchCountries();
        document.getElementById("create_modal").close();
      } else {
        console.error("❌ Error al crear país:", await response.text());
      }
    } catch (error) {
      console.error("❌ Error al crear país:", error);
    }
  };

  const assignMedalToCountry = async (medalId) => {
    console.log(
      `📤 Asignando medalla ${medalId} al país ${selectedCountry?.id}`
    );
    try {
      const response = await fetch(
        `http://localhost:8001/api/medals/${medalId}/assign-country`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country_id: selectedCountry.id,
          }),
        }
      );

      if (response.ok) {
        console.log("✅ Medalla asignada correctamente");
        await fetchCountries();
        document.getElementById("country_modal").close();
        setSelectedMedalId("");
      } else {
        console.error("❌ No se pudo asignar la medalla");
      }
    } catch (error) {
      console.error("❌ Error asignando medalla:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // 👁️ Seguimiento de cambios
  useEffect(() => {
    console.log("🧭 selectedCountry cambió:", selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    console.log("🎯 selectedMedalId cambió:", selectedMedalId);
  }, [selectedMedalId]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Lista de países</h1>
        <button onClick={openCreateModal} className="btn btn-primary">
          Crear país
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Cantidad de medallas</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.id}>
                <td>{country.id}</td>
                <td>{country.name}</td>
                <td>{country.code}</td>
                <td>{country.medals_count ?? country.medals?.length ?? 0}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => openModal(country)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Detalle país */}
      <dialog id="country_modal" className="modal">
        <div className="modal-box w-full max-w-2xl">
          <h3 className="font-bold text-lg mb-2">{selectedCountry?.name}</h3>
          <p className="text-sm text-gray-500 mb-4">
            Código: {selectedCountry?.code ?? "-"}
          </p>

          <div className="divider">Medallas</div>
          {selectedCountry?.medals && selectedCountry.medals.length > 0 ? (
            <ul className="list-disc pl-6 space-y-1">
              {selectedCountry.medals.map((medal, index) => (
                <li key={index}>
                  {medal.event} -{" "}
                  <span className="badge badge-outline">{medal.type}</span> -{" "}
                  {medal.year}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay medallas registradas.</p>
          )}

          <div className="divider">Asignar Medalla</div>
          {availableMedals.length > 0 ? (
            <div className="flex gap-2 items-center">
              <select
                className="select select-bordered w-full max-w-md"
                value={selectedMedalId}
                onChange={(e) => setSelectedMedalId(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona una medalla
                </option>
                {availableMedals.map((medal) => (
                  <option key={medal.id} value={medal.id}>
                    {medal.event} - {medal.type} - {medal.year}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-sm btn-success"
                onClick={() => {
                  if (selectedMedalId) {
                    assignMedalToCountry(selectedMedalId);
                  }
                }}
              >
                Asignar
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No hay medallas disponibles.
            </p>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Modal: Crear país */}
      <dialog id="create_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Crear nuevo país</h3>
          <form onSubmit={handleCreateCountry} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre del país"
              className="input input-bordered w-full"
              value={newCountry.name}
              onChange={(e) =>
                setNewCountry({ ...newCountry, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Código del país (ej: COL)"
              className="input input-bordered w-full"
              value={newCountry.code}
              onChange={(e) =>
                setNewCountry({ ...newCountry, code: e.target.value })
              }
              required
            />
            <div className="modal-action justify-end">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("create_modal").close()}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
