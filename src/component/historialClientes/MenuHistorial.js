import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../SignOutComponent';
import { Link, useHistory } from 'react-router-dom';
import { getRequestByClientId } from '../../service/Cliente-Externo/request-service';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

function MenuHistorial() {
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };
    let id = localStorage.getItem('IDUSER');
    const [form, setForm] = useState([]);
    const [request, setRequest] = useState([]);
    const [sale, setSale] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        const allRequest = await getRequestByClientId(id);
        const allSales = allRequest.map((request) => request.venta);
        setSale(allSales);
        setRequest(allRequest);
    };

    useEffect(() => {
        fetchData();
    }, []);

    /*     useEffect(() => {
        console.log(
            '🚀 ~ file: MenuHistorial.js ~ line 21 ~ fetchData ~ request',
            request
        );
    }, [request]); */

    return (
        <div className='container'>
            <header className='App-header'>
                <h1>Historial de compras y solicitudes</h1>
            </header>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        /*                         to='/cliente/historial/solicitudes'
                         */
                        to={{
                            pathname: '/cliente/historial/solicitudes',
                            query: {
                                request,
                            },
                        }}
                        className='list-group-item list-group-item-action'
                        /*                         params={request}
                         */
                    >
                        Mis Solicitudes
                    </Link>
                    <Link
                        to='/cliente/historial/ventas'
                        className='list-group-item list-group-item-action'
                    >
                        Mis Compras
                    </Link>
                    <hr />
                    <Button onClick={goToPreviousPath}>Volver atras</Button>
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuHistorial;
