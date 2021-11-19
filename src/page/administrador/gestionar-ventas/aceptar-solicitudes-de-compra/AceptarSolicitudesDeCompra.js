import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import MaterialTable from "material-table";
import { getRequestById } from "../../../../service/get-requests"
import { changeRequestStatus } from "../../../../service/Administrador/requests-service"
import { useState, useEffect } from "react";
import Check from '@material-ui/icons/Check';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Search from '@material-ui/icons/Search';
import { forwardRef } from 'react';
import swal from "sweetalert";

function MenuAdministrador() {
  const [requests, setRequests] = useState([])

  const fetchData = async () => {
    try{
      const response = await getRequestById(0);
      setRequests(response);
    }catch(error){

    }
  };

  const acceptNotify = (idRequest) => {
    swal({
      title: 'Estás seguro de querer aceptar la solicitud de compra?',
      text: "Una vez hecho esto es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aceptar!'
    }).then(() => {
        acceptRequest(idRequest)
        swal(
          'Aceptada!',
          `La solicitud de compra N*${idRequest} ha sido aceptada!`,
          'success'
        )
      }
    )
  }

  const declineNotify = (idRequest) => {
    swal({
      title: 'Estás seguro de querer rechazar la solicitud de compra?',
      text: "Una vez hecho esto es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar!'
    }).then(() => {
      declineRequest(idRequest)
        swal(
          'Rechazada!',
          `La solicitud de compra N*${idRequest} ha sido rechazada!`,
          'error'
        )
          
      }
    )
  }

  const acceptRequest = async (idRequest) => {
    try{
      const result = await changeRequestStatus(idRequest, 3)
    }catch(error){
      swal(
        'Ups, hubo un error!',
        `${error}`,
        'error'
      )
    }
  }

  const declineRequest = async (idRequest) => {
    try{
      const result = await changeRequestStatus(idRequest, 2)
    }catch(error){
      swal(
        'Ups, hubo un error!',
        `${error}`,
        'error'
      )
    }
  }

  const requestDetailRef = (idRequest) => {
    window.location.href = "/cliente_externo";
  }

  const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  }

  const columns = [
    {
      title: "Id Solicitud",
      field: "idSolicitud"
    },
    {
      title: "Id Cliente",
      field: "idUsuario"
    }
  ]

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="App-header">
        <h1>Aceptar Solicitudes de Compra</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <MaterialTable
          columns={columns}
          data={requests}
          actions={[
            {
              icon: tableIcons.Check,
              tooltip: "Aceptar Solicitud",
              onClick: (event, rowData) => { acceptNotify(rowData.idSolicitud) } 
            },
            {
              icon: tableIcons.Delete,
              tooltip: "Rechazar Solicitud",
              onClick: (event, rowData) => { declineNotify(rowData.idSolicitud) } 
            },
            {
              icon: tableIcons.Search,
              tooltip: "Detalle Solicitud",
              onClick: (event, rowData) => { requestDetailRef(rowData.idSolicitud) } 
            }
          ]}
          />
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MenuAdministrador;
