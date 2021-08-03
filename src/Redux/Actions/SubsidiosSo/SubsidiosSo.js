import config from '../../../config'
import {
    OBTENER_SUBSIDIOS_SO,
    OBTENER_FILTROS_SUBSIDIOS_SO,
    CARGANDO_DATA_SUBSIDIOS_SO
} from '../../../Constantes/SubsidiosSo/SubsidiosSo'
import { estadoRequestReducer } from "../EstadoRequest"

export const ObtenerSubsidiosSoReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_DATA_SUBSIDIOS_SO,
        payload : true
    })

    const {
        ComunesFechaInicio,
        ComunesFechaFinal
    } = getState().comunes

    await fetch(config.api+'modulo/subsidiosSo/mostrar',
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
            let descargassubsidiosso = []
            descargassubsidiosso = await LimpiarArrayDescargaSubsidiosSoReducer(data.descargarSde)

            dispatch({
                type: OBTENER_SUBSIDIOS_SO,
                payload : {
                    data : data.datos,
                    descarga : descargassubsidiosso,
                    sumSde : data.sumSde
                }
            })
			
		}else{
            
        }

    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_DATA_SUBSIDIOS_SO,
        payload : false
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

export const ObtenerFiltrosReducer = () => async (dispatch, getState) => {
    await fetch(config.api+'modulo/subsidiosSo/mostrar-filtros',
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

		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){

            console.log("filtro")
            console.log(data)


            dispatch({
                type: OBTENER_FILTROS_SUBSIDIOS_SO,
                payload : {
                    solicitantes : data.solicitantes,
                    productos    : data.productos,
                    categorias   : data.categorias,
                    territorios  : data.territorios,
                    zonas        : data.zonas,
                }
            })
			
		}else{
            
        }
    }).catch((error)=> {
        
    });
}