import {
    MOSTRAR_FORMULARIO_LOGIN,
    OBTENER_LOGIN,
    MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN
} from "../../../Constantes/Login/Login";

const INIT_STATE = {
    mostrarFormularioLogin : false,
    cargando     : false,
    LoginUsuid   : localStorage.getItem('usuid'),
    LoginUsuario : {},
    datosUsuarioLogeado : {},
    subpendientes : false,
    fechaActualizacion : "20 Noviembre 2021",
    mesespendientes : [{anio:"2021", mes:"Agosto"}],

    mostrar_terminos_condiciones_login : false,
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
            mesespendientes: action.payload.mesespendientes,
        }
    }
    case "CERRAR_SUBSIDIOS_PENDIENTES_LOGIN": {
        return{
            ...state,
            subpendientes : action.payload
        }
    }
    case "ACTUALIZAR_DATOS_USUARIO_LOGEADO": {
        return{
            ...state,
            datosUsuarioLogeado : action.payload
        }
    }
    case MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN: {
        return {
            ...state,
            mostrar_terminos_condiciones_login : action.payload
        }
    }
    default:
      return state;
  }
}
