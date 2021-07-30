import {
    OBTENER_NOTIFICACIONES_CARGA_ARCHIVOS
} from "../../../Constantes/CargaArchivos/CargaArchivos";

const INIT_STATE = {
    notificaciones_cargaarchivos : []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_NOTIFICACIONES_CARGA_ARCHIVOS: {
        return {
            ...state,
            mostrarFormularioLogin : action.payload
        }
    }
    default:
      return state;
  }
}
