import config from '../../../config'
import {
    OBTENER_FACTURAS_SI,
    CARGANDO_FACTURAS_SI,
    CARGANDO_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI,
    OBTENER_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI
} from '../../../Constantes/Facturas/Facturas'
import { estadoRequestReducer } from "../EstadoRequest"
import {ObtenerFiltrosFacturasReducer} from "./FacturasFront"

export const ObtenerFacturasSiReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_FACTURAS_SI,
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

    await fetch(config.api+'modulo/facturas/mostrar',
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


            dispatch(ObtenerFiltrosFacturasReducer(data.datos, "fsiclase"))
            dispatch(ObtenerFiltrosFacturasReducer(data.datos, "fsidestinatario"))
            dispatch(ObtenerFiltrosFacturasReducer(data.datos, "fsifactura"))
            dispatch(ObtenerFiltrosFacturasReducer(data.datos, "fsifecha"))
            dispatch(ObtenerFiltrosFacturasReducer(data.datos, "fsiid"))
            dispatch(ObtenerFiltrosFacturasReducer(data.datos, "fsipedido"))
            dispatch(ObtenerFiltrosFacturasReducer(data.datos, "fsipedidooriginal"))
            dispatch(ObtenerFiltrosFacturasReducer(data.datos, "fsisolicitante"))
            dispatch(ObtenerFiltrosFacturasReducer(data.datos, "fsivalorneto"))

            let descargasfacturassi = []
            descargasfacturassi = await LimpiarArrayDescargaSubsidiosSoReducer(data.descargarFds)

            dispatch({
                type: OBTENER_FACTURAS_SI,
                payload : {
                    facturas : data.datos,
                    descargar : descargasfacturassi,
                }
            })
			
		}else{
            
        }

    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_FACTURAS_SI,
        payload : false
    })

}

export const LimpiarArrayDescargaSubsidiosSoReducer = async (facturassi) => {

    await facturassi[0]['data'].map((dato, posicion) => {
        facturassi[0]['data'][posicion].map((dat) => {
        dat.value = dat.value == null ?"" :dat.value
      })
    })
  
    return facturassi
}

export const ObtenerReconocimientosFacturasSiReducer = (fdsid) => async (dispatch, getState) => {

    dispatch({
        type : CARGANDO_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI,
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

    await fetch(config.api+'modulo/facturas/mostrar/reconocimiento',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                "fdsid" : fdsid,
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
                type: OBTENER_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI,
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
        type : CARGANDO_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI,
        payload : false
    })

}