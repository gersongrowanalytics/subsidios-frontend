import React, {useState, useEffect} from 'react'
import '../../../Estilos/Componentes/FiltroFechaXmesXanio/FiltroFechaXmesXanio.css'
import {Row, Col} from 'antd'
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import {useDispatch, useSelector} from "react-redux";
import IconoCalendario from '../../../Assets/Imagenes/Iconos/Comunes/calendario.svg'

const FiltroFechaXmesXanio = (props) => {

    const [mostrarFiltroAnio, setMostrarFiltroAnio] = useState(false)
    const [mostrarFiltroMes, setMostrarFiltroMes] = useState(false)

    const anioSeleccionado    = props.anioSeleccionado
    const mesSeleccionado     = props.mesSeleccionado
    const setAnioSeleccionado = props.setAnioSeleccionado
    const setMesSeleccionado  = props.setMesSeleccionado
    
    const {
        ComunesAnioTxtIncio,
        ComunesMesTxtInicio,
    } = useSelector(({comunes}) => comunes)
    
    useEffect(() => {

        setAnioSeleccionado(ComunesAnioTxtIncio)
        setMesSeleccionado(ComunesMesTxtInicio)

    }, [ComunesAnioTxtIncio])

    return (
        <div style={{display:'flex'}} className="Contenedor-Filtro-Fechas-Xmes-Xanio">
            <div className='Wbold-S13-H17-C004FB8' style={{marginRight:'35px', paddingTop: "3px", position:'relative', paddingLeft:'30px'}} >
                <div className='Contenedor-Icono-Calendario-FiltroFechaXmesXanio'>
                    <img src={IconoCalendario} className='Icono-Calendario-FiltroFechaXmesXanio' />
                </div>
                <div style={{ position:'absolute' }}>
                    Año
                </div>
            </div>
            <div 
                className='Contenedor-Filtro-Fecha-Nota-Credito Wnormal-S13-H17-C004FB8' 
                onClick={() => {
                    setMostrarFiltroAnio(!mostrarFiltroAnio)
                    setMostrarFiltroMes(false)
                }}
            >
                {anioSeleccionado}
                {/* {ComunesAnioTxtIncio} */}
                {/* {ComunesMesTxtInicio} */}
            </div>

            {
                mostrarFiltroAnio == true
                ?<div className="Contenedor-Anio-FiltroFechaXmesXanio">

                    <Row>
                        <Col xl={24} style={{ height:'30px', paddingTop:'10px'}}>
                            <Row style={{ height: "100%"}}>
                                <Col 
                                    xl={8}
                                    style={{
                                        alignSelf: "center",
                                        paddingLeft: "10px",
                                        marginBottom: '10px'
                                    }}
                                >
                                    <DoubleLeftOutlined style={{color:'#002D87'}} className="Icono-Flecha-Siguiente-FiltroXmesXanio" />
                                </Col>
                                <Col xl={8} style={{marginBottom: '10px', paddingTop: "5px"}}>
                                    <div className='Wbold-S12-H16-C002D87'>2020-2029</div>
                                </Col>
                                <Col 
                                    xl={8}
                                    style={{
                                        alignSelf: "center",
                                        textAlign: "-webkit-right",
                                        paddingRight: "10px",
                                        marginBottom: '10px'
                                    }}
                                    
                                >
                                    <DoubleRightOutlined style={{color:'#002D87'}} className="Icono-Flecha-Siguiente-FiltroXmesXanio" />
                                </Col>
                                <Col xl={24}>
                                    <Row>
                                        {
                                            [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map((anio) => {
                                                return (
                                                    <Col 
                                                        xl={8} 
                                                        style={{
                                                            marginBottom: '5px',
                                                            display: "flex",
                                                            placeContent: "center"
                                                        }}
                                                    >
                                                        <div 
                                                            className={
                                                                anioSeleccionado == anio
                                                                ?"anio-seleccionado-texto-filtrofechaxmesxanio" 
                                                                :"Wnormal-S12-H17-Crgba04513507 anio-texto-filtrofechaxmesxanio" 
                                                            }
                                                            style={{textAlign: "-webkit-center"}}
                                                            onClick={() => {
                                                                setMostrarFiltroAnio(false)
                                                                setAnioSeleccionado(anio)
                                                            }}
                                                        >
                                                            {anio}
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                </div>
                :null
            }

            <div className='Wbold-S13-H17-C004FB8' style={{marginRight:'35px', marginLeft:'50px', paddingTop: "3px", position:'relative'}} >
                <div className='Contenedor-Icono-Calendario-FiltroFechaXmesXanio' style={{left:'-30px'}}>
                    <img src={IconoCalendario} className='Icono-Calendario-FiltroFechaXmesXanio' />
                </div>

                <div style={{ position:'absolute' }}>
                    Mes
                </div>
            </div>
            <div 
                className='Contenedor-Filtro-Fecha-Nota-Credito Wnormal-S13-H17-C004FB8' 
                onClick={() => {
                    setMostrarFiltroMes(!mostrarFiltroMes)
                    setMostrarFiltroAnio(false)
                }}
            >
                {mesSeleccionado}
            </div>
            {
                mostrarFiltroMes == true
                ?<div className="Contenedor-Mes-FiltroFechaXmesXanio">

                    <Row>
                        <Col xl={24} style={{ height:'30px', paddingTop:'10px'}}>
                            <Row style={{ height: "100%"}}>
                                
                                <Col xl={24} style={{marginBottom: '10px', paddingTop: "5px", textAlign: "-webkit-center"}}>
                                    <div className='Wbold-S12-H16-C002D87'>MESES</div>
                                </Col>
                                
                                <Col xl={24} className="Cuerpo-Mes-FiltroFechaXmesXanio">
                                    <Row>
                                        {
                                            ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"].map((mes) => {
                                                return (
                                                    <Col 
                                                        xl={24} 
                                                        style={{
                                                            marginBottom: '5px',
                                                            display: "flex",
                                                            justifyContent: "center"
                                                        }}
                                                    >
                                                        <div 
                                                            className={
                                                                mesSeleccionado == mes
                                                                ?"W600-S12-H16-C004FB8 mes-seleccionado-texto-filtrofechaxmesxanio" 
                                                                :"W600-S12-H16-C004FB8 mes-texto-filtrofechaxmesxanio" 
                                                            }
                                                            style={{textAlign: "-webkit-center"}}
                                                            onClick={() => {
                                                                setMostrarFiltroMes(false)
                                                                setMesSeleccionado(mes)
                                                            }}
                                                        >
                                                            {mes}
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                </div>
                :null
            }
        </div>
    )
}

export default FiltroFechaXmesXanio
