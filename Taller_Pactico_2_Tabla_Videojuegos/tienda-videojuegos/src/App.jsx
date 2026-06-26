import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { data } from './data/videojuegos'
import TablaVideojuegos from './components/TablaVideojuegos'
import FormularioVideojuego from './components/FormularioVideojuego'
import Navbar from './components/Navbar'
import PaginaNoEncontrada from './components/PaginaNoEncontrada'
import AlertaNotificacion from './components/AlertaNotificacion'

function App() {
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : data;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);

  function agregarVideojuego(videojuegoNuevo) {
    setVideojuegos([...videojuegos, videojuegoNuevo]);
    setToast("Videojuego agregado correctamente");
  }

  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter(juego => juego.id !== id);
    setVideojuegos(filtrados);
    setToast("Videojuego eliminado correctamente");
  }

  function editarVideojuego(videojuegoEditado) {
    const actualizados = videojuegos.map(juego => {
      if (juego.id === videojuegoEditado.id) {
        return videojuegoEditado;
      } else {
        return juego;
      }
    });
    setVideojuegos(actualizados);
    setToast("Videojuego actualizado correctamente");
  }

  function manejarGuardar(videojuego) {
    const existe = videojuegos.find((juego) => juego.id === videojuego.id);

    if (existe) {
      editarVideojuego(videojuego);
    } else {
      agregarVideojuego(videojuego);
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AlertaNotificacion mensaje={toast} onCerrar={() => setToast(null)} />
      <Routes>
        <Route
          path="/"
          element={
            <TablaVideojuegos videojuegos={videojuegos} onEliminar={eliminarVideojuego} />
          }
        />
        <Route
          path="/nuevo"
          element={
            <FormularioVideojuego onGuardar={manejarGuardar} />
          }
        />
        <Route
          path="/editar"
          element={
            <FormularioVideojuego onGuardar={manejarGuardar} />
          }
        />
        <Route
          path="*"
          element={
            <PaginaNoEncontrada />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App