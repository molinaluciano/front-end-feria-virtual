import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import ListTransportistas from './ListTransportistas';
import BackToComponent from '../../../../component/backToComponent';

function GestionarTransportistas() {
    return (
        <div className='container'>
            <div>
                <ListTransportistas />
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

export default GestionarTransportistas;
