import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <span>GameVault</span>
            <div>
                <Link to="/">Catálogo</Link>
                <Link to="/nuevo">Nuevo Juego</Link>
            </div>
        </nav>
    )
}

export default Navbar;