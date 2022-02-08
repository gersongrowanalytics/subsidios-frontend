import {
    OBTENER_SUBSIDIOS_PENDIENTES,
    OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES
} from '../../../Constantes/SubsidiosPendientes/SubsidiosPendientes'

export const DesplegarSubsidiosPendientesReducer = (posicion, ocultartodo = false) => async (dispatch, getState) => {

    let {
        data_subsidiossipendientes, 
        data_descarga_subsidiossipendientes,
        total_soles_subsidiossipendientes
    } = getState().subsidiosPendientes

    if(ocultartodo == true){
        data_subsidiossipendientes.map(data => data.desplegado = false)
    }else{
        data_subsidiossipendientes[posicion]['desplegado'] = !data_subsidiossipendientes[posicion]['desplegado']
    }

    dispatch({
        type: "OBTENER_SUBSIDIOS_PENDIENTES_ONLY_DATA",
        payload : data_subsidiossipendientes
    })
}

export const DesplegarSubsidioPendienteReducer = (posicionZona, posicionSubsidio) => async (dispatch, getState) => {

    let {
        data_subsidiossipendientes, 
        data_descarga_subsidiossipendientes,
        total_soles_subsidiossipendientes
    } = getState().subsidiosPendientes

    data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["desplegado"] = !data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["desplegado"]

    dispatch({
        type: OBTENER_SUBSIDIOS_PENDIENTES,
        payload : {
            data     : data_subsidiossipendientes,
            descarga : data_descarga_subsidiossipendientes,
            sumSde   : total_soles_subsidiossipendientes
        }
    })

}

export const CambiarImpactoFacturaAsignadaReducer = (
    posicionZona, 
    posicionSubsidio, 
    posicionFactura,
    impacto,
    fdsid
) => async (dispatch, getState) => {

    
    console.log(posicionZona)
    console.log(posicionSubsidio)
    console.log(posicionFactura)
    console.log(impacto)
    console.log(fdsid)

    let {
        data_subsidiossipendientes, 
        facturas_asignadas_enviar_subpendientes
    } = getState().subsidiosPendientes

    let facturasSeleccionado = {...facturas_asignadas_enviar_subpendientes}

    data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["facturasasignar"][posicionFactura]['impacto'] = impacto

    if(impacto.length > 0){
        data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["facturasasignar"][posicionFactura]['seleccionado'] = true

        let encontro = false
        
        facturasSeleccionado.map((factura, posicion) => {
            if(factura.fdsid == fdsid){
                encontro = true
                facturasSeleccionado[posicion]['seleccionado'] = true
                facturasSeleccionado[posicion]['impacto'] = impacto
            }
        })

        if(encontro == false){
            facturasSeleccionado.push({
                "fdsid" : fdsid,
                "seleccionado": true,
                "impacto": impacto
            })
        }

    }else{
        data_subsidiossipendientes[posicionZona]['data'][posicionSubsidio]["facturasasignar"][posicionFactura]['seleccionado'] = false

        facturasSeleccionado.map((factura, posicion) => {
            if(factura.fdsid == fdsid){
                facturasSeleccionado[posicion]['seleccionado'] = false
            }
        })
    }

    await dispatch({
        type: OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES,
        payload : data_subsidiossipendientes
    })

    console.log("facturas_asignadas_enviar_subpendientes: ")
    console.log(facturasSeleccionado)

    await dispatch({
        type: "SELECCIONAR_FACTURAS_ENVIAR_SUBSIDIOS_PENDIENTES",
        payload : facturasSeleccionado
    })

    return true
}

export const CambiarImpactoFacturaAsignadaListaFacturasReducer = (
    posicionZona, 
    posicionSubsidio, 
    posicionFactura,
    impacto,
    fdsid,
    fsiid
) => async (dispatch, getState) => {

    
    // console.log(posicionZona)
    // console.log(posicionSubsidio)
    // console.log(posicionFactura)
    // console.log(impacto)

    let {
        data_facturas_asignar_subpendientes, 
        facturas_asignadas_enviar_subpendientes
    } = getState().subsidiosPendientes

    let facturasSeleccionado = facturas_asignadas_enviar_subpendientes

    data_facturas_asignar_subpendientes[posicionFactura]['impacto'] = impacto

    if(impacto.length > 0){
        data_facturas_asignar_subpendientes[posicionFactura]['seleccionado'] = true

        let encontro = false
        
        await facturasSeleccionado.map((factura, posicion) => {
            if(factura.fdsid == fdsid){
                encontro = true
                facturasSeleccionado[posicion]['seleccionado'] = true
                facturasSeleccionado[posicion]['impacto'] = impacto
            }
        })

        if(encontro == false){
            facturasSeleccionado.push({
                "fdsid" : fdsid,
                "seleccionado": true,
                "impacto": impacto,
                "fsiid" : fsiid
           
            })
        }

    }else{
        data_facturas_asignar_subpendientes[posicionFactura]['seleccionado'] = false

        facturasSeleccionado.map((factura, posicion) => {
            if(factura.fdsid == fdsid){
                facturasSeleccionado[posicion]['seleccionado'] = false
            }
        })

    }

    await dispatch({
        type: "OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES_ONLY_DATA",
        payload : data_facturas_asignar_subpendientes
    })

    console.log("facturas_asignadas_enviar_subpendientes: ")
    console.log(facturasSeleccionado)

    await dispatch({
        type: "SELECCIONAR_FACTURAS_ENVIAR_SUBSIDIOS_PENDIENTES",
        payload : facturasSeleccionado
    })

    return true
}


