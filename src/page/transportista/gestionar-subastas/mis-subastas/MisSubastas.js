import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import BackToComponent from '../../../../component/backToComponent';

function MisSubastas() {
    return (
        <div className='container'>
            <div
                className=' jumbotron mt-5'
                style={{
                    backgroundColor: '#324c3f',
                    height: '200px',
                    paddingTop: '80px',
                }}
            >
                <h1
                    style={{
                        color: 'white',
                    }}
                >
                    Panel de Transportista
                </h1>
            </div>

            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='#'
                        className='list-group-item list-group-item-action'
                    >
                        *FORM DE LAS SUBASTAS EN LAS QUE EL TRANSPORTISTA ESTA
                        PARTICIPANDO*
                    </Link>
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MisSubastas;
