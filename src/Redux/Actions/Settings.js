import config from '../../config'
import { estadoRequestReducer } from "./EstadoRequest"
import {ValidarUsuarioConectadoReducer} from '../../Redux/Actions/Login/Login'

export const AceptarCookiesReducer = () => (dispatch, getState) => {

    const cookiesaceptadas = getState().settings.cookiesaceptadas
    localStorage.setItem('cookiesaceptadas', "ACEPTADO")
    dispatch({
      type: "ACEPTAR_COOKIES_CONFIGURACION",
      payload: !cookiesaceptadas
    })
  
    dispatch(AceptarTerminosCondicionesReducer())
  
}
  
export const LeyendoCookiesReducer = (leyendo) => (dispatch, getState) => {

    dispatch({
        type: "LEYENDO_COOKIES_CONFIGURACION",
        payload: leyendo
    })

}
  
  
export const AceptarTerminosCondicionesReducer = () => async (dispatch, getState) => {
    
    let headerFetch = {
        'Accept' : 'application/json',
        'content-type': 'application/json',
    }

    if(config.produccion == true){
        headerFetch = {
            'Accept' : 'application/json',
            'content-type': 'application/json',
            'api_token': localStorage.getItem('usutoken'),
            'api-token': localStorage.getItem('usutoken'),
        }
    }

    await fetch(config.api+'aceptar-terminos-condiciones',
        {
            mode:'cors',
            method: 'POST',
            headers: headerFetch
        }
    )
    .then( async res => {
        await dispatch(estadoRequestReducer(res.status))
        return res.json()
    })
    .then(data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                
            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    await dispatch(ValidarUsuarioConectadoReducer())
}