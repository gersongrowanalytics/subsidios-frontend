import {
    OBTENER_REGULARIZACION_PAGOS_SO,
    CARGANDO_TABLA_REGULARIZACION_PAGOS_SO,
    CARGANDO_TABLA_FACTURAS_ASIGNAR
} from '../../../Constantes/RegularzacionPagosSO/RegularzacionPagosSO'

const INIT_STATE = {
    
    cargando_tabla_regularizacion_pagos_so : false,
    data_regularizacion_pagos_so : [],
    data_regularizacion_pagos_so_real : [],
    descargable_regularizacion_pagos_so_real : [],
    filtros_tabla_regularizacion_pagos_so : {
        "clizona"         : [],
        "clitv"           : [],
        "clihml"          : [],
        "clicodigoshipto" : [],
        "catnombre"       : [],
        "cosnombre"       : [],
        "propresentacion" : [],
        "prosku"          : [],
        "pronombre"       : [],
        "sdevalidado"     : []
    },
    cargando_tabla_facturas_asignar_subsidiospendientes : false,


};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case OBTENER_REGULARIZACION_PAGOS_SO: {
          return {
              ...state,
              data_regularizacion_pagos_so : action.payload.data,
              data_regularizacion_pagos_so_real : action.payload.datareal
          }
      }
      case CARGANDO_TABLA_REGULARIZACION_PAGOS_SO: {
          return {
              ...state,
              cargando_tabla_regularizacion_pagos_so : action.payload
          }
      }
      case "OBTENER_REGULARIZACION_PAGOS_SO_ONLY_DATA":{
        return {
            ...state,
            data_regularizacion_pagos_so : action.payload
        }
      }
        case CARGANDO_TABLA_FACTURAS_ASIGNAR:{
            return {
                ...state,
                cargando_tabla_facturas_asignar_regularizacion_pagos_so : action.payload
            }
        }
      default:
        return state;
    }
  }