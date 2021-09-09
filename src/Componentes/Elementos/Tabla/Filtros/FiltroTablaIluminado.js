import React, {useState, useEffect} from 'react'
import { Checkbox, Switch  } from 'antd';
import {CambiarCheckFiltroSoReducer} from '../../../../Redux/Actions/SubsidiosSo/SubsidiosSo'
import {CambiarCheckFiltroSiReducer} from '../../../../Redux/Actions/SubsidiosSi/SubsidiosSiFront'
import {CambiarCheckFiltroSubPendientesReducer} from '../../../../Redux/Actions/SubsidiosPendientes/SubsidiosPendientesFront'
import {useDispatch, useSelector} from "react-redux";
import '../../../../Estilos/Elementos/Tabla/FiltroTablaIluminado.css'
import IconoFlechaAbajoFiltro from '../../../../Assets/Imagenes/Iconos/Comunes/flechaAbajoFiltro.png'

const FiltroTablaIluminado = (props) => {
    const dispatch = useDispatch();
    const [txtBuscar, setTxtBuscar] = useState("")
    const [mostrarFiltro, setMostrarFiltro] = useState(false)
    const [seleccionarTodo, setSeleccionarTodo] = useState(true)

    const data_subsidiosso_real = props.data_subsidiosso_real
    const campo = props.campo
    const esValidacion = props.esValidacion
    const esConexion = props.esConexion
    const tieneSwitch = props.tieneSwitch
    const accionSwitch = props.accionSwitch

    const pertenenciaFiltros = props.pertenenciaFiltros
    
    // const campo = props.campo

    useEffect(() => {
        setTxtBuscar("")
        // validarTodoSeleccionado()



    },[])

    const obtenerCampos = () => {
        
        let nuevoA = []

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

        return (
            nuevoA.map((nuevaData) => {
                return(
                    <>
                        <Checkbox
                            checked={
                                nuevaData.check == undefined 
                                ? true
                                : nuevaData.check
                            }
                            onChange={async(e) => {
                                // setMostrarFiltro(false)
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
                                }
                                // setMostrarFiltro(true)
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
                            nuevoA.push(data)
                        }else{
                            noseleccionados.push(data[campo])
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
                        }else{
                            noseleccionados.push(data[campo])
                        }
                    }

                }else{
                    
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
        }

        setMostrarFiltro(false)
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
                {props.titulo}
                <img onClick={() => setMostrarFiltro(!mostrarFiltro)} src={IconoFlechaAbajoFiltro} className="Icono-Flecha-Filtro-Tabla-Iluminado" />
            </div>

            {
                mostrarFiltro == true
                ?<div
                    style={{
                        marginTop:'5px',
                        width: '204px',
                        height: '250px',
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
                            placeholder="Buscar" style={{border:'0'}}  
                        />
                    </div>

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
                            onClick={() => aplicarFiltroTxt()} 
                            className="Btn-Aceptar-Filtro-Iluminado W600-S13-H17-CFFFFFF">
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
