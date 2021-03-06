import 'bootstrap/dist/css/bootstrap.min.css'
import {
  deleteUser,
  updateUser,
} from '../../../../service/Administrador/users-service'
import $ from 'jquery'
import swal from 'sweetalert'
import React, { useState, useEffect } from 'react'

const initialValues = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  correo: '',
  contrasena: '',
  rut: 0,
  numeroIdentificador: '',
  direccion: '',
  codigoPostal: 0,
  telefono: 0,
  idContrato: 0,
}

function EditarProductor() {
  const [formData, setFormData] = useState(initialValues)

  const [error, setError] = useState(false)

  const requiredFields = [
    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'contrasena',
    'correo',
    'rut',
    'numeroIdentificador',
    'direccion',
    'codigoPostal',
    'telefono',
    'idContrato',
  ]

  const handleSave = async () => {
    if (requiredFields.some((field) => formData[field] === '')) {
      swal({
        title: 'Debe completar todos los campos',
        icon: 'warning',
      })

      return setError(true)
    } else {
      const resultUpdated = await updateUser(formData)
      validateResult(resultUpdated)
    }
  }

  const validateResult = (result) => {
    if (result) {
      swal({
        title: 'Usuario Actualizado',
        icon: 'success',
      }).then(() => {
        window.location.reload()
      })
    } else {
      swal({
        title: 'Error al Actualizar',
        text: result.message,
        icon: 'error',
      })
    }
  }

  const loadData = () => {
    $(document).on('click', '.editarInputs', function (e) {
      e.preventDefault()
      let data = $(this).attr('data').split('!!!!,')

      setFormData({
        nombre: data[1],
        apellidoPaterno: data[2],
        apellidoMaterno: data[3],
        correo: data[9],
        contrasena: data[4],
        rut: data[5],
        numeroIdentificador: data[10],
        direccion: data[6],
        codigoPostal: data[7],
        telefono: data[8],
        idContrato: data[11],
      })

      console.log(
        '???? ~ file: EditarProductor.js ~ line 97 ~ formData',
        formData,
      )
    })
  }

  useEffect(() => {
    loadData()
    setError(false)
    console.log(
      '???? ~ file: EditarCliente.js ~ line 27 ~ EditarCliente ~ formData',
      formData,
    )
  })

  useEffect(() => {
    if (error && requiredFields.every((field) => formData[field] !== '')) {
      setError(false)
    }
  }, [error, formData, requiredFields])

  // ELIMINAR CLIENTE
  const borrarCliente = async (idUsuario, idTipoUsuario) => {
    return await deleteUser(idUsuario, idTipoUsuario)
  }

  $(document).on('click', '.borrarInput', function (e) {
    e.preventDefault()
    let data = $(this).attr('data').split('!!!!,')
    const idUsuario = data[0]
    const idTipoUsuario = data[1]
    swal({
      title: 'Esta seguro de eliminar al usuario?',
      icon: 'warning',
      buttons: {
        cancel: {
          visible: true,
          text: 'Cancelar',
          closeModal: true,
          value: false,
        },
        confirm: {
          visible: true,
          text: 'Eliminar',
          closeModal: true,
          value: true,
        },
      },
    }).then(async (resultButton) => {
      if (resultButton) {
        const resultDeleted = await borrarCliente(idUsuario, 6)

        if (resultDeleted !== true) {
          swal({
            title: 'Error al eliminar',
            text: resultDeleted.message,
            icon: 'error',
          })
        } else {
          swal({
            title: 'Usuario eliminado',
            icon: 'success',
            closeOnClickOutside: true,
          }).then((data) => {
            if (data) {
              window.location.reload()
            }
          })
        }
      }
    })
  })

  return (
    <div className="modal fade" id="editarProductor">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Editar Productor</h4>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
            encType="multipart/form-data"
          >
            <div className="modal-body">
              {/* ENTRADA ID CONTRATO*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="idContrato">ID Contrato:</label>
                  </div>
                  <input
                    id="idContrato"
                    type="text"
                    className="form-control"
                    name="idContrato"
                    placeholder="Ingrese ID contrato"
                    value={formData.idContrato.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        idContrato: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA NOMBRE*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="nombre">Nombre:</label>
                  </div>
                  <input
                    id="editarNombre"
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    value={formData.nombre.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        nombre: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA APELLIDO PATERNO*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
                  </div>

                  <input
                    id="apellidoPaterno"
                    type="text"
                    className="form-control"
                    name="apellidoPaterno"
                    placeholder="Ingrese su apellido"
                    value={formData.apellidoPaterno.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        apellidoPaterno: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA APELLIDO MATERNO*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="apellidoMaterno">Apellido Materno:</label>
                  </div>

                  <input
                    id="apellidoMaterno"
                    type="text"
                    className="form-control"
                    name="apellidoMaterno"
                    placeholder="Ingrese su apellido"
                    value={formData.apellidoMaterno.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        apellidoMaterno: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>
              <hr />

              {/* ENTRADA TELEFONO*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="telefono">Telefono:</label>
                  </div>

                  <input
                    id="telefono"
                    type="text"
                    className="form-control"
                    name="telefono"
                    placeholder="Ingrese su telefono"
                    value={formData.telefono.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        telefono: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA DIRECCION*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="direccion">Direccion:</label>
                  </div>

                  <input
                    id="direccion"
                    type="text"
                    className="form-control"
                    name="direccion"
                    placeholder="Ingrese su direccion"
                    value={formData.direccion.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        direccion: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA CODIGO POSTAL*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="codigoPostal">Codigo Postal:</label>
                  </div>

                  <input
                    id="codigoPostal"
                    type="text"
                    className="form-control"
                    name="codigoPostal"
                    placeholder="Ingrese su codigo de postal"
                    value={formData.codigoPostal.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        codigoPostal: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>
              <hr />

              {/* ENTRADA RUT*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="rut">Rut:</label>
                  </div>

                  <input
                    id="rut"
                    type="text"
                    className="form-control"
                    name="Rut"
                    placeholder="Ingrese su rut"
                    value={formData.rut.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        rut: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA NUMERO IDENTIFICADOR*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="numeroIdentificador">
                      Numero Identificador:
                    </label>
                  </div>

                  <input
                    id="numeroIdentificador"
                    type="text"
                    className="form-control"
                    name="numeroIdentificador"
                    placeholder="Numero identificador"
                    value={formData.numeroIdentificador.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        numeroIdentificador: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              <hr />

              {/* ENTRADA CONTRASENA*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="contrasena">Contrase??a:</label>
                  </div>

                  <input
                    id="contrasena"
                    type="text"
                    className="form-control"
                    name="contrasena"
                    placeholder="Ingrese su contrase??a"
                    value={formData.contrasena.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        contrasena: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA CORREO*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="correo">Correo:</label>{' '}
                  </div>

                  <input
                    id="correo"
                    type="text"
                    className="form-control"
                    name="Correo"
                    placeholder="Ingrese su correo"
                    value={formData.correo.toString()}
                    disabled={true}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        correo: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-between">
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>

              <div>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditarProductor
