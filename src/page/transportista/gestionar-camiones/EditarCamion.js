import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import swal from 'sweetalert'
import React, { useState, useEffect } from 'react'
import {
  deleteTruck,
  updateTruck,
} from '../../../service/Transportista/trucks-service'

const initialValues = {
  idTipoCamion: 0,
  idTamanoCamion: 0,
  patente: '',
  modelo: '',
  marca: '',
  revisionTecnica: 0,
  disponibilidad: 0,
  idTransportista: 0,
}
function EditarCamion() {
  const [formData, setFormData] = useState(initialValues)

  const [error, setError] = useState(false)

  const requiredFields = [
    'idTipoCamion',
    'idTamanoCamion',
    'patente',
    'modelo',
    'marca',
    'revisionTecnica',
    'disponibilidad',
  ]

  const handleSave = async () => {
    if (requiredFields.some((field) => formData[field] === '')) {
      swal({
        title: 'Debe completar todos los campos',
        icon: 'warning',
      })

      return setError(true)
    } else {
      const resultUpdated = await updateTruck(formData)
      validateResult(resultUpdated)
    }
  }

  const validateResult = (result) => {
    if (result === true) {
      swal({
        title: 'Camion Actualizado',
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
      const idCarrier = localStorage.getItem('IDUSER')

      setFormData({
        idTipoCamion: data[1],
        idTamanoCamion: data[2],
        patente: data[3],
        modelo: data[4],
        marca: data[5],
        revisionTecnica: data[6],
        disponibilidad: data[8],
        idTransportista: idCarrier,
      })
    })
  }

  useEffect(() => {
    loadData()
    setError(false)
  })

  useEffect(() => {
    if (error && requiredFields.every((field) => formData[field] !== '')) {
      setError(false)
    }
  }, [error, formData, requiredFields])

  // ELIMINAR CLIENTE
  const borrarCamion = async (idCamion) => {
    return await deleteTruck(idCamion)
  }

  $(document).on('click', '.borrarInput', function (e) {
    e.preventDefault()
    let data = $(this).attr('data').split('!!!!,')
    const idCamion = data[0]
    swal({
      title: 'Esta seguro de eliminar el camion',
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
        const resultDeleted = await borrarCamion(idCamion)

        if (resultDeleted !== true) {
          swal({
            title: 'Error al eliminar',
            text: resultDeleted.message,
            icon: 'error',
          })
        } else {
          swal({
            title: 'Camion eliminado',
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
    <div className="modal fade" id="editarCamion">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Editar Camion</h4>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
            encType="multipart/form-data"
          >
            <div className="modal-body">
              {/* ENTRADA MODELO*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="modelo">Modelo:</label>
                  </div>

                  <input
                    id="modelo"
                    type="text"
                    className="form-control"
                    name="modelo"
                    placeholder="Ingrese su modelo"
                    value={formData.modelo.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        modelo: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA MARCA*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="marca">Marca:</label>
                  </div>

                  <input
                    id="marca"
                    type="text"
                    className="form-control"
                    name="marca"
                    placeholder="Ingrese la marca"
                    value={formData.marca.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        marca: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              <hr />

              {/* ENTRADA TIPO CAMION*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="idTipoCamion">Tipo Camion:</label>
                  </div>
                  <input
                    id="idTipoCamion"
                    type="text"
                    className="form-control"
                    name="idTipoCamion"
                    placeholder="Ingrese id del tipo camion"
                    value={formData.idTipoCamion.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        idTipoCamion: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA TAMAÑO CAMION*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="idTamanoCamion">Tamaño Camion:</label>
                  </div>

                  <input
                    id="idTamanoCamion"
                    type="text"
                    className="form-control"
                    name="idTamanoCamion"
                    placeholder="Ingrese su apellido"
                    value={formData.idTamanoCamion.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        idTamanoCamion: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              <hr />

              {/* ENTRADA DISPONIBILIDAD*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="disponibilidad">Disponibilidad:</label>
                  </div>

                  <input
                    id="disponibilidad"
                    type="text"
                    className="form-control"
                    name="disponibilidad"
                    placeholder="Disponibilidadr"
                    value={formData.disponibilidad.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        disponibilidad: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA REVISION TECNICA*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="revisionTecnica">Revision tecnica:</label>
                  </div>

                  <input
                    id="revisionTecnica"
                    type="text"
                    className="form-control"
                    name="revisionTecnica"
                    placeholder="Ingrese revision tecnica"
                    value={formData.revisionTecnica.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        revisionTecnica: e.target.value,
                      })
                    }}
                  />

                  <div className="invalid-feedback invalid-titulo"></div>
                </div>
              </div>

              {/* ENTRADA PATENTE*/}
              <div className="form-group">
                <div className="input-group mb-3 mt-3">
                  <div className="input-group-append input-group-text">
                    <label htmlFor="patente">Patente:</label>
                  </div>

                  <input
                    disabled={true}
                    id="patente"
                    type="text"
                    className="form-control"
                    name="patente"
                    placeholder="Ingrese su apellido"
                    value={formData.patente.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        patente: e.target.value,
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

export default EditarCamion
