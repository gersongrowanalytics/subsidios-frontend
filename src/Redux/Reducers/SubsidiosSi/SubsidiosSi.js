import {
    OBTENER_SUBSIDIOS_SI,
    CARGANDO_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
    OBTENER_NOTAS_CREDITO_FACTURA_SI_SUBSIDIOS_SI,
    CARGANDO_DATA_SUBSIDIOS_SI,
    CARGANDO_FACTURAS_ASIGNADAS_SUBSIDIOS_SI,
    OBTENER_FACTURAS_ASIGNADAS_SUBSIDIOS_SI,
    CARGANDO_DESCARGA_SUBSIDIOS_SI,
    OBTENER_DESCARGA_SUBSIDIOS_SI,
    CARGANDO_DATA_SUBSIDIOS_SI_VENTAS
} from "../../../Constantes/SubsidiosSi/SubsidiosSi";

const INIT_STATE = {
    data_subsidiossi : [],
    data_subsidiossi_real : [],
    data_descarga_subsidiossi : [],
    total_soles_subsidiossi : "0",
    cargando_data_subsidiossi : false,

    // NOTAS DE CREDITO
    cargando_notas_creditos_factura_si : false,
    data_notas_creditos_factura_si : [],
    total_notas_creditos_factura_si : "0",



    filtrosTablaSubsidiosSi : {
        "clizona" : [],
        "sdeterritorio" : [],
        "clinombre" : [],
        "clisuchml" : [],
        "prosku" : [],
        "sdesac" : [],
        "sdevalidado" : [],
        "sdesector" : [],
        "catnombre" : [],
        "propresentacion" : [],
        "clicodigoshipto" : [],
        "pronombre" : []
    },

    AgrupacionesColumnas_Subsidios_SI: [
        {
          agrupacion: "Cliente Sell In",
          seleccionado: true,
          cabeceraAgrupacion: "ClienteSI"
        },
        {
          agrupacion: "Materiales",
          seleccionado: true,
          cabeceraAgrupacion: "Materiales"
        },
        {
          agrupacion: "Metricas",
          seleccionado: true,
          cabeceraAgrupacion: "metricas"
        },
    ],

    cargando_facturas_asignadas : false,
    obtener_facturas_asignadas  : [],

    cargando_descarga : false,

    cargando_subsidiossi_ventas : false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_SUBSIDIOS_SI: {
        return {
            ...state,
            data_subsidiossi_real : action.payload.datareal,
            data_subsidiossi : action.payload.data,
            data_descarga_subsidiossi : action.payload.descarga,
            total_soles_subsidiossi : action.payload.sumSde
        }
    }
    case "CAMBIAR_DATA_SUBSIDIOS_SI":{
        return {
            ...state,
            data_subsidiossi : action.payload
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
    case "OBTENER_SUBSIDIOS_SI_ONLY_DATA":{
        return {
            ...state,
            data_subsidiossi : action.payload
        }
    }

    case "OBTENER_FILTRO_COLUMNA_SUBSIDIOS_SI":{
        return{
            ...state,
            AgrupacionesColumnas_Subsidios_SI : action.payload
        }
    }

    case CARGANDO_FACTURAS_ASIGNADAS_SUBSIDIOS_SI:{
        return {
            ...state,
            cargando_facturas_asignadas : action.payload
        }
    }
    case OBTENER_FACTURAS_ASIGNADAS_SUBSIDIOS_SI: {
        return {
            ...state,
            obtener_facturas_asignadas : action.payload
        }
    }

    case CARGANDO_DESCARGA_SUBSIDIOS_SI: {
        return {
            ...state,
            cargando_descarga : action.payload
        }
    }

    case OBTENER_DESCARGA_SUBSIDIOS_SI: {
        return {
            ...state,
            data_descarga_subsidiossi : action.payload
        }
    }

    case CARGANDO_DATA_SUBSIDIOS_SI_VENTAS: {
        return {
            ...state,
            cargando_subsidiossi_ventas : action.payload
        }
    }
    default:
      return state;
  }
}
