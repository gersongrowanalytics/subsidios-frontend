import {
    OBTENER_SUBSIDIOS_SO,
    SELECCIONAR_CLIENTE_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_PRODUCTO_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_CATEGORIA_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_TERRITORIO_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_ZONA_FILTRO_SUBSIDIOS_SO
} from '../../../Constantes/SubsidiosSo/SubsidiosSo'

export const DesplegarSubsidiosSoReducer = (posicion, ocultartodo = false) => async (dispatch, getState) => {

    let {data_subsidiosso, data_descarga_subsidiosso, total_soles_subsidiosso} = getState().subsidiosSo

    if(ocultartodo == true){
        data_subsidiosso.map(data => data.desplegado = false)
    }else{
        data_subsidiosso[posicion]['desplegado'] = !data_subsidiosso[posicion]['desplegado']
    }

    dispatch({
        type: "CAMBIAR_DATA_SUBSIDIOS_SO",
        payload: data_subsidiosso
    })
    // dispatch({
    //     type: OBTENER_SUBSIDIOS_SO,
    //     payload : {
    //         data : data_subsidiosso,
    //         descarga : data_descarga_subsidiosso,
    //         sumSde: total_soles_subsidiosso
    //     }
    // })

}

export const SeleccionarSolicitanteReducer = (estado, id, tipo) => (dispatch, getState) => {

    if(estado == false){
        id = 0
    }

    if(tipo == "FILTRAR_CLIENTES"){
        dispatch({
            type: SELECCIONAR_CLIENTE_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }else if(tipo == "FILTRAR_PRODUCTOS"){
        dispatch({
            type: SELECCIONAR_PRODUCTO_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }else if(tipo == "FILTRAR_CATEGORIAS"){
        dispatch({
            type: SELECCIONAR_CATEGORIA_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }else if(tipo == "FILTRAR_TERRITORIO"){
        dispatch({
            type: SELECCIONAR_TERRITORIO_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }else if(tipo == "FILTRAR_ZONAS"){
        dispatch({
            type: SELECCIONAR_ZONA_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }
}

export const DesplegarFiltroColumnaReducer = (posicion) => (dispatch, getState) => {
    
    let {AgrupacionesColumnas_Subsidios_SO} = getState().subsidiosSo
    AgrupacionesColumnas_Subsidios_SO[posicion]['seleccionado'] = !AgrupacionesColumnas_Subsidios_SO[posicion]['seleccionado']
    dispatch({
        type: "OBTENER_FILTRO_COLUMNA_SUBSIDIOS_SO",
        payload: AgrupacionesColumnas_Subsidios_SO
    })
}