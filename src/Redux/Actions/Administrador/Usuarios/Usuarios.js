import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"
import {
    OBTENER_USUARIOS_ADMINISTRADOR,
    CARGANDO_OBTENER_USUARIOS_USUARIOS
} from '../../../../Constantes/Administrador/Usuarios'

export const ObtenerUsuariosReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_OBTENER_USUARIOS_USUARIOS,
        payload : true
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

    await fetch(config.api+'modulo/administrador/mostrar/usuarios',
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

            dispatch({
                type: OBTENER_USUARIOS_ADMINISTRADOR,
                payload : data.data
            })
			
		}else{
            
        }

    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_OBTENER_USUARIOS_USUARIOS,
        payload : false
    })

}