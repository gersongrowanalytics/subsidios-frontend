import config from '../../../config'
import {
    OBTENER_SUBSIDIOS_PENDIENTES,
    OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES,
    CARGANDO_ASIGNAR_FACTURAS_SUBSIDIOS_PENDIENTES,
    CARGANDO_ELIMINAR_FACTURA_SUBSIDIOS_PENDIENTES,
    CARGANDO_TABLA_SUBSIDIOS_PENDIENTES,
    CARGANDO_TABLA_FACTURAS_ASIGNAR
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

    await fetch(config.api+'modulo/SubsidiosPendientes/mostrar',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                fechaInicio : ComunesFechaInicio,
                fechaFinal  : ComunesFechaFinal,
            }),
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json'
			}
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
            let descargassubsidiossipendientes = []
            // descargassubsidiossipendientes = await LimpiarArrayDescargaSubsidiosPendientesReducer(data.descargarSde)

            dispatch({
                type: OBTENER_SUBSIDIOS_PENDIENTES,
                payload : {
                    data     : data.datos,
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

    await fetch(config.api+'modulo/SubsidiosPendientes/mostrar/facturas',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'sdecodigodestinatario' : sdecodigodestinatario
            }),
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json'
			}
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
                type: OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES,
                payload : data_subsidiossipendientes
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

    // console.log(sdeid)
    // console.log(sdemontoareconocerreal)
    // console.log(facturas)

    await fetch(config.api+'modulo/SubsidiosPendientes/asignar-facturas',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                "sdeid" : sdeid,
                "sdemontoareconocerreal" : sdemontoareconocerreal,
                "facturas" : facturas
            }),
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json'
			}
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

    console.log(dataFacturaEliminar)

    await fetch(config.api+'modulo/SubsidiosPendientes/eliminar-facturas',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(dataFacturaEliminar),
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json'
			}
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