import {
    OBTENER_NOTAS_CREDITO_EXCEL,
    CARGANDO_OBTENER_NOTAS_CREDITO_EXCEL,
    CARGANDO_OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO,
    OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO
} from '../../../Constantes/NotaCredito/NotaCredito'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

export const ObtenerNotaCreditoReducer = (nuevasZonas, nuevosTerritorios, nuevosDistribuidores, mostrarDataZona, mostrarDataTerritorio, mostrarDataDistribuidora, anio, mes) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_OBTENER_NOTAS_CREDITO_EXCEL,
        payload: true
    })

    let headerFetch = {
        'Accept' : 'application/json',
        'content-type': 'application/json',
    }

    if(config.produccion == true){
        headerFetch = {
            'Accept' : 'application/json',
            'content-type': 'application/json',
            'api_token': localStorage.getItem('usutoken'),
            'api-token': localStorage.getItem('usutoken'),
        }
    }

    let rutaDescargar = ""

    await fetch(config.api+'modulo/nota-credito/generar/excel-nota-credito',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                "anio" : anio,
                "mes" : mes,
                "filtrozonas" : mostrarDataZona,
                "filtroterritorio" : mostrarDataTerritorio,
                "filtrodistribuidor" : mostrarDataDistribuidora,
                "zonas" : nuevasZonas,
                "territorios" : nuevosTerritorios,
                "distribuidores" : nuevosDistribuidores,
            }),
			headers: headerFetch
      	}
    )
    .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
    })
    .then(async data => {

		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){
            
            if(data.respuesta == true){
                rutaDescargar = data.urlDescargar
            }
			
		}else{
            
        }

    }).catch((error)=> {
        console.log(error)
    });


    dispatch({
        type: CARGANDO_OBTENER_NOTAS_CREDITO_EXCEL,
        payload: false
    })

    return config.api+"/"+rutaDescargar
}

export const ObtenerDataDistribuidorasReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO,
        payload: true
    })

    let headerFetch = {
        'Accept' : 'application/json',
        'content-type': 'application/json',
    }

    if(config.produccion == true){
        headerFetch = {
            'Accept' : 'application/json',
            'content-type': 'application/json',
            'api_token': localStorage.getItem('usutoken'),
            'api-token': localStorage.getItem('usutoken'),
        }
    }

    await fetch(config.api+'modulo/nota-credito/mostrar/data-distribuidores',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({}),
			headers: headerFetch
      	}
    )
    .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
    })
    .then(async data => {

		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){
            
            if(data.respuesta == true){
                dispatch({
                    type: OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO,
                    payload : data.data
                })
            }
			
		}else{
            
        }

    }).catch((error)=> {
        console.log(error)
    });


    dispatch({
        type: CARGANDO_OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO,
        payload: false
    })

}

export const CambiarDataDistribuidoresReducer = (data) => async (dispatch) => {

    dispatch({
        type: OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO,
        payload : data
    })

}