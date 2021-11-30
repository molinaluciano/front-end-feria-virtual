import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import swal from 'sweetalert';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createBalance } from '../../../service/Administrador/balance-services';
import {
    getFruits,
    getQualityTypes,
} from '../../../service/Cliente-Externo/request-service';

function NuevoSaldo() {
    const [form, setHandleForm] = useState({
        kilos: null,
        disponible: 1,
        idFruta: null,
        idCalidad: null,
        precio: null,
    });

    const [fruit, setFruit] = useState([]);
    const [quality, setQuality] = useState([]);

    const fetchData = async () => {
        const fruitType = await getFruits();
        const qualityType = await getQualityTypes();

        setFruit(fruitType);
        setQuality(qualityType);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const displayQuality = quality.map((qu) => {
        return <option value={qu.idCalidad}>{qu.calidad}</option>;
    });

    const displayFruit = fruit.map((fr) => {
        return <option value={fr.idFruta}>{fr.nombreFruta}</option>;
    });

    const validationForm = (formToValidate) => {
        console.log(
            '🚀 ~ file: NuevoSaldo.js ~ line 19 ~ validationForm ~ formToValidate',
            formToValidate
        );

        if (
            formToValidate.kilos === null ||
            formToValidate.idFruta === null ||
            formToValidate.idCalidad === null ||
            formToValidate.kilos === '' ||
            formToValidate.idFruta === '' ||
            formToValidate.idCalidad === ''
        ) {
            return false;
        }
        return true;
    };

    const handleInputChange = (event) => {
        console.log(form);
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

        try {
            const result = await createBalance(form);
            console.log(
                '🚀 ~ file: Login.js ~ line 48 ~ sendForm ~ result',
                result
            );
            swal({
                title: 'Saldo creado exitosamente!',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            }).then(() => {
                window.location.href = '/administrador/gestionar-saldos';
            });
        } catch (error) {
            swal({
                title: error,
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            }).then(() => {
                // window.location.href = "/";
            });
        }
    };

    return (
        <div className='container'>
            <header className='App-header mb-3'>
                <h1>Nuevo Saldo</h1>
            </header>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <form onSubmit={sendForm}>
                        <div class='form-group'>
                            <label for='inputKilos'>Kilos</label>
                            <input
                                onChange={handleInputChange}
                                type='text'
                                class='form-control'
                                id='inputKilos'
                                name='kilos'
                                placeholder=''
                            />
                        </div>
                        <div class='form-group'>
                            <label for='inputPrecio'>Precio</label>
                            <input
                                onChange={handleInputChange}
                                type='text'
                                class='form-control'
                                id='inputPrecio'
                                name='precio'
                                placeholder=''
                            />
                        </div>
                        <div class='row mb-2 mt-4'>
                            {/* SELECT FRUTA*/}
                            <div class='col-6'>
                                <select
                                    onChange={handleInputChange}
                                    name='idFruta'
                                    id='idFruta'
                                    class='form-control'
                                >
                                    <option disabled selected>
                                        Seleccione Fruta
                                    </option>
                                    {displayFruit}
                                </select>
                            </div>
                            {/* SELECT calidad*/}

                            <div class='col-6'>
                                <select
                                    onChange={handleInputChange}
                                    name='idCalidad'
                                    id='idCalidad'
                                    class='form-control'
                                >
                                    <option disabled selected>
                                        Seleccione Calidad
                                    </option>
                                    {displayQuality}
                                </select>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-6'>
                                <Link
                                    to='/administrador/gestionar-saldos'
                                    className='btn btn-primary w-75'
                                >
                                    Ir hacia atrás
                                </Link>
                            </div>
                            <div className='col-6'>
                                <button
                                    type='submit'
                                    className='btn btn-primary w-75'
                                >
                                    Agregar Saldo
                                </button>
                            </div>
                        </div>
                    </form>
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default NuevoSaldo;
