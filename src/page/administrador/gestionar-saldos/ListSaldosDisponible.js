/* eslint-disable react-hooks/exhaustive-deps */
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import { Link } from 'react-router-dom';

import { getAllBalanceAvailability } from '../../../service/Administrador/balance-services';
import EditarSaldo from './EditarSaldo';

function ListSaldosDisponibles() {
    const [form, setForm] = useState([]);
    // const [dataSet, setDataSet] = useState([])
    const loadData = async () => {
        // CARGAR DATA SET
        const dataSet = [];
        form.forEach((data, index) => {
            dataSet[index] = [
                index + 1,
                data.idSaldo,
                data.kilos,
                data.idFruta,
                data.idCalidad,
                [
                    data.idSaldo + '!!!!',
                    data.kilos + '!!!!',
                    data.disponible + '!!!!',
                    data.idCliente + '!!!!',
                    data.idFruta + '!!!!',
                    data.idCalidad,
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
                        {
                            title: 'Acciones',
                            render: function (data, arr) {
                                return `
              
              <a href="#" class="editarInputs" data-toggle="modal" data-target="#editarSaldo" data="${data}">
    
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

    useEffect(() => {
        const fetchData = async () => {
            let response = [];
            try {
                response = await getAllBalanceAvailability();
            } catch (error) {
                console.log(
                    '🚀 ~ file: ListClientes.js ~ line 14 ~ fetchData ~ error',
                    error
                );
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
                                Gestion de Saldos Disponibles
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
                                <div className='card-header'>
                                    <h5 className='m-0'>
                                        <Link
                                            to='/administrador/gestionar-saldos/nuevo-saldo'
                                            className='list-group-item list-group-item-action'
                                        >
                                            + Nuevo Saldo
                                        </Link>
                                    </h5>
                                </div>

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
            <EditarSaldo/>
        </div>
    );
}

export default ListSaldosDisponibles;
