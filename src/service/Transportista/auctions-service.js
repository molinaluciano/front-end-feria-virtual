import axios from "axios";
import config from "../../config/endPoints";
import { getAllProducer } from "../../service/Productor/productor-service"
import { getTrucksByCarrierId } from "./trucks-service";
import { 
  getRequestById, 
  getQualityTypeById, 
  getUserById,
  getFruitById,
  } from "../../service/Productor/request-service"

require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const auctionParticipation = (form) => {
  console.log('form-service-received', form)
  const endPoint = config.endPoint.auctionParticipation;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        idDetalleSubasta: null,
        idSubasta: parseInt(form.idSubasta),
        idCamion: parseInt(form.idCamion),
        precio: parseInt(form.precio)
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getAuctionsByStatus = (status) => {
  const endPoint = config.endPoint.getAuctionsByStatus;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${status}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getAllAuctions = () => {
  const endPoint = config.endPoint.auctions;
  return new Promise((resolve, reject) => {
    instance
      .get(endPoint)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getAuctionsById = (auctionId) => {
  const endPoint = config.endPoint.auctionsById;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${auctionId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getAuctionsByRequests = (requestId) => {
  const endPoint = config.endPoint.auctions;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${requestId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getAuctionsByCarrier = async (carrierId) => {
  const getTrucks = await getTrucksByCarrierId(carrierId);
  const trucksIds = getTrucks.map(truck => truck.idCamion)
  const getAuctions = await getAllAuctions();
  const auctionWhoCarrierIsParticipating = [];

  const filterAuctionByTruck = (truck) => {
    const filteredAuctionByTruck = getAuctions.filter(auction => auction.camionSeleccionado == truck)
    return filteredAuctionByTruck;
  }

  const joinAuctions = (auctions) => {
    let joinedAuctions = [];
    for(let i=0; i < auctions.length; i++){
      for(let j=0; j < auctions[i].length; j++){
        joinedAuctions.push(auctions[i][j])
      }
    }
    return joinedAuctions
  }
  
  for (const truck of trucksIds){
    auctionWhoCarrierIsParticipating.push(filterAuctionByTruck(truck))
  }
  
  return joinAuctions(auctionWhoCarrierIsParticipating)

};

export const getAuctionDetailById = async (auctionId) => {
  const auctionDetailResponse = await getAuctionsById(auctionId);
  const requestId = auctionDetailResponse[0].idSolicitud;
  const getRequestByIdResponse = await getRequestById(requestId)
  const getProducers = await getAllProducer();
  const selectedProducerId = await getRequestByIdResponse[0].productorSeleccionado
  const producerInfo = getProducers.filter(x => x.idUsuario == selectedProducerId)
  const qualityId = getRequestByIdResponse[0].detallesSolicitud[0].idCalidad
  const userId = getRequestByIdResponse[0].idUsuario;
  const fruitId = getRequestByIdResponse[0].detallesSolicitud[0].idFruta;
  const qualityResponse = await getQualityTypeById(qualityId);
  const userInformation = await getUserById(userId);
  const fruitResponse = await getFruitById(fruitId);
  
  let kilos = getRequestByIdResponse[0].detallesSolicitud[0].kilos
  let quality = qualityResponse.calidad;
  let customerName = `${userInformation.nombre} ${userInformation.apellidoPaterno} ${userInformation.apellidoMaterno}`
  let customerPhone = userInformation.telefono;
  let customerMail = userInformation.correo;
  let fruta = fruitResponse.nombreFruta;
  let producerName = `${producerInfo[0].nombre} ${producerInfo[0].apellidoPaterno} ${producerInfo[0].apellidoMaterno}`;
  let producerMail = producerInfo[0].correo;
  let producerPhone = producerInfo[0].telefono;

  const auctionDetail = { 
    fruta: fruta,
    kilos: kilos,
    quality: quality,
    customerName: customerName,
    customerPhone: customerPhone,
    customerMail: customerMail,
    producerName: producerName,
    producerMail: producerMail,
    producerPhone: producerPhone
  }

  return auctionDetail;
};