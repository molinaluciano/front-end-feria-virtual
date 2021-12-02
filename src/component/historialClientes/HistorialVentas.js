import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../SignOutComponent';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import $ from 'jquery';
import { getRequestByClientId } from '../../service/Cliente-Externo/request-service';
import { finishSale } from '../../service/Cliente-Externo/sales-service';
import DetalleVenta from './detalleVenta';
import {
    getPayTypes,
    getStatusSales,
} from '../../service/status_and_types/status_and_types';
import BackToComponent from '../backToComponent';

function HistorialVentas(props) {
    const [sales, setSales] = useState([]);
    const [payType, setPayType] = useState([]);
    const [statusSale, setStatusSale] = useState([]);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

    let id = localStorage.getItem('IDUSER');

    const fetchData = async () => {
        const allPayType = await getPayTypes();
        const allStatusSale = await getStatusSales();

        const allRequest = await getRequestByClientId(id);
        const allSales = allRequest.map((request) => request.venta);

        setPayType(allPayType);
        setStatusSale(allStatusSale);
        setSales(allSales);
        if (allSales) {
            //await loadData();
        }
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
                        saleStatus,
                        data.idVenta,
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
                                let form = {
                                    idventa: data[7],
                                    responseCode: 0
                                }
                                if(data[6] === "ENTREGADA"){
                                    return ` 
                                    <a href="#" class="detallesVenta" data-toggle="modal" data-target="#detallesVenta" data="${data}">
            
                                    <svg aria-hidden="true"  style="color:black; background:none; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:3px" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                            
                                    </a>
                                    <button class="pagar" onClick={() => finishSale(${form})}>
            
                                    <svg xmlns="http://www.w3.org/2000/svg" style="color:black; background:none; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:3px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" class="svg-inline--fa fa-shopping-cart fa-w-18" role="img" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg>
                            
                                    </button>`;
                                }else{

                                    return ` 
                                    <a href="#" class="detallesVenta" data-toggle="modal" data-target="#detallesVenta" data="${data}">
            
                                    <svg aria-hidden="true"  style="color:black; background:none; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:3px" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                            
                                    </a>`;
                                }
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
                                    Historial de Ventas
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
        </div>
    );
}

export default HistorialVentas;
