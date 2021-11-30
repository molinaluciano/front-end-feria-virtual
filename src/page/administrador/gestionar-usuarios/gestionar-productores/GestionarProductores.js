import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../../component/SignOutComponent';
import ListProductores from './ListProductores';
import BackToComponent from '../../../../component/backToComponent';

function GestionarProductores() {
    return (
        <div className='container'>
            <div>
                <ListProductores />
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

export default GestionarProductores;
