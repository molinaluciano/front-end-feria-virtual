import axios from 'axios'
import config from '../../config/endPoints'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

const instance = axios.create({
  baseURL: API_URL,
})

export const getUserByIdType = (idType) => {
  const endPoint = `${config.endPoint.selectUser}/${idType}`
  return new Promise((resolve, reject) => {
    instance
      .get(endPoint)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)))
  })
}

export const getOnlyClient = async () => {
  let arrayAllClient = []
  try {
    const externClient = await getUserByIdType(2).catch(() => [])
    const localClient = await getUserByIdType(3).catch(() => [])
    const internClient = await getUserByIdType(4).catch(() => [])
    arrayAllClient = arrayAllClient.concat(
      ...externClient,
      ...localClient,
      ...internClient,
    )
  } catch (error) {
    console.log(
      'ERROR ~ file: getUsersService.js ~ line 24 ~ getOnlyClient ~ error',
      error,
    )
  }

  return arrayAllClient
}

export const deleteUser = async (idUser, idType) => {
  const endPoint = config.endPoint.deleteUser

  try {
    const { data } = await instance.delete(endPoint, {
      data: {
        idUsuario: idUser,
        idTipoUsuario: idType,
      },
    })

    return data
  } catch (error) {
    console.log(
      '🚀 ~ file: getUsersService.js ~ line 64 ~ deleteUser ~ error.response.data',
      error.response.data,
    )
    return error.response.data
  }
}

export const updateUser = async (form) => {
  const endPoint = config.endPoint.updateUser

  try {
    const { data } = await instance.put(endPoint, form)
    return data
  } catch (error) {
    console.log(
      '🚀 ~ file: getUsersService.js ~ line 73 ~ deleteUser ~ error.response.data',
      error.response.data,
    )
    return error.response.data
  }
}
