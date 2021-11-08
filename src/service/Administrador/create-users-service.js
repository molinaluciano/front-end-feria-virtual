import axios from "axios";
import config from "../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const createUser = (form, idContrato) => {
  const endPoint = config.endPoint.createuser;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        idUsuario: null,
        idTipoUsuario: form.idTipoUsuario,
        idPais: form.idPais,
        nombre: form.nombre,
        apellidoPaterno: form.apellidoPaterno,
        apellidoMaterno: form.apellidoMaterno,
        correo: form.correo,
        contrasena: form.contrasena,
        rut: parseInt(form.rut),
        numeroIdentificador: form.numeroIdentificador,
        direccion: form.direccion,
        codigoPostal: parseInt(form.codigoPostal),
        telefono: parseInt(form.telefono),
        idContrato: idContrato
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const createContract = (form) => {
  const endPoint = config.endPoint.createcontract;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        descripcion: form.descripcionContrato,
        firmas: "1",
        idEstadoContrato: 1
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};