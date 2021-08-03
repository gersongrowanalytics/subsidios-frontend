import {
    OBTENER_SUBSIDIOS_SI,
    CARGANDO_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
    OBTENER_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
    CARGANDO_DATA_SUBSIDIOS_SI
} from "../../../Constantes/SubsidiosSi/SubsidiosSi";

const INIT_STATE = {
    data_subsidiossi : [],
    data_descarga_subsidiossi : [],
    total_soles_subsidiossi : "0",
    cargando_data_subsidiossi : false,

    // NOTAS DE CREDITO
    cargando_notas_creditos_factura_si : false,
    data_notas_creditos_factura_si : [],
    total_notas_creditos_factura_si : "0"
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_SUBSIDIOS_SI: {
        return {
            ...state,
            data_subsidiossi : action.payload.data,
            data_descarga_subsidiossi : action.payload.descarga,
            total_soles_subsidiossi : action.payload.sumSde
        }
    }

    case CARGANDO_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI: {
        return {
            ...state,
            cargando_notas_creditos_factura_si : action.payload
        }
    }

    case OBTENER_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI: {
        return {
            ...state,
            data_notas_creditos_factura_si : action.payload.datos,
            total_notas_creditos_factura_si : action.payload.total,
        }
    }
    case CARGANDO_DATA_SUBSIDIOS_SI: {
        return {
            ...state,
            cargando_data_subsidiossi : action.payload
        }
    }

    default:
      return state;
  }
}
