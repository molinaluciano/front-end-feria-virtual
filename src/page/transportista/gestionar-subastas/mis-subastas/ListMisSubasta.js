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

function ListMisSubastas() {
    const [form, setForm] = useState([]);

    // const [dataSet, setDataSet] = useState([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadData = async () => {
        // CARGAR DATA SET
        const dataSet = [];
        form.forEach((data, index) => {
            dataSet[index] = [
                index + 1,
                data.idSubasta,
                data.idSolicitud,
                data.idEstadoSubasta,
                data.fechaPublicacion,
                data.fechaTermino,
                data.camionSeleccionado,
                [],
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
        </div>
    );
}

export default ListMisSubastas;
