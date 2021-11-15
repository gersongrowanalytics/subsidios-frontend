import {
    OBTENER_FACTURAS_SI,
    CARGANDO_FACTURAS_SI,
    CARGANDO_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI,
    OBTENER_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI,

    OBTENER_FACTURAS_SI_BIGDATA,
    OBTENER_FACTURAS_SO_BIGDATA,
    OBTENER_MATERIALES_BIGDATA,
    OBTENER_CLIENTES_BIGDATA,
    CARGANDO_OBTENER_BIGDATA
} from "../../../Constantes/Facturas/Facturas";

const INIT_STATE = {
    data_facturas_si : [],
    cargando_facturas_si : false,
    data_descarga_facturas_si : [],

    // RECONOCIMIENTO
    cargando_reconocimiento_factura_si : false,
    data_reconocimiento_factura_si : [],
    total_reconocimiento_factura_si : "0",

    data_facturas_si_bigdata : [],
    data_des_facturas_si_bigdata : [],

    data_facturas_so_bigdata : [],
    data_des_facturas_so_bigdata : [],

    data_materiales_bigdata  : [],
    data_des_materiales_bigdata  : [],

    data_clientes_bigdata    : [],
    data_des_clientes_bigdata    : [],

    cargando_bigdata : false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_FACTURAS_SI: {
        return {
            ...state,
            data_facturas_si : action.payload.facturas,
            data_descarga_facturas_si : action.payload.descargar
        }
    }
    case CARGANDO_FACTURAS_SI: {
        return {
            ...state,
            cargando_facturas_si : action.payload
        }
    }
    case CARGANDO_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI: {
        return {
            ...state,
            cargando_reconocimiento_factura_si : action.payload
        }
    }
    case OBTENER_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI: {
        return {
            ...state,
            data_reconocimiento_factura_si : action.payload.datos,
            total_reconocimiento_factura_si : action.payload.total,
        }
    }

    // BIG DATA
    case CARGANDO_OBTENER_BIGDATA:{
        return{
            ...state,
            cargando_bigdata : action.payload
        }
    }

    case OBTENER_FACTURAS_SI_BIGDATA:{
        return {
            ...state,
            data_facturas_si_bigdata : action.payload.data,
            data_des_facturas_si_bigdata : action.payload.descargable
        }
    }

    case OBTENER_FACTURAS_SO_BIGDATA:{
        return {
            ...state,
            data_facturas_so_bigdata : action.payload.data,
            data_des_facturas_so_bigdata : action.payload.descargable,
        }
    }

    case OBTENER_MATERIALES_BIGDATA:{
        return {
            ...state,
            data_materiales_bigdata : action.payload.data,
            data_des_materiales_bigdata : action.payload.descargable,
        }
    }

    case OBTENER_CLIENTES_BIGDATA:{
        return {
            ...state,
            data_clientes_bigdata : action.payload.data,
            data_des_clientes_bigdata : action.payload.descargable,
        }
    }


    default:
      return state;
  }
}
