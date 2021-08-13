import {
    OBTENER_FILTRO_DATA_COLUMNAS_FACTURAS
} from '../../../Constantes/Facturas/FacturasFront'
import {
    OBTENER_FACTURAS_SI,
    CARGANDO_FACTURAS_SI
} from '../../../Constantes/Facturas/Facturas'

export const ObtenerFiltrosFacturasReducer = (facturas, columna) => async (dispatch, getState) => {

    let resultado = await facturas.reduce((a, e) => {

        if(!a.find(d => d == e[columna])){
            a.push(e[columna])
        }

        return a

    }, [])

    let objetoArray = []
    
    await resultado.map((filtro) => {
        objetoArray.push({nombre: filtro, seleccionado: true})
    })


    let {
        data_columnas_facturas
    } = getState().facturasFront

    data_columnas_facturas.map((colum, posicion) => {

        if(colum.columna == columna){
            data_columnas_facturas[posicion]['filtro'] = objetoArray
        }

    })
}

export const AplicarFiltroFacturasReducer = (posicion, filtro, propiedad) => async (dispatch, getState) => {


    let {
        data_columnas_facturas
    } = getState().facturasFront

    data_columnas_facturas[posicion]['filtrando'] = true

    await data_columnas_facturas[posicion]['filtro'].map((data, posicionFiltro) => {
        if(data.nombre.includes(filtro)){
            data_columnas_facturas[posicion]['filtro'][posicionFiltro]['seleccionado'] = true
        }else{
            data_columnas_facturas[posicion]['filtro'][posicionFiltro]['seleccionado'] = false
        }
    })

    // dispatch({
    //     type: OBTENER_FILTRO_DATA_COLUMNAS_FACTURAS,
    //     payload: nuevaData
    // })

    let {
        data_facturas_si,
        data_descarga_facturas_si
    } = getState().facturas

    let nueva_data;

    await data_columnas_facturas.map( async(dataFactura) => {
        if(dataFactura.filtrando == true){
            await dataFactura.filtro.map( async(fil) => {
                if(fil.seleccionado){
                    nueva_data = await data_facturas_si.filter(column => column[dataFactura.columna].includes(fil.nombre))
                }
            })
        }
    })


    dispatch({
        type: OBTENER_FACTURAS_SI,
        payload : {
            facturas  : nueva_data,
            descargar : data_descarga_facturas_si
        }
    })
}