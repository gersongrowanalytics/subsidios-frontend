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
import IconoCerrar from '../../Assets/Imagenes/Iconos/iconoCerrar.png'
import {useDispatch, useSelector} from "react-redux";
import FiltroFechaTop from '../../Componentes/Top/FiltroFechaTop';
import ReactExport from 'react-data-export';
// import IconoDescargarLight from '../../Assets/Imagenes/Iconos/DescargarLight.svg'
import IconoEditarLight from '../../Assets/Imagenes/Iconos/Home/editar.png'
import IconoDescargar from '../../Assets/Imagenes/Iconos/descargar.svg'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const Home = () => {

    const dispatch = useDispatch();

    const {
        ComunesTipoDisenio,
        ComunesFechaInicio,
        ComunesFechaFinal,
    } = useSelector(({comunes}) => comunes)

    const {
        data_estados_pendientes_home,
        cargando_data_estados_pendientes_home,
        data_estados_pendientes_distribuidoras_home
    } = useSelector(({home}) => home)

    useEffect(() => {

        dispatch(ObtenerEstadosPendientesReducer())

    }, [ComunesFechaInicio, ComunesFechaFinal])


    const MesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"]

    const [mostrarModalSellOutDetalle, setMostrarModalSellOutDetalle] = useState(false)
    const [editandoCampos, setEditandoCampos] = useState(false)

    return (
        <div
            style={{
                paddingLeft:'60px',
                paddingRight:'60px',
                paddingBottom:'60px',
                marginBottom:'60px'
            }}
        >

            <Modal 
                onCancel={() => setMostrarModalSellOutDetalle(!mostrarModalSellOutDetalle)}
                title={null} visible={mostrarModalSellOutDetalle} footer={null}
                width="100%"
                closeIcon={<img src={IconoCerrar} width='27px' style={{marginRight:'35px'}} onClick={() => setMostrarModalSellOutDetalle(!mostrarModalSellOutDetalle)}/>} 
            >
                
                <div>

                    <div 
                        className="Wbold-S17-H20-C004FB8"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            placeContent: "center",
                            marginBottom:'25px'
                        }}
                    >
                        <img
                            width={"30px"} 
                            src={"https://subsidios-thanos-backend.softys-leadcorporate.com//Sistema/Modulos/Home/areas/iconoSac.png"} /> SAC Sell Out (Detalle)</div>

                    <div 
                        // id="Contenedor-Tabla-Home"
                        // style={{
                        //     width:'100%',
                        //     height:'448px',
                        //     overflow:'auto'
                        // }}
                        style={{
                            overflowX:"auto", marginTop:'-10px',
                            boxShadow: "0px 0px 15px #D8DFE9", 
                        }} id="Contenedor-Tabla-Subsidios-So"
                    >
                        <table
                            // style={{
                            //     boxShadow: "0px 0px 15px #D8DFE9",
                            //     width:'100%',
                            //     marginBottom:'10px'
                            // }}
                            className="Tabla-SubsidiosSo" 
                            style={{
                                width:'100%', overflow:'auto',
                                // whiteSpace: "nowrap"
                            }}
                        >
                            <thead className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}>
                                <tr 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Cabecera-Tabla-Home C004FB8"
                                        :"Cabecera-Tabla-Home C242526"
                                    }
                                >
                                    <th  className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">N°</th>
                                    <th  className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Zona</th>
                                    <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Territorio</th>
                                    <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Cliente</th>
                                    <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Sucursal</th>
                                    <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Responsable</th>
                                    <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Usuario</th>
                                    <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Aplicativo</th>
                                    {/* <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Fecha programada</th> */}
                                    <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">DeadLine</th>
                                    {/* <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Fecha ultima actualización</th> */}
                                    <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">DeadLine <br/>Actualizado</th>
                                    {/* <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Fecha cierre real</th> */}
                                    {/* <th style={{textAlignLast: "center"}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">DeadLine Cierre</th> */}
                                    <th style={{textAlignLast: "center", zIndex:'1'}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Días de <br/>Retraso</th>
                                    <th style={{textAlignLast: "center", zIndex:'1'}} className="C004FB8 Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Status</th>
                                </tr>
                            </thead>

                            {
                                data_estados_pendientes_distribuidoras_home.map((dato, posicion) => {
                                    
                                    var objFechaProgramado = new Date(dato.espfechaprogramado);
                                    var objFechaActualizacion = new Date(dato.espfechactualizacion);
                                    var objFechaCargaReal = new Date(dato.espchacargareal);

                                    return(
                                        dato.zonnombre == null
                                        ?null
                                        :<tr 
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
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                            >
                                                {posicion+1}
                                            </td>
                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    {dato.zonnombre}<br/>
                                                </>
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    {dato.clitv}<br/>
                                                </>
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    {dato.clihml}<br/>
                                                </>
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    {dato.clisuchml}
                                                </>
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    {dato.espresponsable}<br/>
                                                </>
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    {dato.pernombrecompleto}<br/>
                                                </>
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    {
                                                        dato.cliclientesac == "1"
                                                        ?"Manual"
                                                        :"Automatico"
                                                    }<br/>
                                                </>
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    {/* {
                                                        dato.espfechaprogramado
                                                        ?<>
                                                        {objFechaProgramado.getDate()+1} de {MesesNombres[objFechaProgramado.getMonth()]} del {objFechaProgramado.getFullYear()}<br/>
                                                        </>
                                                        :<>-</>
                                                    } */}
                                                    {
                                                        dato.espfechaprogramado
                                                        ?<>
                                                        {objFechaProgramado.getDate()+1}/{objFechaProgramado.getMonth()+1}/{objFechaProgramado.getFullYear()}<br/>
                                                        </>
                                                        :<>-</>
                                                    }
                                                </>
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    {/* {
                                                        dato.espfechactualizacion
                                                        ?<>
                                                        {objFechaActualizacion.getDate()+1} de {MesesNombres[objFechaActualizacion.getMonth()]} del {objFechaActualizacion.getFullYear()}<br/>
                                                        </>
                                                        :<>-</>
                                                    } */}
                                                    {
                                                        dato.espfechactualizacion
                                                        ?<>
                                                        {objFechaActualizacion.getDate()+1}/{objFechaActualizacion.getMonth()+1}/{objFechaActualizacion.getFullYear()}<br/>
                                                        </>
                                                        :<>-</>
                                                    }
                                                </>
                                            </td>

                                            {/* <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <> */}
                                                    {/* {
                                                        dato.espchacargareal
                                                        ?<>
                                                        {objFechaCargaReal.getDate()+1} de {MesesNombres[objFechaCargaReal.getMonth()]} del {objFechaCargaReal.getFullYear()}<br/>
                                                        </>
                                                        :<>-</>
                                                    } */}
                                                    {/* {dato.espchacargareal}
                                                </>
                                            </td> */}

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <>
                                                    <div style={{display:'flex', alignItems: "center", position:'relative'}}>
                                                        <div 
                                                            style={{width:'70%', display:'flex'}} 
                                                            className={
                                                                dato.espdiaretraso <= 0
                                                                ?"Wnormal-S13-H17-C1EEC41"
                                                                :"Wnormal-S13-H17-CFF3742"
                                                            }
                                                        >
                                                            {dato.espdiaretraso+" días"}
                                                        </div>
                                                        <div style={{width:'30%', marginLeft:'2px'}}>
                                                            <div 
                                                                style={
                                                                    dato.espdiaretraso <= 0
                                                                    ?{
                                                                        width: "21px",
                                                                        height: "10px",
                                                                        background: "#1EEC41",
                                                                        borderRadius: "14px",
                                                                        
                                                                    }
                                                                    :{
                                                                        width: "21px",
                                                                        height: "10px",
                                                                        background: "red",
                                                                        borderRadius: "14px",
                                                                    }
                                                                }
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </>
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"Wnormal-S13-H17-C706C64"
                                                    :"Wnormal-S14-H19-Ce4e6eb"
                                                }
                                                style={{
                                                    paddingTop: "0px",
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <div style={{display:'flex', alignItems: "center", position:'relative'}}>
                                                    <div style={{width:'100%', textAlign: "-webkit-center"}}>
                                                        {
                                                            dato.espfechactualizacion == null
                                                            ?<div style={{textAlign: "-webkit-center"}} className="Wbold-S13-H17-CFF3742">Pendiente</div>
                                                            :<div style={{textAlign: "-webkit-center"}} className="Wbold-S13-H17-C1EEC41">Cargado</div>
                                                        }
                                                    </div>
                                                </div>
                                            </td>



                                        </tr>
                                    )
                                })
                            }



                            

                            
                            
                        </table>
                    </div>


                </div>

            </Modal>

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
                                    area.length == 0
                                    ?null
                                    :area.areporcentaje == "9090" || area.arenombre == "SAC ADM" || area.arenombre == "SAC NC"
                                    ?null
                                    :<Col 
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
                                                    {/* {
                                                        area.arenombre == "SAC Sell Out"
                                                        ?"33"
                                                        :"100%"
                                                    } */}
                                                    {
                                                        area.arenombre == "SAC Sell Out"
                                                        ?<>{area.areporcentaje+" DT"}</>
                                                        :<>{area.areporcentaje+"%"}</>
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
                            <th  className="Wbold-S13-H17-CFFFFFF">Áreas</th>
                            <th style={{textAlignLast: "center"}} className="Wbold-S13-H17-CFFFFFF">Base de Datos</th>
                            <th style={{textAlignLast: "center"}} className="Wbold-S13-H17-CFFFFFF">Responsable</th>
                            <th style={{textAlignLast: "center"}} className="Wbold-S13-H17-CFFFFFF">Usuario</th>
                            <th style={{textAlignLast: "center"}} className="Wbold-S13-H17-CFFFFFF">DeadLine</th>
                            <th style={{textAlignLast: "center"}} className="Wbold-S13-H17-CFFFFFF">DeadLine <br/>Actualizado</th>
                            {/* <th style={{textAlignLast: "center"}} className="Wbold-S13-H17-CFFFFFF">Fecha Cierre Real</th> */}
                            <th style={{textAlignLast: "center"}} className="Wbold-S13-H17-CFFFFFF">Días de Retraso</th>
                            <th style={{textAlignLast: "center"}} className="Wbold-S13-H17-CFFFFFF">Status</th>
                        </tr>

                        {
                            data_estados_pendientes_home.map((estado_pendiente) => {
                                return ( 
                                    estado_pendiente.seleccionado == true
                                    ?estado_pendiente.ares.map((area, posicion) => {
                                        return (
                                            area.length == 0
                                            ?null
                                            :area.arenombre != "SAC Sell Out Detalle"
                                            ?<tr 
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
                                                        paddingTop: "0px",
                                                        
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
                                                        paddingTop: "0px",
                                                        textAlign: "-webkit-center"
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
                                                    {
                                                        area.arenombre == "SAC Sell Out"
                                                        ?<div 
                                                            onClick={() => setMostrarModalSellOutDetalle(!mostrarModalSellOutDetalle)}
                                                            style={{cursor:'pointer'}}
                                                            className="Wnormal-S13-H17-C1EC0ED">Click Detalle</div>
                                                        :null
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
                                                        textAlign: "-webkit-center"
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
                                                    {
                                                        posicion == 2
                                                        ?<div style={{color:'white', marginTop:'-3px'}}>-</div>
                                                        :null
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
                                                        textAlign: "-webkit-center"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            return(
                                                                <>
                                                                    {
                                                                        base.espfechactualizacion == null
                                                                        ?"-"
                                                                        :base.pernombrecompleto
                                                                    }<br/>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        posicion == 2
                                                        ?<div style={{color:'white', marginTop:'-3px'}}>-</div>
                                                        :null
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
                                                        textAlign: "-webkit-center"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            var objFecha = new Date(base.espfechaprogramado);
                                                            return(
                                                                <>
                                                                    {
                                                                        base.espfechaprogramado
                                                                        ?<>
                                                                            {
                                                                                editandoCampos == true
                                                                                ?<>
                                                                                    <input 
                                                                                        // placeholder="10/11/2021"
                                                                                        value={objFecha.getFullYear()+"-"+objFecha.getMonth()+1+"-"+objFecha.getDate()+1}
                                                                                        onChange={(e) => {
                                                                                            console.log(e.target)
                                                                                            console.log(e.target.value)
                                                                                        }}
                                                                                        type="date"
                                                                                        className="Input-Editar-Home" /><br/>
                                                                                </>
                                                                                :<>
                                                                                    {objFecha.getDate()+1}/{objFecha.getMonth()+1}/{objFecha.getFullYear()}<br/>
                                                                                </>
                                                                            }
                                                                        </>
                                                                        :<>-<br/></>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        posicion == 2
                                                        ?<div style={{color:'white', marginTop:'-3px'}}>-</div>
                                                        :null
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
                                                        textAlign: "-webkit-center"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            
                                                            var objFecha = new Date(base.espfechactualizacion);
                                                            var fecAct = []
                                                            let diaU = 0
                                                            if(base.espfechactualizacion){
                                                                fecAct = base.espfechactualizacion.split("-")
                                                                diaU = objFecha.getDate()+1
                                                                if(fecAct[2] == "01"){
                                                                    objFecha = new Date(fecAct[0]+"-"+fecAct[1]+"-1");
                                                                    diaU = 1
                                                                }
                                                            }

                                                            return(
                                                                <>
                                                                    {
                                                                        base.espfechactualizacion
                                                                        ?<>
                                                                            {diaU}/{objFecha.getMonth()+1}/{objFecha.getFullYear()}<br/>
                                                                        </>
                                                                        :<>-<br/></>
                                                                    }
                                                                    {/* {base.espchacargareal}<br/> */}
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        posicion == 2
                                                        ?<div style={{color:'white', marginTop:'-3px'}}>-</div>
                                                        :null
                                                    }
                                                </td>
                                                {/* <td 
                                                    className={
                                                        ComunesTipoDisenio == "Light"
                                                        ?"Wnormal-S13-H17-C706C64"
                                                        :"Wnormal-S14-H19-Ce4e6eb"
                                                    }
                                                    style={{
                                                        paddingTop: "0px",
                                                        textAlign: "-webkit-center"
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
                                                                        :<>-<br/></>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </td> */}
                                                <td 
                                                    className={
                                                        ComunesTipoDisenio == "Light"
                                                        ?"Wnormal-S13-H17-C706C64"
                                                        :"Wnormal-S14-H19-Ce4e6eb"
                                                    }
                                                    style={{
                                                        paddingTop: "0px",
                                                        textAlign: "-webkit-center"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            return(
                                                                <div style={{display:'flex', alignItems: "center", position:'relative'}}>
                                                                    <div 
                                                                        style={{width:'50%'}} 
                                                                        className={
                                                                            base.espdiaretraso <= 0
                                                                            ?"Wnormal-S13-H17-C1EEC41"
                                                                            :"Wnormal-S13-H17-CFF3742"
                                                                        }
                                                                    >
                                                                        {base.espdiaretraso} días
                                                                    </div>
                                                                    <div style={{width:'50%'}}>
                                                                        <div 
                                                                            style={
                                                                                base.espdiaretraso <= 0
                                                                                ?{
                                                                                    width: "21px",
                                                                                    height: "10px",
                                                                                    background: "#1EEC41",
                                                                                    borderRadius: "14px",
                                                                                    
                                                                                }
                                                                                :{
                                                                                    width: "21px",
                                                                                    height: "10px",
                                                                                    background: "red",
                                                                                    borderRadius: "14px",
                                                                                }
                                                                            }
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        posicion == 2
                                                        ?<div style={{color:'white', marginTop:'-3px'}}>-</div>
                                                        :null
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
                                                        textAlign: "-webkit-center"
                                                    }}
                                                >
                                                    {
                                                        area.esps.map((base) => {
                                                            return(
                                                                <div style={{display:'flex', alignItems: "center", position:'relative'}}>
                                                                    <div style={{width:'100%'}}>
                                                                        {
                                                                            base.espfechactualizacion == null
                                                                            ?<div style={{textAlign: "-webkit-center"}} className="Wbold-S13-H17-CFF3742">Pendiente</div>
                                                                            :<div style={{textAlign: "-webkit-center"}} className="Wbold-S13-H17-C1EEC41">Cargado</div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        posicion == 2
                                                        ?<div style={{color:'white', marginTop:'-3px'}}>-</div>
                                                        :null
                                                    }
                                                </td>
                                            </tr>
                                            :null
                                        )
                                    })
                                    :null          
                                )
                            })
                        }

                        
                        
                    </table>
                </div>
            </div>

            {/* <div 
                id={
                    ComunesTipoDisenio == "Light"
                    ?"Btn-Flotante-Descargar-Subsidios-So-Light"
                    :"Btn-Flotante-Descargar-Subsidios-So"
                }
                onClick={() => setEditandoCampos(!editandoCampos)}
            >
                <img src={
                    ComunesTipoDisenio == "Light"
                    ?IconoEditarLight
                    :IconoDescargar
                } id="Icono-Flotante-Descargar-Subsidios-So" />
            </div> */}
        </div>
    )
}

export default Home
