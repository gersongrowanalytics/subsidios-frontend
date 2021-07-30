import React, {useEffect, useRef, useState} from 'react'
import { Row, Col } from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {ObtenerFacturasSiReducer} from '../../Redux/Actions/Facturas/Facturas'
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas'
import IconoCargando from '../../Assets/Imagenes/Iconos/Comunes/cargando.svg'
import '../../Estilos/Rutas/Facturas/Facturas.css'
import FiltroTabla from '../../Componentes/Elementos/Tabla/FiltroTabla';
import ModalNotasCredito from '../../Componentes/Subsidios/ModalNotasCredito';
import ModalReconocimientos from '../../Componentes/Facturas/ModalReconocimientos';
import NumberFormat from 'react-number-format';
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import FiltroFechaTop from '../../Componentes/Top/FiltroFechaTop';

const Facturas = () => {
    const dispatch = useDispatch();

    const {
        data_columnas_facturas
    } = useSelector(({facturasFront}) => facturasFront);

    const {
        ComunesFechaInicio,
        ComunesFechaFinal,
        ComunesTipoDisenio
    } = useSelector(({comunes}) => comunes);

    const {
        data_facturas_si,
        cargando_facturas_si
    } = useSelector(({facturas}) => facturas);

    useEffect(() => {
        dispatch(ObtenerFacturasSiReducer())
    }, [ComunesFechaInicio, ComunesFechaFinal]);

    const obtener = (e) => {
        // console.log(e)
        // console.log(e)
    }

    // const prevScrollY = useRef(0);
    // const [goingUp, setGoingUp] = useState(false);
    const [limiteDatos, setLimiteDatos] = useState(50);
    const [numeroScroll, setNumeroScroll] = useState(600);
    const [facturaSeleccionada, setFacturaSeleccionada] = useState([]);
  
    const onScroll = (e) => {
        // console.log(e.target.scrollTop)
        if(e.target.scrollTop > numeroScroll){
            setLimiteDatos(limiteDatos+50)
            setNumeroScroll(numeroScroll+600)
        }

    };

    // MODAL DE NOTA DE CREIDTOS
    const [proIdDetalleSeleccionado, setProIdDetalleSeleccionado] = useState("0")
    const [mostrarModalNotasCredito, setMostrarModalNotasCredito] = useState(false)

    // MODAL DE RECONOCIMIENTOS
    const [fdsIdDetalleSeleccionado, setFdsIdDetalleSeleccionado] = useState("0")
    const [mostrarModalReconocimiento, setMostrarModalReconocimiento] = useState(false)

    return (
        <div style={{paddingBottom:'100px'}}>


            {
                mostrarModalNotasCredito
                ?<ModalNotasCredito 
                    setMostrarModalNotasCredito = {() => setMostrarModalNotasCredito(!mostrarModalNotasCredito)}
                    mostrarModalNotasCredito = {mostrarModalNotasCredito}
                    pedidooriginal = {facturaSeleccionada.fsipedido}
                    proid = {proIdDetalleSeleccionado}
                    ComunesTipoDisenio = {ComunesTipoDisenio}
                />
                :null
            }

            {
                mostrarModalReconocimiento
                ?<ModalReconocimientos 
                    setMostrarModal = {() => setMostrarModalReconocimiento(!mostrarModalReconocimiento)}
                    mostrarModal = {mostrarModalReconocimiento}
                    fdsid = {fdsIdDetalleSeleccionado}
                    ComunesTipoDisenio = {ComunesTipoDisenio}

                />
                :null
            }

            <div 
                className={
                    ComunesTipoDisenio == "Light"
                    ?"Wbold-S20-H27-C004FB8 CEDF0FA"
                    :"Wbold-S20-H27-Ce4e6eb"
                }
                style={{
                    display:'flex',
                    height:'45px',
                    paddingLeft:'40px',
                    alignItems: 'center'
                }}
            >

                    <FiltroFechas 
                        titulo = {"Facturas"}
                    />

            </div>

            <div style={{marginBottom:'20px'}}>
                <Row>
                    <Col 
                        xl={4} 
                        style={{display:'flex', alignItems: "center", paddingLeft:'40px', paddingTop:'20px'}}
                        className="Wbold-S13-H17-C004FB8"
                    >
                        <FiltroFechaTop
                            texto = {"Fecha Inicio"}
                        />
                        {/* <span style={{paddingRight:'15px'}}>Fecha Inicio</span>
                        <div className="Contenedor-Filtro-Fecha Wnormal-S13-H17-C004FB8">
                            DD/MM/AA
                        </div> */}
                    </Col>

                    <Col 
                        xl={4} 
                        style={{display:'flex', alignItems: "center", paddingLeft:'40px', paddingTop:'20px'}}
                        className="Wbold-S13-H17-C004FB8"
                    >

                        <FiltroFechaTop
                            texto = {"Fecha Fin"}
                        />
                        {/* <span style={{paddingRight:'15px'}}>Fecha Fin</span>
                        <div className="Contenedor-Filtro-Fecha Wnormal-S13-H17-C004FB8">
                            DD/MM/AA
                        </div> */}
                    </Col>

                    <Col 
                        xl={16}
                        style={{
                            width: '100%',
                            paddingTop:'20px',
                            textAlign: "-webkit-right",
                            paddingRight:'40px'
                        }}
                    >
                        <div className="Contenedor-Filtros-Columnas-Tabla-Elementos Wbold-S13-H17-CFF8023">
                            Filtros
                        </div>
                    </Col>
                </Row>
            </div>
            
            <div id="Contenedor-Filtros-Tabla-Subsidios-So">
                <Row style={{width:'100%'}}>
                    {/* <button onClick={() => console.log(data_facturas_si)}>click</button> */}
                </Row>
            </div>

            <Row style={{width:'100%'}}>
                <Col xl={16}>
                    <div style={{overflowX:"auto", marginLeft:'40px', boxShadow: "0px 0px 15px #D8DFE9"}} id="Contenedor-Tabla-Subsidios-So"  onScroll={onScroll}>
                        <table className="table-responsive-subsidios-so" style={{position:'relative', width:'100%'}}>
                            <thead className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}>
                                <tr>
                                    {
                                        data_columnas_facturas.map((columnas, posicion) => {
                                            return (
                                                <th className="Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">
                                                    {
                                                        columnas.nombre
                                                    }
                                                    <FiltroTabla 
                                                        posicion = {posicion}
                                                        filtro = {columnas.filtro}
                                                        columna = {columnas.columna}
                                                    />
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>

                            {
                                cargando_facturas_si == true
                                ?<tr style={{width:'100%'}}>
                                    <td colSpan="9" style={{textAlignLast: "center"}}>
                                        <img src={IconoCargando}  />
                                    </td>
                                </tr>
                                :data_facturas_si.map((factura, posicion) => {
                                    return(
                                        <>
                                            {
                                                <tr 
                                                    style={{cursor:'pointer'}}
                                                    onClick={() => {
                                                        setFacturaSeleccionada(factura)
                                                    }}
                                                >
                                                    <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{posicion+1}</td>
                                                    <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{factura.fsisolicitante}</td>
                                                    <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{factura.fsidestinatario}</td>
                                                    <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{factura.fsiclase}</td>
                                                    <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{factura.fsifecha}</td>
                                                    <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{factura.fsifactura}</td>
                                                    <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{factura.fsivalorneto}</td>
                                                    <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{factura.fsipedido}</td>
                                                    <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{factura.fsipedidooriginal}</td>
                                                </tr>
                                            }
                                        </>
                                    )
                                })
                            }
                            
                            <tr>
                            </tr>
                        </table>
                    </div>
                </Col>

                <Col xl={8} style={{paddingLeft:'20px'}}>

                    <div 
                        style={{
                            overflowX:"auto",
                            boxShadow: "0px 0px 15px #D8DFE9",
                            border: "1px solid #D7E8FF",
                            boxSizing: "border-box"
                        }}
                        id="Contenedor-Tabla-Subsidios-So" 
                    >

                        <Row style={{padding:'15px', }} >
                            <Col xl={12} className="Contenedor-Factura-Seleccionada-Facturas">
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Titulo-Factura-Seleccionada-Facturas Wbold-S13-H17-C004FB8"
                                        :"Titulo-Factura-Seleccionada-Facturas Wbold-S11-H20-Ce4e6eb"
                                    }
                                >SOLICITANTE:</div>
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Descripcion-Factura-Seleccionada-Facturas Wnormal-S13-H17-C706C64"
                                        :"Descripcion-Factura-Seleccionada-Facturas W500-S12-H16-Cacafb7"
                                    }
                                >{" "+facturaSeleccionada.fsisolicitante}</div>
                            </Col>
                            <Col xl={12} className="Contenedor-Factura-Seleccionada-Facturas">
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Titulo-Factura-Seleccionada-Facturas Wbold-S13-H17-C004FB8"
                                        :"Titulo-Factura-Seleccionada-Facturas Wbold-S11-H20-Ce4e6eb"
                                    }
                                >DESTINATARIO:</div>
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Descripcion-Factura-Seleccionada-Facturas Wnormal-S13-H17-C706C64"
                                        :"Descripcion-Factura-Seleccionada-Facturas W500-S12-H16-Cacafb7"
                                    }
                                >{" "+facturaSeleccionada.fsidestinatario}</div>
                            </Col>

                            <Col xl={12} className="Contenedor-Factura-Seleccionada-Facturas">
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Titulo-Factura-Seleccionada-Facturas Wbold-S13-H17-C004FB8"
                                        :"Titulo-Factura-Seleccionada-Facturas Wbold-S11-H20-Ce4e6eb"
                                    }
                                >CLASE:</div>
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Descripcion-Factura-Seleccionada-Facturas Wnormal-S13-H17-C706C64"
                                        :"Descripcion-Factura-Seleccionada-Facturas W500-S12-H16-Cacafb7"
                                    }
                                >{" "+facturaSeleccionada.fsiclase}</div>
                            </Col>
                            <Col xl={12} className="Contenedor-Factura-Seleccionada-Facturas">
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Titulo-Factura-Seleccionada-Facturas Wbold-S13-H17-C004FB8"
                                        :"Titulo-Factura-Seleccionada-Facturas Wbold-S11-H20-Ce4e6eb"
                                    }
                                >FECHA:</div>
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Descripcion-Factura-Seleccionada-Facturas Wnormal-S13-H17-C706C64"
                                        :"Descripcion-Factura-Seleccionada-Facturas W500-S12-H16-Cacafb7"
                                    }
                                >{" "+facturaSeleccionada.fsifecha}</div>
                            </Col>

                            <Col xl={12} className="Contenedor-Factura-Seleccionada-Facturas">
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Titulo-Factura-Seleccionada-Facturas Wbold-S13-H17-C004FB8"
                                        :"Titulo-Factura-Seleccionada-Facturas Wbold-S11-H20-Ce4e6eb"
                                    }
                                >FACTURA:</div>
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Descripcion-Factura-Seleccionada-Facturas Wnormal-S13-H17-C706C64"
                                        :"Descripcion-Factura-Seleccionada-Facturas W500-S12-H16-Cacafb7"
                                    }
                                >{" "+facturaSeleccionada.fsifactura}</div>
                            </Col>
                            <Col xl={12} className="Contenedor-Factura-Seleccionada-Facturas">
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Titulo-Factura-Seleccionada-Facturas Wbold-S13-H17-C004FB8"
                                        :"Titulo-Factura-Seleccionada-Facturas Wbold-S11-H20-Ce4e6eb"
                                    }
                                >VALOR:</div>
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Descripcion-Factura-Seleccionada-Facturas Wnormal-S13-H17-C706C64"
                                        :"Descripcion-Factura-Seleccionada-Facturas W500-S12-H16-Cacafb7"
                                    }
                                >{" "+facturaSeleccionada.fsivalorneto}</div>
                            </Col>

                            <Col xl={12} className="Contenedor-Factura-Seleccionada-Facturas">
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Titulo-Factura-Seleccionada-Facturas Wbold-S13-H17-C004FB8"
                                        :"Titulo-Factura-Seleccionada-Facturas Wbold-S11-H20-Ce4e6eb"
                                    }
                                >PEDIDO:</div>
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Descripcion-Factura-Seleccionada-Facturas Wnormal-S13-H17-C706C64"
                                        :"Descripcion-Factura-Seleccionada-Facturas W500-S12-H16-Cacafb7"
                                    }
                                >{" "+facturaSeleccionada.fsipedido}</div>
                            </Col>
                            <Col xl={12} className="Contenedor-Factura-Seleccionada-Facturas">
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Titulo-Factura-Seleccionada-Facturas Wbold-S13-H17-C004FB8"
                                        :"Titulo-Factura-Seleccionada-Facturas Wbold-S11-H20-Ce4e6eb"
                                    }
                                >P.ORIG:</div>
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Descripcion-Factura-Seleccionada-Facturas Wnormal-S13-H17-C706C64"
                                        :"Descripcion-Factura-Seleccionada-Facturas W500-S12-H16-Cacafb7"
                                    }
                                >{" "+facturaSeleccionada.fsipedidooriginal}</div>
                            </Col>
                        </Row>


                        <table className="table-responsive-subsidios-so" style={{position:'relative'}}>
                            <thead className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}>
                                <tr>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Material</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Valorizado</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Saldo</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Reconocido</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">30%</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S13-H17-CFFFFFF">Nota Credito</th>
                                    {/* <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Pedido Original</th> */}
                                </tr>
                            </thead>
                            {
                                facturaSeleccionada.fds
                                ?facturaSeleccionada.fds.map((detalle) => {
                                    return (
                                        <tr>
                                            <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">{detalle.fdsmaterial}</td>
                                            <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">
                                                S/<NumberFormat value={funFomratoDecimal(detalle.fdsvalorneto, 2)} displayType={'text'} thousandSeparator={true} />
                                            </td>
                                            <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">
                                                S/<NumberFormat value={funFomratoDecimal(detalle.fdssaldo, 2)} displayType={'text'} thousandSeparator={true} />
                                            </td>
                                            <td 
                                                className="Celda-td-Tabla-Subsidios-So W600-S12-H16-C1EC0ED"
                                                style={{cursor:'pointer'}}
                                                onClick={() => {
                                                    
                                                    setFdsIdDetalleSeleccionado(detalle.fdsid)
                                                    setMostrarModalReconocimiento(!mostrarModalReconocimiento)
                                                }}
                                            >
                                                <u>S/<NumberFormat value={funFomratoDecimal(detalle.fdsreconocer, 2)} displayType={'text'} thousandSeparator={true} /></u>
                                            </td>
                                            <td className="Celda-td-Tabla-Subsidios-So Wbold-S11-H15-C706C64">
                                                S/<NumberFormat value={funFomratoDecimal(detalle.fdstreintaporciento, 2)} displayType={'text'} thousandSeparator={true} />
                                            </td>
                                            <td 
                                                className="Celda-td-Tabla-Subsidios-So W600-S12-H16-C1EC0ED"
                                                style={{cursor:'pointer'}}
                                                onClick={() => {
                                                    // console.log(detalle)
                                                    setProIdDetalleSeleccionado(detalle.proid)
                                                    setMostrarModalNotasCredito(!mostrarModalNotasCredito)
                                                }}
                                            >
                                                <u>S/<NumberFormat value={funFomratoDecimal(detalle.fdsnotacredito, 2)} displayType={'text'} thousandSeparator={true} /></u>
                                            </td>
                                        </tr>
                                    )
                                })
                                :null
                            }

                            {/* <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr> */}
                        </table>
                    </div>
                    
                </Col>
            </Row>
        </div>
    )
}

export default Facturas
