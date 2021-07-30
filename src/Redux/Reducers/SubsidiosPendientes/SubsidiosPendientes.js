import {
    OBTENER_SUBSIDIOS_PENDIENTES,
    OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES,
    CARGANDO_ASIGNAR_FACTURAS_SUBSIDIOS_PENDIENTES,
    CARGANDO_ELIMINAR_FACTURA_SUBSIDIOS_PENDIENTES
} from '../../../Constantes/SubsidiosPendientes/SubsidiosPendientes'

const INIT_STATE = {
    data_subsidiossipendientes : [],
    data_descarga_subsidiossipendientes : [],
    total_soles_subsidiossipendientes : "0",

    data_facturas_subsidiossipendientes : [],

    cargando_asignar_facturas_subsidiossipendientes : false,
    cargando_eliminar_facturas_subsidiossipendientes : false,
    
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_SUBSIDIOS_PENDIENTES: {
        return {
            ...state,
            data_subsidiossipendientes : action.payload.data,
            data_descarga_subsidiossipendientes : action.payload.descarga,
            total_soles_subsidiossipendientes   : action.payload.sumSde
        }
    }
    case OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES: {
        return {
            ...state,
            data_subsidiossipendientes : action.payload
        }
    }
    case CARGANDO_ASIGNAR_FACTURAS_SUBSIDIOS_PENDIENTES:{
        return {
            ...state,
            cargando_asignar_facturas_subsidiossipendientes : action.payload
        }
    }
    case CARGANDO_ELIMINAR_FACTURA_SUBSIDIOS_PENDIENTES:{
        return{
            ...state,
            cargando_eliminar_facturas_subsidiossipendientes : action.payload
        }
    }
    default:
      return state;
  }
}
