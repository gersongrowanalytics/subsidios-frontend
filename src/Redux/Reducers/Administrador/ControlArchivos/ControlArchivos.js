import {
    OBTENER_ARCHIVOS_CONTROL_ARCHIVOS,
    CARGANDO_ARCHIVOS_CONTROL_ARCHIVOS
} from "../../../../Constantes/Administrador/ControlArchivos";

const INIT_STATE = {
    data_archivos_control_archivos : [],
    cargando_archivos_control_archivos : false,
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_ARCHIVOS_CONTROL_ARCHIVOS: {
        return {
            ...state,
            data_archivos_control_archivos : action.payload
        }
    }
    case CARGANDO_ARCHIVOS_CONTROL_ARCHIVOS: {
        return {
            ...state,
            cargando_archivos_control_archivos : action.payload
        }
    }
    default:
      return state;
  }
}
