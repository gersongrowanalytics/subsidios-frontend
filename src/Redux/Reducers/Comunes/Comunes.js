import {
    COMUNES_CARGANDO_PAGINA,
    COMUNES_MOSTRAR_MENU,
    COMUNES_CARGANDO_PAGINA_INICIO,
    COMUNES_CAMBIAR_FECHA_FILTRO,
    COMUNES_CAMBIAR_DISENIO
} from "../../../Constantes/Comunes/Comunes";

const INIT_STATE = {
    ComunesCargandoPagina : true,
    ComunesCargandoPaginaInicio : true,
    ComunesMostrarMenu : false,
    ComunesOcultarMenu : false,

    ComunesFechaInicio : null,
    ComunesFechaFinal  : null,

    ComunesAnioTxtIncio : "",
    ComunesMesTxtInicio : "",
    ComunesAnioTxtFinal : "",
    ComunesMesTxtFinal  : "",

    ComunesTipoDisenio  : localStorage.getItem('ComunesDisenioSeleccionado') ?localStorage.getItem('ComunesDisenioSeleccionado') :"Light"
    
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case COMUNES_CARGANDO_PAGINA_INICIO : {
        return {
            ...state,
            ComunesCargandoPaginaInicio : action.payload
        }
    }
    case COMUNES_CARGANDO_PAGINA: {
        return {
            ...state,
            ComunesCargandoPagina : action.payload
        }
    }
    case COMUNES_MOSTRAR_MENU: {
        return {
            ...state,
            ComunesMostrarMenu : action.payload.mostrarmenu,
            ComunesOcultarMenu : action.payload.ocultarmenu,
        }
    }
    case COMUNES_CAMBIAR_FECHA_FILTRO: {
        return {
            ...state,
            ComunesFechaInicio : action.payload.fechaInicio,
            ComunesFechaFinal : action.payload.fechaFinal,
            ComunesAnioTxtIncio : action.payload.aniotxtinicio,
            ComunesMesTxtInicio : action.payload.mestxtinicio,
            ComunesAnioTxtFinal : action.payload.aniotxtfinal,
            ComunesMesTxtFinal : action.payload.mestxtfinal,
        }
    }
    case COMUNES_CAMBIAR_DISENIO: {
        return {
            ...state,
            ComunesTipoDisenio : action.payload
        }
    }
    default:
      return state;
  }
}
