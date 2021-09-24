import config from '../../../config'
import {
    CARGANDO_EDITAR_CONTRASENIA_PERFIL,
    CARGANDO_EDITAR_CUMPLEANIOS_PERFIL,
    CARGANDO_EDITAR_TELEFONO_PERFIL,
    CARGANDO_EDITAR_IMAGEN_PERFIL
} from '../../../Constantes/Perfil/Perfil'
import { estadoRequestReducer } from "../EstadoRequest"
import { message } from 'antd';
import {LoginReducer} from '../Login/Login'

export const EditarCamposPerfilReducer = (
    campoEditar,
    contraseniaActual,
    contrasenia,
    cumpleanios,
    telefono
) => async (dispatch, getState) => {

    let editarCampo = false

    if(campoEditar == 1){
        dispatch({
            type: CARGANDO_EDITAR_CONTRASENIA_PERFIL,
            payload : true
        })
    }else if(campoEditar == 2){
        dispatch({
            type: CARGANDO_EDITAR_CUMPLEANIOS_PERFIL,
            payload : true
        })
    }else if(campoEditar == 3){
        dispatch({
            type: CARGANDO_EDITAR_TELEFONO_PERFIL,
            payload : true
        })
    }

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

    await fetch(config.api+'modulo/perfil/editar',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                campoEditar : campoEditar,
                contrasenia : contrasenia,
                cumpleanios : cumpleanios,
                telefono    : telefono,
                contraseniaActual : contraseniaActual,
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
                message.success(data.mensaje);
                if(campoEditar == 1){
                    await dispatch(LoginReducer({usuario: localStorage.getItem('usuario'), contrasenia: contrasenia}))
                }
                editarCampo = true;
            }else{
                message.error(data.mensaje);
            }
		}else{
            message.error("Error con el servidor, porfavor intentlo mas tarde");
        }

    }).catch((error)=> {
        console.log(error)
    });

    if(editarCampo == true){
        if(campoEditar == 2 || campoEditar == 3){
            await dispatch(LoginReducer({usuario: localStorage.getItem('usuario'), contrasenia: localStorage.getItem('contrasenia')}))
        }
    }

    if(campoEditar == 1){
        dispatch({
            type: CARGANDO_EDITAR_CONTRASENIA_PERFIL,
            payload : false
        })
    }else if(campoEditar == 2){
        dispatch({
            type: CARGANDO_EDITAR_CUMPLEANIOS_PERFIL,
            payload : false
        })
    }else if(campoEditar == 3){
        dispatch({
            type: CARGANDO_EDITAR_TELEFONO_PERFIL,
            payload : false
        })
    }

    return editarCampo
}

export const EditarImagenUsuarioPerfilReducer = (imagen) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_EDITAR_IMAGEN_PERFIL,
        payload: true
    })

    let respuesta = false

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

    await fetch(config.api+'modulo/perfil/editar/imagen',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'imagen' : imagen
            }),
			headers: headerFetch
		}
	)
	.then( async res => {
        
        await dispatch(estadoRequestReducer(res.status))
		return res.json()
		
	})
	.then(async data => {
        console.log(data)
        const estadoRequest = getState().estadoRequest.init_request

		if(estadoRequest == true){

            if(data.respuesta == true){
                message.success(data.mensaje);
                await dispatch(LoginReducer({usuario: localStorage.getItem('usuario'), contrasenia: localStorage.getItem('contrasenia')}))
                respuesta = true

            }else{
                message.error(data.mensaje);
            }
		}
	}).catch((error)=> {
        console.log("EditarImagenUsuarioPerfilReducer: "+error)
	});

    dispatch({
        type: CARGANDO_EDITAR_IMAGEN_PERFIL,
        payload: false
    })

    return respuesta
    
}