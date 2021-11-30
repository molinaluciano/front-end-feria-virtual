import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import { Link } from 'react-router-dom';

import { getAllBalance } from '../../../service/Administrador/balance-services';
import SignOutComponent from '../../../component/SignOutComponent';
import {
    getFruits,
    getQualityTypes,
} from '../../../service/Cliente-Externo/request-service';

function ListSaldos() {
    const [form, setForm] = useState([]);
    const [fruit, setFruit] = useState([]);
    const [quality, setQuality] = useState([]);

    // const [dataSet, setDataSet] = useState([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadData = async () => {
        // CARGAR DATA SET
        const dataSet = [];
        form.forEach((data, index) => {
            const fruitName = fruit.find(
                (fruit) => fruit.idFruta === data.idFruta
            ).nombreFruta;
            const qualityName = quality.find(
                (quality) => quality.idCalidad === data.idCalidad
            ).calidad;
            dataSet[index] = [
                index + 1,
                data.idSaldo,
                data.kilos,
                fruitName,
                qualityName,
                data.disponible === 0 ? 'No Disponible' : 'Disponible',
                data.idCliente,
                data.precio,
                [
                    data.idSaldo + '!!!!',
                    data.kilos + '!!!!',
                    data.disponible + '!!!!',
                    data.idCliente + '!!!!',
                    data.idFruta + '!!!!',
                    data.idCalidad + '!!!!',
                    data.disponible + '!!!!',
                    data.idCliente,
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
                        { title: 'Id Saldo' },
                        { title: 'Kilos' },
                        { title: 'Fruta' },
                        { title: 'Calidad' },
                        { title: 'Disponible' },
                        { title: 'ID Cliente' },
                        { title: 'Precio' },
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
            let response = [];
            try {
                response = await getAllBalance();
                const fruitType = await getFruits();
                const qualityType = await getQualityTypes();

                setFruit(fruitType);
                setQuality(qualityType);
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
            <div className='content-header'>
                <div className='container-fluid'>
                    <div className='row mb-2'>
                        <div className='col-md-12'>
                            <h1 className='m-0 text-dark'>
                                Historial de Saldos
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

                                <ul className='list-group mb-5'>
                                    <li className='list-group-item'>
                                        <Link
                                            to='/administrador/gestionar-saldos'
                                            className='list-group-item list-group-item-action'
                                        >
                                            Ir hacia atrás
                                        </Link>
                                        <hr />
                                        <SignOutComponent />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListSaldos;
