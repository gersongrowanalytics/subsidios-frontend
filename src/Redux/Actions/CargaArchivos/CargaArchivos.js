import config from '../../../config'
import React from 'react'
import { estadoRequestReducer } from "../EstadoRequest"
import {OBTENER_NOTIFICACIONES_CARGA_ARCHIVOS} from '../../../Constantes/CargaArchivos/CargaArchivos'
import axios from 'axios'
import {message} from "antd";

export const CargarArchivoReducer = (url, data) => async(dispatch, getState) => {

    let respuesta = false

    await axios.post(url, data,{
        mode:'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type': 'multipart/form-data',
            // 'api_token': localStorage.getItem('usutoken'),
            // 'api-token': localStorage.getItem('usutoken'),
        }
    })
    .then(rpta => {
        let datos = rpta.data
        if(datos.respuesta == true){
            respuesta = true
        }else{
            message.error(datos.mensaje);
        }
        dispatch(ObtenerNotificacionesReducer(datos.logs))

    })
    .catch((error)=> {
        console.log(error)
    });

    return respuesta
}

export const ObtenerNotificacionesReducer = (notificacion) => async (dispatch, getState) => {

    notificacion["TITULO"] = "Notificación 2"

    let notificaciones_cargaarchivos = getState().cargaArchivos.notificaciones_cargaarchivos

    notificaciones_cargaarchivos.unshift(notificacion)

    dispatch({
        type: OBTENER_NOTIFICACIONES_CARGA_ARCHIVOS,
        payload : notificaciones_cargaarchivos
    })

}
