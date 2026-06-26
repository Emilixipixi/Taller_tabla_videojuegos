import { useEffect } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, onCerrar }) {

    useEffect(() => {
        if (!mensaje) {
            return;
        }

        const temporizador = setTimeout(() => {
            onCerrar();
        }, 3000);

        return () => clearTimeout(temporizador);
    }, [mensaje, onCerrar]);

    if (!mensaje) {
        return null;
    }

    return (
        <div className="toast-exito">
            {mensaje}
        </div>
    );
}

export default AlertaNotificacion;