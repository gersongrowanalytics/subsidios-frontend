import {
    COMUNES_CARGANDO_PAGINA,
    COMUNES_MOSTRAR_MENU,
    COMUNES_CARGANDO_PAGINA_INICIO,
    COMUNES_CAMBIAR_FECHA_FILTRO,
    COMUNES_CAMBIAR_DISENIO,
    COMUNES_CAMBIAR_FECHA_UNICO
} from "../../../Constantes/Comunes/Comunes";

export const CargandoPaginaReducer = (accion) => {
    return {
        type: COMUNES_CARGANDO_PAGINA,
        payload: accion
    }
}

export const CargandoPaginaInicioReducer = (accion) => {
    return {
        type: COMUNES_CARGANDO_PAGINA_INICIO,
        payload: accion
    }
}

export const MostrarMenuReducer = (accion) => async (dispatch) => {

    if(accion == true){
        dispatch({
            type: COMUNES_MOSTRAR_MENU,
            payload: {
                mostrarmenu : accion,
                ocultarmenu : false
            }
        })
    }else{
        dispatch ({
            type: COMUNES_MOSTRAR_MENU,
            payload: {
                mostrarmenu : true,
                ocultarmenu : true
            }
        })

        setTimeout(() => {
            dispatch ({
                type: COMUNES_MOSTRAR_MENU,
                payload: {
                    mostrarmenu : false,
                    ocultarmenu : false
                }
            })
        }, 1000);
    }
}

export const CambiarFechaReducer = (fechainicio, fechafinal) => (dispatch, getState) => {

    const nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const {
        ComunesFechaInicio,
        ComunesFechaFinal
    } = getState().comunes

    if(fechainicio == null){

        fechafinal = new Date(fechafinal.getFullYear(), fechafinal.getMonth()+1, 0)

        if(ComunesFechaInicio == null){
            fechainicio = new Date(fechafinal.getFullYear(), fechafinal.getMonth(), 1)
            // fechainicio = fechafinal
        }else{
            if(ComunesFechaInicio >= fechafinal){
                fechainicio = new Date(fechafinal.getFullYear(), fechafinal.getMonth(), 1)
            }else{
                fechainicio = ComunesFechaInicio
            }
        }

    }else{ // fechafinal == NULL
        
        fechainicio = new Date(fechainicio.getFullYear(), fechainicio.getMonth(), 1)

        if(ComunesFechaFinal == null){
            fechafinal = new Date(fechainicio.getFullYear(), fechainicio.getMonth()+1, 0)
            // fechafinal = fechainicio
        }else{
            if(ComunesFechaFinal <= fechainicio){
                fechafinal = new Date(fechainicio.getFullYear(), fechainicio.getMonth()+1, 0)
            }else{
                fechafinal = ComunesFechaFinal
            }
        }
    }

    // console.log(fechainicio)
    // console.log(fechafinal)

    let aniotxtinicio = fechainicio.getFullYear()
    let mestxtinicio = nombreMeses[fechainicio.getMonth()]
    let aniotxtfinal = fechafinal.getFullYear()
    let mestxtfinal = nombreMeses[fechafinal.getMonth()]

    dispatch({
        type: COMUNES_CAMBIAR_FECHA_FILTRO,
        payload : {
            fechaInicio : fechainicio,
            fechaFinal  : fechafinal,
            aniotxtinicio : aniotxtinicio,
            mestxtinicio : mestxtinicio,
            aniotxtfinal : aniotxtfinal,
            mestxtfinal : mestxtfinal,
        }
    })
}

export const EliminarFechaReducer = () => (dispatch) => {
    dispatch({
        type: COMUNES_CAMBIAR_FECHA_FILTRO,
        payload : {
            fechaInicio   : null,
            fechaFinal    : null,
            aniotxtinicio : "",
            mestxtinicio  : "",
            aniotxtfinal  : "",
            mestxtfinal   : "",
        }
    })
}

export const CambiarDisenioReducer = (color) => (dispatch) => {
    dispatch({
        type : COMUNES_CAMBIAR_DISENIO,
        payload : color
    })
}

export const CambiarFechaUnicoReducer = (fecha) => (dispatch, getState) => {

    console.log(fecha)
    const nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let nuevaFecha = new Date(fecha.getFullYear(), fecha.getMonth()+1, 0)
    
    console.log(nuevaFecha)

    let aniotxtunico = nuevaFecha.getFullYear()
    let mestxtunico = nombreMeses[nuevaFecha.getMonth()]

    console.log(aniotxtunico)
    console.log(mestxtunico)

    dispatch({
        type: COMUNES_CAMBIAR_FECHA_UNICO,
        payload : {
            fecha : nuevaFecha,
            anio  : aniotxtunico,
            mes   : mestxtunico
        }
    })


}

// export const CambiarFechaUnicaReducer = (fecha) => (dispatch, getState) => {

//     const nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']

//     const {
//         ComunesFechaUnico
//     } = getState().comunes

//     if(fecha == null){

//         fechafinal = new Date(fechafinal.getFullYear(), fechafinal.getMonth()+1, 0)

//         if(ComunesFechaInicio == null){
//             fechainicio = new Date(fechafinal.getFullYear(), fechafinal.getMonth(), 1)
//             // fechainicio = fechafinal
//         }else{
//             if(ComunesFechaInicio >= fechafinal){
//                 fechainicio = new Date(fechafinal.getFullYear(), fechafinal.getMonth(), 1)
//             }else{
//                 fechainicio = ComunesFechaInicio
//             }
//         }

//     }

//     // console.log(fechainicio)
//     // console.log(fechafinal)

//     let aniotxtinicio = fechainicio.getFullYear()
//     let mestxtinicio = nombreMeses[fechainicio.getMonth()]
//     let aniotxtfinal = fechafinal.getFullYear()
//     let mestxtfinal = nombreMeses[fechafinal.getMonth()]

//     dispatch({
//         type: COMUNES_CAMBIAR_FECHA_FILTRO,
//         payload : {
//             fechaInicio : fechainicio,
//             fechaFinal  : fechafinal,
//             aniotxtinicio : aniotxtinicio,
//             mestxtinicio : mestxtinicio,
//             aniotxtfinal : aniotxtfinal,
//             mestxtfinal : mestxtfinal,
//         }
//     })
// }