import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import BackToComponent from './../../../component/backToComponent';
import ListMisSolicitudes from './ListMisSolicitudes';

function MisSolicitudes() {
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
                    Mis Solicitudes
                </h1>
            </div>
            <ListMisSolicitudes />
        </div>
    );
}

export default MisSolicitudes;
