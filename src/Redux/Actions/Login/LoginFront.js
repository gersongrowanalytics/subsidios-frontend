import {
    MOSTRAR_VIDEO_PRELOAD,
    MOSTRAR_VIDEO_LOGIN
} from "../../../Constantes/Login/LoginFront"

export const setMostrarVideoPreload = (accion) => (dispatch, getState) => {
    dispatch({
      type: MOSTRAR_VIDEO_PRELOAD,
      payload: accion
    })
};

export const setMostrarVideoLogin = (accion) => (dispatch, getState) => {
    dispatch({
      type: MOSTRAR_VIDEO_LOGIN,
      payload: accion
    })
};