export const DesplegarFiltroColumnaReducer = (posicion) => (dispatch, getState) => {
    
    let {AgrupacionesColumnas_Subsidios_Pendientes} = getState().subsidiosPendientes
    AgrupacionesColumnas_Subsidios_Pendientes[posicion]['seleccionado'] = !AgrupacionesColumnas_Subsidios_Pendientes[posicion]['seleccionado']
    dispatch({
        type: "OBTENER_FILTRO_COLUMNA_SUBSIDIOS_PENDIENTES",
        payload: AgrupacionesColumnas_Subsidios_Pendientes
    })
}

export const CambiarCheckFiltroSubPendientesReducer = (
    campo, valor, check, borrarTodo = false, noseleccionados = []
) => async(dispatch, getState) => {

    const filtrosTablaSubsidiosPendientes = await getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes
    const data_subsidiossipendientes_real =  await getState().subsidiosPendientes.data_subsidiossipendientes_real

    if(borrarTodo == true){
        filtrosTablaSubsidiosPendientes[campo] = []
        await data_subsidiossipendientes_real.map((zona) => {

            zona.data.map((data) => {
    
                data["check"] = true
    
            })
    
        })

        await data_subsidiossipendientes_real.map((zona) => {

            zona.data.map((data) => {
                
                noseleccionados.map((noselect) => {
                    if(data[campo] == noselect){
                        data["check"] = false
                    }
                })
            })
    
        })

        filtrosTablaSubsidiosPendientes[campo] = noseleccionados

    }else{
        await data_subsidiossipendientes_real.map((zona) => {

            zona.data.map((data) => {
    
                if(data[campo] == valor){
                    data["check"] = check
                }
    
            })
    
        })
        
        if(check == true){
            filtrosTablaSubsidiosPendientes[campo].map((val, pos) => {
                if(val == valor ){
                    filtrosTablaSubsidiosPendientes[campo].splice(pos,1)
                }
            })
        }else{
            filtrosTablaSubsidiosPendientes[campo].push(valor)
        }
    }

    dispatch(AplicarFiltrosSubsidiosPendientesReducer())
}

export const AplicarFiltrosSubsidiosPendientesReducer = () => async(dispatch, getState) => {

    const data_subsidiossipendientes_real = getState().subsidiosPendientes.data_subsidiossipendientes_real
    const sdeterritorioFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.sdeterritorio
    const clinombreFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.clinombre
    const clisuchmlFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.clisuchml
    const proskuFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.prosku
    const sdesacFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.sdesac
    const sdevalidadoFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.sdevalidado
    const sdesectorFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.sdesector
    const clizonaFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.clizona
    const catnombreFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.catnombre
    const propresentacionFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.propresentacion
    const clicodigoshiptoFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.clicodigoshipto
    const pronombreFiltrados = getState().subsidiosPendientes.filtrosTablaSubsidiosPendientes.pronombre
    
    let datasubsidiosreal = await {  ...data_subsidiossipendientes_real }
    let nuevoarray = []
    
    await data_subsidiossipendientes_real.map(async(zona, pos) => {
        
        nuevoarray[pos] = { ...zona }
        // nuevoarray[pos]['data'] = []
        let arrZon = []
        await zona.data.map((data) => {

            let agregar = true

            sdeterritorioFiltrados.map((territorio) => {
                if(data.sdeterritorio == territorio ){
                    agregar = false
                }
            })

            clinombreFiltrados.map((campo) => {
                if(data.clinombre == campo ){
                    agregar = false
                }
            })

            clisuchmlFiltrados.map((campo) => {
                if(data.clisuchml == campo ){
                    agregar = false
                }
            })

            proskuFiltrados.map((campo) => {
                if(data.prosku == campo ){
                    agregar = false
                }
            })

            sdesacFiltrados.map((campo) => {
                if(data.sdesac == campo ){
                    agregar = false
                }
            })

            sdevalidadoFiltrados.map((campo) => {
                if(data.sdevalidado == campo ){
                    agregar = false
                }
            })

            sdesectorFiltrados.map((campo) => {
                if(data.sdesector == campo ){
                    agregar = false
                }
            })

            clizonaFiltrados.map((campo) => {
                if(data.clizona == campo ){
                    agregar = false
                }
            })

            catnombreFiltrados.map((campo) => {
                if(data.catnombre == campo ){
                    agregar = false
                }
            })

            propresentacionFiltrados.map((campo) => {
                if(data.propresentacion == campo ){
                    agregar = false
                }
            })

            clicodigoshiptoFiltrados.map((campo) => {
                if(data.clicodigoshipto == campo ){
                    agregar = false
                }
            })

            pronombreFiltrados.map((campo) => {
                if(data.pronombre == campo ){
                    agregar = false
                }
            })

            if(agregar == true){
                arrZon.push({...data})
            }
        })
        // console.log(arrZon)
        nuevoarray[pos]['desplegado'] = false
        nuevoarray[pos]['data'] = arrZon
    })
    
    // console.log(nuevoarray)
    dispatch({
        type: "OBTENER_SUBSIDIOS_PENDIENTES_ONLY_DATA",
        payload: nuevoarray
    })
}


