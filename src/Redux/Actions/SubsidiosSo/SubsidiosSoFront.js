import {
    OBTENER_SUBSIDIOS_SO,
    SELECCIONAR_CLIENTE_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_PRODUCTO_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_CATEGORIA_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_TERRITORIO_FILTRO_SUBSIDIOS_SO,
    SELECCIONAR_ZONA_FILTRO_SUBSIDIOS_SO,
    OBTEMER_DESCARGABLE_SUBSIDIOS_SO,
    CARGANDO_DESCARGABLE_SUBSIDIOS_SO
} from '../../../Constantes/SubsidiosSo/SubsidiosSo'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

export const DesplegarSubsidiosSoReducer = (posicion, ocultartodo = false) => async (dispatch, getState) => {

    let {data_subsidiosso, data_descarga_subsidiosso, total_soles_subsidiosso} = getState().subsidiosSo

    if(ocultartodo == true){
        data_subsidiosso.map(data => data.desplegado = false)
    }else{
        data_subsidiosso[posicion]['desplegado'] = !data_subsidiosso[posicion]['desplegado']
    }

    dispatch({
        type: "CAMBIAR_DATA_SUBSIDIOS_SO",
        payload: data_subsidiosso
    })
    // dispatch({
    //     type: OBTENER_SUBSIDIOS_SO,
    //     payload : {
    //         data : data_subsidiosso,
    //         descarga : data_descarga_subsidiosso,
    //         sumSde: total_soles_subsidiosso
    //     }
    // })

}

