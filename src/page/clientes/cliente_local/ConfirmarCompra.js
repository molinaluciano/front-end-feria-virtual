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
function ConfirmarCompra() {
    let id = localStorage.getItem('IDUSER');
    const [formData, setFormData] = useState(initialValues);

    const [error, setError] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const requiredFields = ['kilos', 'idCalidad', 'idFruta'];

    const handleSave = async () => {
        formData.disponible = 0;
        formData.idCliente = id;
        formData.kilos = null;
        formData.idFruta = null;
        formData.idCalidad = null;
        formData.precio = null;

        const resultUpdated = await updateBalance(formData);

        await validateResult(resultUpdated);
    };

    const validateResult = async (result) => {
        if (result === true) {
            swal({
                title: 'Compra exitosa',
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        } else {
            swal({
                title: 'Error al Comprar Saldo',
                text: result.message,
                icon: 'error',
            });
        }
    };

    const loadData = () => {
        $(document).on('click', '.comprarSaldo', function (e) {
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
        <div className='modal fade' id='comprarSaldo'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h4 className='modal-title'>Comprar Saldo</h4>
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
                                        disabled={true}
                                        id='kilos'
                                        type='text'
                                        className='form-control'
                                        name='kilos'
                                        placeholder='Kilos'
                                        value={formData.kilos?.toString()}
                                    />
                                </div>
                            </div>

                            {/* ENTRADA ID FRUTA*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='idFruta'>Fruta:</label>
                                    </div>

                                    <input
                                        disabled={true}
                                        id='idFruta'
                                        type='text'
                                        className='form-control'
                                        name='idFruta'
                                        placeholder='Fruta'
                                        value={formData.idFruta?.toString()}
                                    />
                                </div>
                            </div>

                            {/* ENTRADA ID CALIDAD*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='idCalidad'>
                                            Calidad:
                                        </label>
                                    </div>

                                    <input
                                        disabled={true}
                                        id='idCalidad'
                                        type='text'
                                        className='form-control'
                                        name='idCalidad'
                                        placeholder='Calidad'
                                        value={formData.idCalidad?.toString()}
                                    />
                                </div>
                            </div>

                            {/* ENTRADA PRECIO*/}
                            <div className='form-group'>
                                <div className='input-group mb-3 mt-3'>
                                    <div className='input-group-append input-group-text'>
                                        <label htmlFor='precio'>Precio:</label>
                                    </div>

                                    <input
                                        disabled={true}
                                        id='precio'
                                        type='text'
                                        className='form-control'
                                        name='precio'
                                        placeholder='Precio'
                                        value={formData.precio?.toString()}
                                    />
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
                                    Cancelar Compra
                                </button>
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                >
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfirmarCompra;
