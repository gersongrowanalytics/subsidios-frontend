import {
    CARGANDO_EDITAR_CONTRASENIA_PERFIL,
    CARGANDO_EDITAR_CUMPLEANIOS_PERFIL,
    CARGANDO_EDITAR_TELEFONO_PERFIL,
    CARGANDO_EDITAR_IMAGEN_PERFIL
} from '../../../Constantes/Perfil/Perfil'

const INIT_STATE = {
    cargando_editar_contrasenia : false,
    cargando_editar_cumpleanios : false,
    cargando_editar_telefono    : false,
    cargando_editar_perfil      : false,
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case CARGANDO_EDITAR_CONTRASENIA_PERFIL: {
            return {
                ...state,
                cargando_editar_contrasenia : action.payload
            }
        }
        case CARGANDO_EDITAR_CUMPLEANIOS_PERFIL: {
            return {
                ...state,
                cargando_editar_cumpleanios : action.payload
            }
        }
        case CARGANDO_EDITAR_TELEFONO_PERFIL: {
            return {
                ...state,
                cargando_editar_telefono : action.payload
            }
        }
        case CARGANDO_EDITAR_IMAGEN_PERFIL: {
            return {
                ...state,
                cargando_editar_perfil : action.payload
            }
        }
        default:
            return state;
    }
}
