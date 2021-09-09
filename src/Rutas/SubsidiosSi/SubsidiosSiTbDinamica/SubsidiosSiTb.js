import React, {useEffect, useState} from 'react'
import '../../../Estilos/Rutas/SubsidiosSo/SubsidiosSo.css'
import {
    ObtenerSubsidiosSoReducer,
    ObtenerFiltrosReducer
} from '../../../Redux/Actions/SubsidiosSo/SubsidiosSo'
import {
    SeleccionarSolicitanteReducer
} from '../../../Redux/Actions/SubsidiosSo/SubsidiosSoFront'
import {
    ObtenerSubsidiosSiReducer
} from '../../../Redux/Actions/SubsidiosSi/SubsidiosSi'

import {useDispatch, useSelector} from "react-redux";
import IconoDescargar from '../../../Assets/Imagenes/Iconos/descargar.svg'
import IconoDescargarLight from '../../../Assets/Imagenes/Iconos/DescargarLight.svg'
import ReactExport from 'react-data-export';
import BtnFiltroSubSo from '../../../Componentes/SubsidiosSo/BtnFiltroSubSo';
import { Row, Col } from 'antd'
import FiltroFechas from '../../../Componentes/Subsidios/FiltroFechas'
import { Modal, Button } from 'antd';
import funFomratoDecimal from '../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import ModalNotasCredito from '../../../Componentes/Subsidios/ModalNotasCredito'
import IconoCerrar from '../../../Assets/Imagenes/Iconos/iconoCerrar.png'
import FiltroFechaTop from '../../../Componentes/Top/FiltroFechaTop'
import IconoCargando from '../../../Assets/Imagenes/Iconos/Comunes/cargando.svg'
import DataTablaSi from '../../../Componentes/Subsidios/DataTablaSi'
import TbSubSi from './Tabla/TbSubSi'
import {
    DesplegarSubsidiosSoReducer
} from '../../../Redux/Actions/SubsidiosSi/SubsidiosSiFront'
import IconoFiltroTablaSapBlanco from "../../../Assets/Imagenes/Iconos/Comunes/FiltroTablaSapBlanco.png"
import FiltroTablaIluminado from '../../../Componentes/Elementos/Tabla/Filtros/FiltroTablaIluminado';
import { Player } from '@lottiefiles/react-lottie-player';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const SubsidiosSiTb = () => {

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
        cargando_data_subsidiossi,
        AgrupacionesColumnas_Subsidios_SI,
        data_subsidiossi_real
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
        )
        return sumaValores(valorizadoTotal)
    })

    const sumaValorizadosValorizadoTotal = sumaValores(valorizadosValorizadoTotal)

    const [mostrarModalFiltrosColumnas , setMostrarModalFiltrosColumnas] = useState(false)

    const [mostrarNombreCliente, setMostrarNombreCliente] = useState(true)
    const [mostrarCodigoProducto, setMostrarCodigoProducto] = useState(true)

    const MesesNombres = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]

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
                        <div 
                            className="Contenedor-Filtros-Columnas-Tabla-Elementos Wbold-S13-H17-CFFFFFF"
                            style={{
                                cursor:'pointer'
                            }}
                            onClick={() => {
                                setMostrarModalFiltrosColumnas(!mostrarModalFiltrosColumnas)
                                dispatch(DesplegarSubsidiosSoReducer(0, true))
                            }}
                        >
                            Filtros
                            <img className="Icono-Filtros-Tabla-Sap-Blanco" src={IconoFiltroTablaSapBlanco} /> 
                        </div>
                    </Col>
                </Row>
            </div>
            
            <div id="Contenedor-Filtros-Tabla-Subsidios-So" style={{paddingLeft:'40px', paddingRight:'40px'}}>
                <Row style={{width:'100%'}}>

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossi_real}
                            campo = {"clizona"}
                            titulo = {"Zona"}
                            pertenenciaFiltros = {"SUBSI"}
                        />
                    </Col>

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossi_real}
                            campo = {"sdeterritorio"}
                            titulo = {"Territorio"}
                            pertenenciaFiltros = {"SUBSI"}
                        />
                    </Col>

                    <Col 
                        xl={4} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        {
                            mostrarNombreCliente == true
                            ?<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_subsidiossi_real}
                                campo = {"clinombre"}
                                titulo = {"Nombre Cliente"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                pertenenciaFiltros = {"SUBSI"}
                            />
                            :<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_subsidiossi_real}
                                campo = {"clicodigoshipto"}
                                titulo = {"Codigo Cliente"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                pertenenciaFiltros = {"SUBSI"}
                            />
                        }
                    </Col>

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossi_real}
                            campo = {"catnombre"}
                            titulo = {"Categoría"}
                            pertenenciaFiltros = {"SUBSI"}
                        />
                    </Col>

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossi_real}
                            campo = {"sdesector"}
                            titulo = {"Sector"}
                            pertenenciaFiltros = {"SUBSI"}
                        />
                    </Col>

                    <Col 
                        xl={3} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossi_real}
                            campo = {"propresentacion"}
                            titulo = {"Presentación"}
                            pertenenciaFiltros = {"SUBSI"}
                        />
                    </Col>

                    {/* <Col xl={2}></Col> */}

                    <Col 
                        xl={4} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        {
                            mostrarCodigoProducto == true
                            ?<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_subsidiossi_real}
                                campo = {"prosku"}
                                titulo = {"Cod. Producto"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                pertenenciaFiltros = {"SUBSI"}
                            />
                            :<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_subsidiossi_real}
                                campo = {"pronombre"}
                                titulo = {"Nombre Producto"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                pertenenciaFiltros = {"SUBSI"}
                            />
                        }
                    </Col>

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossi_real}
                            campo = {"sdevalidado"}
                            titulo = {"Validación"}
                            esValidacion = {true}
                            pertenenciaFiltros = {"SUBSI"}
                        />
                    </Col>

                    <Col 
                        xl={3} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossi_real}
                            campo = {"sdesac"}
                            titulo = {"Conexión"}
                            esConexion = {true}
                            pertenenciaFiltros = {"SUBSI"}
                        />
                    </Col>

                </Row>

                

                

                

                
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
                    <div style={{marginBottom:'20px'}} className="Wbold-S13-H17-C004FB8" onclick={() => console.log(ComunesFechaInicio)}>
                        
                        LISTA DE FACTURAS ASIGNADAS<br/>
                        PERIODO: {
                            ComunesFechaInicio
                            ?MesesNombres[ComunesFechaInicio.getMonth()]
                            :""
                            
                        } 2021
                        
                    </div>

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
                                }>Fecha de Reconocimiento</th>
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
                                            <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.sfssaldoanterior, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                            <td className="W600-S11-H15-CFF3742">S/{<NumberFormat value={funFomratoDecimal(factura.sfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                            <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.sfssaldonuevo, 2)} displayType={'text'} thousandSeparator={true} />}</td>                                            
                                            
                                            
                                            
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
            
            {
                data_subsidiossi.length > 0
                ?<TbSubSi 
                    ComunesTipoDisenio = {ComunesTipoDisenio}
                    sumaValores = {(n) => sumaValores(n)}
                    cargando_data_subsidiossi = {cargando_data_subsidiossi}
                    MOCK_DATA = {data_subsidiossi}
                    data_subsidiossi = {data_subsidiossi}
                    sumaValorizadoMontosReonocerTotal = {sumaValorizadoMontosReonocerTotal}
                    sumaValorizadosValorizadoTotal = {sumaValorizadosValorizadoTotal}
                    clienteseleccionado = {clienteseleccionado}
                    mostrarValidados = {mostrarValidados}
                    mostrarAutomaticos = {mostrarAutomaticos}
                    mostrarModalFiltrosColumnas = {mostrarModalFiltrosColumnas}
                    setMostrarModalFiltrosColumnas = {(s) => setMostrarModalFiltrosColumnas(s)}
                    AgrupacionesColumnas_Subsidios_SI = {AgrupacionesColumnas_Subsidios_SI}
                    seleccionarFacturas = {(d) => seleccionarFacturas(d)}
                />
                :<IconoCargandoSITb />
            }

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


class IconoCargandoSITb extends React.Component {
    constructor(props) {
      super(props);
      this.player = React.createRef();
    }
  
    doSomething() {
      this.player.current.play(); // make use of the player and call methods
    }
  
    render() {
      return (
        <Player
          onEvent={event => {
            if (event === 'load') this.doSomething(); // check event type and do something
          }}
          ref={this.player}
          autoplay={false}
          loop={true}
          controls={true}
          src="https://assets6.lottiefiles.com/private_files/lf30_ip9sj61c.json"
          style={{ height: '300px', width: '300px' }}
        ></Player>
      );
    }
  }

export default SubsidiosSiTb
