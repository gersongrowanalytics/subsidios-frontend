import React, {useEffect, useState, useRef} from 'react'
import '../../../Estilos/Rutas/SubsidiosSo/SubsidiosSo.css'
import {
    ObtenerSubsidiosSoReducer,
    ObtenerFiltrosReducer
} from '../../../Redux/Actions/SubsidiosSo/SubsidiosSo'
import {
    SeleccionarSolicitanteReducer
} from '../../../Redux/Actions/SubsidiosSo/SubsidiosSoFront'
import {
    ObtenerSubsidiosSiReducer,
    ObtenerLinksSubsidiosSiVentas,
    ObtenerLinkHistoricoSubsidiosSIVentas
} from '../../../Redux/Actions/SubsidiosSi/SubsidiosSi'
import { LoadingOutlined } from '@ant-design/icons'
import {useDispatch, useSelector} from "react-redux";
import IconoDescargar from '../../../Assets/Imagenes/Iconos/descargar.svg'
import IconoDescargarLight from '../../../Assets/Imagenes/Iconos/DescargarLight.svg'

import IconoSubsidiosSiVentas from '../../../Assets/Imagenes/Iconos/SubsidiosSo/subsidiosventassi.png'

import IconoFondoSubsidiosVentas from '../../../Assets/Imagenes/Iconos/SubsidiosSo/fondosubsidiosventas.png'
import IconoFlechaSubsidiosVentas from '../../../Assets/Imagenes/Iconos/SubsidiosSo/flechasubisiosventa.png'
import IconoLineaSubsidiosVentas from '../../../Assets/Imagenes/Iconos/SubsidiosSo/lineasubsidiosventas.png'

import Iconoflechacompletasubsidiosventas from '../../../Assets/Imagenes/Iconos/SubsidiosSo/flechacompletasubsidiosventas.PNG'
import Iconoflechacompletasubsidiossi from '../../../Assets/Imagenes/Iconos/SubsidiosSo/flechacompletasubsidiossi.PNG'

import IconoFondoSubsidiosSI from '../../../Assets/Imagenes/Iconos/SubsidiosSo/fondosubsidiossi.png'


