import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../component/SignOutComponent';
import { useState, useEffect } from 'react';
import { getAllRequests } from '../../service/global-request';
import { getSales } from '../../service/Cliente-Externo/sales-service';
import { getAllBalance } from '../../service/Administrador/balance-services';

function MenuConsultor() {
    const [month, setMonth] = useState([
        {
            numero: 1,
            mes: 'Enero',
        },
        {
            numero: 2,
            mes: 'Febrero',
        },
        {
            numero: 3,
            mes: 'Marzo',
        },
        {
            numero: 4,
            mes: 'Abril',
        },
        {
            numero: 5,
            mes: 'Mayo',
        },
        {
            numero: 6,
            mes: 'Junio',
        },
        {
            numero: 7,
            mes: 'Julio',
        },
        {
            numero: 8,
            mes: 'Agosto',
        },
        {
            numero: 9,
            mes: 'Septiembre',
        },
        {
            numero: 10,
            mes: 'Octubre',
        },
        {
            numero: 11,
            mes: 'Noviembre',
        },
        {
            numero: 12,
            mes: 'Diciembre',
        },
    ]);
    const [form, setHandleForm] = useState(0);

    const [quantyForm, setQuantyForm] = useState({
        quantyRequest: 0,
        quantyBalance: 0,
        quantySales: 0,
        priceNeto: 0,
        priceBruto: 0,
    });

    const displayMonths = month.map((mo) => {
        return <option value={mo.numero}>{mo.mes}</option>;
    });

    const handleInputChange = async (event) => {
        setHandleForm(Number(event.target.value));
        await fetchData();
    };

    const fetchData = async (form) => {
        const allRequest = await getAllRequests();

        const countRequestFilterByMonth = allRequest.filter((req) => {
            if (Number(req.idTipoSolicitud) === 2) {
                return form === new Date(req.fechaPublicacion).getMonth() + 1;
            }
        }).length;

        const countBalanceFilterByMonth = allRequest.filter((req) => {
            if (Number(req.idTipoSolicitud) === 1) {
                return form === new Date(req.fechaPublicacion).getMonth() + 1;
            }
        }).length;

        const allSales = await getSales();

        let neto = 0;
        let bruto = 0;
        const countSalesFilterByMonth = allSales.filter((sal) => {
            if (form === new Date(sal.detalleVenta.fechaFin).getMonth() + 1) {
                neto += Number(sal.detalleVenta.precioNeto);

                bruto += Number(sal.detalleVenta.precioBruto);
            }

            return form === new Date(sal.detalleVenta.fechaFin).getMonth() + 1;
        }).length;

        setQuantyForm({
            quantyRequest: countRequestFilterByMonth,
            quantyBalance: countBalanceFilterByMonth,
            quantySales: countSalesFilterByMonth,
            priceNeto: neto,
            priceBruto: bruto,
        });
    };

    useEffect(() => {
        fetchData(form);
    }, [form]);

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
                    Panel Consultor
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <div className='form-group'>
                        <div className='input-group mb-3 mt-3'>
                            <div className='input-group-append input-group-text'>
                                <label htmlFor='mes'>Mes:</label>
                            </div>

                            <select
                                onChange={handleInputChange}
                                name='mes'
                                id='mes'
                                class='form-control'
                            >
                                <option disabled selected>
                                    Seleccione Mes
                                </option>
                                {displayMonths}
                            </select>
                        </div>

                        <div className='input-group mb-3 mt-3'>
                            <div className='input-group-append input-group-text'>
                                <label htmlFor='priceNeto'>Precio Neto:</label>
                            </div>

                            <input
                                id='priceNeto'
                                type='priceNeto'
                                className='form-control'
                                name='priceNeto'
                                disabled={true}
                                value={quantyForm.priceNeto.toString()}
                            />
                        </div>

                        <div className='input-group mb-3 mt-3'>
                            <div className='input-group-append input-group-text'>
                                <label htmlFor='priceBruto'>
                                    Precio Bruto:
                                </label>
                            </div>

                            <input
                                id='priceBruto'
                                type='priceBruto'
                                className='form-control'
                                name='priceBruto'
                                disabled={true}
                                value={quantyForm.priceBruto.toString()}
                            />
                        </div>
                        <div className='input-group mb-3 mt-3'>
                            <div className='input-group-append input-group-text'>
                                <label htmlFor='quantyBalance'>
                                    Cantidad de Saldos:
                                </label>
                            </div>

                            <input
                                id='quantyBalance'
                                type='quantyBalance'
                                className='form-control'
                                name='quantyBalance'
                                disabled={true}
                                value={quantyForm.quantyBalance.toString()}
                            />
                        </div>

                        <div className='input-group mb-3 mt-3'>
                            <div className='input-group-append input-group-text'>
                                <label htmlFor='quantySales'>
                                    Cantidad de Ventas:
                                </label>
                            </div>

                            <input
                                id='quantySales'
                                type='quantySales'
                                className='form-control'
                                name='quantySales'
                                disabled={true}
                                value={quantyForm.quantySales.toString()}
                            />
                        </div>
                        <div className='input-group mb-3 mt-3'>
                            <div className='input-group-append input-group-text'>
                                <label htmlFor='quantyRequest'>
                                    Cantidad de Solicitudes:
                                </label>
                            </div>

                            <input
                                id='quantyRequest'
                                type='quantyRequest'
                                className='form-control'
                                name='quantyRequest'
                                disabled={true}
                                value={quantyForm.quantyRequest.toString()}
                            />
                        </div>
                    </div>

                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuConsultor;
