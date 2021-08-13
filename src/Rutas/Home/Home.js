import React, {useState, useEffect} from 'react'
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
import {
    ObtenerEstadosPendientesReducer,
    SeleccionarTprReducer
} from '../../Redux/Actions/Home/Home'
import config from '../../config'


import {useDispatch, useSelector} from "react-redux";
import FiltroFechaTop from '../../Componentes/Top/FiltroFechaTop';

const Home = () => {

    const dispatch = useDispatch();

    const {
        ComunesTipoDisenio,
        ComunesFechaInicio,
        ComunesFechaFinal,
    } = useSelector(({comunes}) => comunes)

    const {
        data_estados_pendientes_home,
        cargando_data_estados_pendientes_home
    } = useSelector(({home}) => home)

    useEffect(() => {

        dispatch(ObtenerEstadosPendientesReducer())

    }, [ComunesFechaInicio, ComunesFechaFinal])


    const MesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"]

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

                            {
                                data_estados_pendientes_home.map((estado_pendiente, posicion) => {
                                    return ( 
                                        <Col 
                                            xl={4}
                                            className={
                                                // statusSiSeleccionado == true
                                                estado_pendiente.seleccionado == true
                                                ?"Wbold-S20-H27-C004FB8 Contenedor-Cabecera-Status-Home CFFFFFF"
                                                :"Wbold-S20-H27-C004FB8 Contenedor-Cabecera-Status-Home DFE4F2"
                                            }
                                            style={{marginRight:'20px'}}
                                            onClick={() => {
                                                dispatch(SeleccionarTprReducer(posicion))
                                            }}
                                        >
                                            {estado_pendiente.tprnombre}
                                        </Col>            
                                    )
                                })
                            }
                        </Row>
                    </div>
                </Col>

                <Col xl={24} style={{paddingBottom:'30px'}}>
                    <Row>
                        {/* <Col 
                            xl={4} 
                            style={{display:'flex', alignItems: "center", paddingTop:'20px'}}
                            className="Wbold-S13-H17-C004FB8"
                        >

                            <FiltroFechaTop 
                                texto = {"Fecha Inicio"}   
                            />

                        </Col> */}

                        <Col 
                            xl={4} 
                            style={{display:'flex', alignItems: "center", paddingLeft:'40px', paddingTop:'20px'}}
                            className="Wbold-S13-H17-C004FB8"
                        >
                            
                            <FiltroFechaTop 
                                texto = {"Fecha"}
                            />

                        </Col>
                    </Row>
                </Col>

                {


                    data_estados_pendientes_home.map((estado_pendiente) => {
                        return ( 
                            estado_pendiente.seleccionado == true
                            ?estado_pendiente.ares.map((area, posicion) => {
                                return (
                                    <Col 
                                        xl={8} 
                                        style={
                                            posicion == 0
                                            ?{paddingRight:'10px'}
                                            :{paddingLeft:'10px', paddingRight:'10px'}
                                        }
                                    >
                                        <div className="Contenedor-Tarjeta-Porcentaje-Tabla-Home">
                                            <img 
                                                src={config.api+area.areicono}
                                            />
    
                                            <div style={{paddingLeft:'10px', alignSelf: "center"}}>
                                                <div className="Wnormal-S14-H19-C1EC0ED">{area.arenombre}</div>
                                                <div className="Wbold-S20-H27-C004FB8">
                                                    {
                                                        area.arenombre == "SAC Sell Out"
                                                        ?"33"
                                                        :"100%"
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Col> 
                                )
                            })
                            :null          
                        )
                    })
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
                            <th className="Wbold-S13-H17-CFFFFFF">Base de Datos</th>
                            <th className="Wbold-S13-H17-CFFFFFF">Responsable</th>
                            <th className="Wbold-S13-H17-CFFFFFF">Fecha Programada</th>
                            <th className="Wbold-S13-H17-CFFFFFF">Fecha Ultima Actualización</th>
                            <th className="Wbold-S13-H17-CFFFFFF">Fecha Cierre Real</th>
                            <th className="Wbold-S13-H17-CFFFFFF">Días de Retraso</th>
                        </tr>

                        {
                            data_estados_pendientes_home.map((estado_pendiente) => {
                                return ( 
                                    estado_pendiente.seleccionado == true
                                    ?estado_pendiente.ares.map((area, posicion) => {
                                        return (
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
                                                    style={{
                                                        paddingTop: "0px"
                                                    }}
                                                >
                                                    <img src={config.api+area.areicono} className="Icono-Area-Tabla-Home" />
                                                    {area.arenombre}
                                                </td>
                                                <td 
                                                    className={
                                                        ComunesTipoDisenio == "Light"
                                                        ?"Wnormal-S13-H17-C706C64"
                                                        :"Wnormal-S14-H19-Ce4e6eb"
                                                    }
                                                    style={{
                                                        paddingTop: "0px"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            return(
                                                                <>
                                                                    {base.espbasedato}<br/>
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
                                                    style={{
                                                        paddingTop: "0px"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            return(
                                                                <>
                                                                    {base.espresponsable}<br/>
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
                                                    style={{
                                                        paddingTop: "0px"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            var objFecha = new Date(base.espfechaprogramado);
                                                            return(
                                                                <>
                                                                    {/* {base.espfechaprogramado}<br/> */}
                                                                    {
                                                                        base.espfechaprogramado
                                                                        ?<>
                                                                        {objFecha.getDate()+1} de {MesesNombres[objFecha.getMonth()]} del {objFecha.getFullYear()}<br/>
                                                                        </>
                                                                        :null
                                                                    }
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
                                                    style={{
                                                        paddingTop: "0px"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            var objFecha = new Date(base.espfechactualizacion);
                                                            return(
                                                                <>
                                                                    {
                                                                        base.espfechactualizacion
                                                                        ?<>
                                                                            {objFecha.getDate()+1} de {MesesNombres[objFecha.getMonth()]} del {objFecha.getFullYear()}<br/>
                                                                        </>
                                                                        :null
                                                                    }
                                                                    {/* {base.espchacargareal}<br/> */}
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
                                                    style={{
                                                        paddingTop: "0px"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {

                                                            var objFecha = new Date(base.espchacargareal);

                                                            return(
                                                                <>
                                                                    {
                                                                        base.espchacargareal 
                                                                        ?<>
                                                                            {objFecha.getDate()+1} de {MesesNombres[objFecha.getMonth()]} del {objFecha.getFullYear()}<br/>
                                                                        </>
                                                                        :null
                                                                    }
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
                                                    style={{
                                                        paddingTop: "0px",
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            return(
                                                                <div style={{display:'flex', alignItems: "center"}}>
                                                                    {base.espdiaretraso} días<br/>
                                                                    <div 
                                                                        style={{
                                                                            width: "21px",
                                                                            height: "10px",
                                                                            background: "#1EEC41",
                                                                            borderRadius: "14px",
                                                                            marginLeft:'5px'
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {/* <div className="Semaforo-Home"></div> */}
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :null          
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
