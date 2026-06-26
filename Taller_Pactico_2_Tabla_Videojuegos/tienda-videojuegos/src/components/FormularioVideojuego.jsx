import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FormularioVideojuego.css';

function FormularioVideojuego({ onGuardar }) {

    const location = useLocation();
    const navigate = useNavigate();

    const videojuegoRecuperado = location.state?.videojuego || null;

    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [lanzamiento, setLanzamiento] = useState('');
    const [precio, setPrecio] = useState('');
    const [progreso, setProgreso] = useState('');
    const [disponible, setDisponible] = useState(true);

    useEffect(() => {
        if (videojuegoRecuperado) {
            setTitulo(videojuegoRecuperado.titulo);
            setGenero(videojuegoRecuperado.genero);
            setPlataforma(videojuegoRecuperado.plataforma);
            setLanzamiento(videojuegoRecuperado.lanzamiento);
            setPrecio(videojuegoRecuperado.precio);
            setProgreso(Math.round(videojuegoRecuperado.progreso * 100));
            setDisponible(videojuegoRecuperado.disponible);
        } else {
            setTitulo('');
            setGenero('');
            setPlataforma('');
            setLanzamiento('');
            setPrecio('');
            setProgreso('');
            setDisponible(true);
        }
    }, [videojuegoRecuperado]);

    function manejarGuardar() {
        const videojuego = {
            id: videojuegoRecuperado !== null && videojuegoRecuperado !== undefined ? videojuegoRecuperado.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: Number(lanzamiento),
            precio: Number(precio),
            progreso: Number(progreso) / 100,
            disponible: disponible,
        };

        onGuardar(videojuego);
        navigate('/');
    }

    function manejarCancelar() {
        navigate('/');
    }

    return (
        <div className="formulario-videojuego">

            <div className="campos-grid">
                <div className="campo">
                    <label>Título</label>
                    <input type="text" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>

                <div className="campo">
                    <label>Año de lanzamiento</label>
                    <input type="number" name="lanzamiento" value={lanzamiento} onChange={(e) => setLanzamiento(e.target.value)} />
                </div>

                <div className="campo">
                    <label>Selecciona un género</label>
                    <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                        <option value="">Selecciona</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Acción">Acción</option>
                        <option value="RPG">RPG</option>
                        <option value="Sandbox">Sandbox</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Simulación">Simulación</option>
                        <option value="Metroidvania">Metroidvania</option>
                    </select>
                </div>

                <div className="campo">
                    <label>Selecciona una plataforma</label>
                    <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                        <option value="">Selecciona</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="Multiplataforma">Multiplataforma</option>
                    </select>
                </div>

                <div className="campo">
                    <label>Precio</label>
                    <input type="number" name="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 49.99" min="0" />
                </div>

                <div className="campo">
                    <label>Progreso (%)</label>
                    <input type="number" name="progreso" value={progreso} onChange={(e) => setProgreso(e.target.value)} placeholder="Ej: 75" min="0" max="100" />
                </div>
            </div>

            <div className="form-footer">
                <label className="checkbox-campo">
                    <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
                    Disponible
                </label>

                <div className="botones">
                    <button className="btn-guardar" onClick={manejarGuardar}>Guardar</button>
                    <button className="btn-cancelar" onClick={manejarCancelar}>Cancelar</button>
                </div>
            </div>

        </div>
    );
}

export default FormularioVideojuego;