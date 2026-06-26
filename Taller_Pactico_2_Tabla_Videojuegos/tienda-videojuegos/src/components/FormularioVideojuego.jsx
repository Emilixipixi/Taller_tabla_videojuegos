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
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [calificacionCritica, setCalificacionCritica] = useState('');
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (videojuegoRecuperado) {
            setTitulo(videojuegoRecuperado.titulo);
            setGenero(videojuegoRecuperado.genero);
            setPlataforma(videojuegoRecuperado.plataforma);
            setLanzamiento(videojuegoRecuperado.lanzamiento);
            setPrecio(videojuegoRecuperado.precio);
            setProgreso(Math.round(videojuegoRecuperado.progreso * 100));
            setDisponible(videojuegoRecuperado.disponible);
            setFechaLanzamiento(videojuegoRecuperado.fechaLanzamiento || '');
            setSinopsis(videojuegoRecuperado.sinopsis || '');
            setCalificacionCritica(videojuegoRecuperado.calificacionCritica || '');
        } else {
            setTitulo('');
            setGenero('');
            setPlataforma('');
            setLanzamiento('');
            setPrecio('');
            setProgreso('');
            setDisponible(true);
            setFechaLanzamiento('');
            setSinopsis('');
            setCalificacionCritica('');
        }
        setErrores({});
    }, [videojuegoRecuperado]);

    function validarFormulario() {
        const erroresActivos = {};

        if (!titulo.trim()) {
            erroresActivos.titulo = "El título no puede estar vacío";
        }

        if (!fechaLanzamiento) {
            erroresActivos.fechaLanzamiento = "Selecciona una fecha de lanzamiento";
        } else {
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            if (new Date(fechaLanzamiento) > hoy) {
                erroresActivos.fechaLanzamiento = "La fecha no puede ser futura";
            }
        }

        if (!sinopsis.trim() || sinopsis.trim().length < 10) {
            erroresActivos.sinopsis = "La sinopsis debe tener al menos 10 caracteres";
        } else if (sinopsis.length > 250) {
            erroresActivos.sinopsis = "La sinopsis no puede superar los 250 caracteres";
        }

        const calificacionNum = Number(calificacionCritica);
        if (!calificacionCritica || calificacionNum < 1 || calificacionNum > 100) {
            erroresActivos.calificacionCritica = "La calificación debe estar entre 1 y 100";
        }

        if (!precio || Number(precio) < 0) {
            erroresActivos.precio = "Ingresa un precio válido";
        }

        return erroresActivos;
    }

    function manejarSubmit(e) {
        e.preventDefault();

        const erroresActivos = validarFormulario();

        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return;
        }

        setErrores({});

        const videojuego = {
            id: videojuegoRecuperado !== null && videojuegoRecuperado !== undefined ? videojuegoRecuperado.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: Number(lanzamiento),
            precio: Number(precio),
            progreso: Number(progreso) / 100,
            disponible: disponible,
            fechaLanzamiento: fechaLanzamiento,
            sinopsis: sinopsis,
            calificacionCritica: Number(calificacionCritica),
        };

        onGuardar(videojuego);
        navigate('/');
    }

    function manejarCancelar() {
        navigate('/');
    }

    return (
        <form className="formulario-videojuego" onSubmit={manejarSubmit}>

            <div className="campos-grid">
                <div className="campo">
                    <label>Título</label>
                    <input type="text" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
                </div>

                <div className="campo">
                    <label>Año de lanzamiento</label>
                    <input type="number" name="lanzamiento" value={lanzamiento} onChange={(e) => setLanzamiento(e.target.value)} />
                </div>

                <div className="campo">
                    <label>Fecha de lanzamiento</label>
                    <input type="date" name="fechaLanzamiento" value={fechaLanzamiento} onChange={(e) => setFechaLanzamiento(e.target.value)} />
                    {errores.fechaLanzamiento && <span className="error-mensaje">{errores.fechaLanzamiento}</span>}
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
                    {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
                </div>

                <div className="campo">
                    <label>Progreso (%)</label>
                    <input type="number" name="progreso" value={progreso} onChange={(e) => setProgreso(e.target.value)} placeholder="Ej: 75" min="0" max="100" />
                </div>

                <div className="campo">
                    <label>Calificación de la crítica</label>
                    <input type="number" name="calificacionCritica" value={calificacionCritica} onChange={(e) => setCalificacionCritica(e.target.value)} placeholder="Ej: 90" min="1" max="100" />
                    {errores.calificacionCritica && <span className="error-mensaje">{errores.calificacionCritica}</span>}
                </div>
            </div>

            <div className="campo campo-textarea">
                <label>Sinopsis / Descripción</label>
                <textarea
                    value={sinopsis}
                    onChange={(e) => setSinopsis(e.target.value)}
                    placeholder="Escribe una breve reseña del videojuego (10 a 250 caracteres)"
                    maxLength={250}
                />
                <span className="contador-caracteres">{sinopsis.length}/250</span>
                {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
            </div>

            <div className="form-footer">
                <label className="checkbox-campo">
                    <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
                    Disponible
                </label>

                <div className="botones">
                    <button type="submit" className="btn-guardar">Guardar</button>
                    <button type="button" className="btn-cancelar" onClick={manejarCancelar}>Cancelar</button>
                </div>
            </div>

        </form>
    );
}

export default FormularioVideojuego;