import ReactExport from 'react-data-export';
import BtnFiltroSubSo from '../../../Componentes/SubsidiosSo/BtnFiltroSubSo';
import { Row, Col, Spin, Tooltip } from 'antd'
import FiltroFechas from '../../../Componentes/Subsidios/FiltroFechas'
import ModalNotasCredito from '../../../Componentes/Subsidios/ModalNotasCredito'
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
import ModalFacturasAsignadas from './ModalFacturasAsignadas'
import config from '../../../config'
import {funPermisosObtenidos} from '../../../Funciones/funPermiso'

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
        data_subsidiossi_real,
        cargando_descarga,
        cargando_subsidiossi_ventas,
        data_subsidiossi_formato_ventas_excel
    } = useSelector(({subsidiosSi}) => subsidiosSi);

    const {
        ComunesTipoDisenio,
        ComunesFechaInicio,
        ComunesFechaFinal,
    } = useSelector(({comunes}) => comunes);

    const {LoginUsuario} = useSelector(({login}) => login);

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
    const [linkDescargarSubVentas, setLinkDescargarSubVentas] = useState(true)

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
                y.sdemontoacido
                ?parseFloat(y.sdemontoacido) 
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

    const inputDescargaLinkSubsidiosVentas = useRef(null);
    const buttonDescargaSubsidiosVentas = useRef(null);

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
                        xl={3} 
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
                        xl={3} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossi_real}
                            campo = {"catnombre"}
                            titulo = {"Categor??a"}
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
                            titulo = {"Presentaci??n"}
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

                    {/* <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossi_real}
                            campo = {"sdevalidado"}
                            titulo = {"Validaci??n"}
                            esValidacion = {true}
                            pertenenciaFiltros = {"SUBSI"}
                        />
                    </Col> */}

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
                            titulo = {"Conexi??n"}
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


            {
                mostrarModalFacturas == true
                ?<ModalFacturasAsignadas 
                    setMostrarModalFacturas = {(e) => setMostrarModalFacturas(e)}
                    ComunesFechaInicio = {ComunesFechaInicio}
                    mostrarModalFacturas = {mostrarModalFacturas}
                    ComunesTipoDisenio = {ComunesTipoDisenio}
                    subsidioSeleccionado = {subsidioSeleccionado}
                    setPedidoOriginalSeleccionado = {(e) => setPedidoOriginalSeleccionado(e)}
                    setMostrarModalNotasCredito = {(e) => setMostrarModalNotasCredito(e)}
                    mostrarModalNotasCredito = {mostrarModalNotasCredito}
                />
                :null
            }
            
            {
                cargando_data_subsidiossi == false
                ?data_subsidiossi.length > 0
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
                    :<h1>No hay data</h1>
                :<IconoCargandoSITb />
            }


            <a 
                href={linkDescargarSubVentas}
                download
                ref={inputDescargaLinkSubsidiosVentas}
                style={{
                    display:'none'
                }}
            >click</a>

            {
                funPermisosObtenidos(
                    LoginUsuario.permisos,
                    "MENU.MODULO.SUBSIDIOSSI.DESCARGAR.SUBSIDIOSI.FORMATO.VENTAS",
                    <Tooltip placement="left" title={"Descarga Venta"}>
                    <div 
                        className='Btn-Flotante-Descargar-Subsidios-Si-Ventas-Light'
                        onClick={ async() => {
                            // let linkDescargar = await dispatch(ObtenerLinksSubsidiosSiVentas())
                            
                            // if(linkDescargar.dataRpta.descargarHistorico == true){
                            //     let links = linkDescargar.links

                            //     await links.map(async(link) => {
                            //         await setTimeout( async () => {  
                            //             await setLinkDescargarSubVentas(link)
                            //             inputDescargaLinkSubsidiosVentas.current.click()
                            //         }, 2000);
                            //     })
                            // }else{
                            //     await setTimeout( async () => {  
                            //         buttonDescargaSubsidiosVentas.current.click()
                            //     }, 1000);
                            // }
                            
                            let linkDescargar = await dispatch(ObtenerLinkHistoricoSubsidiosSIVentas())
                            await setTimeout( async () => {  
                                await setLinkDescargarSubVentas(linkDescargar)
                                inputDescargaLinkSubsidiosVentas.current.click()
                            }, 1000);

                        }}

                    >
                        {
                            cargando_subsidiossi_ventas == true
                            ?<div 
                                className={cargando_subsidiossi_ventas == true ?'Spinner-Ventas-Subsidios': ''}
                            >
                                <Spin 
                                    spinning={cargando_subsidiossi_ventas}
                                    // spinning={true}
                                    indicator={<LoadingOutlined />}
                                    style={
                                        true == true
                                        ?{width:'100%',
                                        height:'100%',
                                        cursor: 'not-allowed',
                                        position: "absolute",
                                        top: "19px"
                                        }
                                        :{}
                                    }
                                ></Spin>
                            </div>
                            :null
                        }
                                <div 
                                    style={{
                                        position:'relative',
                                        background: "linear-gradient(140.75deg, #1876F2 17.49%, #1EC0ED 91.77%)",
                                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                        borderRadius: "20.5px"
                                    }}
                                >
                                    {/* <img 
                                        style={{
                                            width: "52px",
                                            marginTop: "6px",
                                            marginLeft: "5px"
                                        }}
                                    src={
                                        ComunesTipoDisenio == "Light"
                                        ?IconoSubsidiosSiVentas
                                        :IconoSubsidiosSiVentas
                                    } id="Icono-Flotante-Descargar-Subsidios-So" /> */}

                                    <img 
                                        className='Icono-Fondo-Subsidios-Ventas-Formato'
                                        src={
                                            ComunesTipoDisenio == "Light"
                                            ?IconoFondoSubsidiosVentas
                                            :IconoFondoSubsidiosVentas
                                        }
                                    />

                                    <img 
                                        className='Icono-Flecha-Subsidios-Ventas-Formato'
                                        src={
                                            ComunesTipoDisenio == "Light"
                                            ?Iconoflechacompletasubsidiosventas
                                            :Iconoflechacompletasubsidiosventas
                                        }
                                    />

                                    {/* <img 
                                        className='Icono-Linea-Subsidios-Ventas-Formato'
                                        src={
                                            ComunesTipoDisenio == "Light"
                                            ?IconoLineaSubsidiosVentas
                                            :IconoLineaSubsidiosVentas
                                        } id="Icono-Flotante-Descargar-Subsidios-So" 
                                    /> */}
                                </div>
                            
                        {/* </Spin> */}
                    </div>
                    </Tooltip>
                )
            }

            <ExcelFile 
                filename="Subsidios SI Ventas"
                element={
                    <div style={{display:'none'}}>
                        <button
                            ref={buttonDescargaSubsidiosVentas}
                        >

                        </button>
                    </div>
                }>
                <ExcelSheet 
                    dataSet={data_subsidiossi_formato_ventas_excel} 
                    name="Subsidios SI Ventas"
                />
            </ExcelFile>
                
            {/* <Tooltip placement="left" title={text}>
                <Button>Left</Button>
            </Tooltip> */}
            <ExcelFile 
                filename="Subsidios Si"
                element={
                    <Tooltip placement="left" title={"Descarga SAC"}>
                    <div 
                        id={
                            ComunesTipoDisenio == "Light"
                            ?"Btn-Flotante-Descargar-Subsidios-So-Light"
                            :"Btn-Flotante-Descargar-Subsidios-So"
                        }
                    >
                        {
                            cargando_descarga == true
                            ?<div className={cargando_descarga == true ?'Spinner-Ventas-Subsidios': ''}>
                                <Spin 
                                
                                    spinning={cargando_descarga}
                                    indicator={<LoadingOutlined />}
                                    style={
                                        cargando_descarga == true
                                        ?{width:'100%',
                                        height:'100%',
                                        cursor: 'not-allowed',
                                        position: "absolute",
                                        top: "19px"}
                                        :{}
                                    }
                                ></Spin>
                            </div>
                            :null
                        }
                                {/* <img src={
                                    ComunesTipoDisenio == "Light"
                                    ?IconoDescargarLight
                                    :IconoDescargar
                                } id="Icono-Flotante-Descargar-Subsidios-So" /> */}

                                {/* <div
                                    style={{
                                        position:'relative',
                                        background: "linear-gradient(142.74deg, #FF8023 14.47%, #FFC700 92.1%)",
                                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                        borderRadius: "20.5px"
                                    }}
                                > */}
                                    <img 
                                        className='Icono-Fondo-Subsidios-Ventas-Formato'
                                        src={
                                            ComunesTipoDisenio == "Light"
                                            ?IconoFondoSubsidiosSI
                                            :IconoFondoSubsidiosSI
                                        }
                                    />

                                    <img 
                                        className='Icono-Flecha-Subsidios-Ventas-Formato'
                                        src={
                                            ComunesTipoDisenio == "Light"
                                            ?Iconoflechacompletasubsidiossi
                                            :Iconoflechacompletasubsidiossi
                                        }
                                    />
                                {/* </div> */}
                            
                        {/* </Spin> */}
                    </div>
                    </Tooltip>
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
