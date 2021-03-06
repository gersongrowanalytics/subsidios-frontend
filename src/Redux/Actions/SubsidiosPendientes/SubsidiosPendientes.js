import config from '../../../config'
import {
    OBTENER_SUBSIDIOS_PENDIENTES,
    OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES,
    CARGANDO_ASIGNAR_FACTURAS_SUBSIDIOS_PENDIENTES,
    CARGANDO_ELIMINAR_FACTURA_SUBSIDIOS_PENDIENTES,
    CARGANDO_TABLA_SUBSIDIOS_PENDIENTES,
    CARGANDO_TABLA_FACTURAS_ASIGNAR,
    ASIGNAR_POSICION_PRIMARIO_SECUNDARIA_SUB_PENDIENTES
} from '../../../Constantes/SubsidiosPendientes/SubsidiosPendientes'
import { estadoRequestReducer } from "../EstadoRequest"
import { message } from 'antd';

export const ObtenerSubsidiosPendientesReducer = () => async (dispatch, getState) => {

    const {
        ComunesFechaInicio,
        ComunesFechaFinal
    } = getState().comunes

    dispatch({
        type: CARGANDO_TABLA_SUBSIDIOS_PENDIENTES,
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

    await fetch(config.api+'modulo/SubsidiosPendientes/mostrar',
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

        // console.log(data)
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){
            
            await dispatch({
                type: "SELECCIONAR_FACTURAS_ENVIAR_SUBSIDIOS_PENDIENTES",
                payload : []
            })

            let nuevaData = {...data}
            let descargassubsidiossipendientes = []
            // descargassubsidiossipendientes = await LimpiarArrayDescargaSubsidiosPendientesReducer(data.descargarSde)

            dispatch({
                type: OBTENER_SUBSIDIOS_PENDIENTES,
                payload : {
                    data : nuevaData.datos,
                    datareal : data.datos,
                    descarga : descargassubsidiossipendientes,
                    sumSde   : data.sumSde
                }
            })
			
		}else{
            
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_TABLA_SUBSIDIOS_PENDIENTES,
        payload : false
    })

}

export const LimpiarArrayDescargaSubsidiosPendientesReducer = async (subsidiosso) => {

    await subsidiosso[0]['data'].map((dato, posicion) => {
        subsidiosso[0]['data'][posicion].map((dat) => {
        dat.value = dat.value == null ?"" :dat.value
      })
    })
  
    return subsidiosso
}

export const ObtenerFacturasSubsidioPendienteReducer = (posicion, posicionData, sdecodigodestinatario) => async (dispatch, getState) => {

    let {
        data_subsidiossipendientes,
    } = getState().subsidiosPendientes
    
    if(data_subsidiossipendientes[posicion]['data'][posicionData]['facturasasignar']){
        if(data_subsidiossipendientes[posicion]['data'][posicionData]['facturasasignar'].length < 0){
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

            

            data_subsidiossipendientes[posicion]['data'][posicionData]['facturasasignar'] = data.datos

            dispatch({
                type: "ASIGNAR_POSICION_PRIMARIO_SECUNDARIA_SUB_PENDIENTES",
                payload:{
                    posicion : posicion,
                    posicionData : posicionData,
                }
            })


            let nuevaData = {...data_subsidiossipendientes}
            
            
            dispatch({
                type: OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES,
                payload : {
                    data: data_subsidiossipendientes,
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

export const AsignarFacturasSubsidioReducer = (sdeid, sdemontoareconocerreal, facturas) => async (dispatch, getState) => {

    let respuesta = true

    dispatch({
        type: CARGANDO_ASIGNAR_FACTURAS_SUBSIDIOS_PENDIENTES,
        payload : true
    })

    let {
        data_subsidiossipendientes, 
        facturas_asignadas_enviar_subpendientes
    } = getState().subsidiosPendientes

    // console.log(sdeid)
    // console.log(sdemontoareconocerreal)
    // console.log(facturas)

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
                // "facturas" : facturas
                "facturas" : facturas_asignadas_enviar_subpendientes
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
                await dispatch(ObtenerSubsidiosPendientesReducer())
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

export const EliminarFacturaAsignadaReducer = (dataFacturaEliminar) => async (dispatch, getState) => {

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
                await dispatch(ObtenerSubsidiosPendientesReducer())
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

