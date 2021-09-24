import {
    OBTENER_USUARIOS_ADMINISTRADOR
} from "../../../../Constantes/Administrador/Usuarios";

const INIT_STATE = {
    data_usuarios_administrador : []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_USUARIOS_ADMINISTRADOR: {
        return {
            ...state,
            data_usuarios_administrador : action.payload
        }
    }
    default:
      return state;
  }
}
