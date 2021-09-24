import {
    OBTENER_TIPOS_USUARIOS_ADMINISTRADOR
} from "../../../../Constantes/Administrador/TiposUsuarios";

const INIT_STATE = {
    data_tiposusuarios_administrador : []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_TIPOS_USUARIOS_ADMINISTRADOR: {
        return {
            ...state,
            data_tiposusuarios_administrador : action.payload
        }
    }
    default:
      return state;
  }
}
