import {
    OBTENER_SUBSIDIOS_PENDIENTES,
    OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES
} from '../../../Constantes/SubsidiosPendientes/SubsidiosPendientes'

export const DesplegarSubsidiosPendientesReducer = (posicion) => async (dispatch, getState) => {

    let {
        data_subsidiossipendientes, 
        data_descarga_subsidiossipendientes,
        total_soles_subsidiossipendientes
    } = getState().subsidiosPendientes

    data_subsidiossipendientes[posicion]['desplegado'] = !data_subsidiossipendientes[posicion]['desplegado']

    dispatch({
        type: OBTENER_SUBSIDIOS_PENDIENTES,
        payload : {
            data     : data_subsidiossipendientes,
            descarga : data_descarga_subsidiossipendientes,
            sumSde   : total_soles_subsidiossipendientes
        }
    })
}

export const DesplegarSubsidioPendienteReducer = (posicionZona, posicionSubsidio) => async (dispatch, getState) => {

    let {
        data_subsidiossipendientes, 
        data_descarga_subsidiossipendientes,
        total_soles_subsidiossipendientes
    } = getState().subsidiosPendientes

    data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["desplegado"] = !data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["desplegado"]

    dispatch({
        type: OBTENER_SUBSIDIOS_PENDIENTES,
        payload : {
            data     : data_subsidiossipendientes,
            descarga : data_descarga_subsidiossipendientes,
            sumSde   : total_soles_subsidiossipendientes
        }
    })

}

export const CambiarImpactoFacturaAsignadaReducer = (
    posicionZona, 
    posicionSubsidio, 
    posicionFactura,
    impacto,
) => async (dispatch, getState) => {

    
    // console.log(posicionZona)
    // console.log(posicionSubsidio)
    // console.log(posicionFactura)
    // console.log(impacto)

    let {
        data_subsidiossipendientes, 
    } = getState().subsidiosPendientes


    data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["facturasasignar"][posicionFactura]['impacto'] = impacto

    if(impacto.length > 0){
        data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["facturasasignar"][posicionFactura]['seleccionado'] = true
    }else{
        data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["facturasasignar"][posicionFactura]['seleccionado'] = false
    }

    await dispatch({
        type: OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES,
        payload : data_subsidiossipendientes
    })

    return true
}

