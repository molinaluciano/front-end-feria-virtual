import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link, useHistory } from 'react-router-dom';
import { getRequestByStatusId } from '../../../service/Productor/request-service';
import { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import {
    getQualityTypeById,
    getUserById,
    getFruitById,
} from '../../../service/Productor/request-service';
import BackToComponent from './../../../component/backToComponent';
import { Button } from 'reactstrap';

function SolicitudesDisponibles() {
    const [requests, setRequests] = useState([]);
    const history = useHistory();
    const fetchData = async () => {
        const response = await getRequestByStatusId(3);
        console.log('response', response);

        const requestsInfo = response.map((x) => {
            return {
                idUsuario: x.idUsuario,
                idFruta: x.detallesSolicitud[0].idFruta,
                idCalidad: x.detallesSolicitud[0].idCalidad,
                idSolicitud: x.idSolicitud,
            };
        });

        const requestDetails = [];

        const details = async (x) => {
            const userInformation = await getUserById(x.idUsuario);
            const fruitResponse = await getFruitById(x.idFruta);
            const qualityResponse = await getQualityTypeById(x.idCalidad);

            let req = {
                customerName: `${userInformation.nombre} ${userInformation.apellidoPaterno} ${userInformation.apellidoMaterno}`,
                fruitName: fruitResponse.nombreFruta,
                quality: qualityResponse.calidad,
                idSolicitud: x.idSolicitud,
            };

            return req;
        };

        for (const request of requestsInfo) {
            requestDetails.push(details(request));
        }

        Promise.all(requestDetails).then((values) => {
            setRequests(values);
        });
    };

    console.log(requests);
    const displayRequests = requests.map((request) => {
        return (
            <div class='col-sm-4'>
                <div class='card'>
                    <div class='card-body'>
                        <h5 class='card-title'>{request.fruitName}</h5>
                        <Skeleton
                            className='img-fluid'
                            variant='rectangular'
                            height={118}
                        />
                        <p class='card-text'>Cliente: {request.customerName}</p>
                        <p class='card-text'>
                            Calidad Fruta: {request.quality}
                        </p>
                        <a
                            href={`/productor/participar-solicitudes/detalle-solicitud/${request.idSolicitud}`}
                            class='btn btn-primary'
                        >
                            Participar
                        </a>
                    </div>
                </div>
            </div>
        );
    });

    useEffect(() => {
        fetchData();
    }, []);

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
                    Solicitudes Disponibles
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <div class='row'>{displayRequests}</div>
                    <Button
                        className='mt-3'
                        style={{ backgroundColor: '#33334b' }}
                        onClick={() => {
                            history.push('/productor');
                        }}
                    >
                        Volver atr??s
                    </Button>

                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default SolicitudesDisponibles;
