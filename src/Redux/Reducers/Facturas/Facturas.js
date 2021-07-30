import {
    OBTENER_FACTURAS_SI,
    CARGANDO_FACTURAS_SI,
    CARGANDO_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI,
    OBTENER_RECONOCIMIENTOS_FACTURA_SI_FACTURAS_SI
} from "../../../Constantes/Facturas/Facturas";

const INIT_STATE = {
    data_facturas_si : [],
    cargando_facturas_si : false,

    // RECONOCIMIENTO
    cargando_reconocimiento_factura_si : false,
    data_reconocimiento_factura_si : [],
    total_reconocimiento_factura_si : "0"
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_FACTURAS_SI: {
        return {
            ...state,
            data_facturas_si : action.payload
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
    default:
      return state;
  }
}
