import {
    MOSTRAR_FORMULARIO_LOGIN,
    OBTENER_LOGIN,
    MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN
} from "../../../Constantes/Login/Login";
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import { CargandoPaginaReducer, CargandoPaginaInicioReducer, CambiarFechaUnicoReducer } from "../Comunes/Comunes"

import {CambiarFechaReducer} from '../Comunes/Comunes'

export const MostrarFormularioReducer = (accion) => {
    return {
        type: MOSTRAR_FORMULARIO_LOGIN,
        payload: accion
    }
}

export const LoginReducer = (usuario) => async (dispatch, getState) => {

    let respuesta = false
    let mensaje = ""

    // dispatch(CargandoPaginaReducer(true))
    // dispatch(CargandoPaginaInicioReducer(true))

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

    await fetch(config.api+'login',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(usuario),
			headers: headerFetch
      	}
    )
    .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
    })
    .then(data => {
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){
            respuesta = data.respuesta
            mensaje = data.mensaje
			if(data.respuesta === true){
				localStorage.setItem('usuario', usuario.usuario)
				localStorage.setItem('contrasenia', usuario.contrasenia)
				localStorage.setItem('usuid', data.datos.usuid)
				localStorage.setItem('usutoken', data.datos.usutoken)
				localStorage.setItem('usuusuario', data.datos.usuusuario)
				localStorage.setItem('pernombre', data.datos.pernombre)
				localStorage.setItem('tpuprivilegio', data.datos.tpuprivilegio)


                let fecha = data.fecha.fecfecha.split("-");
                var Xmas95 = new Date(fecha[0], fecha[1]-1, fecha[2])

                dispatch(CambiarFechaReducer(Xmas95, null))
                dispatch(CambiarFechaUnicoReducer(Xmas95, null))

				dispatch({
					type: OBTENER_LOGIN,
					payload: {
                        usuid   : data.datos.usuid,
                        usuario : data.datos,
                        subpendientes : data.subsidiospendientes,
                        fechaActualizacion : data.fechaActualizacion,
                        mesespendientes : data.mesespendientes,
                    }
				});

                dispatch({
                    type: MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN,
                    payload: data.mostrarterminos
                })

                dispatch({
                    type: "ACTUALIZAR_DATOS_USUARIO_LOGEADO",
                    payload : data.datos
                })

			}else{
				dispatch({
					type: OBTENER_LOGIN,
					payload: {
                        usuid   : null,
                        usuario : {}
                    }
				});
			}
		}else{
            respuesta = false
            mensaje = "Lo sentimos, login corrupto"

            dispatch({
                type: OBTENER_LOGIN,
                payload: {
                    usuid   : null,
                    usuario : {}
                }
            });
        }
    }).catch((error)=> {
        respuesta = false
        mensaje = error

        console.log(error)
        dispatch({
            type: OBTENER_LOGIN,
            payload: {
                usuid   : null,
                usuario : {}
            }
        });
    });

    return {
        respuesta : respuesta,
        mensaje : mensaje
    }
}

export const CerrarSesionReducer = () => async (dispatch, getState) => {

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

    await fetch(config.api+'cerrar-session',
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
    .then(data => {
		
        const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){
            
			
		}else{
            
        }

    }).catch((error)=> {
        console.log(error)
    });

    localStorage.removeItem('usuario')
    localStorage.removeItem('contrasenia')
    localStorage.removeItem('usuid')
    localStorage.removeItem('usutoken')
    localStorage.removeItem('usuusuario')
    localStorage.removeItem('pernombre')
    localStorage.removeItem('tpuprivilegio')

    localStorage.removeItem('cookiesaceptadas')

    await dispatch ({
        type: OBTENER_LOGIN,
        payload: {
            usuid   : null,
            usuario : {}
        }
    })

    window.location.reload(); 

}

export const ValidarUsuarioConectadoReducer = () => async (dispatch, getState) => {

    // console.log("LOCAL STORAGE:")
    // console.log(localStorage.getItem('otros'))

    if(localStorage.getItem('usuid')){
        console.log('SI EXISTE')
        // console.log(localStorage.getItem('usuid'))
        // console.log(localStorage.getItem('contrasenia'))
        await dispatch(LoginReducer({usuario: localStorage.getItem('usuario'), contrasenia: localStorage.getItem('contrasenia')}))

    }else{
        console.log('no existe')
        
    }

    dispatch(CargandoPaginaInicioReducer(false))
    dispatch(CargandoPaginaReducer(false))



}

export const RecuperarContraseniaReducer = (usuario) => async (dispatch, getState) => {
    
    let respuesta = false
    let mensaje = ""

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

    await fetch(config.api+'enviar-correo',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(usuario),
			headers: headerFetch
      	}
    )
    .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
    })
    .then(data => {
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){
            respuesta = data.respuesta
            mensaje = data.mensaje
			if(data.respuesta === true){
				


			}else{
				
			}
            
		}else{
            respuesta = false
            mensaje = "Lo sentimos, recuperar contraseña corrupto"

        }
    }).catch((error)=> {
        respuesta = false
        mensaje = error
        console.log(error)
    });

    return {
        respuesta : respuesta,
        mensaje : mensaje
    }
}

export const CambiarContraseniaReducer = (usuario) => async (dispatch, getState) => {
    let respuesta = false
    let mensaje = ""
    let correo = ""

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

    await fetch(config.api+'cambiar-contrasenia',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(usuario),
			headers: headerFetch
      	}
    )
    .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
    })
    .then(data => {
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){
            respuesta = data.respuesta
            correo = data.correo
            mensaje = data.mensaje
			if(data.respuesta === true){
				


			}else{
				
			}
            
		}else{
            respuesta = false
            mensaje = "Lo sentimos, el cambio de contraseña ha expirado"

        }
    }).catch((error)=> {
        respuesta = false
        mensaje = error
        console.log(error)
    });

    return {
        respuesta : respuesta,
        mensaje : mensaje,
        correo : correo
    }
}

export const CerrarSubsidiosPendientes = () => async (dispatch, getState) => {

    const subpendientes = getState().login.subpendientes

    dispatch({
        type: "CERRAR_SUBSIDIOS_PENDIENTES_LOGIN",
        payload: !subpendientes
    })

}

export const LoginUsaurioCambiar = () => (dispatch, getState) => {
    dispatch({
        type: "ACTUALIZAR_DATOS_USUARIO_LOGEADO",
        payload: {
            usuaceptoterminos : true
        }
    })
}