import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link } from 'react-router-dom';

function MenuClienteLocal() {
    return (
        <div className='container'>
            <header className='App-header'>
                <h1>Panel de Cliente Local</h1>
            </header>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='/cliente/historial'
                        className='list-group-item list-group-item-action'
                    >
                        Historial
                    </Link>
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuClienteLocal;
