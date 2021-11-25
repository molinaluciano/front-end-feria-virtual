import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import swal from 'sweetalert';
import React, { useState, useEffect } from 'react';
import { updateBalance } from '../../../service/Administrador/balance-services';

const initialValues = {
    idSaldo: 0,
    kilos: 0,
    disponible: 0,
    idCliente: 0,
    idFruta: 0,
    idCalidad: 0,
    precio: 0,
};
function EditarSaldo() {
    const [formData, setFormData] = useState(initialValues);

    const [error, setError] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const requiredFields = ['kilos', 'idCalidad', 'idFruta'];

    const handleSave = async () => {
        if (requiredFields.some((field) => formData[field] === '')) {
            swal({
                title: 'Debe completar todos los campos',
                icon: 'warning',
            });

            return setError(true);
        } else {
            const resultUpdated = await updateBalance(formData);
            validateResult(resultUpdated);
        }
    };

    const validateResult = (result) => {
        if (result === true) {
            swal({
                title: 'Saldo Actualizado',
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        } else {
            swal({
                title: 'Error al Actualizar',
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
                idSaldo: data[0],
                kilos: data[1],
                disponible: data[2],
                idCliente: data[3],
                idFruta: data[4],
                idCalidad: data[5],
                precio: data[6],
            });
        });
    };

    useEffect(() => {
        loadData();
        setError(false);
    }, []);

    useEffect(() => {
        if (error && requiredFields.every((field) => formData[field] !== '')) {
            setError(false);
        }
    }, [error, formData, requiredFields]);

    return (
        <div className='modal fade' id='editarSaldo'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h4 className='modal-title'>Editar Saldo</h4>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}
                        encType='multipart/form-data'
                    >
                        <div className='modal-body'>
                            {/* ENTRADA KILOS*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='kilos'>Kilos:</label>
                                    </div>

                                    <input
                                        id='kilos'
                                        type='text'
                                        className='form-control'
                                        name='kilos'
                                        placeholder='Kilos'
                                        value={formData.kilos.toString()}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                kilos: e.target.value,
                                            });
                                        }}
                                    />

                                    <div className='invalid-feedback invalid-kilos'></div>
                                </div>
                            </div>

                            {/* ENTRADA ID FRUTA*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='idFruta'>
                                            ID Fruta:
                                        </label>
                                    </div>

                                    <input
                                        id='idFruta'
                                        type='text'
                                        className='form-control'
                                        name='idFruta'
                                        placeholder='ID Fruta'
                                        value={formData.idFruta.toString()}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                idFruta: e.target.value,
                                            });
                                        }}
                                    />

                                    <div className='invalid-feedback invalid-idFruta'></div>
                                </div>
                            </div>

                            {/* ENTRADA ID CALIDAD*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='idCalidad'>
                                            ID Calidad:
                                        </label>
                                    </div>

                                    <input
                                        id='idCalidad'
                                        type='text'
                                        className='form-control'
                                        name='idCalidad'
                                        placeholder='ID Calidad'
                                        value={formData.idCalidad.toString()}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                idCalidad: e.target.value,
                                            });
                                        }}
                                    />

                                    <div className='invalid-feedback invalid-idCalidad'></div>
                                </div>
                            </div>

                            {/* ENTRADA PRECIO*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='precio'>Precio:</label>
                                    </div>

                                    <input
                                        id='precio'
                                        type='text'
                                        className='form-control'
                                        name='precio'
                                        placeholder='Precio'
                                        value={formData.precio.toString()}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                precio: e.target.value,
                                            });
                                        }}
                                    />

                                    <div className='invalid-feedback invalid-idCalidad'></div>
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

export default EditarSaldo;
