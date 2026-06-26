import { useNavigate } from 'react-router-dom'
import './TablaVideojuegos.css'

function TablaVideojuegos({ videojuegos, onEliminar }) {
  const navigate = useNavigate();

  function manejarEditar(juego) {
    navigate('/editar', { state: { videojuego: juego } });
  }

  return (
    <div className="videojuegos-container">
      <div className="videojuegos-header">
        <h2>Tienda de Videojuegos</h2>
        <p>Catálogo</p>
      </div>

      <div className="tabla-container">
        <table className="tabla-videojuegos">
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>Plataforma</th>
              <th>Lanzamiento</th>
              <th>Precio</th>
              <th>Disponible</th>
              <th>Progreso</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {videojuegos.map((juego) => (
              <tr key={juego.id}>
                <td>{juego.titulo}</td>
                <td>{juego.genero}</td>
                <td>{juego.plataforma}</td>
                <td>{juego.lanzamiento}</td>
                <td>${juego.precio}</td>
                <td>
                  <span
                    className={`estado ${juego.disponible ? "disponible" : "no-disponible"}`}
                  >
                    {juego.disponible ? "Sí" : "No"}
                  </span>
                </td>
                <td>
                  <div className="progreso-celda">
                    <progress value={juego.progreso * 100} max="100"></progress>
                    <span className="progreso-texto">
                      {Math.round(juego.progreso * 100)}%
                    </span>
                  </div>
                </td>
                <td className="acciones">
                  <button
                    className="btn-editar"
                    onClick={() => manejarEditar(juego)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() => onEliminar(juego.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaVideojuegos;