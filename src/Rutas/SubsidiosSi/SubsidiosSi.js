import React, {useEffect, useState} from 'react'
import '../../Estilos/Rutas/SubsidiosSo/SubsidiosSo.css'
import {
    ObtenerSubsidiosSoReducer,
    ObtenerFiltrosReducer
} from '../../Redux/Actions/SubsidiosSo/SubsidiosSo'
import {
    SeleccionarSolicitanteReducer
} from '../../Redux/Actions/SubsidiosSo/SubsidiosSoFront'
import {
    ObtenerSubsidiosSiReducer
} from '../../Redux/Actions/SubsidiosSi/SubsidiosSi'

import {useDispatch, useSelector} from "react-redux";
import IconoDescargar from '../../Assets/Imagenes/Iconos/descargar.svg'
import IconoDescargarLight from '../../Assets/Imagenes/Iconos/DescargarLight.svg'
import ReactExport from 'react-data-export';
import BtnFiltroSubSo from '../../Componentes/SubsidiosSo/BtnFiltroSubSo';
import { Row, Col } from 'antd'
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas'
import { Modal, Button } from 'antd';
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import ModalNotasCredito from '../../Componentes/Subsidios/ModalNotasCredito'
import IconoCerrar from '../../Assets/Imagenes/Iconos/iconoCerrar.png'
import FiltroFechaTop from '../../Componentes/Top/FiltroFechaTop'
import IconoCargando from '../../Assets/Imagenes/Iconos/Comunes/cargando.svg'
import DataTablaSi from '../../Componentes/Subsidios/DataTablaSi'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const SubsidiosSi = () => {

    const dispatch = useDispatch();
    const {
        data_subsidiosso, 
        data_descarga_subsidiosso,
        

        solicitantes_filtro_subsidiosso,
        productos_filtro_subsidiosso,
        categorias_filtro_subsidiosso,
        territorios_filtro_subsidiosso,
        zonas_filtro_subsidiosso,

        clienteseleccionado,
        productoseleccionado,
        categoriaseleccionado,
        territorioseleccionado,
        zonaseleccionado,

    } = useSelector(({subsidiosSo}) => subsidiosSo);

    const {
        data_descarga_subsidiossi, 
        data_subsidiossi,
        total_soles_subsidiossi,
        cargando_data_subsidiossi
    } = useSelector(({subsidiosSi}) => subsidiosSi);

    const {
        ComunesTipoDisenio,
        ComunesFechaInicio,
        ComunesFechaFinal,
    } = useSelector(({comunes}) => comunes);

    useEffect(() => {
        // dispatch(ObtenerSubsidiosSoReducer())
        dispatch(ObtenerSubsidiosSiReducer())

        dispatch(ObtenerFiltrosReducer())
    }, [ComunesFechaInicio, ComunesFechaFinal]);

    const [subsidioSeleccionado, setSubsidioSeleccionado] = useState([])
    const [pedidoOriginalSeleccionado, setPedidoOriginalSeleccionado] = useState("")
    const [mostrarModalFacturas, setMostrarModalFacturas] = useState(false)
    const [mostrarModalNotasCredito, setMostrarModalNotasCredito] = useState(false)

    const seleccionarFacturas = (facturas) => {
        // console.log(facturas)
        setSubsidioSeleccionado(facturas)
        setMostrarModalFacturas(!mostrarModalFacturas)
    }

    const [mostrarAutomaticos, setMostrarAutomaticos] = useState(true)
    const [mostrarValidados, setMostrarValidados] = useState(true)

    const sumaValores = (ns) => {
        let acumulado = 0
        for (let i = 0; i < ns.length; i ++ ){
            acumulado += ns[i]
        }

        return acumulado
    }


    const valorizadosMontoReconcerTotal = data_subsidiossi.map(x => {
        const montosReconocer = x.data.map(
            y => 
                y.sdemontoareconocerreal
                ?parseFloat(y.sdemontoareconocerreal) 
                :0
                // ?mostrarValidados == true
                //     ?y.sdestatus != null
                //         ? mostrarAutomaticos == true
                //             ?y.sdesac == 0
                //                 ?parseFloat(y.sdemontoareconocerreal) 
                //                 :0
                //             :y.sdesac == 1
                //                 ?parseFloat(y.sdemontoareconocerreal) 
                //                 :0
                //         :0
                //     :y.sdestatus != null
                //         ?0
                //         :mostrarAutomaticos == true
                //             ?y.sdesac == 0
                //                 ?parseFloat(y.sdemontoareconocerreal) 
                //                 :0
                //             :y.sdesac == 1
                //                 ?parseFloat(y.sdemontoareconocerreal) 
                //                 :0
                // :0
        )
        return sumaValores(montosReconocer)
    })

    const sumaValorizadoMontosReonocerTotal = sumaValores(valorizadosMontoReconcerTotal)

    const valorizadosValorizadoTotal = data_subsidiossi.map(x => {
        const valorizadoTotal = x.data.map(
            y => 
                y.sumsfsvalorizado
                ?parseFloat(y.sumsfsvalorizado) 
                :0
                // ?mostrarValidados == true
                //     ?y.sdestatus != null
                //         ? mostrarAutomaticos == true
                //             ?y.sdesac == 0
                //                 ?parseFloat(y.sdemontoareconocerreal) 
                //                 :0
                //             :y.sdesac == 1
                //                 ?parseFloat(y.sdemontoareconocerreal) 
                //                 :0
                //         :0
                //     :y.sdestatus != null
                //         ?0
                //         :mostrarAutomaticos == true
                //             ?y.sdesac == 0
                //                 ?parseFloat(y.sdemontoareconocerreal) 
                //                 :0
                //             :y.sdesac == 1
                //                 ?parseFloat(y.sdemontoareconocerreal) 
                //                 :0
                // :0
        )
        return sumaValores(valorizadoTotal)
    })

    const sumaValorizadosValorizadoTotal = sumaValores(valorizadosValorizadoTotal)

    return (
        <div style={{paddingBottom:'100px'}}>
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
                        titulo = {"Subsidios Sell In"}
                    />

            </div>

            <div style={{marginBottom:'20px'}}>
                <Row style={{ paddingTop:'15px'}}>
                    <Col 
                        xl={4} 
                        style={{display:'flex', alignItems: "center", paddingLeft:'40px',}}
                        className="Wbold-S13-H17-C004FB8"
                    >
                        <FiltroFechaTop 
                            texto = {"Fecha Inicio"}
                        /> 
                    </Col>

                    <Col 
                        xl={4} 
                        style={{display:'flex', alignItems: "center", paddingLeft:'40px',}}
                        className="Wbold-S13-H17-C004FB8"
                    >
                        <FiltroFechaTop 
                            texto = {"Fecha Fin"}
                        /> 
                    </Col>

                    <Col 
                        xl={16}
                        style={{
                            width: '100%',
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
            
            <div id="Contenedor-Filtros-Tabla-Subsidios-So" style={{paddingLeft:'40px'}}>
                <Row style={{width:'100%'}}>
                    {/* <Col xl={4} xs={24}>
                        <BtnFiltroSubSo 
                            texto = {"COD. SOLICITANTES"}
                            btnSwitch = {true}
                            tamanio = {"215px"}
                            data = {solicitantes_filtro_subsidiosso}
                            seleccionar = {(estado, id) => dispatch(SeleccionarSolicitanteReducer(estado, id, "FILTRAR_CLIENTES"))}
                        />
                    </Col>
                    <Col xl={4} xs={24}>
                        <BtnFiltroSubSo 
                            texto = {"COD. PRODUCTO"}
                            btnSwitch = {true}
                            tamanio = {"190px"}
                            data = {productos_filtro_subsidiosso}
                            seleccionar = {(estado, id) => dispatch(SeleccionarSolicitanteReducer(estado, id, "FILTRAR_PRODUCTOS"))}
                        />
                    </Col>
                    <Col xl={3} xs={24}>
                        <BtnFiltroSubSo 
                            texto = {"CATEGORÍA"}
                            tamanio = {"125px"}
                            data = {categorias_filtro_subsidiosso}
                            seleccionar = {(estado, id) => dispatch(SeleccionarSolicitanteReducer(estado, id, "FILTRAR_CATEGORIAS"))}
                        />
                    </Col>
                    <Col xl={3} xs={24}>
                        <BtnFiltroSubSo 
                            texto = {"TERRITORIO"}
                            tamanio = {"125px"}
                            data = {territorios_filtro_subsidiosso}
                            seleccionar = {(estado, id) => dispatch(SeleccionarSolicitanteReducer(estado, id, "FILTRAR_TERRITORIO"))}
                        />
                    </Col>
                    <Col xl={2} xs={24}>
                        <BtnFiltroSubSo 
                            texto = {"ZONA"}
                            tamanio = {"90px"}
                            data = {zonas_filtro_subsidiosso}
                            seleccionar = {(estado, id) => dispatch(SeleccionarSolicitanteReducer(estado, id, "FILTRAR_ZONAS"))}
                        />
                    </Col> */}

                    <Col xl={2} xs={24}>
                            <div 
                                onClick={() => setMostrarAutomaticos(!mostrarAutomaticos)}
                                className={
                                    mostrarAutomaticos == true
                                    ?"Contenedor-Filtro-Light-Tabla-Elementos CFF8023"
                                    :"Contenedor-Filtro-Light-Tabla-Elementos CFFFFFF"
                                }
                            >
                                <span 
                                    className={
                                        mostrarAutomaticos == true
                                        ?"Wbold-S13-H19-CFFFFFF-L0015"
                                        :"Wbold-S13-H19-C004FB8-L0015"
                                    }
                                >
                                    {
                                        mostrarAutomaticos == true
                                        ?"Automaticos"
                                        :"Manuales"
                                    }
                                </span>
                            </div>
                        </Col>

                        <Col xl={4} xs={24}>
                            <div 
                                onClick={() => setMostrarValidados(!mostrarValidados)}
                                className={
                                    mostrarValidados == true
                                    ?"Contenedor-Filtro-Light-Tabla-Elementos CFF8023"
                                    :"Contenedor-Filtro-Light-Tabla-Elementos CFFFFFF"
                                }
                            >
                                <span 
                                    className={
                                        mostrarValidados == true
                                        ?"Wbold-S13-H19-CFFFFFF-L0015"
                                        :"Wbold-S13-H19-C004FB8-L0015"
                                    }
                                >
                                    {
                                        mostrarValidados == true
                                        ?"Validados"
                                        :"No Validados"
                                    }
                                </span>
                            </div>
                        </Col>
                </Row>

                

                

                

                

                {/* <div    
                    onClick={() => dispatch(ObtenerSubsidiosSoReducer())} 
                    className="Wbold-S14-H19-Ce4e6eb-LH19 Btn-Filtro-Mostrar-Todo-Subsidios-So">
                    Resueltos
                </div> */}
            </div>
            {
                mostrarModalNotasCredito == true
                ?<ModalNotasCredito 
                    setMostrarModalNotasCredito = {() => setMostrarModalNotasCredito(!mostrarModalNotasCredito)}
                    mostrarModalNotasCredito = {mostrarModalNotasCredito}
                    pedidooriginal = {pedidoOriginalSeleccionado}
                    proid = {subsidioSeleccionado.proid}
                    ComunesTipoDisenio = {ComunesTipoDisenio}
                />
                :null
            }

            <Modal 
                title={null} 
                visible={mostrarModalFacturas} 
                onOk={() => {setMostrarModalFacturas(false)}} 
                onCancel={() => {setMostrarModalFacturas(false)}}
                footer={null}
                width={"80%"}
                centered
                closeIcon={<img src={IconoCerrar} width='27px'/>}
            >
                <div 
                    style={{
                        overflowX:"auto", marginTop:'0px',
                        textAlign: "-webkit-center"
                    }}
                >
                    <div style={{marginBottom:'20px'}} className="Wbold-S13-H17-C004FB8" >
                        
                        LISTA DE FACTURAS ASIGNADAS<br/>
                        PERIODO: JULIO 2021
                        
                    </div>


                    {/* <button onClick={() => console.log(subsidioSeleccionado)}>c</button> */}
                    <div 
                        style={{
                            overflowX:"auto",
                            borderRadius: "20px 20px 20px 20px",
                            width:'auto'
                        }}                        
                    >
                        <table 
                            className="table-responsive-subsidios-so Tabla-SubsidiosSi" 
                            style={{position:'relative', width:'100%' }}>
                            <thead
                                className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                            >
                                <tr>
                                    <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }>N° Fila</th>
                                    <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }>Factura SI</th>
                                    <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }>Fecha de Factura</th>
                                    <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }>Valor Neto</th>
                                    <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }>Notas Credito</th>
                                    <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }>30% del Valor Neto</th>
                                    <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }>Saldo Disponible</th>
                                    <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }>Reconocimiento</th>
                                    <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }>Saldo Final</th>

                                    {/* <th>Valorizado</th> */}
                                    
                                    
                                    
                                    
                                </tr>
                            </thead>
                            {
                                subsidioSeleccionado.facturas
                                ?subsidioSeleccionado.facturas.map((factura, posicion) => {
                                    return (
                                        <tr>
                                            {/* <td>S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sdemontoareconocerreal, 2)} displayType={'text'} thousandSeparator={true} />}</td> */}
                                            <td className="W600-S11-H15-C706C64">{posicion+1}</td>
                                            <td className="W600-S11-H15-C706C64">{factura.fsifactura}</td>
                                            <td className="W600-S11-H15-C706C64">{factura.fecfecha}</td>

                                            <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.fdsvalorneto, 2)} displayType={'text'} thousandSeparator={true} />}</td>

                                            <td 
                                                className="W600-S12-H16-C1EC0ED"
                                                onClick={() => {
                                                    setPedidoOriginalSeleccionado(factura.fsipedido)
                                                    setMostrarModalNotasCredito(!mostrarModalNotasCredito)
                                                }}
                                                style={{cursor:'pointer'}}
                                            >
                                                <u>S/{<NumberFormat value={funFomratoDecimal(factura.fdsnotacredito, 2)} displayType={'text'} thousandSeparator={true} />}</u>
                                            </td>


                                            <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.fdstreintaporciento, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                            {/* <td>{<NumberFormat value={funFomratoDecimal(factura.fdssaldo, 2)} displayType={'text'} thousandSeparator={true} />}</td> */}
                                            <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.sfssaldoanterior, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                            {/* <td>{<NumberFormat value={funFomratoDecimal(factura.fdsreconocer, 2)} displayType={'text'} thousandSeparator={true} />}</td> */}
                                            <td className="W600-S11-H15-CFF3742">S/{<NumberFormat value={funFomratoDecimal(factura.sfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}</td>

                                            <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.sfssaldonuevo, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                            {/* <td>{<NumberFormat value={funFomratoDecimal(factura.sfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}</td> */}
                                            
                                            

                                            
                                            
                                        </tr>
                                    )
                                })
                                :null
                            }
                            <div style={{marginBottom:'20px'}}></div>
                            <tr 
                                style={{borderTop: "1px solid #D7E8FF"}}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="W600-S11-H15-C004FB8">Pago Subsidiado:</td>
                                <td className="W600-S11-H15-C004FB8">
                                    S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sumsfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}
                                </td>
                                <td></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="W600-S11-H15-C004FB8">Objetivo a Subsidiar:</td>
                                <td className="W600-S11-H15-CFF3742">
                                    S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sdemontoareconocerreal, 2)} displayType={'text'} thousandSeparator={true} />}
                                </td>
                                <td></td>
                            </tr>
                            <div style={{marginBottom:'5px'}}></div>

                            <tr 
                                style={{borderTop: "1px solid #D7E8FF"}}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="Wbold-S11-H15-C706C64">Pendiente:</td>
                                <td className="Wbold-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sdemontoareconocerreal - subsidioSeleccionado.sumsfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                <td></td>
                            </tr>

                        </table>
                    </div>
                    <div style={{marginBottom:'5px'}}></div>
                </div>
            </Modal>
            
            <div 
                style={{
                    overflowX:"auto", marginLeft:'40px', marginRight:'40px', marginTop:'-10px',
                    boxShadow: "0px 0px 15px #D8DFE9", 
                }} 
                id="Contenedor-Tabla-Subsidios-So"
            >
                
                <table className="table-responsive-subsidios-so Tabla-SubsidiosSi" style={{position:'relative', width:'100%'}}>
                    <thead
                        className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                    >
                        <tr>
                            <th className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Zona</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Territorio</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Cliente</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Sucursal</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Sub Cliente</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Sector</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Cod Producto</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Nombre Producto</th>

                            <th
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            // >Monto a Reconocer S/IGV</th>
                            >Reconocimiento S/<br/>(Distribuidor)</th>

                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            // >Valorizado S/IGV</th>
                            >Reconocimiento S/<br/>(SAC/APP)</th>



                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Factura<br/>Impactar</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Fecha</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Estado</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cargando_data_subsidiossi == true && data_subsidiossi.length  == 0
                            ?null
                            :<tr className={ComunesTipoDisenio == "Light" ? "CEDF0FA Wbold-S13-H17-C004FB8" : "C2d2d2e Wbold-S11-H20-Ce4e6eb"}>
                                <td 
                                    id="Total-Cuerpo-Tabla-Subsidios-So"
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Wbold-S13-H17-C004FB8"
                                        :"Wbold-S11-H20-Ce4e6eb"
                                    }
                                >
                                    Grand Total	
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                    S/<NumberFormat value={funFomratoDecimal(sumaValorizadoMontosReonocerTotal, 0)} displayType={'text'} thousandSeparator={true} />
                                </td>
                                <td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                    S/<NumberFormat value={funFomratoDecimal(sumaValorizadosValorizadoTotal, 0)} displayType={'text'} thousandSeparator={true} />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                        {
                            cargando_data_subsidiossi == true && data_subsidiossi.length  == 0
                            ?<tr 
                                // style={{width:'100%'}}
                                style={
                                    ComunesTipoDisenio == "Light"
                                    ?{borderBottom: '1px solid #D7E8FF'}
                                    :{borderBottom: '1px solid #1c1e21'}
                                }
                            >
                                <td colSpan="13" style={{textAlignLast: "center"}}>
                                    <img src={IconoCargando}  />
                                </td>
                            </tr>

                            :data_subsidiossi.map((zona, posicion) => {

                                const valorizadoObjetivo = zona.data.map(
                                    y => 
                                        y.sdemontoareconocerreal
                                        ?parseFloat(y.sdemontoareconocerreal) 
                                        :0
                                        // ?mostrarValidados == true
                                        //     ?y.sdestatus != null
                                        //         ? mostrarAutomaticos == true
                                        //             ?y.sdesac == 0
                                        //                 ?parseFloat(y.sdemontoareconocerreal) 
                                        //                 :0
                                        //             :y.sdesac == 1
                                        //                 ?parseFloat(y.sdemontoareconocerreal) 
                                        //                 :0
                                        //         :0
                                        //     :y.sdestatus != null
                                        //         ?0
                                        //         :mostrarAutomaticos == true
                                        //             ?y.sdesac == 0
                                        //                 ?parseFloat(y.sdemontoareconocerreal) 
                                        //                 :0
                                        //             :y.sdesac == 1
                                        //                 ?parseFloat(y.sdemontoareconocerreal) 
                                        //                 :0
                                        // :0
                                )

                                const sumaValorizadoObjetivo  = sumaValores(valorizadoObjetivo)
                                
                                const valorizadosValorizado = zona.data.map(
                                    y => 
                                        y.sumsfsvalorizado
                                        ?parseFloat(y.sumsfsvalorizado) 
                                        :0
                                        // ?mostrarValidados == true
                                        //     ?y.sdestatus != null
                                        //         ? mostrarAutomaticos == true
                                        //             ?y.sdesac == 0
                                        //                 ?parseFloat(y.sdemontoareconocerreal) 
                                        //                 :0
                                        //             :y.sdesac == 1
                                        //                 ?parseFloat(y.sdemontoareconocerreal) 
                                        //                 :0
                                        //         :0
                                        //     :y.sdestatus != null
                                        //         ?0
                                        //         :mostrarAutomaticos == true
                                        //             ?y.sdesac == 0
                                        //                 ?parseFloat(y.sdemontoareconocerreal) 
                                        //                 :0
                                        //             :y.sdesac == 1
                                        //                 ?parseFloat(y.sdemontoareconocerreal) 
                                        //                 :0
                                        // :0
                                )

                                const sumaValorizadosValorizado  = sumaValores(valorizadosValorizado)

                                return (
                                    <DataTablaSi 
                                        seleccionarFacturas = {(dato) => seleccionarFacturas(dato)}
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        zona = {zona}
                                        clienteseleccionado = {clienteseleccionado}
                                        posicion = {posicion}
                                        mostrarValidados = {mostrarValidados}
                                        mostrarAutomaticos = {mostrarAutomaticos}
                                        sumaValorizadoObjetivo = {sumaValorizadoObjetivo}
                                        sumaValorizadosValorizado = {sumaValorizadosValorizado}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>


            <ExcelFile 
                filename="Subsidios Si"
                element={
                    <div 
                        id={
                            ComunesTipoDisenio == "Light"
                            ?"Btn-Flotante-Descargar-Subsidios-So-Light"
                            :"Btn-Flotante-Descargar-Subsidios-So"
                        }
                    >
                        <img src={
                            ComunesTipoDisenio == "Light"
                            ?IconoDescargarLight
                            :IconoDescargar
                        } id="Icono-Flotante-Descargar-Subsidios-So" />
                    </div>
                }>
                <ExcelSheet 
                    dataSet={data_descarga_subsidiossi} 
                    name="Subsidios Si"
                />
            </ExcelFile>
        </div>
    )
}

export default SubsidiosSi
