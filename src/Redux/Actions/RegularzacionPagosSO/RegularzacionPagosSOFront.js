

export const DesplegarRegularizacionesPagosSOReducer = (posicion, ocultartodo = false) => async (dispatch, getState) => {

    let {
        data_regularizacion_pagos_so
    } = getState().regularzacionPagosSO

    if(ocultartodo == true){
        data_regularizacion_pagos_so.map(data => data.desplegado = false)
    }else{
        data_regularizacion_pagos_so[posicion]['desplegado'] = !data_regularizacion_pagos_so[posicion]['desplegado']
    }

    dispatch({
        type: "OBTENER_REGULARIZACION_PAGOS_SO_ONLY_DATA",
        payload : data_regularizacion_pagos_so
    })
}

export const DesplegarRegularizacionPagosSOReducer = (posicionZona, posicionSubsidio) => async (dispatch, getState) => {

    let {
        data_regularizacion_pagos_so, 
    } = getState().regularzacionPagosSO

    data_regularizacion_pagos_so[posicionZona]['data'][posicionSubsidio]["desplegado"] = !data_regularizacion_pagos_so[posicionZona]['data'][posicionSubsidio]["desplegado"]

    dispatch({
        type: "OBTENER_REGULARIZACION_PAGOS_SO_ONLY_DATA",
        payload : data_regularizacion_pagos_so
    })

}



export const CambiarCheckFiltroRegularizacionPendientesSoReducer = (
    campo, valor, check, borrarTodo = false, noseleccionados = []
) => async(dispatch, getState) => {

    const filtrosTablaSubsidiosSi = await getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so
    const data_subsidiossi_real =  await getState().regularzacionPagosSO.data_regularizacion_pagos_so_real

    if(borrarTodo == true){
        filtrosTablaSubsidiosSi[campo] = []
        await data_subsidiossi_real.map((zona) => {

            zona.data.map((data) => {
    
                data["check"] = true
    
            })
    
        })

        await data_subsidiossi_real.map((zona) => {

            zona.data.map((data) => {
                
                noseleccionados.map((noselect) => {
                    if(data[campo] == noselect){
                        data["check"] = false
                    }
                })
            })
    
        })

        filtrosTablaSubsidiosSi[campo] = noseleccionados

    }else{
        await data_subsidiossi_real.map((zona) => {

            zona.data.map((data) => {
    
                if(data[campo] == valor){
                    data["check"] = check
                }
    
            })
    
        })
        
        if(check == true){
            filtrosTablaSubsidiosSi[campo].map((val, pos) => {
                if(val == valor ){
                    filtrosTablaSubsidiosSi[campo].splice(pos,1)
                }
            })
        }else{
            filtrosTablaSubsidiosSi[campo].push(valor)
        }
    }

    dispatch(AplicarFiltrosSubsidiosSiReducer())
}

export const AplicarFiltrosSubsidiosSiReducer = () => async(dispatch, getState) => {

    const data_subsidiossi_real     = getState().regularzacionPagosSO.data_subsidiossi_real
    const clizonaFiltrados          = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.clizona
    const clitvFiltrados            = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.clitv
    const clihmlFiltrados           = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.clihml
    const clicodigoshiptoFiltrados  = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.clicodigoshipto
    const catnombreFiltrados        = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.catnombre
    const cosnombreFiltrados        = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.cosnombre
    const propresentacionFiltrados  = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.propresentacion
    const proskuFiltrados           = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.prosku
    const pronombreFiltrados        = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.pronombre
    const sdevalidadoFiltrados      = getState().regularzacionPagosSO.filtros_tabla_regularizacion_pagos_so.sdevalidado
    
    
    let datasubsidiosreal = await {  ...data_subsidiossi_real }
    let nuevoarray = []
    
    await data_subsidiossi_real.map(async(zona, pos) => {
        
        nuevoarray[pos] = { ...zona }
 
        let arrZon = []
        await zona.data.map((data) => {

            let agregar = true

            clizonaFiltrados.map((dato) => {
                if(data.clizona == dato ){
                    agregar = false
                }
            })

            clitvFiltrados.map((dato) => {
                if(data.clitv == dato ){
                    agregar = false
                }
            })

            clihmlFiltrados.map((dato) => {
                if(data.clihml == dato ){
                    agregar = false
                }
            })

            clicodigoshiptoFiltrados.map((dato) => {
                if(data.clicodigoshipto == dato ){
                    agregar = false
                }
            })

            catnombreFiltrados.map((dato) => {
                if(data.catnombre == dato ){
                    agregar = false
                }
            })

            cosnombreFiltrados.map((dato) => {
                if(data.cosnombre == dato ){
                    agregar = false
                }
            })

            propresentacionFiltrados.map((dato) => {
                if(data.propresentacion == dato ){
                    agregar = false
                }
            })

            proskuFiltrados.map((dato) => {
                if(data.prosku == dato ){
                    agregar = false
                }
            })

            pronombreFiltrados.map((dato) => {
                if(data.pronombre == dato ){
                    agregar = false
                }
            })

            sdevalidadoFiltrados.map((dato) => {
                if(data.sdevalidado == dato ){
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
        type: "OBTENER_REGULARIZACION_PAGOS_SO_ONLY_DATA",
        payload: nuevoarray
    })
}