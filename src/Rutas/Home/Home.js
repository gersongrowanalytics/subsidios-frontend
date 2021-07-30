import React, {useState} from 'react'
import { Modal, Row, Col, Button } from 'antd';
import '../../Estilos/Rutas/Home/Home.css'
import IconoRevenue from '../../Assets/Imagenes/Iconos/Home/revenue.png'
import IconoSac from '../../Assets/Imagenes/Iconos/Home/sac.png'
import IconoSistemas from '../../Assets/Imagenes/Iconos/Home/sistemas.png'
import IconoRevenueLight from '../../Assets/Imagenes/Iconos/Home/iconoRevenue.png'
import IconoSacLight from '../../Assets/Imagenes/Iconos/Home/iconoSac.png'
import IconoGrowLight from '../../Assets/Imagenes/Iconos/Home/iconoGrow.png'
import IconoSistemasLight from '../../Assets/Imagenes/Iconos/Home/iconoSistemas.png'
import IconoVentasLight from '../../Assets/Imagenes/Iconos/Home/iconoVentas.png'


import {useDispatch, useSelector} from "react-redux";

const Home = () => {

    const {ComunesTipoDisenio} = useSelector(({comunes}) => comunes)

    const eventos = [
        {
            "area" : "Revenue",
            "icono" : IconoRevenueLight,
            "bases": [
                {
                    "base"   : "Subsidios No Aprobados",
                    "estado" : true,
                    "respon" : "Maria",
                    "fechaCar" : "26 de Junio del 2021",
                    "fechaRea" : "24 de Junio del 2021",
                    "fechaAct" : "24 de Junio del 2021",
                    "diaRetra" : "0 días"
                },
                {
                    "base"   : "Facturas SO",
                    "estado" : true,
                    "respon" : "Maria",
                    "fechaCar" : "26 de Junio del 2021",
                    "fechaRea" : "24 de Junio del 2021",
                    "fechaAct" : "24 de Junio del 2021",
                    "diaRetra" : "0 días"
                }
            ]
        },
        {
            "area" : "SAC",
            "icono" : IconoSacLight,
            "bases": [
                {
                    "base"   : "Subsidios Pre-Aprobados",
                    "estado" : true,
                    "respon" : "Equipo SAC",
                    "fechaCar" : "26 de Junio del 2021",
                    "fechaRea" : "-",
                    "fechaAct" : "-",
                    "diaRetra" : "0 días"
                }
            ]
        },
        {
            "area" : "Grow",
            "icono" : IconoGrowLight,
            "bases": [
                {
                    "base"   : "Consolidación de Información SO",
                    "estado" : true,
                    "respon" : "Grow Sistema",
                    "fechaCar" : "26 de Junio del 2021",
                    "fechaRea" : "24 de Junio del 2021",
                    "fechaAct" : "24 de Junio del 2021",
                    "diaRetra" : "0 días"
                },
                // {
                //     "base"   : "base numero 1",
                //     "estado" : true,
                //     "respon" : "Hector Mamani",
                //     "fechaCar" : "12 de Abril del 2021",
                //     "fechaRea" : "14 de Abril del 2021",
                //     "fechaAct" : "15 de Abril del 2021",
                //     "diaRetra" : "0 días"
                // },
                // {
                //     "base"   : "base numero 1",
                //     "estado" : true,
                //     "respon" : "Hector Mamani",
                //     "fechaCar" : "12 de Abril del 2021",
                //     "fechaRea" : "14 de Abril del 2021",
                //     "fechaAct" : "15 de Abril del 2021",
                //     "diaRetra" : "0 días"
                // },
            ]
        },

    ]

    const eventosSi = [
        {
            "area" : "Ventas",
            "icono" : IconoVentasLight,
            "bases": [
                {
                    "base"   : "Subsidios No Aprobados",
                    "estado" : true,
                    "respon" : "Maria",
                    "fechaCar" : "26 de Junio del 2021",
                    "fechaRea" : "24 de Junio del 2021",
                    "fechaAct" : "24 de Junio del 2021",
                    "diaRetra" : "0 días"
                },
                {
                    "base"   : "Facturas SO",
                    "estado" : true,
                    "respon" : "Maria",
                    "fechaCar" : "26 de Junio del 2021",
                    "fechaRea" : "24 de Junio del 2021",
                    "fechaAct" : "24 de Junio del 2021",
                    "diaRetra" : "0 días"
                }
            ]
        },
        {
            "area" : "Revenue",
            "icono" : IconoRevenueLight,
            "bases": [
                {
                    "base"   : "Subsidios Pre-Aprobados",
                    "estado" : true,
                    "respon" : "Equipo SAC",
                    "fechaCar" : "26 de Junio del 2021",
                    "fechaRea" : "-",
                    "fechaAct" : "-",
                    "diaRetra" : "0 días"
                }
            ]
        },
        {
            "area" : "SAC",
            "icono" : IconoSacLight,
            "bases": [
                {
                    "base"   : "Consolidación de Información SO",
                    "estado" : true,
                    "respon" : "Grow Sistema",
                    "fechaCar" : "26 de Junio del 2021",
                    "fechaRea" : "24 de Junio del 2021",
                    "fechaAct" : "24 de Junio del 2021",
                    "diaRetra" : "0 días"
                },
            ]
        },
        {
            "area" : "Sistemas",
            "icono" : IconoSistemasLight,
            "bases": [
                {
                    "base"   : "Consolidación de Información SO",
                    "estado" : true,
                    "respon" : "Grow Sistema",
                    "fechaCar" : "26 de Junio del 2021",
                    "fechaRea" : "24 de Junio del 2021",
                    "fechaAct" : "24 de Junio del 2021",
                    "diaRetra" : "0 días"
                },
            ]
        },

    ]

    const [statusSiSeleccionado , setStatusSiSeleccionado] = useState(false)
    const [eventosSeleccionados , setEventosSeleccionados] = useState(
        [
            {
                "area" : "Revenue",
                "icono" : IconoRevenueLight,
                "bases": [
                    {
                        "base"   : "Subsidios No Aprobados",
                        "estado" : true,
                        "respon" : "Maria",
                        "fechaCar" : "26 de Junio del 2021",
                        "fechaRea" : "24 de Junio del 2021",
                        "fechaAct" : "24 de Junio del 2021",
                        "diaRetra" : "0 días"
                    },
                    {
                        "base"   : "Facturas SO",
                        "estado" : true,
                        "respon" : "Maria",
                        "fechaCar" : "26 de Junio del 2021",
                        "fechaRea" : "24 de Junio del 2021",
                        "fechaAct" : "24 de Junio del 2021",
                        "diaRetra" : "0 días"
                    }
                ]
            },
            {
                "area" : "SAC",
                "icono" : IconoSacLight,
                "bases": [
                    {
                        "base"   : "Subsidios Pre-Aprobados",
                        "estado" : true,
                        "respon" : "Equipo SAC",
                        "fechaCar" : "26 de Junio del 2021",
                        "fechaRea" : "-",
                        "fechaAct" : "-",
                        "diaRetra" : "0 días"
                    }
                ]
            },
            {
                "area" : "Grow",
                "icono" : IconoGrowLight,
                "bases": [
                    {
                        "base"   : "Consolidación de Información SO",
                        "estado" : true,
                        "respon" : "Grow Sistema",
                        "fechaCar" : "26 de Junio del 2021",
                        "fechaRea" : "24 de Junio del 2021",
                        "fechaAct" : "24 de Junio del 2021",
                        "diaRetra" : "0 días"
                    },
                    // {
                    //     "base"   : "base numero 1",
                    //     "estado" : true,
                    //     "respon" : "Hector Mamani",
                    //     "fechaCar" : "12 de Abril del 2021",
                    //     "fechaRea" : "14 de Abril del 2021",
                    //     "fechaAct" : "15 de Abril del 2021",
                    //     "diaRetra" : "0 días"
                    // },
                    // {
                    //     "base"   : "base numero 1",
                    //     "estado" : true,
                    //     "respon" : "Hector Mamani",
                    //     "fechaCar" : "12 de Abril del 2021",
                    //     "fechaRea" : "14 de Abril del 2021",
                    //     "fechaAct" : "15 de Abril del 2021",
                    //     "diaRetra" : "0 días"
                    // },
                ]
            },
    
        ]
    )


    const seleccionarNuevoEvento = (tipo) => {
        if(tipo == "SI"){
            setEventosSeleccionados(eventosSi)
        }else{
            setEventosSeleccionados(eventos)
        }
    }

    return (
        <div
            style={{
                paddingLeft:'60px',
                paddingRight:'60px',
            }}
        >

            <Row style={{marginBottom:'20px'}}>

                <Col xl={24}>
                    <div 
                        style={{
                            background: "#EDF0FA", height:'45px', marginLeft:'-60px', marginRight:'-60px',
                            paddingLeft:'60px',
                            paddingRight:'60px',
                        }}
                    >
                        <Row>
                            <Col 
                                xl={4}
                                className={
                                    statusSiSeleccionado == true
                                    ?"Wbold-S20-H27-C004FB8 Contenedor-Cabecera-Status-Home DFE4F2"
                                    :"Wbold-S20-H27-C004FB8 Contenedor-Cabecera-Status-Home CFFFFFF"
                                }
                                style={{marginRight:'20px'}}
                                onClick={() => {
                                    seleccionarNuevoEvento("SO")
                                    setStatusSiSeleccionado(false)
                                    
                                }}
                            >
                                Status sell Out
                            </Col>
                            <Col 
                                xl={4} 
                                className={
                                    statusSiSeleccionado == true
                                    ?"Wbold-S20-H27-C004FB8 Contenedor-Cabecera-Status-Home CFFFFFF"
                                    :"Wbold-S20-H27-C004FB8 Contenedor-Cabecera-Status-Home DFE4F2"
                                }
                                onClick={() => {
                                    seleccionarNuevoEvento("SI")
                                    setStatusSiSeleccionado(true)
                                }}
                            >
                                Status sell In
                            </Col>
                            <Col 
                                xl={15} 
                                className="W600-S13-H17-C1EC0ED"
                                style={{
                                    textAlign: "right",
                                    alignSelf: "center"
                                }}
                            >
                                última actualización 20 Julio 2021
                            </Col>
                        </Row>
                    </div>
                </Col>

                <Col xl={24} style={{paddingBottom:'30px'}}>
                    <Row>
                        <Col 
                            xl={4} 
                            style={{display:'flex', alignItems: "center", paddingTop:'20px'}}
                            className="Wbold-S13-H17-C004FB8"
                        >
                            <span style={{paddingRight:'15px'}}>Fecha Inicio</span>
                            <div className="Contenedor-Filtro-Fecha Wnormal-S13-H17-C004FB8">
                                DD/MM/AA
                            </div>
                        </Col>

                        <Col 
                            xl={4} 
                            style={{display:'flex', alignItems: "center", paddingLeft:'40px', paddingTop:'20px'}}
                            className="Wbold-S13-H17-C004FB8"
                        >
                            <span style={{paddingRight:'15px'}}>Fecha Fin</span>
                            <div className="Contenedor-Filtro-Fecha Wnormal-S13-H17-C004FB8">
                                DD/MM/AA
                            </div>
                        </Col>
                    </Row>
                </Col>

                {
                    statusSiSeleccionado == true
                    ?<>


                    <Col xl={6} style={{ paddingRight:'10px'}}>
                        <div className="Contenedor-Tarjeta-Porcentaje-Tabla-Home">
                            <img 
                                src={IconoVentasLight}
                            />

                            <div style={{paddingLeft:'10px'}}>
                                <div className="Wnormal-S14-H19-C1EC0ED">Ventas</div>
                                <div className="Wbold-S20-H27-C004FB8">29%</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={6} style={{paddingLeft:'10px', paddingRight:'10px'}}>
                        <div className="Contenedor-Tarjeta-Porcentaje-Tabla-Home">
                            <img 
                                src={IconoRevenueLight}
                            />

                            <div style={{paddingLeft:'10px'}}>
                                <div className="Wnormal-S14-H19-C1EC0ED">Revenue</div>
                                <div className="Wbold-S20-H27-C004FB8">29%</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={6} style={{paddingLeft:'10px', paddingRight:'10px'}}>
                        <div className="Contenedor-Tarjeta-Porcentaje-Tabla-Home">
                            <img 
                                src={IconoSacLight}
                            />

                            <div style={{paddingLeft:'10px'}}>
                                <div className="Wnormal-S14-H19-C1EC0ED">SAC</div>
                                <div className="Wbold-S20-H27-C004FB8">29%</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={6} style={{paddingLeft:'10px', }}>
                        <div className="Contenedor-Tarjeta-Porcentaje-Tabla-Home">
                            <img 
                                src={IconoSistemasLight}
                            />

                            <div style={{paddingLeft:'10px'}}>
                                <div className="Wnormal-S14-H19-C1EC0ED">Sistemas</div>
                                <div className="Wbold-S20-H27-C004FB8">29%</div>
                            </div>
                        </div>
                    </Col>









                    
                    </>
                    :<>
                        <Col xl={8} style={{ paddingRight:'10px'}}>
                            <div className="Contenedor-Tarjeta-Porcentaje-Tabla-Home">
                                <img 
                                    src={IconoRevenueLight}
                                />

                                <div style={{paddingLeft:'10px'}}>
                                    <div className="Wnormal-S14-H19-C1EC0ED">Revenue</div>
                                    <div className="Wbold-S20-H27-C004FB8">29%</div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={8} style={{paddingLeft:'10px', paddingRight:'10px'}}>
                            <div className="Contenedor-Tarjeta-Porcentaje-Tabla-Home">
                                <img 
                                    src={IconoSacLight}
                                />

                                <div style={{paddingLeft:'10px'}}>
                                    <div className="Wnormal-S14-H19-C1EC0ED">SAC</div>
                                    <div className="Wbold-S20-H27-C004FB8">29%</div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={8} style={{paddingLeft:'10px', }}>
                            <div className="Contenedor-Tarjeta-Porcentaje-Tabla-Home">
                                <img 
                                    src={IconoGrowLight}
                                />

                                <div style={{paddingLeft:'10px'}}>
                                    <div className="Wnormal-S14-H19-C1EC0ED">Grow</div>
                                    <div className="Wbold-S20-H27-C004FB8">29%</div>
                                </div>
                            </div>
                        </Col>
                    </>
                }


            </Row>

            <div 
                id="Contenedor-Tabla-Home"
                className={
                    ComunesTipoDisenio == "Light"
                    ? ""
                    : ""
                }
            >
                <div 
                    style={{
                        overflowX:"auto",
                    }}
                >
                    <table
                        style={{
                            boxShadow: "0px 0px 15px #D8DFE9",
                            width:'100%',
                            marginBottom:'10px'
                        }}
                    >
                        <tr 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Cabecera-Tabla-Home C004FB8"
                                :"Cabecera-Tabla-Home C242526"
                            }
                        >
                            <th className="Wbold-S13-H17-CFFFFFF">Áreas</th>
                            <th className="Wbold-S13-H17-CFFFFFF">BASE DE DATOS</th>
                            <th className="Wbold-S13-H17-CFFFFFF">Responsable</th>
                            <th className="Wbold-S13-H17-CFFFFFF">FECHA DE CARGA PROGRAMADO</th>
                            <th className="Wbold-S13-H17-CFFFFFF">FECHA DE CARGA REAL</th>
                            <th className="Wbold-S13-H17-CFFFFFF">FECHA DE ACTUALIZACIÓN</th>
                            <th className="Wbold-S13-H17-CFFFFFF">DÍA DE RETRASO</th>
                        </tr>
                        {
                            eventosSeleccionados.map((evento, posicion) => {
                                return(
                                    <tr 
                                        style={
                                            ComunesTipoDisenio == "Light"
                                            ?{
                                                background:'white', 
                                                borderBottom: "1px solid #D7E8FF"
                                            }
                                            :posicion % 2 == 0
                                            ?{background:"#2D2D2E"}
                                            :{background:"#242526"}
                                        }
                                    >
                                        <td 
                                            className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Wbold-S13-H17-C004FB8"
                                                :"Wbold-S14-H19-Ce4e6eb"
                                            }
                                        >
                                            <img src={evento.icono} className="Icono-Area-Tabla-Home" />
                                            {evento.area}
                                        </td>
                                        <td 
                                            className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Wnormal-S13-H17-C706C64"
                                                :"Wnormal-S14-H19-Ce4e6eb"
                                            }
                                        >
                                            {
                                                evento.bases.map((base) => {
                                                    return(
                                                        <>
                                                            {base.base}<br/>
                                                        </>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td 
                                            className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Wnormal-S13-H17-C706C64"
                                                :"Wnormal-S14-H19-Ce4e6eb"
                                            }
                                        >
                                            {
                                                evento.bases.map((base) => {
                                                    return(
                                                        <>
                                                            {base.respon}<br/>
                                                        </>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td 
                                            className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Wnormal-S13-H17-C706C64"
                                                :"Wnormal-S14-H19-Ce4e6eb"
                                            }
                                        >
                                            {
                                                evento.bases.map((base) => {
                                                    return(
                                                        <>
                                                            {base.fechaCar}<br/>
                                                        </>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td 
                                            className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Wnormal-S13-H17-C706C64"
                                                :"Wnormal-S14-H19-Ce4e6eb"
                                            }
                                        >
                                            {
                                                evento.bases.map((base) => {
                                                    return(
                                                        <>
                                                            {base.fechaRea}<br/>
                                                        </>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td 
                                            className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Wnormal-S13-H17-C706C64"
                                                :"Wnormal-S14-H19-Ce4e6eb"
                                            }
                                        >
                                            {
                                                evento.bases.map((base) => {
                                                    return(
                                                        <>
                                                            {base.fechaAct}<br/>
                                                        </>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td 
                                            className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Wnormal-S13-H17-C706C64"
                                                :"Wnormal-S14-H19-Ce4e6eb"
                                            }
                                        >
                                            {
                                                evento.bases.map((base) => {
                                                    return(
                                                        <>
                                                            {base.diaRetra}<br/>
                                                        </>
                                                    )
                                                })
                                            }
                                            {/* <div className="Semaforo-Home"></div> */}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home
