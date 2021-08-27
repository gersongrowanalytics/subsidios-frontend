import {
    OBTENER_ESTADOS_PENDIENTES_HOME,
    CARGANDO_DATA_ESTADOS_PENDIENTES_HOME
} from "../../../Constantes/Home/Home";

const INIT_STATE = {
    data_estados_pendientes_home : [],
    data_estados_pendientes_distribuidoras_home : [],
    cargando_data_estados_pendientes_home : false,
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_ESTADOS_PENDIENTES_HOME: {
        return {
            ...state,
            data_estados_pendientes_home : action.payload.status,
            data_estados_pendientes_distribuidoras_home : action.payload.statusdistribuidoras

        }
    }
    case CARGANDO_DATA_ESTADOS_PENDIENTES_HOME: {
        return {
            ...state,
            cargando_data_estados_pendientes_home : action.payload
        }
    }
    default:
      return state;
  }
}