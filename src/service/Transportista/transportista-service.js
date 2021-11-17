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
