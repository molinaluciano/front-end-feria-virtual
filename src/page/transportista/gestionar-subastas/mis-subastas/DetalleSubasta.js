import 'bootstrap/dist/css/bootstrap.min.css';

import $ from 'jquery';
import swal from 'sweetalert';
import React, { useState, useEffect } from 'react';

const initialValues = {
    direccionDestino1: '',
    direccionPartida1: '',
    fechaRetiro1: '',
    direccionDestino2: '',
    direccionPartida2: '',
    fechaRetiro2: '',
};
function DetalleVenta() {
    const [formData, setFormData] = useState(initialValues);

    const loadData = () => {
        $(document).on('click', '.detalleSubasta', function (e) {
            e.preventDefault();
            let data = $(this).attr('data').split('!!!!,');

            setFormData({
                direccionPartida1: data[0],
                direccionDestino1: data[1],
                fechaRetiro1: data[2],
                direccionPartida2: data[3],
                direccionDestino2: data[4],
                fechaRetiro2: data[5],
            });
        });
    };

    useEffect(() => {
        loadData();
    });

    return (
        <div className='modal fade' id='detalleSubasta'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h4 className='modal-title'>Detalle de Rutas</h4>
                    </div>

                    <form encType='multipart/form-data'>
                        <div className='modal-body'>
                            {/* RUTA UNO*/}
                            <h3>Primera Ruta</h3>
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='direccionDestino1'>
                                            Dirección de Partida:
                                        </label>
                                    </div>
                                    <input
                                        disabled={true}
                                        defaultValue={formData.direccionPartida1.toString()}
                                        id='direccionDestino1'
                                        type='text'
                                        className='form-control'
                                        name='direccionDestino1'
                                        placeholder='ID Venta'
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='direccionDestino1'>
                                            Dirección de Destino:
                                        </label>
                                    </div>
                                    <input
                                        disabled={true}
                                        defaultValue={formData.direccionDestino1.toString()}
                                        id='direccionDestino1'
                                        type='text'
                                        className='form-control'
                                        name='direccionDestino1'
                                        placeholder='ID Venta'
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='direccionDestino1'>
                                            Fecha de Retiro:
                                        </label>
                                    </div>
                                    <input
                                        disabled={true}
                                        defaultValue={formData.fechaRetiro1.toString()}
                                        id='direccionDestino1'
                                        type='text'
                                        className='form-control'
                                        name='direccionDestino1'
                                        placeholder='ID Venta'
                                    />
                                </div>
                            </div>
                            <hr />
                            {/* RUTA DOS*/}
                            <h3>Segunda Ruta</h3>
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='direccionDestino1'>
                                            Dirección de Partida:
                                        </label>
                                    </div>
                                    <input
                                        disabled={true}
                                        defaultValue={formData.direccionPartida2.toString()}
                                        id='direccionDestino1'
                                        type='text'
                                        className='form-control'
                                        name='direccionDestino1'
                                        placeholder='ID Venta'
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='direccionDestino1'>
                                            Dirección de Destino:
                                        </label>
                                    </div>
                                    <input
                                        disabled={true}
                                        defaultValue={formData.direccionDestino2.toString()}
                                        id='direccionDestino1'
                                        type='text'
                                        className='form-control'
                                        name='direccionDestino1'
                                        placeholder='ID Venta'
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='direccionDestino1'>
                                            Fecha de Retiro:
                                        </label>
                                    </div>
                                    <input
                                        disabled={true}
                                        defaultValue={formData.fechaRetiro2.toString()}
                                        id='direccionDestino1'
                                        type='text'
                                        className='form-control'
                                        name='direccionDestino1'
                                        placeholder='ID Venta'
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
