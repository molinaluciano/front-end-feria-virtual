import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import swal from 'sweetalert';
import React, { useState, useEffect } from 'react';

import { getStatusSales } from '../../../../service/status_and_types/status_and_types';
import { changeRequestStatus } from '../../../../service/Administrador/requests-service';
import { updateStateForSale } from '../../../../service/Administrador/sales-service';

const initialValues = {
    idEstadoVenta: 0,
    idVenta: 0,
};
function EditarEstadoVenta() {
    const [formData, setFormData] = useState(initialValues);
    const [statusSale, setStatusSale] = useState([]);

    const [error, setError] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const requiredFields = ['idEstadoVenta'];

    const handleSave = async () => {
        if (requiredFields.some((field) => formData[field] === '')) {
            swal({
                title: 'Debe completar todos los campos',
                icon: 'warning',
            });

            return setError(true);
        } else {
            console.log(
                '🚀 ~ file: EditarEstadoVenta.js ~ line 41 ~ handleSave ~ formData',
                formData
            );

            const resultUpdated = await updateStateForSale(formData);
            validateResult(resultUpdated);
        }
    };

    const validateResult = (result) => {
        if (result === true) {
            swal({
                title: 'Estado Editado',
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        } else {
            swal({
                title: 'Error al Editar Estado',
                text: result.message,
                icon: 'error',
            });
        }
    };

    const loadData = () => {
        $(document).on('click', '.editarInputs', function (e) {
            e.preventDefault();
            let data = $(this).attr('data').split('!!!!,');

            setFormData({
                idVenta: data[0],
            });
        });
    };
    const fetchData = async () => {
        const status = await getStatusSales();
        setStatusSale(status);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        loadData();
        setError(false);
    }, []);

    useEffect(() => {
        if (error && requiredFields.every((field) => formData[field] !== '')) {
            setError(false);
        }
    }, [error, formData, requiredFields]);

    const displayStatusSale = statusSale.map((status) => {
        return <option value={status.idEstadoVenta}>{status.estado}</option>;
    });

    return (
        <div className='modal fade' id='editarEstadoSolicitud'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h4 className='modal-title'>Editar Estado de Venta</h4>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}
                        encType='multipart/form-data'
                    >
                        <div className='modal-body'>
                            <div class='row mb-2 mt-4'>
                                {/* SELECT ESTADO*/}
                                <div class='col-12'>
                                    <select
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                idEstadoVenta: e.target.value,
                                            });
                                        }}
                                        name='idEstadoVenta'
                                        id='idEstadoVenta'
                                        class='form-control'
                                    >
                                        <option disabled selected>
                                            Seleccione Estado
                                        </option>
                                        {displayStatusSale}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='modal-footer d-flex justify-content-between'>
                            <div>
                                <button
                                    type='button'
                                    className='btn btn-danger'
                                    data-dismiss='modal'
                                >
                                    Cerrar
                                </button>
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditarEstadoVenta;
