import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { requestCreation } from '../../../service/Cliente-Externo/request-service';
import {
    getFruits,
    getFruitsTypes,
    getQualityTypes,
} from '../../../service/Cliente-Externo/request-service';
import BackToComponent from '../../../component/backToComponent';
function CrearSolicitud() {
    const [fruits, setFruits] = useState([]);
    const [fruitTypes, setFruitTypes] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [form, setHandleForm] = useState({
        idUsuario: localStorage.getItem('IDUSER'),
        idTipoSolicitud: 2,
        kilos: 0,
        idFruta: '',
        idCalidad: 0,
    });

    const fetchData = async () => {
        const fruitsTypesResponse = await getFruitsTypes();
        const qualitiesResponse = await getQualityTypes();
        setFruitTypes(fruitsTypesResponse);
        setQualities(qualitiesResponse);
    };

    const displayFruits = fruits.map((fruit) => {
        return <option value={fruit.idFruta}>{fruit.nombreFruta}</option>;
    });

    const displayCategoryFruit = fruitTypes.map((fruitType) => {
        return (
            <option value={fruitType.idCategoriaFruta}>
                {fruitType.categoria}
            </option>
        );
    });

    const displayQuality = qualities.map((quality) => {
        return <option value={quality.idCalidad}>{quality.calidad}</option>;
    });
    const handleInputChange = (event) => {
        console.log(form);
        setHandleForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const categorySelectChange = async (event) => {
        const selectedVal = event.target.value;
        const fruitsResponse = await getFruits();
        const filteredFruits = fruitsResponse.filter(
            (x) => x.idCategoriaFruta == selectedVal
        );
        setFruits(filteredFruits);
    };

    const sendForm = async (event) => {
        event.preventDefault();
        try {
            const result = await requestCreation(form);
            console.log(
                '🚀 ~ file: Login.js ~ line 48 ~ sendForm ~ result',
                result
            );
            swal({
                title: 'Se ha creado tu solicitud de compra correctamente!',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            }).then(() => {
                window.location.href = '/cliente_externo';
            });
        } catch (error) {
            swal({
                title: error,
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            }).then(() => {
                window.location.href = '/';
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                    Nueva Solicitud
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <form onSubmit={sendForm} class='mb-2'>
                        <div className='row mb-3'>
                            <div class='col-4'>
                                <select
                                    onChange={categorySelectChange}
                                    class='form-control'
                                >
                                    <option disabled selected>
                                        Categoría Fruta
                                    </option>
                                    {displayCategoryFruit}
                                </select>
                            </div>
                            <div class='col-4'>
                                <select
                                    onChange={handleInputChange}
                                    id='idFruta'
                                    name='idFruta'
                                    class='form-control'
                                >
                                    <option disabled selected>
                                        Seleccione Fruta
                                    </option>
                                    {displayFruits}
                                </select>
                            </div>
                            <div class='col-1'>
                                <h5>Kg:</h5>
                            </div>
                            <div class='col-3'>
                                <input
                                    onChange={handleInputChange}
                                    type='number'
                                    id='inputKg'
                                    name='kilos'
                                    class='form-control'
                                ></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <select
                                    onChange={handleInputChange}
                                    id='idCalidad'
                                    name='idCalidad'
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
                            <div className='col-12'>
                                <button
                                    style={{ backgroundColor: '#33334b' }}
                                    type='submit'
                                    className='btn btn-primary w-75'
                                >
                                    Crear Solicitud
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

export default CrearSolicitud;
