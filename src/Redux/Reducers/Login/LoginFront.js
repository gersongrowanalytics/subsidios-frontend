import {
    MOSTRAR_VIDEO_PRELOAD,
    MOSTRAR_VIDEO_LOGIN
} from "../../../Constantes/Login/LoginFront"

const INIT_STATE = {
    mostrarVideoPreload : true,
    mostrarVideoLogin   : false
}

export default (state = INIT_STATE, action) => {
    switch (action.type){
        case MOSTRAR_VIDEO_PRELOAD : {
            return {
                ...state,
                mostrarVideoPreload : action.payload
            }
        }
        case MOSTRAR_VIDEO_LOGIN: {
            return {
                ...state,
                mostrarVideoLogin : action.payload
            }
        }
        default:
            return state
    }
}