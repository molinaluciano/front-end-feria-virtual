import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import { getAllAuctions } from '../../../../service/Transportista/auctions-service';
import { getTrucksByCarrierId } from '../../../../service/Transportista/trucks-service';
import BackToComponent from '../../../../component/backToComponent';
import SignOutComponent from '../../../../component/SignOutComponent';
import DetalleSubasta from './DetalleSubasta';

function ListMisSubastas() {
    const [form, setForm] = useState([]);

    // const [dataSet, setDataSet] = useState([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadData = async () => {
        // CARGAR DATA SET
        const dataSet = [];
        form?.forEach((data, index) => {
            const routes = data.rutas[0]?.detallesRuta;

            dataSet[index] = [
                index + 1,
                data.idSubasta,
                data.idSolicitud,
                data.idEstadoSubasta,
                data.fechaPublicacion,
                data.fechaTermino,
                data.camionSeleccionado,
                [
                    routes[0].direccionPartida + '!!!!',
                    routes[0].direccionDestino + '!!!!',
                    routes[0].fechaRetiro + '!!!!',
                    routes[1].direccionPartida + '!!!!',
                    routes[1].direccionDestino + '!!!!',
                    routes[1].fechaRetiro,
                ],
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
                        { title: 'ID Subasta' },
                        { title: 'ID Solicitud' },
                        { title: 'Estado Subasta ' },
                        { title: 'Fecha Publicacion' },
                        { title: 'Fecha Termino' },
                        { title: 'ID Camion Seleccionado' },
                        {
                            title: 'Acciones',
                            render: function (data, arr) {
                                return ` 
                            <a href="#" class="detalleSubasta" data-toggle="modal" data-target="#detalleSubasta" data="${data}">
    
                              <svg aria-hidden="true"  style="color:black; background:none; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:3px" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                    
                              </a>`;
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

    useEffect(() => {
        const fetchData = async () => {
            const idCarrier = localStorage.getItem('IDUSER');
            let response = [];
            try {
                const auctions = await getAllAuctions();
                const myTruck = await getTrucksByCarrierId(idCarrier);

                myTruck.forEach((truck) => {
                    const auctionFilter = auctions.filter((auction) => {
                        return (
                            Number(auction.camionSeleccionado) ===
                            Number(truck.idCamion)
                        );
                    });

                    response.push(...auctionFilter);
                });
            } catch (error) {
                throw new Error(error);
            }

            setForm(response);
            await loadData();
        };
        fetchData();
    }, []);

    loadData();

    return (
        <div className='content-wrapper mt-5' style={{ minHeight: '494px' }}>
            <div className='content'>
                <div className='container'>
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
            <DetalleSubasta />
        </div>
    );
}

export default ListMisSubastas;
