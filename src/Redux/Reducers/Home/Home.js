// import {
//     OBTENER_TIPOS_ARCHIVOS_CONTROL_PANEL
// } from "../../../Constantes/Home/Home";
// import config from '../../../config'
// import { estadoRequestReducer } from "../EstadoRequest"
// import { CargandoPaginaReducer, CargandoPaginaInicioReducer } from "../Comunes/Comunes"

// export const ObtenerTiposArchivos = () => async (dispatch, getState) => {

//     await fetch(config.api+'modulo/subsidiosSo/mostrar',
// 		{
// 			mode:'cors',
// 			method: 'POST',
// 			body: JSON.stringify({}),
// 			headers: {
// 				'Accept' : 'application/json',
// 				'Content-type' : 'application/json'
// 			}
//       	}
//     )
//     .then( async res => {
// 		await dispatch(estadoRequestReducer(res.status))
// 		return res.json()
//     })
//     .then(async data => {

//         console.log(data)
// 		const estadoRequest = getState().estadoRequest.init_request
// 		if(estadoRequest === true){
//             let descargassubsidiosso = []
//             descargassubsidiosso = await LimpiarArrayDescargaSubsidiosSoReducer(data.descargarSde)

//             dispatch({
//                 type: OBTENER_TIPOS_ARCHIVOS_CONTROL_PANEL,
//                 payload : {
//                     data : data.datos,
//                     descarga : descargassubsidiosso
//                 }
//             })
			
// 		}else{
            
//         }
//     }).catch((error)=> {
        
//     });

// }