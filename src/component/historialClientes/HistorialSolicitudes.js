import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../SignOutComponent';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import $ from 'jquery';
import { getRequestByClientId } from '../../service/Cliente-Externo/request-service';
import {
    getStatusRequest,
    getTypeRequest,
} from '../../service/status_and_types/status_and_types';
import BackToComponent from '../backToComponent';

function HistorialSolicitudes(props) {
    const [request, setRequest] = useState([]);
    const [types, setTypes] = useState([]);
    const [status, setStatus] = useState([]);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

    let id = localStorage.getItem('IDUSER');

    const fetchData = async () => {
        const allRequest = await getRequestByClientId(id);
        const typeRequest = await getTypeRequest();
        const statusRequest = await getStatusRequest();

        setStatus(statusRequest);
        setTypes(typeRequest);
        setRequest(allRequest);
        await loadData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const loadData = async () => {
        // CARGAR DATA SET
        const dataSet = [];
        request?.forEach((data, index) => {
            const typeRequest = types.find(
                (type) => type.idTipoSolicitud === data.idTipoSolicitud
            ).descripcion;

            const statusRequest = status.find(
                (statu) => statu.idEstadoSolicitud === data.idEstadoSolicitud
            ).descripcion;

            dataSet[index] = [
                index + 1,
                data.idSolicitud,
                typeRequest,
                statusRequest,
                data.fechaPublicacion,
                [data.idSolicitud],
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
                        { title: 'ID Solicitud' },
                        { title: 'Tipo Solicitud' },
                        { title: 'Estado Solicitud' },
                        { title: 'Fecha Publicacion' },
                        {
                            title: 'Acciones',
                            render: function (data, arr) {
                                return `
                           
                              <a href="/cliente/historial/solicitudes/${data}" data="${data}">
    
                              <svg aria-hidden="true"  style="color:black; background:none; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:3px" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                    
                              </a>
                             `;
                            },
                        },
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
                        <div className='row mb-2'>
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
                                    Historial de Solicitudes
                                </h1>
                            </div>
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

export default HistorialSolicitudes;
