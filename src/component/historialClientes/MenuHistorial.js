import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../SignOutComponent';
import { Link, useHistory } from 'react-router-dom';
import { getRequestByClientId } from '../../service/Cliente-Externo/request-service';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import BackToComponent from './../backToComponent';
function MenuHistorial() {
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

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
                    Historial de compras y solicitudes
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to={{
                            pathname: '/cliente/historial/solicitudes',
                        }}
                        className='list-group-item list-group-item-action'
                    >
                        Mis Solicitudes
                    </Link>
                    <Link
                        to='/cliente/historial/ventas'
                        className='list-group-item list-group-item-action'
                    >
                        Mis Compras
                    </Link>
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuHistorial;
