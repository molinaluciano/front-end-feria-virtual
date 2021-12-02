/* eslint-disable react-hooks/exhaustive-deps */
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import { useHistory } from 'react-router-dom';

import { getAllBalanceAvailability } from '../../../service/Administrador/balance-services';
import ConfirmarCompra from './ConfirmarCompra';
import SignOutComponent from '../../../component/SignOutComponent';
import { Button } from 'reactstrap';
import {
    getFruits,
    getQualityTypes,
} from '../../../service/Cliente-Externo/request-service';
import BackToComponent from '../../../component/backToComponent';

function ComprarSaldosDisponibles() {
    const [form, setForm] = useState([]);
    const [fruit, setFruit] = useState([]);
    const [quality, setQuality] = useState([]);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

    // const [dataSet, setDataSet] = useState([])
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
                data.precio,
                [
                    data.idSaldo + '!!!!',
                    data.kilos + '!!!!',
                    data.disponible + '!!!!',
                    data.idCliente + '!!!!',
                    fruitName + '!!!!',
                    qualityName + '!!!!',
                    data.precio,
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
                        { title: 'Precio' },
                        {
                            title: 'Comprar',
                            render: function (data, arr) {
                                return `
              
              <a href="#" class="comprarSaldo" data-toggle="modal" data-target="#comprarSaldo" data="${data}">
    
                
                <svg  style="border-radius:100%; width:35px; line-height:35px; text-align:center; padding:8px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" class="svg-inline--fa fa-shopping-cart fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>
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
                const fruitType = await getFruits();
                const qualityType = await getQualityTypes();

                setFruit(fruitType);
                setQuality(qualityType);
            } catch (error) {
                console.log(
                    '🚀 ~ file: ListSaldosDisponible.js ~ line 101 ~ fetchData ~ error',
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
        <div className='container'>
            <div
                className='content-wrapper mt-5'
                style={{ minHeight: '494px' }}
            >
                <div className='content-header'>
                    <div className='container'>
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
                                    Saldos disponibles
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

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
            <ConfirmarCompra />
        </div>
    );
}

export default ComprarSaldosDisponibles;
