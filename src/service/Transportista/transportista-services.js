import axios from 'axios'
import config from '../../config/endPoints'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

const instance = axios.create({
  baseURL: API_URL,
})

export const getAllCarrier = async () => {
  const endPoint = config.endPoint.selectCarrier
  let carriers = []
  try {
    const { data } = await instance.get(endPoint)
    carriers = data
  } catch (error) {
    console.log(
      '🚀 ~ file: transportista-services.js ~ line 17 ~ getAllCarrier ~ error',
      error,
    )
  }

  return carriers
}

export const getAllTruckByCarrier = async (id) => {
  const endPoint = `${config.endPoint.selectTruckByCarrier}/${id} `
  let trucks = []
  try {
    const { data } = await instance.get(endPoint)
    trucks = data
  } catch (error) {
    console.log(
      '🚀 ~ file: transportista-services.js ~ line 34 ~ getAllTruckByCarrier ~ error',
      error,
    )
  }

  return trucks
}

export const deleteTruck = async (id) => {
  const endPoint = `${config.endPoint.deleteTruck}/${id}`

  try {
    const { data } = await instance.delete(endPoint)

    return data
  } catch (error) {
    console.log(
      '🚀 ~ file: transportista-services.js ~ line 51 ~ deleteTruck ~ error',
      error,
    )

    return error.response.data
  }
}

export const updateTruck = async (form) => {
  const endPoint = config.endPoint.updateTruck

  try {
    const { data } = await instance.put(endPoint, form)
    return data
  } catch (error) {
    console.log(
      '🚀 ~ file: transportista-services.js ~ line 66 ~ updateTruck ~ error',
      error,
    )

    return error.response.data
  }
}
