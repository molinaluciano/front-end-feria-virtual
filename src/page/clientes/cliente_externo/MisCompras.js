import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import { getRequestByClientId } from '../../../service/Cliente-Externo/request-service';
import {
    getFruitById,
    getQualityTypeById,
} from '../../../service/Productor/request-service';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

function MisCompras() {
    let id = localStorage.getItem('IDUSER');
    const [requests, setRequests] = useState([]);

    //
    //
    //    TERMINAR DE TRAER DATOS DE LAS VENTAS X CLIENTE, PRODUCTOR SELECCIONADO, PRECIO FINAL, ETC
    //
    //
    const fetchData = async () => {
        const userRequestResult = await getRequestByClientId(id);
        console.log(
            '🚀 ~ file: MisCompras.js ~ line 19 ~ fetchData ~ userRequestResult',
            userRequestResult
        );

        const userRequestsInfo = userRequestResult.map((x) => {
            return {
                idCalidad: x.detallesSolicitud[0].idCalidad,
                idFruta: x.detallesSolicitud[0].idFruta,
                idSolicitud: x.idSolicitud,
                kilos: x.detallesSolicitud[0].kilos,
            };
        });

        const requestsByClientId = userRequestsInfo.map((x) => x.idSolicitud);

        const userRequestsDetails = [];
        const userSalesDetails = [];

        const requestDetails = async (x) => {
            const fruitResponse = await getFruitById(x.idFruta);
            const qualityResponse = await getQualityTypeById(x.idCalidad);

            let req = {
                fruitName: fruitResponse.nombreFruta,
                quality: qualityResponse.calidad,
                idSolicitud: x.idSolicitud,
                kilos: x.kilos,
            };

            return req;
        };

        const salesDetails = async (x) => {};

        for (const request of userRequestsInfo) {
            userRequestsDetails.push(requestDetails(request));
        }

        Promise.all(userRequestsDetails).then((values) => {
            setRequests(values);
        });
    };

    console.log(requests);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container'>
            <header className='App-header'>
                <h1>Mis Compras</h1>
            </header>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='/cliente_externo/crear-solicitud'
                        className='list-group-item list-group-item-action'
                    >
                        Crear Solicitud
                    </Link>
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

export default MisCompras;
