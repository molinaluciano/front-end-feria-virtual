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
            console.log('data', data[0])

            setFormData({
                direccionDestino1: JSON.stringify(data[0]),
                direccionPartida1: JSON.stringify(data[1]),
                fechaRetiro1: JSON.stringify(data[2]),
                direccionDestino2: JSON.stringify(data[3]),
                direccionPartida2: JSON.stringify(data[4]),
                fechaRetiro2: JSON.stringify(data[5]),
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
                        <h4 className='modal-title'>Detalle de Venta</h4>
                    </div>

                    <form encType='multipart/form-data'>
                        <div className='modal-body'>
                            {/* ENTRADA ID VENTA*/}
                        <div className='form-group'>
                            <div className='input-group mb-3 mt-3'>
                                <div className='input-group-append input-group-text'>
                                    <label htmlFor='direccionDestino1'>
                                        direccionDestino1:
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
                            <hr />
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
