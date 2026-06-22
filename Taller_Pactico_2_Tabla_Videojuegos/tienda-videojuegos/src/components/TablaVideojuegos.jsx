import "./TablaVideojuegos.css";

function TablaVideojuegos({ videojuegos }) {
  return (
    <div className="tabla-container">
      <h1>Tienda de Video Juegos</h1>
      <h2>Explora mundos infinitos, conquista cada nivel</h2>
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
              <td>{juego.disponible ? "Sí" : "No"}</td>

              <td>
                <progress
                  value={juego.progreso * 100}
                  max="100"
                ></progress>
                {" "}
                {Math.round(juego.progreso * 100)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVideojuegos;