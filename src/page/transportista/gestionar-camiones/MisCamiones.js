import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import ListCamiones from './ListCamiones';
import BackToComponent from '../../../component/backToComponent';

function MisCamiones() {
    return (
        <div className='container'>
            <div>
                <ListCamiones />
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

export default MisCamiones;
