import {
    MOSTRAR_FORMULARIO_LOGIN,
    OBTENER_LOGIN
} from "../../../Constantes/Login/Login";

const INIT_STATE = {
    mostrarFormularioLogin : false,
    cargando     : false,
    LoginUsuid   : localStorage.getItem('usuid'),
    LoginUsuario : {},
    subpendientes : false,
    fechaActualizacion : "20 Agosto 2021"
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MOSTRAR_FORMULARIO_LOGIN: {
        return {
            ...state,
            mostrarFormularioLogin : action.payload
        }
    }
    case OBTENER_LOGIN: {
        return {
            ...state,
            LoginUsuid   : action.payload.usuid,
            LoginUsuario : action.payload.usuario,
            subpendientes: action.payload.subpendientes,
            fechaActualizacion: action.payload.fechaActualizacion,
        }
    }
    default:
      return state;
  }
}
