import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../../component/SignOutComponent';
import swal from 'sweetalert';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    createContract,
    createUser,
} from '../../../../service/Administrador/users-service';
import BackToComponent from '../../../../component/backToComponent';

function NuevoProductor() {
    const [form, setHandleForm] = useState({
        idTipoUsuario: 6, // 6
        idPais: 1,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        contrasena: '',
        contrasenaconfirm: '',
        rut: null,
        numeroIdentificador: '',
        direccion: '',
        codigoPostal: null,
        telefono: null,
        descripcionContrato: '',
    });

    const validationForm = (formToValidate) => {
        if (
            formToValidate.idTipoUsuario === null ||
            formToValidate.idPais === null ||
            formToValidate.nombre === '' ||
            formToValidate.apellidoPaterno === '' ||
            formToValidate.apellidoMaterno === '' ||
            formToValidate.correo === '' ||
            formToValidate.contrasena === '' ||
            formToValidate.rut === null ||
            formToValidate.numeroIdentificador === '' ||
            formToValidate.direccion === '' ||
            formToValidate.codigoPostal === null ||
            formToValidate.telefono === null ||
            formToValidate.descripcionContrato === ''
        ) {
            return false;
        }

        return true;
    };

    const passwordValidation = (contrasena, contrasenaconfirm) => {
        if (contrasena != contrasenaconfirm) {
            return false;
        }

        return true;
    };

    const handleInputChange = (event) => {
        setHandleForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const sendForm = async (event) => {
        event.preventDefault();
        if (!validationForm(form)) {
            swal({
                title: 'Debe completar todos los campos!',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            });

            return;
        }

        if (!passwordValidation(form.contrasena, form.contrasenaconfirm)) {
            swal({
                title: 'Las contraseñas no coindiden!',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            });

            return;
        }

        try {
            console.log(form);
            const resultContract = await createContract(form);
            const idContrato = parseInt(resultContract.id);
            console.log(idContrato);
            const result = await createUser(form, idContrato);
            console.log(
                '🚀 ~ file: Login.js ~ line 48 ~ sendForm ~ result',
                result
            );
            swal({
                title: 'Productor creado exitosamente!',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            }).then(() => {
                window.location.reload();
                // window.location.href = "/administrador/gestionar-usuarios";
            });
        } catch (error) {
            swal({
                title: error,
                type: error,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            }).then(() => {
                // window.location.href = "/";
            });
        }
    };

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
                    Nuevo Productor
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <form onSubmit={sendForm}>
                        <div class='form-group'>
                            <label for='inputName'>Nombre</label>
                            <input
                                onChange={handleInputChange}
                                type='text'
                                class='form-control'
                                id='inputName'
                                name='nombre'
                                placeholder=''
                            />
                        </div>
                        <div class='row mb-2'>
                            <div class='col-6'>
                                <label for='inputApellidoPa'>
                                    Apellido Paterno
                                </label>
                                <input
                                    onChange={handleInputChange}
                                    type='text'
                                    class='form-control'
                                    id='inputApellidoPa'
                                    name='apellidoPaterno'
                                    placeholder=''
                                />
                            </div>
                            <div class='col-6'>
                                <label for='inputApellidoMa'>
                                    Apellido Materno
                                </label>
                                <input
                                    onChange={handleInputChange}
                                    type='text'
                                    class='form-control'
                                    id='inputApellidoMa'
                                    name='apellidoMaterno'
                                    placeholder=''
                                />
                            </div>
                        </div>
                        <div class='form-group'>
                            <label for='inputCorreo'>Correo</label>
                            <input
                                onChange={handleInputChange}
                                type='email'
                                class='form-control'
                                id='inputCorreo'
                                name='correo'
                                placeholder=''
                            />
                        </div>
                        <div class='row mb-2'>
                            <div class='col-6'>
                                <label for='inputPass'>Contraseña</label>
                                <input
                                    onChange={handleInputChange}
                                    type='password'
                                    class='form-control'
                                    id='inputPass'
                                    name='contrasena'
                                    placeholder=''
                                />
                            </div>
                            <div class='col-6'>
                                <label for='inputConfirmPass'>
                                    Confirmar Contraseña
                                </label>
                                <input
                                    onChange={handleInputChange}
                                    type='password'
                                    class='form-control'
                                    id='inputConfirmPass'
                                    name='contrasenaconfirm'
                                    placeholder=''
                                />
                            </div>
                        </div>
                        <div class='row mb-2'>
                            <div class='col-6'>
                                <label for='inputDireccion'>Dirección</label>
                                <input
                                    onChange={handleInputChange}
                                    type='text'
                                    class='form-control'
                                    id='inputDireccion'
                                    name='direccion'
                                    placeholder=''
                                />
                            </div>
                            <div class='col-6'>
                                <div class='row mb-2'>
                                    <div class='col-10'>
                                        <label for='inputRut'>Rut</label>
                                        <input
                                            onChange={handleInputChange}
                                            type='text'
                                            class='form-control'
                                            id='inputRut'
                                            name='rut'
                                            placeholder=''
                                        />
                                    </div>
                                    <div class='col-2'>
                                        <label for='inputNumRut'></label>
                                        <input
                                            onChange={handleInputChange}
                                            type='text'
                                            class='form-control'
                                            id='inputNumRut'
                                            name='numeroIdentificador'
                                            placeholder=''
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row mb-2'>
                            <div class='col-6'>
                                <label for='inputCodigoPostal'>
                                    Código Postal
                                </label>
                                <input
                                    onChange={handleInputChange}
                                    type='text'
                                    class='form-control'
                                    id='inputCodigoPostal'
                                    name='codigoPostal'
                                    placeholder=''
                                />
                            </div>
                            <div class='col-6'>
                                <label for='inputTelefono'>Teléfono</label>
                                <input
                                    onChange={handleInputChange}
                                    type='text'
                                    class='form-control'
                                    id='inputTelefono'
                                    name='telefono'
                                    placeholder=''
                                />
                            </div>
                        </div>
                        <h1>Contrato</h1>
                        <div class='row mb-2 mt-4'>
                            <div class='col-12'>
                                <label for='descripcionContrato'>
                                    Descripción
                                </label>
                                <textarea
                                    onChange={handleInputChange}
                                    type='text'
                                    class='form-control'
                                    id='descripcionContrato'
                                    name='descripcionContrato'
                                    placeholder=''
                                />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <button
                                    style={{ backgroundColor: '#33334b' }}
                                    type='submit'
                                    className='btn btn-primary w-75'
                                >
                                    Agregar Productor
                                </button>
                            </div>
                        </div>
                    </form>
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default NuevoProductor;
