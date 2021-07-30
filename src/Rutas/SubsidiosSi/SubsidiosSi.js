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
import {
    DesplegarSubsidiosSoReducer
} from '../../Redux/Actions/SubsidiosSi/SubsidiosSiFront'

import {useDispatch, useSelector} from "react-redux";
import IconoDesplegarAbajo from '../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import IconoDescargar from '../../Assets/Imagenes/Iconos/descargar.svg'
import ReactExport from 'react-data-export';
import BtnFiltroSubSo from '../../Componentes/SubsidiosSo/BtnFiltroSubSo';
import { Row, Col } from 'antd'
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas'
import { Modal, Button } from 'antd';
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import ModalNotasCredito from '../../Componentes/Subsidios/ModalNotasCredito'
import IconoCerrar from '../../Assets/Imagenes/Iconos/iconoCerrar.png'

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
        total_soles_subsidiossi
    } = useSelector(({subsidiosSi}) => subsidiosSi);

    const {
        ComunesTipoDisenio
    } = useSelector(({comunes}) => comunes);

    useEffect(() => {
        // dispatch(ObtenerSubsidiosSoReducer())
        dispatch(ObtenerSubsidiosSiReducer())

        dispatch(ObtenerFiltrosReducer())
    }, []);

    const [subsidioSeleccionado, setSubsidioSeleccionado] = useState([])
    const [pedidoOriginalSeleccionado, setPedidoOriginalSeleccionado] = useState("")
    const [mostrarModalFacturas, setMostrarModalFacturas] = useState(false)
    const [mostrarModalNotasCredito, setMostrarModalNotasCredito] = useState(false)

    const seleccionarFacturas = (facturas) => {
        // console.log(facturas)
        setSubsidioSeleccionado(facturas)
        setMostrarModalFacturas(!mostrarModalFacturas)
    }

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
                <Row>
                    <Col 
                        xl={4} 
                        style={{display:'flex', alignItems: "center", paddingLeft:'40px', paddingTop:'20px'}}
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
            
            <div id="Contenedor-Filtros-Tabla-Subsidios-So" style={{paddingLeft:'40px'}}>
                <Row style={{width:'100%'}}>
                    <Col xl={4} xs={24}>
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
                    <Col xl={4} xs={24}>
                        <BtnFiltroSubSo 
                            texto = {"ZONA"}
                            tamanio = {"90px"}
                            data = {zonas_filtro_subsidiosso}
                            seleccionar = {(estado, id) => dispatch(SeleccionarSolicitanteReducer(estado, id, "FILTRAR_ZONAS"))}
                        />
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
                width={"90%"}
                centered
                closeIcon={<img src={IconoCerrar} width='27px'/>}
            >
                <div 
                    style={{
                        overflowX:"auto", marginTop:'0px',
                        textAlign: "-webkit-center"
                    }}
                >
                    <div style={{marginBottom:'10px'}} className="Wbold-S13-H17-C004FB8" >
                        
                        LISTA DE FACTURAS ASIGNADAS<br/>
                        PERIODO: MAYO 2021
                        
                    </div>


                    {/* <button onClick={() => console.log(subsidioSeleccionado)}>c</button> */}
                    <div 
                        style={{
                            overflowX:"auto",
                            borderRadius: "20px 20px 20px 20px",
                            width:'auto'
                        }}
                        
                    >
                        <table className="table-responsive-subsidios-so" style={{position:'relative'}}>
                            <thead
                                className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                            >
                                <tr>
                                    <th className="Wbold-S13-H17-CFFFFFF">N° Fila</th>
                                    <th className="Wbold-S13-H17-CFFFFFF">Factura SI</th>
                                    <th className="Wbold-S13-H17-CFFFFFF">Fecha de Reconocimiento</th>
                                    <th className="Wbold-S13-H17-CFFFFFF">Valor Neto</th>
                                    <th className="Wbold-S13-H17-CFFFFFF">Notas Credito</th>
                                    <th className="Wbold-S13-H17-CFFFFFF">30% del Valor Neto</th>
                                    <th className="Wbold-S13-H17-CFFFFFF">Saldo Disponible</th>
                                    <th className="Wbold-S13-H17-CFFFFFF">Reconocimiento</th>
                                    <th className="Wbold-S13-H17-CFFFFFF">Saldo Final</th>

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
                                <td className="W600-S11-H15-C004FB8">S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sumsfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}</td>
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
                                <td className="W600-S11-H15-CFF3742">S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sumsfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                <td></td>
                            </tr>


                            <tr 
                                style={{borderTop: "1px solid #D7E8FF"}}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="Wbold-S11-H15-C706C64">Pendiente:</td>
                                <td className="Wbold-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sumsfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                <td></td>
                            </tr>

                        </table>
                    </div>
                </div>
            </Modal>
            <div style={{overflowX:"auto", marginLeft:'40px'}} id="Contenedor-Tabla-Subsidios-So">
                
                <table className="table-responsive-subsidios-so" style={{position:'relative'}}>
                    <thead
                        className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                    >
                        <tr>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Zona</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Territorio</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Cliente</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Sub Cliente</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Categoría</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Cod Producto</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Nombre Producto</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Sub Objetivo</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Factura Impactar</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Fecha</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Estado</th>
                        </tr>
                    </thead>
                    <tr>
                        <td 
                            colSpan="11" id="Total-Cuerpo-Tabla-Subsidios-So"
                            className={ComunesTipoDisenio == "Light" ? "CEDF0FA Wbold-S13-H17-C004FB8" : "C2d2d2e Wbold-S11-H20-Ce4e6eb"}
                        >
                            TOTAL
                            {" "}(S/<NumberFormat value={funFomratoDecimal(total_soles_subsidiossi, 2)} displayType={'text'} thousandSeparator={true} />)
                            
                        </td>
                    </tr>
                    {
                        data_subsidiossi.map((zona, posicion) => {
                            return (
                                <>

                                    <tr
                                        style={
                                            ComunesTipoDisenio == "Light"
                                            ?{borderBottom: '1px solid #D7E8FF'}
                                            :{borderBottom: '1px solid #1c1e21'}
                                        }
                                    >
                                        <td 
                                            style={
                                                zona.desplegado == true
                                                ? ComunesTipoDisenio == "Light"
                                                    ?{background:'white'}
                                                    :{background:'#565656'}
                                                :{}
                                            }
                                            colSpan="13" 
                                            className={
                                                ComunesTipoDisenio == "Light"
                                                ?"CFFFFFF Wbold-S13-H17-C004FB8"
                                                :"Zona-Cuerpo-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                            }
                                        >
                                            {
                                                zona.desplegado == true
                                                ?<img 
                                                    onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarAbajo} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                :<img 
                                                    onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarDerecha} className="Icono-Flecha-Tabla-Subsidios-So" />
                                            }
                                            {zona.clizona}
                                            {" "}(S/<NumberFormat value={funFomratoDecimal(zona.sumSdeZona, 2)} displayType={'text'} thousandSeparator={true} />)
                                        </td>
                                    </tr>
                                    {
                                        zona.desplegado == true
                                        ?
                                        zona.data.map((dato, posicionData) => {
                                            let mostrar = false

                                            if(clienteseleccionado != 0){
                                                if(clienteseleccionado == dato.cliid){
                                                    mostrar = true
                                                }
                                            }else{
                                                mostrar = true
                                            }

                                            if(mostrar == true){
                                                return (
                                                    <tr>
                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{}</td>
                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.clizona}</td>
                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.clinombre}</td>
                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.sdesubcliente}</td>
                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.catnombre}</td>
                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.prosku}</td>
                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.pronombre}</td>
    
                                                        {/* <td className="Celda-td-Tabla-Subsidios-So W500-S14-H16-Cacafb7">{funFomratoDecimal(dato.sdemontoareconocerreal)}</td> */}
                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{<NumberFormat value={funFomratoDecimal(dato.sdemontoareconocerreal, 2)} displayType={'text'} thousandSeparator={true} />}</td>

                                                        <td 
                                                            className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C1EC0ED": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}
                                                            style={{cursor:'pointer'}} 
                                                            onClick={() => {
                                                                console.log(dato)
                                                                seleccionarFacturas(dato)
                                                            }}>

                                                            <u>Facturas</u>
                                                        </td>

                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.fecfecha}</td>
                                                        <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{display:'flex'}}>



                                                            {dato.facturas.length > 0 ?dato.sdependiente == 1? "Irregular" : "Regular  ": "Regulár"}
                                                            
                                                            <div style={{
                                                                background: dato.facturas.length > 0 ?dato.sdependiente == 1?"#FFCD1B":"#1EEC41" :"#1EEC41", 
                                                                borderRadius: "14px", 
                                                                width: "21px", 
                                                                height: "10px",
                                                                marginTop: "5px",
                                                                marginLeft: dato.facturas.length > 0?dato.sdependiente == 1?"10px":"13px":"13px"
                                                            }}></div>

                                                        </td>
                                                        
                                                    </tr>
                                                )
                                            }else{
                                                return null
                                            }
                                        })
                                        :null
                                    }
                                </>
                            )
                        })
                    }
                    {/* <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> */}
                </table>
            </div>


            <ExcelFile 
                filename="Subsidios Si"
                element={
                    <div id="Btn-Flotante-Descargar-Subsidios-So">
                        <img src={IconoDescargar} id="Icono-Flotante-Descargar-Subsidios-So" />
                    </div>
                }>
                <ExcelSheet 
                    dataSet={data_descarga_subsidiossi} 
                    name="Subsidios Si"
                />
            </ExcelFile>

            {/* <ExcelFile>
                <ExcelSheet dataSet={data_descarga_subsidiosso} name="Organization"/>
            </ExcelFile>
            <button onClick={() => console.log(data_descarga_subsidiosso)}>click</button> */}
        </div>
    )
}

export default SubsidiosSi
