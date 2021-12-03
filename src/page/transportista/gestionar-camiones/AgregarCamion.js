import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import {
    createTruck,
    getTrucksTypes,
} from '../../../service/Transportista/trucks-service';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import BackToComponent from '../../../component/backToComponent';

function AgregarCamion() {
    const id = localStorage.getItem('IDUSER');
    const [fridgeActive, setFridgeActive] = useState(1);
    const [kilos, setKilos] = useState([]);
    const [idTipoCamion, setIdTipoCamion] = useState(0);
    const [form, setHandleForm] = useState({
        idCamion: null,
        idTipoCamion: 0,
        idTamanoCamion: 0,
        patente: '',
        modelo: '',
        marca: '',
        revisionTecnica: 0,
        idTransportista: id,
        disponibilidad: 1,
    });

    const fridgeOptionChangeCapacities = async (event) => {
        const selectedVal = event.target.value;
        const truckTypesResponse = await getTrucksTypes();
        getCapacityByFridgeType(truckTypesResponse, selectedVal);
    };

    const getCapacityByFridgeType = (truckTypesResponse, fridgeType) => {
        const capacitiesByType = truckTypesResponse.filter(
            (type) => type.refrigeracion == fridgeType
        );
        const capacities = capacitiesByType.map((x) => x.capacidad);
        setKilos(capacities);
        return;
    };

    const filterIdTipoCamion = (response, kilos, refrigeracion) => {
        const filter = response.filter(
            (x) => x.refrigeracion == refrigeracion && x.capacidad == kilos
        );
        const idTipoCamion = filter[0].idTipoCamion;
        if (
            idTipoCamion != null ||
            idTipoCamion != undefined ||
            idTipoCamion != '' ||
            idTipoCamion != 0
        ) {
            return idTipoCamion;
        }
        return;
    };

    const getIdTipoCamion = async (kilos, refrigeracion) => {
        const truckTypesResponse = await getTrucksTypes();
        const tipoCamion = filterIdTipoCamion(
            truckTypesResponse,
            kilos,
            refrigeracion
        );
        return tipoCamion;
    };

    const displayCapacities = kilos.map((kilo) => {
        return <option value={kilo}>{kilo}</option>;
    });

    const validationForm = (formToValidate) => {
        if (
            formToValidate.idTipoCamion === 0 ||
            formToValidate.idTamanoCamion === 0 ||
            formToValidate.patente === '' ||
            formToValidate.modelo === 0 ||
            formToValidate.marca === '' ||
            formToValidate.revisionTecnica === 0 ||
            formToValidate.idTransportista === 0 ||
            formToValidate.disponibilidad === 0
        ) {
            return false;
        }
        return true;
    };

    const handleInputChange = async (event) => {
        if (event.target.name == 'idKilos') {
            const idTipoCamionRes = await getIdTipoCamion(
                event.target.value,
                fridgeActive
            );
            setIdTipoCamion(idTipoCamionRes);
        }

        setHandleForm({
            ...form,
            idTipoCamion: idTipoCamion,
            [event.target.name]: event.target.value,
        });
        console.log(form);
    };

    const sendForm = async (event) => {
        event.preventDefault();
        // if (!validationForm(form)) {
        //   swal({
        //     title: "Debe completar todos los campos!",
        //     type: "error",
        //     confirmButtonColor: "#3085d6",
        //     confirmButtonText: "Ok",
        //   });

        //   return;
        // }
        console.log(form);
        try {
            const result = await createTruck(form);
            swal({
                title: 'Camión creado exitosamente!',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            }).then(() => {
                window.location.reload();
                // window.location.href = "/transportista/gestionar-camiones/mis-camiones";
            });
        } catch (error) {
            swal({
                title: error,
                type: error,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            }).then(() => {
                window.location.reload();
                // window.location.href = "/";
            });
        }
    };

    // useEffect(() => {
    // }, []);

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
                    Agregar Camión
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <form onSubmit={sendForm}>
                        <div class='form-group mb-2'>
                            <label for='inputPatente'>Patente</label>
                            <input
                                onChange={handleInputChange}
                                type='text'
                                class='form-control'
                                id='inputPatente'
                                name='patente'
                                placeholder=''
                            />
                        </div>
                        <div class='row mb-2'>
                            <div class='col-6'>
                                <label for='inputMarca'>Marca</label>
                                <input
                                    onChange={handleInputChange}
                                    type='text'
                                    class='form-control'
                                    id='inputMarca'
                                    name='marca'
                                    placeholder=''
                                />
                            </div>
                            <div class='col-6'>
                                <label for='inputModelo'>Modelo</label>
                                <input
                                    onChange={handleInputChange}
                                    type='text'
                                    class='form-control'
                                    id='inputModelo'
                                    name='modelo'
                                    placeholder=''
                                />
                            </div>
                        </div>
                        <div class='row mb-2'>
                            <div class='form-group mb-2'>
                                <div className='row'>
                                    <div className='col-4'>
                                        <label
                                            class='checkbox-inline'
                                            name='fridgeRadioLabel'
                                        >Refrigeración:</label>
                                        <select
                                            onChange={
                                                fridgeOptionChangeCapacities
                                            }
                                            name='isFridge'
                                            id='isFridge'
                                            class='form-control'
                                        >
                                            <option disabled selected>
                                                Refrigeración
                                            </option>
                                            <option value={1}>Si</option>
                                            <option value={0}>No</option>
                                        </select>
                                    </div>
                                    <div className='col-4'>
                                        <label
                                            class='checkbox-inline'
                                            name='fridgeRadioLabel'
                                        >Capacidad:</label>
                                        <select
                                            onChange={handleInputChange}
                                            name='idKilos'
                                            id='idKilos'
                                            class='form-control'
                                        >
                                            <option disabled selected>
                                                Seleccione Capacidad Camión(kg)
                                            </option>
                                            {displayCapacities}
                                        </select>
                                    </div>
                                    <div className='col-4'>
                                        <label
                                            class='checkbox-inline'
                                            name='fridgeRadioLabel'
                                        >Revisión Técnica</label>
                                        <select
                                            onChange={handleInputChange}
                                            name='revisionTecnica'
                                            id='revisionTecnica'
                                            class='form-control'
                                        >
                                            <option disabled selected>
                                                Revisión Técnica
                                            </option>
                                            <option value={1}>Si</option>
                                            <option value={2}>No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <button
                                    style={{ backgroundColor: '#33334b' }}
                                    type='submit'
                                    className='btn btn-primary w-75'
                                >
                                    Agregar Camión
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

export default AgregarCamion;
