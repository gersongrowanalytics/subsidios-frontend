import config from '../../../config'
import {
    OBTENER_SUBSIDIOS_SI,
    CARGANDO_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
    OBTENER_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
    CARGANDO_DATA_SUBSIDIOS_SI,
    CARGANDO_FACTURAS_ASIGNADAS_SUBSIDIOS_SI,
    OBTENER_FACTURAS_ASIGNADAS_SUBSIDIOS_SI,
    CARGANDO_DESCARGA_SUBSIDIOS_SI,
    OBTENER_DESCARGA_SUBSIDIOS_SI
} from '../../../Constantes/SubsidiosSi/SubsidiosSi'
import { estadoRequestReducer } from "../EstadoRequest"

export const ObtenerSubsidiosSiReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_DATA_SUBSIDIOS_SI,
        payload: true
    })

    dispatch({
        type: OBTENER_SUBSIDIOS_SI,
        payload : {
            data : [],
            descarga : [],
            sumSde : "0"
        }
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

    await fetch(config.api+'modulo/SubsidiosSi/mostrar',
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
            let descargassubsidiossi = []
            let nuevaData = {...data}

            // if(data.descargarSde.length > 0){
            //     descargassubsidiossi = await LimpiarArrayDescargaSubsidiosSoReducer(data.descargarSde)
            // }

            dispatch({
                type: OBTENER_SUBSIDIOS_SI,
                payload : {
                    data : nuevaData.datos,
                    datareal : data.datos,
                    descarga : descargassubsidiossi,
                    sumSde : data.sumSde
                }
            })
			
		}else{
            
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_DATA_SUBSIDIOS_SI,
        payload: false
    })

    dispatch(ObtenerDescargaSubsidiosSiReducer())

}

export const ObtenerDescargaSubsidiosSiReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_DESCARGA_SUBSIDIOS_SI,
        payload: true
    })

    dispatch({
        type: OBTENER_DESCARGA_SUBSIDIOS_SI,
        payload : []
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

    await fetch(config.api+'modulo/SubsidiosSi/mostrar-subsidios-descarga',
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
            let descargassubsidiossi = []
            descargassubsidiossi = await LimpiarArrayDescargaSubsidiosSoReducer(data.descargarSde)

            dispatch({
                type: OBTENER_DESCARGA_SUBSIDIOS_SI,
                payload : descargassubsidiossi
            })
			
		}else{
            
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_DESCARGA_SUBSIDIOS_SI,
        payload: false
    })

}

export const LimpiarArrayDescargaSubsidiosSoReducer = async (subsidiosso) => {

    await subsidiosso[0]['data'].map((dato, posicion) => {
        subsidiosso[0]['data'][posicion].map((dat) => {
        dat.value = dat.value == null ?"" :dat.value
      })
    })
  
    return subsidiosso
}

export const ObtenerNotasCreditoFacturaSiReducer = (pedidooriginal, proid) => async (dispatch, getState) => {

    dispatch({
        type : CARGANDO_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
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

    await fetch(config.api+'modulo/SubsidiosSi/mostrar/notascreditos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                "pedidoOriginal" : pedidooriginal,
                "proid" : proid
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

            dispatch({
                type: OBTENER_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
                payload : {
                    datos : data.datos,
                    total : data.total,
                }
            })
			
		}else{
            
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type : CARGANDO_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
        payload : false
    })

}

export const ObtenerFacturasAsignadasReducer = (sdeid) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_FACTURAS_ASIGNADAS_SUBSIDIOS_SI,
        payload: true
    })

    dispatch({
        type: OBTENER_FACTURAS_ASIGNADAS_SUBSIDIOS_SI,
        payload : []
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

    await fetch(config.api+'modulo/SubsidiosSi/mostrar-facturas-asignadas',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                "sdeid" : sdeid
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
                type: OBTENER_FACTURAS_ASIGNADAS_SUBSIDIOS_SI,
                payload : data.datos
            })
			
		}else{
            
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_FACTURAS_ASIGNADAS_SUBSIDIOS_SI,
        payload: false
    })



}