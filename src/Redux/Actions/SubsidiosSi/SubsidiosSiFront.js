import {
    OBTENER_SUBSIDIOS_SI,
} from '../../../Constantes/SubsidiosSi/SubsidiosSi'

export const DesplegarSubsidiosSoReducer = (posicion, ocultartodo = false) => async (dispatch, getState) => {

    let {data_subsidiossi, data_descarga_subsidiossi, total_soles_subsidiossi} = getState().subsidiosSi

    if(ocultartodo == true){
        data_subsidiossi.map(data => data.desplegado = false)
    }else{
        data_subsidiossi[posicion]['desplegado'] = !data_subsidiossi[posicion]['desplegado']
    }

    dispatch({
        type: "OBTENER_SUBSIDIOS_SI_ONLY_DATA",
        payload : data_subsidiossi
    })
}

export const DesplegarFiltroColumnaReducer = (posicion) => (dispatch, getState) => {
    
    let {AgrupacionesColumnas_Subsidios_SI} = getState().subsidiosSi
    AgrupacionesColumnas_Subsidios_SI[posicion]['seleccionado'] = !AgrupacionesColumnas_Subsidios_SI[posicion]['seleccionado']
    dispatch({
        type: "OBTENER_FILTRO_COLUMNA_SUBSIDIOS_SI",
        payload: AgrupacionesColumnas_Subsidios_SI
    })
}

export const CambiarCheckFiltroSiReducer = (
    campo, valor, check, borrarTodo = false, noseleccionados = []
) => async(dispatch, getState) => {

    const filtrosTablaSubsidiosSi = await getState().subsidiosSi.filtrosTablaSubsidiosSi
    const data_subsidiossi_real =  await getState().subsidiosSi.data_subsidiossi_real

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

    const data_subsidiossi_real = getState().subsidiosSi.data_subsidiossi_real
    const sdeterritorioFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.sdeterritorio
    const clinombreFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.clinombre
    const clisuchmlFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.clisuchml
    const proskuFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.prosku
    const sdesacFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.sdesac
    const sdevalidadoFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.sdevalidado
    const sdesectorFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.sdesector
    const clizonaFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.clizona
    const catnombreFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.catnombre
    const propresentacionFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.propresentacion
    const clicodigoshiptoFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.clicodigoshipto
    const pronombreFiltrados = getState().subsidiosSi.filtrosTablaSubsidiosSi.pronombre
    
    let datasubsidiosreal = await {  ...data_subsidiossi_real }
    let nuevoarray = []
    
    await data_subsidiossi_real.map(async(zona, pos) => {
        
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
        // console.log(arrZon)
        nuevoarray[pos]['desplegado'] = false
        nuevoarray[pos]['data'] = arrZon
    })
    
    // console.log(nuevoarray)
    dispatch({
        type: "CAMBIAR_DATA_SUBSIDIOS_SI",
        payload: nuevoarray
    })
}