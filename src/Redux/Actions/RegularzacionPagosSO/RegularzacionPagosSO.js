import config from '../../../config'
import {
    OBTENER_REGULARIZACION_PAGOS_SO,
    CARGANDO_TABLA_REGULARIZACION_PAGOS_SO,
    CARGANDO_TABLA_FACTURAS_ASIGNAR
} from '../../../Constantes/RegularzacionPagosSO/RegularzacionPagosSO'
import { estadoRequestReducer } from "../EstadoRequest"
import { message } from 'antd';
import {
    CARGANDO_ASIGNAR_FACTURAS_SUBSIDIOS_PENDIENTES,
    CARGANDO_ELIMINAR_FACTURA_SUBSIDIOS_PENDIENTES
} from '../../../Constantes/SubsidiosPendientes/SubsidiosPendientes'

export const ObtenerRegularizacionPagosSoReducer = () => async (dispatch, getState) => {

    const {
        ComunesFechaInicio,
        ComunesFechaFinal
    } = getState().comunes

    dispatch({
        type: CARGANDO_TABLA_REGULARIZACION_PAGOS_SO,
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

    await fetch(config.api+'modulo/regularizacion-so/mostrar',
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
            
            let nuevaData = {...data}

            dispatch({
                type: OBTENER_REGULARIZACION_PAGOS_SO,
                payload : {
                    data : nuevaData.datos,
                    datareal : data.datos,
                }
            })
			
		}else{
            
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_TABLA_REGULARIZACION_PAGOS_SO,
        payload : false
    })

}

export const ObtenerFacturasRegularizacionesPagosSOReducer = (posicion, posicionData, sdecodigodestinatario) => async (dispatch, getState) => {

    let {
        data_regularizacion_pagos_so,
    } = getState().regularzacionPagosSO
    
    if(data_regularizacion_pagos_so[posicion]['data'][posicionData]['facturasasignar']){
        if(data_regularizacion_pagos_so[posicion]['data'][posicionData]['facturasasignar'].length < 0){
            dispatch({
                type: CARGANDO_TABLA_FACTURAS_ASIGNAR,
                payload : true
            })
        }
    }else{
        dispatch({
            type: CARGANDO_TABLA_FACTURAS_ASIGNAR,
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

    await fetch(config.api+'modulo/SubsidiosPendientes/mostrar/facturas',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'sdecodigodestinatario' : sdecodigodestinatario
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

            

            data_regularizacion_pagos_so[posicion]['data'][posicionData]['facturasasignar'] = data.datos

            // dispatch({
            //     type: "ASIGNAR_POSICION_PRIMARIO_SECUNDARIA_SUB_PENDIENTES",
            //     payload:{
            //         posicion : posicion,
            //         posicionData : posicionData,
            //     }
            // })


            let nuevaData = {...data_regularizacion_pagos_so}
            
            
            dispatch({
                type: OBTENER_REGULARIZACION_PAGOS_SO,
                payload : {
                    data: data_regularizacion_pagos_so,
                    datareal: nuevaData
                }
            })



            // 
            let nuevaDataFacturas = {...data}

            dispatch({
                type: "OBTENER_FACTURAS_ASIGNAR_SUBSIDIOS_PENDIENTES",
                payload:{
                    data: data.datos,
                    datareal: nuevaDataFacturas.datos
                }
            })
			
		}else{
            
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_TABLA_FACTURAS_ASIGNAR,
        payload : false
    })

}

export const AsignarFacturasRegularizacionReducer = (sdeid, sdemontoareconocerreal, facturas) => async (dispatch, getState) => {

    let respuesta = true

    dispatch({
        type: CARGANDO_ASIGNAR_FACTURAS_SUBSIDIOS_PENDIENTES,
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

    await fetch(config.api+'modulo/SubsidiosPendientes/asignar-facturas',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                "sdeid" : sdeid,
                "sdemontoareconocerreal" : sdemontoareconocerreal,
                "facturas" : facturas
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
            
            respuesta = data.respuesta

            if(data.respuesta == true){
                message.success(data.mensaje);
                await dispatch(ObtenerRegularizacionPagosSoReducer())
            }else{
                message.error(data.mensaje);
            }
			
		}else{
            message.error("Error con el servidor, porfavor intentlo mas tarde");
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_ASIGNAR_FACTURAS_SUBSIDIOS_PENDIENTES,
        payload : false
    })

    return respuesta

}


export const EliminarFacturaAsignadaRegularizacionReducer = (dataFacturaEliminar) => async (dispatch, getState) => {

    let respuesta = true

    dispatch({
        type: CARGANDO_ELIMINAR_FACTURA_SUBSIDIOS_PENDIENTES,
        payload : true
    })

    // console.log(dataFacturaEliminar)

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

    await fetch(config.api+'modulo/SubsidiosPendientes/eliminar-facturas',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(dataFacturaEliminar),
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
            
            respuesta = data.respuesta

            if(data.respuesta == true){
                message.success(data.mensaje);
                await dispatch(ObtenerRegularizacionPagosSoReducer())
            }else{
                message.error(data.mensaje);
            }
			
		}else{
            message.error("Error con el servidor, porfavor intentlo mas tarde");
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_ELIMINAR_FACTURA_SUBSIDIOS_PENDIENTES,
        payload : false
    })

    return respuesta

}
