import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../../component/SignOutComponent';
import { useEffect, useState } from 'react';
import $ from 'jquery';

import BackToComponent from '../../../../component/backToComponent';
import EditarEstadoVenta from './EditarEstadoVenta';
import {
    getPayTypes,
    getStatusSales,
} from '../../../../service/status_and_types/status_and_types';
import { getSales } from '../../../../service/Cliente-Externo/sales-service';
import DetalleVenta from './detalleVenta';
function ControlarVentas(props) {
    const [sales, setSales] = useState([]);
    const [payType, setPayType] = useState([]);
    const [statusSale, setStatusSale] = useState([]);

    let id = localStorage.getItem('IDUSER');

    const fetchData = async () => {
        const allPayType = await getPayTypes();
        const allStatusSale = await getStatusSales();
        const allSales = await getSales();

        setPayType(allPayType);
        setStatusSale(allStatusSale);
        setSales(allSales);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const loadData = async () => {
        // CARGAR DATA SET
        const dataSet = [];

        sales.forEach((data, index) => {
            if (data != null) {
                // const { detalleVenta } = data;

                let detailSale = data.detalleVenta;
                if (detailSale === undefined) {
                    detailSale = {
                        idDetalleVenta: '',
                        idVenta: '',
                        precioBruto: '',
                        precioNeto: '',
                        fechaFin: '',
                        fechaInicio: '',
                    };
                }
                const typePay = payType.find(
                    (type) => type.idTipoPago === data.idTipoPago
                ).tipoPago;

                const saleStatus = statusSale.find(
                    (status) => status.idEstadoVenta === data.idEstadoVenta
                ).estado;

                dataSet[index] = [
                    index + 1,
                    data.idVenta,
                    data.idSolicitud,
                    typePay,
                    saleStatus,
                    [
                        detailSale.idDetalleVenta + '!!!!',
                        detailSale.idVenta + '!!!!',
                        detailSale.precioBruto + '!!!!',
                        detailSale.precioNeto + '!!!!',
                        detailSale.fechaFin + '!!!!',
                        detailSale.fechaInicio,
                    ],
                ];
            }
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
                        { title: 'ID Venta' },
                        { title: 'ID Solicitud' },
                        { title: 'Tipo Pago' },
                        { title: 'ID Estado Venta' },
                        {
                            title: 'Acciones',
                            render: function (data, arr) {
                                return ` 
                            <a href="#" class="detallesVenta" data-toggle="modal" data-target="#detallesVenta" data="${data}">
    
                              <svg aria-hidden="true"  style="color:black; background:none; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:3px" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                    
                              </a>
                              
                              <a href="#" class="editarInputs" data-toggle="modal" data-target="#editarEstadoSolicitud" data="${data}">
    
                                <svg style="color:black; background:orange; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:8px"
                    
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
                    
                    
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
                                    Control de Ventas
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
            <DetalleVenta />
            <EditarEstadoVenta />
        </div>
    );
}

export default ControlarVentas;
