import config from '../../../config'
import {
    OBTENER_SUBSIDIOS_SO,
    OBTENER_FILTROS_SUBSIDIOS_SO,
    CARGANDO_DATA_SUBSIDIOS_SO,
    CARGANDO_ARCHIVO_EXCEPCIONES_SO,
    
} from '../../../Constantes/SubsidiosSo/SubsidiosSo'
import { estadoRequestReducer } from "../EstadoRequest"
import {message} from "antd";
import axios from 'axios'

export const ObtenerSubsidiosSoReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_DATA_SUBSIDIOS_SO,
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

    await fetch(config.api+'modulo/subsidiosSo/mostrar',
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
            let descargassubsidiosso = []
            let nuevaData = {...data}
            descargassubsidiosso = await LimpiarArrayDescargaSubsidiosSoReducer(data.descargarSde)

            dispatch({
                type: OBTENER_SUBSIDIOS_SO,
                payload : {
                    data : nuevaData.datos,
                    datareal : data.datos,
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

    await fetch(config.api+'modulo/subsidiosSo/mostrar-filtros',
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

export const AplicarFiltrosSubsidiosSoReducer = () => async(dispatch, getState) => {

    const data_subsidiosso_real = getState().subsidiosSo.data_subsidiosso_real
    const sdeterritorioFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.sdeterritorio
    const clinombreFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.clinombre
    const clisuchmlFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.clisuchml
    const proskuFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.prosku
    const sdesacFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.sdesac
    const sdevalidadoFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.sdevalidado
    const sdesectorFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.sdesector
    const clizonaFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.clizona
    const catnombreFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.catnombre
    const propresentacionFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.propresentacion
    const clicodigoshiptoFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.clicodigoshipto
    const pronombreFiltrados = getState().subsidiosSo.filtrosTablaSubsidiosSo.pronombre
    
    // console.log(sdeterritorioFiltrados)

    let datasubsidiosreal = await {  ...data_subsidiosso_real }
    let nuevoarray = []
    // console.log(datasubsidiosreal)
    // console.log(datasubsidiosreal[0])
    await data_subsidiosso_real.map(async(zona, pos) => {
        
        nuevoarray[pos] = { ...zona }
        // nuevoarray[pos]['data'] = []
        let arrZon = []
        await zona.data.map((data) => {

            let agregar = true

            sdeterritorioFiltrados.map((territorio) => {
                if(data.sdeterritorio == territorio ){
                    agregar = false
                }
            })

            clinombreFiltrados.map((campo) => {
                if(data.clinombre == campo ){
                    agregar = false
                }
            })

            clisuchmlFiltrados.map((campo) => {
                if(data.clisuchml == campo ){
                    agregar = false
                }
            })

            proskuFiltrados.map((campo) => {
                if(data.prosku == campo ){
                    agregar = false
                }
            })

            sdesacFiltrados.map((campo) => {
                if(data.sdesac == campo ){
                    agregar = false
                }
            })

            sdevalidadoFiltrados.map((campo) => {
                if(data.sdevalidado == campo ){
                    agregar = false
                }
            })

            sdesectorFiltrados.map((campo) => {
                if(data.sdesector == campo ){
                    agregar = false
                }
            })

            clizonaFiltrados.map((campo) => {
                if(data.clizona == campo ){
                    agregar = false
                }
            })

            catnombreFiltrados.map((campo) => {
                if(data.catnombre == campo ){
                    agregar = false
                }
            })

            propresentacionFiltrados.map((campo) => {
                if(data.propresentacion == campo ){
                    agregar = false
                }
            })

            clicodigoshiptoFiltrados.map((campo) => {
                if(data.clicodigoshipto == campo ){
                    agregar = false
                }
            })

            pronombreFiltrados.map((campo) => {
                if(data.pronombre == campo ){
                    agregar = false
                }
            })

            if(agregar == true){
                arrZon.push({...data})
            }
        })
        
        nuevoarray[pos]['desplegado'] = false
        nuevoarray[pos]['data'] = arrZon
    })
    
    dispatch({
        type: "CAMBIAR_DATA_SUBSIDIOS_SO",
        payload: nuevoarray
    })
}

export const CambiarCheckFiltroSoReducer = (
    campo, valor, check, borrarTodo = false, noseleccionados = []
) => async(dispatch, getState) => {

    let filtrosTablaSubsidiosSo = await getState().subsidiosSo.filtrosTablaSubsidiosSo
    let data_subsidiosso_real =  await getState().subsidiosSo.data_subsidiosso_real

    // console.log(filtrosTablaSubsidiosSo)
    // console.log(data_subsidiosso_real)

    if(borrarTodo == true){
        filtrosTablaSubsidiosSo[campo] = []
        await data_subsidiosso_real.map((zona) => {

            zona.data.map((data) => {
    
                data["check"] = check
    
            })
    
        })

        await data_subsidiosso_real.map((zona) => {

            zona.data.map((data) => {
                
                noseleccionados.map((noselect) => {
                    if(data[campo] == noselect){
                        data["check"] = false
                    }
                })
            })
    
        })

        filtrosTablaSubsidiosSo[campo] = noseleccionados

    }else{
        await data_subsidiosso_real.map((zona) => {

            zona.data.map((data) => {
    
                if(data[campo] == valor){
                    data["check"] = check
                }
    
            })
    
        })
        
        if(check == true){
            filtrosTablaSubsidiosSo[campo].map((val, pos) => {
                if(val == valor ){
                    filtrosTablaSubsidiosSo[campo].splice(pos,1)
                }
            })
        }else{
            filtrosTablaSubsidiosSo[campo].push(valor)
        }
    }

    dispatch(AplicarFiltrosSubsidiosSoReducer())
}

export const CambiarCheckVariosFiltroReducer = (campo, valor) => (dispatch, getState) => {
    // const data_subsidiosso_real = getState().subsidiosSo.data_subsidiosso_real
    
    // await data_subsidiosso_real.map((zona) => {

    //     zona.data.map((data) => {

    //         if(data[campo] == valor){
    //             data["check"] = true
    //         }else{
    //             data["check"] = false
    //         }

    //     })

    // })

    // const filtrosTablaSubsidiosSo = getState().subsidiosSo.filtrosTablaSubsidiosSo
    
    // if(check.target.checked == true){
    //     filtrosTablaSubsidiosSo[campo].map((val, pos) => {
    //         if(val == valor ){
    //             filtrosTablaSubsidiosSo[campo].splice(pos,1)
    //         }
    //     })
    // }else{
    //     filtrosTablaSubsidiosSo[campo].push(valor)
    // }

    // dispatch(AplicarFiltrosSubsidiosSoReducer())
}

export const CargarArchivoExcepcionesReducer = (archivo) => async (dispatch, getState) => {
    
    let respuesta = true

    const formData = new FormData();
    formData.append('file', archivo)

    dispatch({
        type: CARGANDO_ARCHIVO_EXCEPCIONES_SO,
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

    await axios.post(config.api+'modulo/subsidiosSo/cargar/excepciones', formData,{
        mode:'cors',
        headers: headerFetch
    })
    .then(rpta => {
        let datos = rpta.data
        if(datos.respuesta == true){
            message.success(datos.mensaje);
        }else{
            message.error(datos.mensaje);
            respuesta = false
        }
        

    })
    .catch((error)=> {
        console.log(error)
    });

    

    dispatch({
        type: CARGANDO_ARCHIVO_EXCEPCIONES_SO,
        payload : false
    })

    return respuesta
}