import {
    OBTENER_NOTAS_CREDITO_EXCEL,
    CARGANDO_OBTENER_NOTAS_CREDITO_EXCEL,
    CARGANDO_OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO,
    OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO
} from '../../../Constantes/NotaCredito/NotaCredito'

const INIT_STATE = {
    cargando_obtener_nota_credito : false,
    cargando_obtener_data_distribuidoras_nota_credito : false,
    data_distribuidoras_nota_credito : []
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case CARGANDO_OBTENER_NOTAS_CREDITO_EXCEL: {
            return {
                ...state,
                cargando_obtener_nota_credito : action.payload
            }
        }
        case CARGANDO_OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO: {
            return {
                ...state,
                cargando_obtener_data_distribuidoras_nota_credito : action.payload
            }
        }
        case OBTENER_DATA_DISTRIBUIDORAS_NOTAS_CREDITO: {
            return {
                ...state,
                data_distribuidoras_nota_credito : action.payload
            }
        }
        default:
            return state;
    }
}
