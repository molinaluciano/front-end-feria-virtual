import axios from "axios";
import config from "../../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const createUser = (form) => {
  const endPoint = config.endPoint.createuser;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        idUsuario: null,
        idTipoUsuario: form.nombre,
        idPais: form.pais,
        nombre: form.nombre,
        apellidoPaterno: form.apellidopaterno,
        apellidoMaterno: form.materno,
        correo: form.correo,
        contrasena: form.password,
        rut: form.rut,
        numeroIdentificador: form.digitoverificador,
        direccion: form.direccion,
        codigoPostal: form.codigopostal,
        telefono: form.telefono,
        idContrato: null
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};
