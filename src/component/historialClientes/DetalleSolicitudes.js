import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../SignOutComponent';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import $ from 'jquery';
import {
    getAllRequest,
    getFruits,
    getQualityTypes,
    getRequestByClientId,
} from '../../service/Cliente-Externo/request-service';
import BackToComponent from '../backToComponent';

function DetalleSolicitudes(props) {
    const { idSolicitud } = useParams();

    const [request, setRequest] = useState([]);
    const [fruit, setFruit] = useState([]);
    const [quality, setQuality] = useState([]);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

    let id = localStorage.getItem('IDUSER');

    const fetchData = async () => {
        const allRequest = await getAllRequest(id);
        const AllDetails = allRequest
            .filter((request) => {
                return request.idSolicitud === Number(idSolicitud);
            })
            .map((request) => request.detallesSolicitud)[0];

        const fruitType = await getFruits();
        const qualityType = await getQualityTypes();

        setFruit(fruitType);
        setQuality(qualityType);
        setRequest(AllDetails);
        await loadData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const loadData = async () => {
        // CARGAR DATA SET
        const dataSet = [];
        request?.forEach((data, index) => {
            const fruitName = fruit.find(
                (fruit) => fruit.idFruta === data.idFruta
            ).nombreFruta;
            const qualityName = quality.find(
                (quality) => quality.idCalidad === data.idCalidad
            ).calidad;

            dataSet[index] = [
                index + 1,
                data.idDetalleSolicitud,
                fruitName,
                qualityName,
                data.kilos,
            ];
        });
        // =============================================
        // =            EJECUTAMOS DATATABLE          =
        // =============================================
        if (dataSet.length !== 0) {
            $(document).ready(function () {
                let tablaPlanes = $('.table').DataTable({
                    retrieve: true,
                    data: dataSet,
                    columnDefs: [
                        {
                            searchable: true,
                            orderable: true,
                            targets: 0,
                        },
                    ],

                    order: [[0, 'desc']],
                    columns: [
                        { title: '#' },
                        { title: 'ID Detalle Solicitud' },
                        { title: 'Fruta' },
                        { title: 'Calidad' },
                        { title: 'Kilos' },
                    ],
                });

                tablaPlanes
                    .on('order.dt search.dt', function () {
                        tablaPlanes
                            .column(0, { search: 'applied', order: 'applied' })
                            .nodes()
                            .each(function (cell, i) {
                                cell.innerHTML = i + 1;
                            });
                    })
                    .draw();
            });
        }
    };

    loadData();
    return (
        <div className='container'>
            <div
                className='content-wrapper mt-5'
                style={{ minHeight: '494px' }}
            >
                <div className='content-header'>
                    <div className='container-fluid'>
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
                                Detalles de Solicitud ID: {idSolicitud}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='card card-primary card-outline'>
                                    <div className='card-body'>
                                        <table
                                            className='table table-striped dt-responsive'
                                            style={{ width: '100%' }}
                                        ></table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BackToComponent />
                <hr />
                <SignOutComponent />
            </div>
        </div>
    );
}

export default DetalleSolicitudes;