export const SeleccionarSolicitanteReducer = (estado, id, tipo) => (dispatch, getState) => {

    if(estado == false){
        id = 0
    }

    if(tipo == "FILTRAR_CLIENTES"){
        dispatch({
            type: SELECCIONAR_CLIENTE_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }else if(tipo == "FILTRAR_PRODUCTOS"){
        dispatch({
            type: SELECCIONAR_PRODUCTO_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }else if(tipo == "FILTRAR_CATEGORIAS"){
        dispatch({
            type: SELECCIONAR_CATEGORIA_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }else if(tipo == "FILTRAR_TERRITORIO"){
        dispatch({
            type: SELECCIONAR_TERRITORIO_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }else if(tipo == "FILTRAR_ZONAS"){
        dispatch({
            type: SELECCIONAR_ZONA_FILTRO_SUBSIDIOS_SO,
            payload : id
        })
    }
}

export const DesplegarFiltroColumnaReducer = (posicion) => (dispatch, getState) => {
    
    let {AgrupacionesColumnas_Subsidios_SO} = getState().subsidiosSo
    AgrupacionesColumnas_Subsidios_SO[posicion]['seleccionado'] = !AgrupacionesColumnas_Subsidios_SO[posicion]['seleccionado']
    dispatch({
        type: "OBTENER_FILTRO_COLUMNA_SUBSIDIOS_SO",
        payload: AgrupacionesColumnas_Subsidios_SO
    })
}

export const HabilitarEdicionBultosReducer = (posicionZona, posicionData, estado) => (dispatch, getState) => {

    let {data_subsidiosso} = getState().subsidiosSo

    data_subsidiosso[posicionZona]['data'][posicionData]['editarbulto'] = estado

    if(estado == false){
        data_subsidiosso[posicionZona]['data'][posicionData]['sdebultosacido'] = data_subsidiosso[posicionZona]['data'][posicionData]['sdebultoguardado']
        data_subsidiosso[posicionZona]['data'][posicionData]['sdemontoacido'] = data_subsidiosso[posicionZona]['data'][posicionData]['sdebultoguardado'] * parseFloat(data_subsidiosso[posicionZona]['data'][posicionData]['sdedsctodos'])
    }else{
        data_subsidiosso[posicionZona]['data'][posicionData]['sdebultoguardado'] = data_subsidiosso[posicionZona]['data'][posicionData]['sdebultosacido']
    }

    dispatch({
        type: "CAMBIAR_DATA_SUBSIDIOS_SO",
        payload: data_subsidiosso
    })
}

export const CambiarBultosReducer = (posicionZona, posicionData, txtnumero) => (dispatch, getState) => {

    let {data_subsidiosso} = getState().subsidiosSo

    let nuevoTxtNumero = txtnumero.replace(/^(0+)/g, '');

    data_subsidiosso[posicionZona]['data'][posicionData]['sdebultosacido'] = nuevoTxtNumero
    data_subsidiosso[posicionZona]['data'][posicionData]['sdemontoacido'] = nuevoTxtNumero * parseFloat(data_subsidiosso[posicionZona]['data'][posicionData]['sdedsctodos'])

    dispatch({
        type: "CAMBIAR_DATA_SUBSIDIOS_SO",
        payload: data_subsidiosso
    })

}

export const SeleccionarColumnasDescargarReducer = (posicion, valor) => async (dispatch, getState) => {

    // dispatch(VolverArmarExcelSubSoReducer())

    let {
        columnas_descargable_subsidios_so,
        data_descarga_subsidiosso,
        data_descarga_subsidiosso_real
    } = getState().subsidiosSo

    let descargarSubsidiosSoReal = []
    descargarSubsidiosSoReal = { ...data_descarga_subsidiosso_real }
    // // descargarSubsidiosSoReal = data_descarga_subsidiosso_real
    // descargarSubsidiosSoReal = {...data_descarga_subsidiosso_real}

    columnas_descargable_subsidios_so[posicion]['seleccionado'] = valor

    dispatch({
        type: "SELECCIONAR_COLUMNAS_DESCARGAR",
        payload: columnas_descargable_subsidios_so
    })

    dispatch({
        type: "ARMAR_DESCARGABLE_SUBSIDIOS_SO",
        payload: true
    })

    // console.log(data_descarga_subsidiosso)
    // console.log(data_descarga_subsidiosso[0]['data'][0][0])

    // await data_descarga_subsidiosso_real[0]['data'].map((data, posicion) => {
    //     if(posicion == 0){
            
    //     }

    //     columnas_descargable_subsidios_so.map((columnas, post) => {
    //         if(columnas.seleccionado == false){
    //             data_descarga_subsidiosso_real[0]['data'][posicion].splice(post,1)
    //         }
    //     })
    // })

    // data_descarga_subsidiosso_real = await LimpiarArrayDescargaSubsidiosSoReducer(data_descarga_subsidiosso_real)

    // dispatch({
    //     type: OBTEMER_DESCARGABLE_SUBSIDIOS_SO,
    //     payload : {
    //         descarga_subsidios_so_real : descargarSubsidiosSoReal,
    //         descarga_subsidios_so: data_descarga_subsidiosso_real
    //     }
    // })

    // dispatch({
    //     type: "OBTENER_DESCARGABLE_SUBSIDIOS_SO_ONLY",
    //     payload : data_descarga_subsidiosso_real
    // })

}

export const VolverArmarExcelSubSoReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_DESCARGABLE_SUBSIDIOS_SO,
        payload : true
    })

    dispatch({
        type: "ARMAR_DESCARGABLE_SUBSIDIOS_SO",
        payload: false
    })

    let {
        data_descarga_liquido,
        columnas_descargable_subsidios_so
    } = getState().subsidiosSo


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

    await fetch(config.api+'modulo/subsidiosSo/volver-armar-excel',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                data : data_descarga_liquido,
                columnas : columnas_descargable_subsidios_so

            }),
			headers: headerFetch
      	}
    )
    .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
    })
    .then(async data => {

		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){
            let descargassubsidiosso = []
            descargassubsidiosso = await LimpiarArrayDescargaSubsidiosSoReducer(data.datos)

            dispatch({
                type: "OBTENER_DESCARGABLE_SUBSIDIOS_SO_ONLY",
                payload : descargassubsidiosso
            })
			
		}else{
            
        }

    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_DESCARGABLE_SUBSIDIOS_SO,
        payload : false
    })

}

export const MostrarColumnasDescargarReducer = () => (dispatch, getState) => {

    let {
        columnas_descargable_subsidios_so,
        data_descarga_subsidiosso
    } = getState().subsidiosSo


    
    // data_descarga_subsidiosso['datos'][0]['data'].map((data, posicion) => {
    //     if(posicion < 5){
    //         console.log(data)
    //     }
    // })



}

export const LimpiarArrayDescargaSubsidiosSoReducer = async (subsidiosso) => {

    await subsidiosso[0]['data'].map((dato, posicion) => {
        subsidiosso[0]['data'][posicion].map((dat) => {
        dat.value = dat.value == null ?"" :dat.value
      })
    })
  
    return subsidiosso
}



// export const VolverArmarExcelSubSoReducer = () => (dispatch, getState) => {

//     let {
//         data_descarga_liquido
//     } = getState().subsidiosSo

