import config from '../../../config'
import {
    OBTENER_SUBSIDIOS_SI,
    CARGANDO_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
    OBTENER_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI
} from '../../../Constantes/SubsidiosSi/SubsidiosSi'
import { estadoRequestReducer } from "../EstadoRequest"

export const ObtenerSubsidiosSiReducer = () => async (dispatch, getState) => {

    await fetch(config.api+'modulo/SubsidiosSi/mostrar',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({}),
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
            let descargassubsidiossi = []
            descargassubsidiossi = await LimpiarArrayDescargaSubsidiosSoReducer(data.descargarSde)

            dispatch({
                type: OBTENER_SUBSIDIOS_SI,
                payload : {
                    data : data.datos,
                    descarga : descargassubsidiossi,
                    sumSde : data.sumSde
                }
            })
			
		}else{
            
        }
    }).catch((error)=> {
        console.log(error)
    });

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

    await fetch(config.api+'modulo/SubsidiosSi/mostrar/notascreditos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                "pedidoOriginal" : pedidooriginal,
                "proid" : proid
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