export const CambiarCheckFiltroSubPendientesFacturasReducer = (
    campo, valor, check, borrarTodo = false, noseleccionados = []
) => async(dispatch, getState) => {

    const filtrosTablaFacturasPendientes = await getState().subsidiosPendientes.filtrosTablaFacturasPendientes
    const data_facturas_asignar_subpendientes_real =  await getState().subsidiosPendientes.data_facturas_asignar_subpendientes_real

    if(borrarTodo == true){
        filtrosTablaFacturasPendientes[campo] = []
        await data_facturas_asignar_subpendientes_real.map((data) => {

            data["check"] = true
    
        })

        await data_facturas_asignar_subpendientes_real.map((data) => {

            noseleccionados.map((noselect) => {
                if(data[campo] == noselect){
                    data["check"] = false
                }
            })
    
        })

        filtrosTablaFacturasPendientes[campo] = noseleccionados

    }else{
        await data_facturas_asignar_subpendientes_real.map((data) => {

            if(data[campo] == valor){
                data["check"] = check
            }
    
        })
        
        if(check == true){
            filtrosTablaFacturasPendientes[campo].map((val, pos) => {
                if(val == valor ){
                    filtrosTablaFacturasPendientes[campo].splice(pos,1)
                }
            })
        }else{
            filtrosTablaFacturasPendientes[campo].push(valor)
        }
    }

    dispatch(AplicarFiltrosSubsidiosPendientesFacturasReducer())
}


export const AplicarFiltrosSubsidiosPendientesFacturasReducer = () => async(dispatch, getState) => {

    const data_facturas_asignar_subpendientes_real = getState().subsidiosPendientes.data_facturas_asignar_subpendientes_real
    const fecfechaFiltrados     = getState().subsidiosPendientes.filtrosTablaFacturasPendientes.fecfecha
    const fsifacturaFiltrados   = getState().subsidiosPendientes.filtrosTablaFacturasPendientes.fsifactura
    const fdsmaterialFiltrados  = getState().subsidiosPendientes.filtrosTablaFacturasPendientes.fdsmaterial
    const pronombreFiltrados    = getState().subsidiosPendientes.filtrosTablaFacturasPendientes.pronombre
    const proskuFiltrados       = getState().subsidiosPendientes.filtrosTablaFacturasPendientes.prosku
    const fsidestinatarioFiltrados   = getState().subsidiosPendientes.filtrosTablaFacturasPendientes.fsidestinatario
    const fsisolicitanteFiltrados    = getState().subsidiosPendientes.filtrosTablaFacturasPendientes.fsisolicitante
    const fecanionumeroFiltrados     = getState().subsidiosPendientes.filtrosTablaFacturasPendientes.fecanionumero
    const fecmesabreviacionFiltrados = getState().subsidiosPendientes.filtrosTablaFacturasPendientes.fecmesabreviacion
    
    
    let datasubsidiosreal = await {  ...data_facturas_asignar_subpendientes_real }
    let nuevoarray = []
    
    await data_facturas_asignar_subpendientes_real.map(async(data, pos) => {
        
        let agregar = true

        fecfechaFiltrados.map((dat) => {
            if(data.fecfecha == dat ){
                agregar = false
            }
        })

        fsifacturaFiltrados.map((dat) => {
            if(data.fsifactura == dat ){
                agregar = false
            }
        })

        fdsmaterialFiltrados.map((dat) => {
            if(data.fdsmaterial == dat ){
                agregar = false
            }
        })

        pronombreFiltrados.map((dat) => {
            if(data.pronombre == dat ){
                agregar = false
            }
        })

        proskuFiltrados.map((dat) => {
            if(data.prosku == dat ){
                agregar = false
            }
        })

        fsidestinatarioFiltrados.map((dat) => {
            if(data.fsidestinatario == dat ){
                agregar = false
            }
        })

        fsisolicitanteFiltrados.map((dat) => {
            if(data.fsisolicitante == dat ){
                agregar = false
            }
        })

        fecanionumeroFiltrados.map((dat) => {
            if(data.fecanionumero == dat ){
                agregar = false
            }
        })

        fecmesabreviacionFiltrados.map((dat) => {
            if(data.fecmesabreviacion == dat ){
                agregar = false
            }
        })

        if(agregar == true){
            nuevoarray.push({...data})
        }
        
    })
    
    // console.log(nuevoarray)
    dispatch({
        type: "OBTENER_FACTURAS_SUBSIDIOS_PENDIENTES_ONLY_DATA",
        payload: nuevoarray
    })
}