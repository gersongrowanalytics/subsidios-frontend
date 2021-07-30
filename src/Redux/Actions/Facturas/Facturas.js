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

    await fetch(config.api+'modulo/facturas/mostrar',
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

            dispatch({
                type: OBTENER_FACTURAS_SI,
                payload : data.datos
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

export const ObtenerReconocimientosFacturasSiReducer = (fdsid) => async (dispatch, getState) => {

    dispatch({
        type : CARGANDO_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI,
        payload : true
    })

    await fetch(config.api+'modulo/facturas/mostrar/reconocimiento',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                "fdsid" : fdsid,
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