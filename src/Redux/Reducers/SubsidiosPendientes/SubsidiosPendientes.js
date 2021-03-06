import {
    OBTENER_SUBSIDIOS_PENDIENTES,
    OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES,
    CARGANDO_ASIGNAR_FACTURAS_SUBSIDIOS_PENDIENTES,
    CARGANDO_ELIMINAR_FACTURA_SUBSIDIOS_PENDIENTES,
    CARGANDO_TABLA_SUBSIDIOS_PENDIENTES,
    CARGANDO_TABLA_FACTURAS_ASIGNAR
} from '../../../Constantes/SubsidiosPendientes/SubsidiosPendientes'

const INIT_STATE = {
    data_subsidiossipendientes_real : [],
    data_subsidiossipendientes : [],
    data_descarga_subsidiossipendientes : [],
    total_soles_subsidiossipendientes : "0",

    data_facturas_subsidiossipendientes : [],

    cargando_asignar_facturas_subsidiossipendientes : false,
    cargando_eliminar_facturas_subsidiossipendientes : false,

    cargando_tabla_subsidiospendientes : false,

    cargando_tabla_facturas_asignar_subsidiospendientes: false,
    
    filtrosTablaSubsidiosPendientes : {
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

    filtrosTablaFacturasPendientes : {
        "fecfecha"       : [],
        "fsifactura"  : [],
        "fdsmaterial" : [],
        "pronombre"   : [],
        "prosku"      : [],
        "fsidestinatario" : [],
        "fsisolicitante"  : [],
        "fecanionumero" : [],
        "fecmesabreviacion" : []
    },

    AgrupacionesColumnas_Subsidios_Pendientes: [
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

    posicionPrincipalSubPendienteSeleccionado : 0,
    posicionSecundarioSubPendienteSeleccionado : 0,

    data_facturas_asignar_subpendientes : [],
    data_facturas_asignar_subpendientes_real : [],

    facturas_asignadas_enviar_subpendientes : []

};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_SUBSIDIOS_PENDIENTES: {
        return {
            ...state,
            data_subsidiossipendientes_real : action.payload.datareal,
            data_subsidiossipendientes : action.payload.data,
            data_descarga_subsidiossipendientes : action.payload.descarga,
            total_soles_subsidiossipendientes   : action.payload.sumSde
        }
    }
    case CARGANDO_TABLA_SUBSIDIOS_PENDIENTES: {
        return {
            ...state,
            cargando_tabla_subsidiospendientes : action.payload
        }
    }
    case OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES: {
        return {
            ...state,
            data_subsidiossipendientes : action.payload.data,
            data_subsidiossipendientes_real : action.payload.datareal
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
    case CARGANDO_TABLA_FACTURAS_ASIGNAR:{
        return{
            ...state,
            cargando_tabla_facturas_asignar_subsidiospendientes : action.payload
        }
    }
    case "OBTENER_SUBSIDIOS_PENDIENTES_ONLY_DATA":{
        return {
            ...state,
            data_subsidiossipendientes : action.payload
        }
    }
    case "OBTENER_FILTRO_COLUMNA_SUBSIDIOS_PENDIENTES":{
        return{
            ...state,
            AgrupacionesColumnas_Subsidios_Pendientes : action.payload
        }
    }
    case "ASIGNAR_POSICION_PRIMARIO_SECUNDARIA_SUB_PENDIENTES": {
        return {
            ...state,
            posicionPrincipalSubPendienteSeleccionado : action.payload.posicion,
            posicionSecundarioSubPendienteSeleccionado : action.payload.posicionData
        }
    }
    case "OBTENER_FACTURAS_ASIGNAR_SUBSIDIOS_PENDIENTES" : {
        return {
            ...state,
            data_facturas_asignar_subpendientes_real : action.payload.datareal,
            data_facturas_asignar_subpendientes : action.payload.data,
        }
    }
    case "OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES_ONLY_DATA":{
        return {
            ...state,
            data_facturas_asignar_subpendientes : action.payload
        }
    }

    case "SELECCIONAR_FACTURAS_ENVIAR_SUBSIDIOS_PENDIENTES": {
        return {
            ...state,
            facturas_asignadas_enviar_subpendientes : action.payload
        }
    }

    default:
      return state;
  }
}
