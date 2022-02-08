const INIT_STATE = {
    cookiesaceptadas : false,
    leyendopoliticas : false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case "ACEPTAR_COOKIES_CONFIGURACION":
      return {
        ...state,
        cookiesaceptadas : action.payload
      }
    case "LEYENDO_COOKIES_CONFIGURACION":
      return {
        ...state,
        leyendopoliticas : action.payload
      }
    default:
      return state;
  }
};
