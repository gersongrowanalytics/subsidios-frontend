import {
    OBTENER_ARCHIVOS_CONTROL_ARCHIVOS,
    CARGANDO_ARCHIVOS_CONTROL_ARCHIVOS
} from "../../../../Constantes/Administrador/ControlArchivos";
import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"

export const ObtenerControlArchivosReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_ARCHIVOS_CONTROL_ARCHIVOS,
        payload : true
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

    await fetch(config.api+'modulo/administrador/mostrar/control-archivos',
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
            
            if(data.respuesta == true){
                dispatch({
                    type: OBTENER_ARCHIVOS_CONTROL_ARCHIVOS,
                    payload : data.datos
                })
            }
			
		}else{
            
        }

    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_ARCHIVOS_CONTROL_ARCHIVOS,
        payload : false
    })

}