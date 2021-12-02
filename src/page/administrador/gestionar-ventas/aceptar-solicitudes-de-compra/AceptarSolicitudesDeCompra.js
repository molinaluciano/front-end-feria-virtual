import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../../component/SignOutComponent';
import MaterialTable from 'material-table';
import { getRequestByStatus } from '../../../../service/global-request';
import { changeRequestStatus } from '../../../../service/Administrador/requests-service';
import { getUserById } from '../../../../service/Productor/request-service'; /// // // //
import { useState, useEffect } from 'react';
import Check from '@material-ui/icons/Check';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Search from '@material-ui/icons/Search';
import { forwardRef } from 'react';
import swal from 'sweetalert';
import BackToComponent from '../../../../component/backToComponent';

function MenuAdministrador() {
    const id = localStorage.getItem('IDUSER');
    const [requests, setRequests] = useState([]);

    const fetchData = async () => {
        try {
            const response = await getRequestByStatus(0);
            console.log('response', response);

            const infoIdsRes = response.map((x) => {
                return {
                    idSolicitud: x.idSolicitud,
                    idUsuario: x.idUsuario,
                };
            });
            console.log('infoIdsRes', infoIdsRes);

            const infoReq = [];

            const requestDetails = async (x) => {
                const userResponse = await getUserById(x.idUsuario);
                console.log('userResponse', userResponse);
                let req = {
                    idSolicitud: x.idSolicitud,
                    customerName: `${userResponse.nombre} ${userResponse.apellidoPaterno} ${userResponse.apellidoMaterno}`,
                };

                return req;
            };

            for (const infoId of infoIdsRes) {
                infoReq.push(requestDetails(infoId));
            }

            Promise.all(infoReq).then((values) => {
                setRequests(values);
            });

            console.log('requests', requests);
        } catch (error) {
            console.log('error', error);
        }
    };

    const acceptNotify = (idRequest) => {
        swal({
            title: 'Estás seguro de querer aceptar la solicitud de compra?',
            text: 'Una vez hecho esto es irreversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, aceptar!',
        }).then(() => {
            acceptRequest(idRequest);
            swal(
                'Aceptada!',
                `La solicitud de compra N*${idRequest} ha sido aceptada!`,
                'success'
            );
            window.location.href = `/administrador/gestionar-ventas/aceptar-solicitudes`;
        });
    };

    const declineNotify = (idRequest) => {
        swal({
            title: 'Estás seguro de querer rechazar la solicitud de compra?',
            text: 'Una vez hecho esto es irreversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, rechazar!',
        }).then(() => {
            declineRequest(idRequest);
            swal(
                'Rechazada!',
                `La solicitud de compra N*${idRequest} ha sido rechazada!`,
                'error'
            );
            window.location.href = `/administrador/gestionar-ventas/aceptar-solicitudes`;
        });
    };

    const acceptRequest = async (idRequest) => {
        try {
            const result = await changeRequestStatus(idRequest, 3);
        } catch (error) {
            swal('Ups, hubo un error!', `${error}`, 'error');
        }
    };

    const declineRequest = async (idRequest) => {
        try {
            const result = await changeRequestStatus(idRequest, 2);
        } catch (error) {
            swal('Ups, hubo un error!', `${error}`, 'error');
        }
    };

    const requestDetailRef = (idRequest) => {
        window.location.href = `/administrador/gestionar-ventas/controlar_solicitudes/${idRequest}`;
    };
    const tableIcons = {
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => (
            <DeleteOutline {...props} ref={ref} />
        )),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    };

    const columns = [
        {
            title: 'Id Solicitud',
            field: 'idSolicitud',
        },
        {
            title: 'Nombre Cliente',
            field: 'customerName',
        },
    ];
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
                    Aceptar/Rechazar Solicitudes de Compra
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <MaterialTable
                        columns={columns}
                        data={requests}
                        title='Solicitudes'
                        actions={[
                            {
                                icon: tableIcons.Check,
                                tooltip: 'Aceptar Solicitud',
                                onClick: (event, rowData) => {
                                    acceptNotify(rowData.idSolicitud);
                                },
                            },
                            {
                                icon: tableIcons.Delete,
                                tooltip: 'Rechazar Solicitud',
                                onClick: (event, rowData) => {
                                    declineNotify(rowData.idSolicitud);
                                },
                            },
                            {
                                icon: tableIcons.Search,
                                tooltip: 'Detalle Solicitud',
                                onClick: (event, rowData) => {
                                    //window.location.href = `/administrador/gestionar-ventas/controlar_solicitudes/${rowData.idSolicitud}`;

                                    requestDetailRef(rowData.idSolicitud);
                                },
                            },
                        ]}
                    />
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuAdministrador;
