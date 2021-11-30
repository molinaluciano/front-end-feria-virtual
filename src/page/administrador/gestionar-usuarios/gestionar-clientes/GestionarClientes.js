import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../../component/SignOutComponent';
import ListClientes from './ListClientes';
import BackToComponent from '../../../../component/backToComponent';

function GestionarClientes() {
    return (
        <div className='container'>
            <div>
                <ListClientes />
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default GestionarClientes;