//     let nuevoArray = [{
//         "columns" : [],
//         "data"    : []
//     }]


//     data_descarga_liquido.map((descargarSde, posicion) => {

//         if(posicion == 0){


//             let arrayTitulos = [
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 150)},
//                 {"title" : "", "width" = array("wpx" = 150)},
//                 {"title" : "", "width" = array("wpx" = 150)},
//                 {"title" : "", "width" = array("wpx" = 150)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 100)},
//                 {"title" : "", "width" = array("wpx" = 150)},
//                 {"title" : "", "width" = array("wpx" = 150)},
//                 {"title" : "", "width" = array("wpx" = 150)},
//                 {"title" : "", "width" = array("wpx" = 200)},
//                 {"title" : "", "width" = array("wpx" = 200)},
//                 {"title" : "", "width" = array("wpx" = 200)},
//             ]

//             nuevoArray[0]['columns'] = arrayTitulos;

//             let arrayFilaExcel = array(
//                 array(
//                     "value" = "AÑO",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "MES",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "ZONA",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "TERRITORIO",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "CLIENTE",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "CODIGO SOLICITANTE",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "CODIGO DESTINATARIO",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "SEGMENTO SOFTYS",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "SUB SEGMENTO SOFTYS",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "RUC SUB-CLIENTE",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "SUB-CLIENTE",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "NOMBRE COMERCIAL/GRUPO EMPRESARIAL",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "SECTOR",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "COD UNI",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "DESCRIPCIÓN",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "PC SAP FINAL",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "DSCTO %",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "PC SUBSIDIADO",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "MUP",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "PVP $/IGV",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "DSCTO S/.",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "DEST+RUC+SAP",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "INICIO",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "BULTOS (ACORDADOS)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
            
            
//                 array(
//                     "value" = "BULTOS (DISTRIBUIDOR)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
            
//                 array(
//                     "value" = "MONTO (S/IGV DT)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
            
            
//                 array(
//                     "value" = "BULTOS (SOFTYS)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
//                 array(
//                     "value" = "MONTO  (S/IGV SOFTYS)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
            
//                 array(
//                     "value" = "BULTOS NO RECONOCIDOS (TEMA DE FACTURAS)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FF000000"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FFF79646"
//                             )
//                         )
                        
//                     )
//                 ),
            
//                 array(
//                     "value" = "BULTOS ACIDOS (SOFTYS)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FF000000"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FFF79646"
//                             )
//                         )
                        
//                     )
//                 ),
            
//                 array(
//                     "value" = "MONTO ACIDO S/IGV (SOFTYS)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FF000000"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FFF79646"
//                             )
//                         )
                        
//                     )
//                 ),
            
            
            
//                 array(
//                     "value" = "STATUS DE SUBSIDIOS",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
            
//                 array(
//                     "value" = "TIPO DE DATA",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
            
//                 array(
//                     "value" = "DIF. AHORRO (BULTOS)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
            
