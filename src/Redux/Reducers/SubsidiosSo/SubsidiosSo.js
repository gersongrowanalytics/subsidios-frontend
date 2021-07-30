import {
    OBTENER_SUBSIDIOS_SO,
    OBTENER_FILTROS_SUBSIDIOS_SO,
    SELECCIONAR_CLIENTE_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_PRODUCTO_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_CATEGORIA_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_TERRITORIO_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_ZONA_FILTRO_SUBSIDIOS_SO,
    CARGANDO_DATA_SUBSIDIOS_SO
} from "../../../Constantes/SubsidiosSo/SubsidiosSo";

const INIT_STATE = {
    data_subsidiosso : [],
    data_descarga_subsidiosso : [],
    cargando_data_subsidiosso : false,

    solicitantes_filtro_subsidiosso : [],
    productos_filtro_subsidiosso    : [],
    categorias_filtro_subsidiosso   : [],
    territorios_filtro_subsidiosso  : [],
    zonas_filtro_subsidiosso        : [],

    clienteseleccionado : 0,
    productoseleccionado : 0,
    categoriaseleccionado: 0,
    territorioseleccionado: 0,
    zonaseleccionado: 0

};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_SUBSIDIOS_SO: {
        return {
            ...state,
            data_subsidiosso : action.payload.data,
            data_descarga_subsidiosso : action.payload.descarga
        }
    }
    case OBTENER_FILTROS_SUBSIDIOS_SO: {
        return {
            ...state,
            solicitantes_filtro_subsidiosso : action.payload.solicitantes,
            productos_filtro_subsidiosso : action.payload.productos,
            categorias_filtro_subsidiosso : action.payload.categorias,
            territorios_filtro_subsidiosso : action.payload.territorios,
            zonas_filtro_subsidiosso : action.payload.zonas,
        }
    }
    case SELECCIONAR_CLIENTE_FILTRO_SUBSIDIOS_SO: {
        return {
            ...state,
            clienteseleccionado : action.payload
        }
    }

    case SELECCIONAR_PRODUCTO_FILTRO_SUBSIDIOS_SO: {
        return {
            ...state,
            productoseleccionado : action.payload
        }
    }

    case SELECCIONAR_CATEGORIA_FILTRO_SUBSIDIOS_SO: {
        return {
            ...state,
            categoriaseleccionado : action.payload
        }
    }

    case SELECCIONAR_TERRITORIO_FILTRO_SUBSIDIOS_SO: {
        return {
            ...state,
            territorioseleccionado : action.payload
        }
    }

    case SELECCIONAR_ZONA_FILTRO_SUBSIDIOS_SO: {
        return {
            ...state,
            zonaseleccionado : action.payload
        }
    }

    case CARGANDO_DATA_SUBSIDIOS_SO: {
        return {
            ...state,
            cargando_data_subsidiosso : action.payload
        }
    }
    default:
      return state;
  }
}
