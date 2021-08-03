import {
    OBTENER_SUBSIDIOS_SI,
} from '../../../Constantes/SubsidiosSi/SubsidiosSi'

export const DesplegarSubsidiosSoReducer = (posicion) => async (dispatch, getState) => {

    let {data_subsidiossi, data_descarga_subsidiossi, total_soles_subsidiossi} = getState().subsidiosSi

    data_subsidiossi[posicion]['desplegado'] = !data_subsidiossi[posicion]['desplegado']

    dispatch({
        type: OBTENER_SUBSIDIOS_SI,
        payload : {
            data : data_subsidiossi,
            descarga : data_descarga_subsidiossi,
            sumSde: total_soles_subsidiossi
        }
    })
}