//                 array(
//                     "value" = "DIF. AHORRO (SOLES)",
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                             "color" = array(
//                                 "rgb" = "FFFFFFFF"
//                             )
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FF004FB8"
//                             )
//                         )
                        
//                     )
//                 ),
            
//             )


//             for(let i = 0; i < 78; i++){
//                 $pos = $i+1;
//                 arrayFilaExcel.push(
//                     array(
//                         "value" = "FACTURA N°".$pos,
//                         "style" = array(
//                             "font" = array(
//                                 "sz" = "9",
//                                 "bold" = true,
//                                 "color" = array(
//                                     "rgb" = "FFFFFFFF"
//                                 )
//                             ),
//                             "fill" = array(
//                                 "patternType" = 'solid',
//                                 "fgColor" = array(
//                                     "rgb" = "FF004FB8"
//                                 )
//                             )
                            
//                         )
//                     )
//                 )

//                 $arrayFilaExcel.push(
//                     array(
//                         "value" = "BULTOS N°".$pos,
//                         "style" = array(
//                             "font" = array(
//                                 "sz" = "9",
//                                 "bold" = true,
//                                 "color" = array(
//                                     "rgb" = "FFFFFFFF"
//                                 )
//                             ),
//                             "fill" = array(
//                                 "patternType" = 'solid',
//                                 "fgColor" = array(
//                                     "rgb" = "FF004FB8"
//                                 )
//                             )
//                         )
//                     )
//                 )

//             }

//             nuevoArray[0]['data'].push(arrayFilaExcel)
//         }

        



//         arrayFilaExcel = array(
//             array(
//                 "value" = descargarSde.fecanionumero,
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.fecmesabreviacion,
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
        
        
        
//             array(
//                 "value" = descargarSde.clizona,
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdeterritorio, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.clinombre, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdecodigosolicitante, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdecodigodestinatario, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdesegmentoscliente, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdesubsegmentoscliente, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sderucsubcliente, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdesubcliente, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdenombrecomercial, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdesector, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdecodigounitario, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdedescripcion, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = floatval(descargarSde.sdepcsapfinal), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
//             array(
//                 "value" = floatval(descargarSde.sdedscto), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
//             array(
//                 "value" = floatval(descargarSde.sdepcsubsidiado), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
//             array(
//                 "value" = floatval(descargarSde.sdemup), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
//             array(
//                 "value" = floatval(descargarSde.sdepvpigv), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
//             array(
//                 "value" = floatval(descargarSde.sdedsctodos), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdedestrucsap, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.sdeinicio, 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = floatval(descargarSde.sdebultosacordados), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
        
        
//             array(
//                 "value" = floatval(descargarSde.sdecantidadbultos), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
        
//             array(
//                 "value" = floatval(descargarSde.sdemontoareconocer), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
        
        
        
//             array(
//                 "value" = floatval(descargarSde.sdecantidadbultosreal), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
//             array(
//                 "value" = floatval(descargarSde.sdemontoareconocerreal), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
        
//             array(
//                 "value" = floatval(descargarSde.sdebultosnoreconocido), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
        
//             array(
//                 "value" = floatval(descargarSde.sdebultosacido), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
        
//             array(
//                 "value" = floatval(descargarSde.sdemontoacido), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
        
//             array(
//                 // "value" = descargarSde.sdeaprobado == 1 ?"Validados" :"No Validados", 
//                 "value" = descargarSde.sdevalidado == "SIVALIDADOS" ?"Subsidiado" :"No Subsidiado", 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
//             array(
//                 "value" = descargarSde.cliclientesac == 1 ? "Manual" :"Automatico", 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     )
//                 )
//             ),
        
        
//             array(
//                 // "value" = floatval(descargarSde.sdecantidadbultos - descargarSde.sdecantidadbultosreal), 
//                 "value" = floatval(descargarSde.sdecantidadbultos - descargarSde.sdebultosacido), 
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
        
//             array(
//                 // "value" = floatval(descargarSde.sdemontoareconocer - descargarSde.sdemontoareconocerreal),
//                 "value" = floatval(descargarSde.sdemontoareconocer - descargarSde.sdemontoacido),
//                 "style" = array(
//                     "font" = array(
//                         "sz" = "9",
//                         "bold" = true,
//                     ),
//                     "fill" = array(
//                         "patternType" = 'solid',
//                         "fgColor" = array(
//                             "rgb" = "FFF2F2F2"
//                         )
//                     ),
//                     "numFmt" = "#,##0.00"
//                 )
//             ),
//             // array(
//             //     "value" = descargarSde.sdecodigodestinatario.descargarSde.prosku.descargarSde.sderucsubcliente,
//             //     "style" = array(
//             //         "font" = array(
//             //             "sz" = "9",
//             //             "bold" = true,
//             //         ),
//             //         "fill" = array(
//             //             "patternType" = 'solid',
//             //             "fgColor" = array(
//             //                 "rgb" = "FFF2F2F2"
//             //             )
//             //         )
//             //     )
//             // ),
//         );

//         descargarSde.sfos.map((sfo) => {


//             arrayFilaExcel.push(
//                 array(
//                     "value" = sfo.fsofactura,
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FFF2F2F2"
//                             )
//                         )
//                     )
//                 )
//             )

//             arrayFilaExcel.push(
//                 array(
//                     "value" = floatval(sfo.fsocantidadbulto),
//                     "style" = array(
//                         "font" = array(
//                             "sz" = "9",
//                             "bold" = true,
//                         ),
//                         "fill" = array(
//                             "patternType" = 'solid',
//                             "fgColor" = array(
//                                 "rgb" = "FFF2F2F2"
//                             )
//                         ),
//                         "numFmt" = "#,##0.00"
//                     )
//                 )
//             )



//         })

//         nuevoArray[0]['data'].push(arrayFilaExcel);

//     })

//     dispatch({
//         type: "OBTENER_DESCARGABLE_SUBSIDIOS_SO_ONLY",
//         payload : nuevoArray
//     })

// }


