import 'bootstrap/dist/css/bootstrap.min.css';

import $ from 'jquery';
import swal from 'sweetalert';
import React, { useState, useEffect } from 'react';

const initialValues = {
    idDetalleVenta: '',
    idVenta: '',
    precioBruto: '',
    precioNeto: '',
    fechaInicio: '',
    fechaFin: '',
};
function DetalleVenta() {
    const [formData, setFormData] = useState(initialValues);

    const loadData = () => {
        $(document).on('click', '.detallesVenta', function (e) {
            e.preventDefault();
            let data = $(this).attr('data').split('!!!!,');

            setFormData({
                idDetalleVenta: data[0],
                idVenta: data[1],
                precioBruto: data[2],
                precioNeto: data[3],
                fechaFin: data[4],
                fechaInicio: data[5],
            });
        });
    };

    useEffect(() => {
        loadData();
    });

    return (
        <div className='modal fade' id='detallesVenta'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h4 className='modal-title'>Detalle de Venta</h4>
                    </div>

                    <form encType='multipart/form-data'>
                        <div className='modal-body'>
                            {/* ENTRADA ID VENTA*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='idVenta'>
                                            ID Venta:
                                        </label>
                                    </div>
                                    <input
                                        disabled={true}
                                        defaultValue={formData.idVenta.toString()}
                                        id='idVenta'
                                        type='text'
                                        className='form-control'
                                        name='idVenta'
                                        placeholder='ID Venta'
                                    />
                                </div>
                            </div>
                            <hr />
                            {/* ENTRADA PRECIO BRUTO*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='precioBruto'>
                                            Precio Bruto:
                                        </label>
                                    </div>

                                    <input
                                        disabled={true}
                                        id='precioBruto'
                                        type='text'
                                        className='form-control'
                                        name='precioBruto'
                                        placeholder='Precio Bruto'
                                        defaultValue={formData.precioBruto.toString()}
                                    />
                                </div>
                            </div>

                            {/* ENTRADA PRECIO NETO*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='precioNeto'>
                                            Precio Neto:
                                        </label>
                                    </div>

                                    <input
                                        disabled={true}
                                        id='precioNeto'
                                        type='text'
                                        className='form-control'
                                        name='precioNeto'
                                        placeholder='Precio Neto'
                                        defaultValue={formData.precioNeto.toString()}
                                    />
                                </div>
                            </div>
                            <hr />

                            {/* ENTRADA FECHA INICIO*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='fechaInicio'>
                                            Fecha Inicio:
                                        </label>
                                    </div>

                                    <input
                                        disabled={true}
                                        id='fechaInicio'
                                        type='datetime'
                                        className='form-control'
                                        name='fechaInicio'
                                        placeholder='Fecha Inicio'
                                        defaultValue={Date(
                                            formData.fechaFin.toString()
                                        )}
                                    />
                                </div>
                            </div>

                            {/* ENTRADA FECHA FIN*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='fechaFin'>
                                            Fecha Fin:
                                        </label>
                                    </div>

                                    <input
                                        disabled={true}
                                        id='fechaFin'
                                        type='datetime'
                                        className='form-control'
                                        name='fechaFin'
                                        placeholder='Fecha Fin'
                                        defaultValue={Date(
                                            formData.fechaFin.toString()
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='modal-footer d-flex justify-content-center'>
                            <div>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    data-dismiss='modal'
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DetalleVenta;
