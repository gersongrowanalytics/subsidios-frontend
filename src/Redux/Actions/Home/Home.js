import {
    OBTENER_ESTADOS_PENDIENTES_HOME,
    CARGANDO_DATA_ESTADOS_PENDIENTES_HOME
} from '../../../Constantes/Home/Home'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

export const ObtenerEstadosPendientesReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_DATA_ESTADOS_PENDIENTES_HOME,
        payload: true
    })

    const {
        ComunesFechaInicio,
        ComunesFechaFinal
    } = getState().comunes

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

    await fetch(config.api+'modulo/home/mostrar/estados-pendientes',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                fechaInicio : ComunesFechaInicio,
                fechaFinal  : ComunesFechaFinal,
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

            dispatch({
                type: OBTENER_ESTADOS_PENDIENTES_HOME,
                payload : {
                    status : data.datos,
                    statusdistribuidoras : data.espsDistribuidoras
                }
            })
			
		}else{
            
        }
        
    }).catch((error)=> {
        console.log(error)
    });


    dispatch({
        type: CARGANDO_DATA_ESTADOS_PENDIENTES_HOME,
        payload: false
    })

}

export const SeleccionarTprReducer = (posicionSelec) => async (dispatch, getState) => {

    const {
        data_estados_pendientes_home
    } = getState().home

    await data_estados_pendientes_home.map((estado_pendiente, posicion) => {
        
        data_estados_pendientes_home[posicion]['seleccionado'] = false

    })

    data_estados_pendientes_home[posicionSelec]['seleccionado'] = true

    dispatch({
        type: OBTENER_ESTADOS_PENDIENTES_HOME,
        payload : data_estados_pendientes_home
    })

}