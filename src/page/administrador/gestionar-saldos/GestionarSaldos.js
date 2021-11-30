import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import ListSaldosDisponible from './ListSaldosDisponible';
import BackToComponent from '../../../component/backToComponent';

function GestionarSaldos() {
    return (
        <div className='container'>
            <div>
                <ListSaldosDisponible />
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='/administrador/gestionar-saldos/historial'
                        className='list-group-item list-group-item-action'
                    >
                        Historial de Saldos
                    </Link>
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default GestionarSaldos;
