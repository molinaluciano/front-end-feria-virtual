import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import { loginUsers } from '../../service/loginService';

function Login() {
    const [form, setHandleForm] = useState({
        email: '',
        password: '',
    });

    const validationForm = (formToValidate) => {
        if (formToValidate.password === '' || formToValidate.email === '') {
            return false;
        }

        return true;
    };

    const handleInputChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
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
            const result = await loginUsers(form);
            console.log(
                '🚀 ~ file: Login.js ~ line 48 ~ sendForm ~ result',
                result
            );

            const menuProfile = result.tipo_usuario_out.toLowerCase();
            const idUser = result.id_usuario_out;
            localStorage.setItem('PROFILE', menuProfile);
            localStorage.setItem('IDUSER', idUser);
            window.location.href = '/' + menuProfile;
        } catch (error) {
            swal({
                title: 'El usuario no se ha encontrado!',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            }).then(() => {
                window.location.href = '/';
            });
        }
    };

    useEffect(() => {
        if (localStorage.getItem('PROFILE')) {
            window.location.href = '/' + localStorage.getItem('PROFILE');
        }
    });

    return (
        <div
            className='container-fluid'
            style={{
                backgroundColor: '#324c3f',
            }}
        >
            <header
                className='App-header'
                style={{
                    backgroundColor: '#324c3f',
                }}
            >
                <h1
                    className='mb-5'
                    style={{
                        color: 'white',
                    }}
                >
                    Login Feria Virtual Web App
                </h1>
                <form onSubmit={sendForm}>
                    <div className='mb-3'>
                        <label for='InputEmail' className='form-label'>
                            Correo Electrónico
                        </label>
                        <input
                            onChange={handleInputChange}
                            name='email'
                            placeholder='Correo Electrónico'
                            className='form-control'
                            id='InputEmail'
                        />
                    </div>
                    <div className='mb-3'>
                        <label for='InputPassword' className='form-label'>
                            Contraseña
                        </label>
                        <input
                            onChange={handleInputChange}
                            name='password'
                            placeholder='Contraseña'
                            type='password'
                            className='form-control'
                            id='InputPassword'
                        />
                    </div>

                    <button
                        style={{ backgroundColor: '#33334b', color: 'white' }}
                        type='submit'
                        className='btn '
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </header>
        </div>
    );
}

export default Login;
