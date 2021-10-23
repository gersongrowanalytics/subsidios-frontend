import React, {useState, useEffect} from 'react'
import { Checkbox, Switch  } from 'antd';
import {CambiarCheckFiltroSoReducer} from '../../../../Redux/Actions/SubsidiosSo/SubsidiosSo'
import {CambiarCheckFiltroSiReducer} from '../../../../Redux/Actions/SubsidiosSi/SubsidiosSiFront'
import {
    CambiarCheckFiltroSubPendientesReducer,
    CambiarCheckFiltroSubPendientesFacturasReducer
} from '../../../../Redux/Actions/SubsidiosPendientes/SubsidiosPendientesFront'
import {useDispatch, useSelector} from "react-redux";
import '../../../../Estilos/Elementos/Tabla/FiltroTablaIluminado.css'
import IconoFlechaAbajoFiltro from '../../../../Assets/Imagenes/Iconos/Comunes/flechaAbajoFiltro.png'
import IconoFiltro from '../../../../Assets/Imagenes/Iconos/Comunes/filtro.png'

const FiltroTablaIluminado = (props) => {
    const dispatch = useDispatch();
    const [txtBuscar, setTxtBuscar] = useState("")
    const [mostrarFiltro, setMostrarFiltro] = useState(false)
    const [seleccionarTodo, setSeleccionarTodo] = useState(true)
    const [mostrarIconoFiltro, setMostrarIconoFiltro] = useState(false)
    const [bloquearAceptar, setBloquearAceptar] = useState(false)

    const data_subsidiosso_real = props.data_subsidiosso_real
    const campo = props.campo
    const esValidacion = props.esValidacion
    const esConexion = props.esConexion
    const tieneSwitch = props.tieneSwitch
    const accionSwitch = props.accionSwitch

    const pertenenciaFiltros = props.pertenenciaFiltros
    const datalimpia = props.datalimpia
    
    // const campo = props.campo

    useEffect(() => {
        setTxtBuscar("")
        // validarTodoSeleccionado()



    },[])

    const obtenerCampos = () => {
        
        let nuevoA = []

        if(datalimpia == true){

            data_subsidiosso_real.map((data) => {
                if(txtBuscar.length > 0){
    
                    if(nuevoA.length == 0){
                        if(data[campo].includes(txtBuscar.toUpperCase()) || data[campo].includes(txtBuscar.toLowerCase())){
                            nuevoA.push(data)
                        }
                    }else{
                        if(data[campo].includes(txtBuscar.toUpperCase()) || data[campo].includes(txtBuscar.toLowerCase())){
                            let encontro = false
                            nuevoA.map((ndta) => {
                                if(ndta[campo] == data[campo]){
                                    encontro = true
                                }
                            })
        
                            if(encontro == false){
                                nuevoA.push(data)
                            }
                        }
                    }

                }else{
                    if(nuevoA.length == 0){
                        nuevoA.push(data)
                    }else{
                        let encontro = false
                        nuevoA.map((ndta) => {
                            if(ndta[campo] == data[campo]){
                                encontro = true
                            }
                        })
    
                        if(encontro == false){
                            nuevoA.push(data)
                        }
                    }
                }
            })

        }else{
            data_subsidiosso_real.map((zona) => {
                zona.data.map((data) => {
                    if(txtBuscar.length > 0){
    
                        if(nuevoA.length == 0){
                            if(data[campo].includes(txtBuscar.toUpperCase()) || data[campo].includes(txtBuscar.toLowerCase())){
                                nuevoA.push(data)
                            }
                        }else{
                            if(data[campo].includes(txtBuscar.toUpperCase()) || data[campo].includes(txtBuscar.toLowerCase())){
                                let encontro = false
                                nuevoA.map((ndta) => {
                                    if(ndta[campo] == data[campo]){
                                        encontro = true
                                    }
                                })
            
                                if(encontro == false){
                                    nuevoA.push(data)
                                }
                            }
                        }
    
                    }else{
                        if(nuevoA.length == 0){
                            nuevoA.push(data)
                        }else{
                            let encontro = false
                            nuevoA.map((ndta) => {
                                if(ndta[campo] == data[campo]){
                                    encontro = true
                                }
                            })
        
                            if(encontro == false){
                                nuevoA.push(data)
                            }
                        }
                    }
                })
            })
        }

        return (
            nuevoA.map((nuevaData, posicion) => {

                return(
                    <>
                        <Checkbox
                        style={
                            campo == "clinombre" ?{width:'200px'}
                            :campo == "pronombre"?{width:'350px'}:{}
                        }
                            className="Checkbox-Filtros-Tablas-Iluminado"
                            checked={
                                nuevaData.check == undefined 
                                ? true
                                : nuevaData.check
                            }
                            onChange={async(e) => {

                                if(bloquearAceptar == true){
                                    if(e.target.checked == true){
                                        setBloquearAceptar(false)
                                    }
                                }

                                setSeleccionarTodo(false)
                                if(pertenenciaFiltros == "SUBSO"){ //IDENTIFICAR SI LOS FILTROS SE APLICAN A SUB SO O SUB SI O CUALQUIER OTRO
                                    await dispatch(CambiarCheckFiltroSoReducer(
                                        campo, nuevaData[campo], e.target.checked,
                                    ))
                                }else if(pertenenciaFiltros == "SUBSI"){
                                    await dispatch(CambiarCheckFiltroSiReducer(
                                        campo, nuevaData[campo], e.target.checked,
                                    ))
                                }else if(pertenenciaFiltros == "SUBPENDIENTES"){
                                    await dispatch(CambiarCheckFiltroSubPendientesReducer(
                                        campo, nuevaData[campo], e.target.checked,
                                    ))
                                }else if(pertenenciaFiltros == "SUBPENDIENTESFACTURAS"){
                                    await dispatch(CambiarCheckFiltroSubPendientesFacturasReducer(
                                        campo, nuevaData[campo], e.target.checked,
                                    ))
                                }

                                if(e.target.checked == false){
                                    setMostrarIconoFiltro(true)
                                    let tsad = true
                                    await nuevoA.map(dt => {
                                        if(dt.check == true || dt.check == undefined){
                                            tsad = false
                                        }
                                    })

                                    if(tsad == true){
                                        setBloquearAceptar(true)
                                    }
                                }else{
                                    let tsad = true
                                    await nuevoA.map(dt => {
                                        if(dt.check == false){
                                            tsad = false
                                        }
                                    })

                                    if(tsad == true){
                                        setMostrarIconoFiltro(false)
                                        setSeleccionarTodo(true)
                                    }

                                }
                            }}
                        ><span className="W400-S13-H17-C004FB8">
                            {
                                esValidacion == true
                                ?nuevaData[campo] == "NOVALIDADOS"
                                    ?"No Validado"
                                    :"Validado"
                                :esConexion == true
                                    ?nuevaData[campo] == 1
                                        ?"Manual"
                                        :"Automatico"
                                    :nuevaData[campo]
                            }
                        </span></Checkbox><br/>
                    </>
                )
            })
        )
    }

    const aplicarFiltroTxt = async () => {
        
        let nuevoA = []
        let noseleccionados = []

        await data_subsidiosso_real.map((zona) => {
            zona.data.map((data, pos) => {
                if(txtBuscar.length > 0){

                    if(nuevoA.length == 0){
                        if(data[campo].includes(txtBuscar.toUpperCase()) || data[campo].includes(txtBuscar.toLowerCase())){
                            if(data.check == undefined || data.check == true){
                                nuevoA.push(data)
                            }else{
                                noseleccionados.push(data[campo])
                            }
                        }else{
                            noseleccionados.push(data[campo])
                        }
                    }else{
                        if(data[campo].includes(txtBuscar.toUpperCase()) || data[campo].includes(txtBuscar.toLowerCase())){
                            
                            if(data.check == undefined || data.check == true){
                                let encontro = false
                                nuevoA.map((ndta) => {
                                    if(ndta[campo] == data[campo]){
                                        encontro = true
                                    }
                                })
                                
                                if(encontro == false){
                                    nuevoA.push(data)
                                }
                            }else{
                                noseleccionados.push(data[campo])
                            }
        
                        }else{
                            noseleccionados.push(data[campo])
                        }
                    }

                }else{
                    if(data.check == undefined || data.check == true){
                        nuevoA.push(data)
                    }else{
                        noseleccionados.push(data[campo])
                    }
                }
            })
        })

        if(pertenenciaFiltros == "SUBSO"){
            dispatch(
                CambiarCheckFiltroSoReducer(
                    campo, "", true, true, noseleccionados,
                    pertenenciaFiltros //IDENTIFICAR SI LOS FILTROS SE APLICAN A SUB SO O SUB SI O CUALQUIER OTRO
                )
            )
        }else if(pertenenciaFiltros == "SUBSI"){
            dispatch(
                CambiarCheckFiltroSiReducer(
                    campo, "", true, true, noseleccionados,
                    pertenenciaFiltros //IDENTIFICAR SI LOS FILTROS SE APLICAN A SUB SO O SUB SI O CUALQUIER OTRO
                )
            )
        }else if(pertenenciaFiltros == "SUBPENDIENTES"){
            dispatch(
                CambiarCheckFiltroSubPendientesReducer(
                    campo, "", true, true, noseleccionados,
                    pertenenciaFiltros //IDENTIFICAR SI LOS FILTROS SE APLICAN A SUB SO O SUB SI O CUALQUIER OTRO
                )
            )
        }else if(pertenenciaFiltros == "SUBPENDIENTESFACTURAS"){
            dispatch(
                CambiarCheckFiltroSubPendientesFacturasReducer(
                    campo, "", true, true, noseleccionados,
                    pertenenciaFiltros //IDENTIFICAR SI LOS FILTROS SE APLICAN A SUB SO O SUB SI O CUALQUIER OTRO
                )
            )
        }
        
        setTxtBuscar("")
        setMostrarFiltro(false)
        console.log(nuevoA)
        console.log(noseleccionados)
    }

    const funSeleccionarTodo = async (e) => {
        if(e == true){
            setMostrarIconoFiltro(false)
            setBloquearAceptar(false)
        }else{
            setBloquearAceptar(true)
        }
        setSeleccionarTodo(e)
        let nuevoA = []
        let noseleccionados = []

        await data_subsidiosso_real.map((zona) => {
            zona.data.map((data, pos) => {
                if(txtBuscar.length > 0){

                    if(nuevoA.length == 0){
                        if(data[campo].includes(txtBuscar.toUpperCase()) || data[campo].includes(txtBuscar.toLowerCase())){
                            if(e == true){
                                nuevoA.push(data)
                            }else{
                                noseleccionados.push(data[campo])
                            }
                        }else{
                            noseleccionados.push(data[campo])
                        }
                    }else{
                        if(data[campo].includes(txtBuscar.toUpperCase()) || data[campo].includes(txtBuscar.toLowerCase())){
                            if(e == true){
                                
                                let encontro = false
                                nuevoA.map((ndta) => {
                                    if(ndta[campo] == data[campo]){
                                        encontro = true
                                    }
                                })
            
                                if(encontro == false){
                                    nuevoA.push(data)
                                }

                            }else{
                                noseleccionados.push(data[campo])    
                            }
                        }else{
                            noseleccionados.push(data[campo])
                        }
                    }

                }else{
                    
                    if(e == true){
                        nuevoA.push(data)
                    }else{
                        noseleccionados.push(data[campo])
                    }

                }
            })
        })

        if(pertenenciaFiltros == "SUBSO"){
            dispatch(
                CambiarCheckFiltroSoReducer(
                    campo, "", e, true, noseleccionados,
                    pertenenciaFiltros //IDENTIFICAR SI LOS FILTROS SE APLICAN A SUB SO O SUB SI O CUALQUIER OTRO
                )
            )
        }else if(pertenenciaFiltros == "SUBSI"){
            dispatch(
                CambiarCheckFiltroSiReducer(
                    campo, "", e, true, noseleccionados,
                    pertenenciaFiltros //IDENTIFICAR SI LOS FILTROS SE APLICAN A SUB SO O SUB SI O CUALQUIER OTRO
                )
            )
        }else if(pertenenciaFiltros == "SUBPENDIENTES"){
            dispatch(
                CambiarCheckFiltroSubPendientesReducer(
                    campo, "", e, true, noseleccionados,
                    pertenenciaFiltros //IDENTIFICAR SI LOS FILTROS SE APLICAN A SUB SO O SUB SI O CUALQUIER OTRO
                )
            )
        }else if(pertenenciaFiltros == "SUBPENDIENTESFACTURAS"){
            dispatch(
                CambiarCheckFiltroSubPendientesFacturasReducer(
                    campo, "", e, true, noseleccionados,
                    pertenenciaFiltros //IDENTIFICAR SI LOS FILTROS SE APLICAN A SUB SO O SUB SI O CUALQUIER OTRO
                )
            )
        }

    }


    const validarTodoSeleccionado = () => {
        let todoSeleccionado = true
        data_subsidiosso_real.map((zona) => {
            zona.data.map((data) => {
                if(data.check == false){
                    todoSeleccionado = false
                }
            })
        })
        setSeleccionarTodo(todoSeleccionado)
    }

    return (
        <>
            <div className="Wbold-S13-H17-CFFFFFF" 
                style={{
                    width:'100%',
                    height: '25px',
                    background:'#FF8023',
                    borderRadius: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    paddingLeft:'15px',
                    cursor:'pointer'
                }}
                // onClick={() => setMostrarFiltro(!mostrarFiltro)}
            >
                {
                    tieneSwitch == true
                    ?<div style={{marginRight:'8px'}}>
                        <Switch 
                            onChange={() => accionSwitch()}
                            className="Switch-Filtro-Tabla-Iluminada" size="small" defaultChecked 
                        />
                    </div>
                    :null
                }
                <div onClick={() => setMostrarFiltro(!mostrarFiltro)}>{props.titulo}</div>
                <img 
                    onClick={() => setMostrarFiltro(!mostrarFiltro)}
                    src={mostrarIconoFiltro == true ?IconoFiltro :IconoFlechaAbajoFiltro} 
                    className="Icono-Flecha-Filtro-Tabla-Iluminado" 
                />
            </div>

            {
                mostrarFiltro == true
                ?<div
                    style={{
                        marginTop:'5px',
                        width: '204px',
                        height: '280px',
                        background: '#FFFFFF',
                        border: '1px solid #D7E8FF',
                        boxSizing: 'border-box',
                        boxShadow: '0px 0px 15px #D8DFE9',
                        borderRadius: '8px',
                        position: 'absolute',
                        zIndex:'100',
                        paddingLeft:'18px',
                        paddingRight:'18px',
                        paddingTop:'13px',
                    }}
                >

                    <div
                        style={{
                            border: '1px solid #004FB8',
                            boxSizing: 'border-box',
                            borderRadius: '14px',
                            width:'100%',
                            height:'24px',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft:'10px',
                            marginBottom:'10px',
                        }}
                        className="Wnormal-S12-H16-CA2B9ED-L0015"
                    >
                        <input
                            onChange={(e) => {
                                setTxtBuscar(e.target.value)
                                validarTodoSeleccionado()
                            }}
                            value={txtBuscar}
                            placeholder="Buscar" 
                            style={{border:'0', color:'black'}}  
                        />


                    </div>

                    <div style={{marginBottom:'5px'}}>

                        <Checkbox
                            className="Checkbox-Filtros-Tablas-Iluminado"
                            checked={seleccionarTodo}
                            onChange={async(e) => {
                                funSeleccionarTodo(e.target.checked)
                            }}
                        ><span className="W400-S13-H17-C004FB8">
                            {
                                "Seleccionar todo"
                            }
                        </span></Checkbox><br/>
                    </div>

                    {/* <div style={{marginBottom:'5px'}}>

                        <Checkbox
                            className="Checkbox-Filtros-Tablas-Iluminado"
                            checked={seleccionarTodo}
                            onChange={async(e) => {
                                funSeleccionarTodo(e.target.checked)
                            }}
                        ><span className="W400-S13-H17-C004FB8">
                            {
                                "Agregar la selección actual al filtro"
                            }
                        </span></Checkbox><br/>
                    </div> */}

                    {/* <Checkbox
                        checked={seleccionarTodo}
                    >
                        <span className="W600-S13-H17-C004FB8">Seleccionar todo</span>
                    </Checkbox><br/> */}
{/* 004FB8 222 224 237 */}
                    <div style={{overflow:'auto', width:'100%', height:'150px'}}>
                        {
                            obtenerCampos()
                        }
                    </div>

                    <div className="Contenedor-Btns-Filtro-Iluminado">
                        <div
                            onClick={() => {
                                if(bloquearAceptar == false){
                                    aplicarFiltroTxt()
                                }
                            }} 
                            className={
                                bloquearAceptar == true
                                ?"Btn-Aceptar-Bloqueado-Filtro-Iluminado W600-S13-H17-CFFFFFF"
                                :"Btn-Aceptar-Filtro-Iluminado W600-S13-H17-CFFFFFF"
                            }
                        >
                            Aceptar
                        </div>
                        <div
                            onClick={() => setMostrarFiltro(false)} 
                            className="Btn-Cancelar-Filtro-Iluminado">
                            <span className="W600-S13-H17-C004FB8-L0015">Cancelar</span>
                        </div>
                    </div>

                </div>

                :null
            }
        </>
    )
}

export default FiltroTablaIluminado
