import React, {useEffect, useState, useRef} from 'react'
import '../../Estilos/Rutas/SubsidiosSo/SubsidiosSo.css'
import {
    ObtenerSubsidiosSoReducer,
    ObtenerFiltrosReducer,
    AplicarFiltrosSubsidiosSoReducer,
    CargarArchivoExcepcionesReducer
} from '../../Redux/Actions/SubsidiosSo/SubsidiosSo'
import {
    DesplegarSubsidiosSoReducer,
    SeleccionarSolicitanteReducer,
    DesplegarFiltroColumnaReducer,
    SeleccionarColumnasDescargarReducer,
    VolverArmarExcelSubSoReducer
} from '../../Redux/Actions/SubsidiosSo/SubsidiosSoFront'
import {useDispatch, useSelector} from "react-redux";
import IconoDescargar from '../../Assets/Imagenes/Iconos/descargar.svg'
import IconoDescargarLight from '../../Assets/Imagenes/Iconos/DescargarLight.svg'
import IconoCargarLight from '../../Assets/Imagenes/Iconos/SubsidiosSo/cargarSo.svg'
import ReactExport from 'react-data-export';
import BtnFiltroSubSo from '../../Componentes/SubsidiosSo/BtnFiltroSubSo';
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas';
import { Row, Col, Modal, Spin, Checkbox } from 'antd'
import IconoCargando from '../../Assets/Imagenes/Iconos/Comunes/cargando.svg'
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import FiltroFechaTop from '../../Componentes/Top/FiltroFechaTop';
import DataTablaSo from '../../Componentes/SubsidiosSo/DataTablaSo';
import IconoDesplegarAbajo from '../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import FiltroTablaIluminado from '../../Componentes/Elementos/Tabla/Filtros/FiltroTablaIluminado';
import { Table } from './Tabla/Tabla';
import IconoCerrar from '../../Assets/Imagenes/Iconos/iconoCerrar.png'
import data_mock from './Tabla/MOCK_DATA.json'
import IconoFiltroTablaSapBlanco from '../../Assets/Imagenes/Iconos/Comunes/FiltroTablaSapBlanco.png'
import { Player } from '@lottiefiles/react-lottie-player';
import { 
    LoadingOutlined,
    CaretDownOutlined,
    CaretRightOutlined,
    CheckCircleTwoTone,
    CloseCircleTwoTone
} from '@ant-design/icons';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const Prueba = () => {

    const dispatch = useDispatch();
    const {
        data_subsidiosso_real,
        data_subsidiosso, 
        data_descarga_subsidiosso,
        total_soles_subsidiosso,
        cargando_data_subsidiosso,

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
        AgrupacionesColumnas_Subsidios_SO,
        cargando_archivo_excepciones,
        cargando_descargable_subsidiosso,
        columnas_descargable_subsidios_so,
        armar_descargable_sub_so
    } = useSelector(({subsidiosSo}) => subsidiosSo);

    const [mostrarModalFiltroColumnasDescargable, setMostrarModalFiltroColumnasDescargable] = useState(false)

    const {
        ComunesFechaInicio,
        ComunesFechaFinal,
        ComunesTipoDisenio,
        ComunesMostrarMenu
    } = useSelector(({comunes}) => comunes);

    useEffect(() => {
        dispatch(ObtenerSubsidiosSoReducer())
    }, [ComunesFechaInicio, ComunesFechaFinal]);

    useEffect(() => {
        dispatch(ObtenerFiltrosReducer())
    }, []);
    
    const sumaValores = (ns) => {
        let acumulado = 0
        for (let i = 0; i < ns.length; i ++ ){
            acumulado += ns[i]
        }

        return acumulado
    }

    let inputFileRef = useRef(null);

    const [aplicarFiltrosAutomaticoValidado, setAplicarFiltrosAutomaticoValidado] = useState(false)
    const [mostrarAutomaticos, setMostrarAutomaticos] = useState(true)
    const [mostrarValidados, setMostrarValidados] = useState(true)
    const [contadorEstadoAutomaticoManual, setContadorEstadoAutomaticoManual] = useState(0)
    const [mostrarNombreCliente, setMostrarNombreCliente] = useState(true)
    const [mostrarCodigoProducto, setMostrarCodigoProducto] = useState(true)

    const valorizadosCantidadBultosTotal = data_subsidiosso.map(x => {
        const cantidadBultos = x.data.map(
            y => 
                y.sdebultosacido
                ?aplicarFiltrosAutomaticoValidado == true
                    ?mostrarValidados == true
                        ?y.sdestatus != null
                            ? mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdebultosacido) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdebultosacido) 
                                    :0
                            :0
                        :y.sdestatus != null
                            ?0
                            :mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdebultosacido) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdebultosacido) 
                                    :0
                    :parseFloat(y.sdebultosacido) 
                :0
        )
        return sumaValores(cantidadBultos)
    })

    const sumaValorizadoCantidadBultosTotal = sumaValores(valorizadosCantidadBultosTotal)

    const valorizadosBultosAcordadosTotal = data_subsidiosso.map(x => {
        const bultosAcordados = x.data.map(
            // y => y.sdebultosacordados ?parseFloat(y.sdebultosacordados): 0
            y => 
                y.sdebultosacordados
                ?aplicarFiltrosAutomaticoValidado == true
                    ?mostrarValidados == true
                        ?y.sdestatus != null
                            ? mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdebultosacordados) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdebultosacordados) 
                                    :0
                            :0
                        :y.sdestatus != null
                            ?0
                            :mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdebultosacordados) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdebultosacordados) 
                                    :0
                    :parseFloat(y.sdebultosacordados)
                :0
        )
        return sumaValores(bultosAcordados)
    })
    const sumaValorizadoBultosAcordadosTotal = sumaValores(valorizadosBultosAcordadosTotal)

    
    const valorizadosMontoReconcerTotal = data_subsidiosso.map(x => {
        const montosReconocer = x.data.map(
            y => 
                y.sdemontoacido
                ?aplicarFiltrosAutomaticoValidado == true
                    ?mostrarValidados == true
                        ?y.sdestatus != null
                            ? mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoacido) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoacido) 
                                    :0
                            :0
                        :y.sdestatus != null
                            ?0
                            :mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoacido) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoacido) 
                                    :0
                    :parseFloat(y.sdemontoacido) 
                :0
        )
        return sumaValores(montosReconocer)
    })
    const sumaValorizadoMontosReonocerTotal = sumaValores(valorizadosMontoReconcerTotal)


    const valorizadosDiferenciasAhorrosSoles = data_subsidiosso.map(x => {
        const montosReconocer = x.data.map(
            y => 
                y.sdemontoareconocer
                ?aplicarFiltrosAutomaticoValidado == true
                    ?mostrarValidados == true
                        ?y.sdestatus != null
                            ? mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoareconocer - y.sdemontoacido) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoareconocer - y.sdemontoacido) 
                                    :0
                            :0
                        :y.sdestatus != null
                            ?0
                            :mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoareconocer - y.sdemontoacido) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoareconocer - y.sdemontoacido)
                                    :0
                    :parseFloat(y.sdemontoareconocer - y.sdemontoacido)
                :0
        )
        return sumaValores(montosReconocer)
    })
    
    const sumaValorizadosDiferenciasAhorrosSoles = sumaValores(valorizadosDiferenciasAhorrosSoles)


    // 
    const valorizadosMontoReconcerTotalDT = data_subsidiosso.map(x => {
        const montosReconocer = x.data.map(
            y => 
                y.sdemontoareconocer
                ?aplicarFiltrosAutomaticoValidado == true
                    ?mostrarValidados == true
                        ?y.sdestatus != null
                            ? mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoareconocer) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoareconocer) 
                                    :0
                            :0
                        :y.sdestatus != null
                            ?0
                            :mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoareconocer) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoareconocer) 
                                    :0
                    :parseFloat(y.sdemontoareconocer) 
                :0
        )
        return sumaValores(montosReconocer)
    })
    const sumaValorizadoMontosReonocerTotalDT = sumaValores(valorizadosMontoReconcerTotalDT)

    const valorizadosCantidadBultosTotalDT = data_subsidiosso.map(x => {
        const cantidadBultos = x.data.map(
            y => 
                y.sdecantidadbultos
                ?aplicarFiltrosAutomaticoValidado == true
                    ?mostrarValidados == true
                        ?y.sdestatus != null
                            ? mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdecantidadbultos) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdecantidadbultos) 
                                    :0
                            :0
                        :y.sdestatus != null
                            ?0
                            :mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdecantidadbultos) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdecantidadbultos) 
                                    :0
                    :parseFloat(y.sdecantidadbultos) 
                :0
        )
        return sumaValores(cantidadBultos)
    })

    const sumaValorizadoCantidadBultosTotalDT = sumaValores(valorizadosCantidadBultosTotalDT)

    const [mostrarModalFiltrosColumnas , setMostrarModalFiltrosColumnas] = useState(false)


    const [archivosExcepciones, setArchivosExcepciones] = useState(null)
    const [mostrarModalConfirmacionExcepciones, setMostrarModalConfirmacionExcepciones] = useState(false)

    function seleccionarArchivoCargar() {
        // setArchivosExcepciones(null)
        inputFileRef.current.click();
    }

    async function cambioInputFile(event){
        
        console.log(event)

        if(event.target.files.length > 0){
            setMostrarModalConfirmacionExcepciones(!mostrarModalConfirmacionExcepciones)

            event.stopPropagation();
            event.preventDefault();

            setArchivosExcepciones(event.target.files[0])
        }

    }

    async function EnviarArchivoExcepciones(){
        let rpta = await dispatch(CargarArchivoExcepcionesReducer(archivosExcepciones))
        
        setMostrarModalConfirmacionExcepciones(false)
        dispatch(ObtenerSubsidiosSoReducer())
    }

    return (
        <div style={{paddingBottom:'100px'}}>
            

            <div 
                className={ComunesTipoDisenio == "Light" ?"CEDF0FA Wbold-S20-H27-C004FB8" :"Wbold-S20-H27-Ce4e6eb"}
                style={{ paddingTop:'10px', paddingLeft:'40px', paddingBottom:'10px'}}
            >

                    <FiltroFechas 
                        titulo = {"Subsidios Sell Out"}
                    />

            </div>

            <div style={{background:'white', padding:'15px 40px 40px 40px'}}>
                {/* el ppading esta en 7px eu */}
                <div style={{width:'100%', paddingBottom:'20px'}}>
                    <Row>
                        <Col 
                            xl={4} 
                            style={{display:'flex', alignItems: "center",}}
                            className="Wbold-S13-H17-C004FB8"
                        >

                            <FiltroFechaTop 
                                texto = {"Fecha Inicio"}
                            />

                        </Col>

                        <Col 
                            xl={4} 
                            style={{display:'flex', alignItems: "center" }}
                            className="Wbold-S13-H17-C004FB8"
                        >
                            <FiltroFechaTop 
                                texto = {"Fecha Fin"}
                            />
                        </Col>
                        <Col xl={6}>
                            <div className="W600-S13-H17-CFF8023-Italic" style={{
                                    textAlignLast: "center"
                            }}>
                                Para editar hacer doble click en Bultos
                            </div>
                        </Col>

                        <Col 
                            xl={10}
                            style={{
                                width: '100%',
                                textAlign: "-webkit-right",
                                // paddingRight:'40px'
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

               
                <div id="Contenedor-Filtros-Tabla-Subsidios-So">
                    <Row style={{width:'100%'}}>
                        <Col 
                            xl={2} 
                            style={{
                                paddingLeft:'5px', paddingRight:'5px',
                                position:'relative'
                            }}
                        >
                            <FiltroTablaIluminado 
                                data_subsidiosso_real = {data_subsidiosso_real}
                                campo = {"clizona"}
                                titulo = {"Zona"}
                                pertenenciaFiltros = {"SUBSO"}
                            />
                        </Col>
                        {/* <Col xl={1}></Col> */}
                        <Col 
                            xl={2} 
                            style={{
                                paddingLeft:'5px', paddingRight:'5px',
                                position:'relative'
                            }}
                        >
                            <FiltroTablaIluminado 
                                data_subsidiosso_real = {data_subsidiosso_real}
                                campo = {"sdeterritorio"}
                                titulo = {"Territorio"}
                                pertenenciaFiltros = {"SUBSO"}
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
                                    data_subsidiosso_real = {data_subsidiosso_real}
                                    campo = {"clinombre"}
                                    titulo = {"Nombre Cliente"}
                                    tieneSwitch = {true}
                                    accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                    pertenenciaFiltros = {"SUBSO"}
                                />
                                :<FiltroTablaIluminado 
                                    data_subsidiosso_real = {data_subsidiosso_real}
                                    campo = {"clicodigoshipto"}
                                    titulo = {"Codigo Cliente"}
                                    tieneSwitch = {true}
                                    accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                    pertenenciaFiltros = {"SUBSO"}
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
                                data_subsidiosso_real = {data_subsidiosso_real}
                                campo = {"catnombre"}
                                titulo = {"Categoría"}
                                pertenenciaFiltros = {"SUBSO"}
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
                                data_subsidiosso_real = {data_subsidiosso_real}
                                campo = {"sdesector"}
                                titulo = {"Sector"}
                                pertenenciaFiltros = {"SUBSO"}
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
                                data_subsidiosso_real = {data_subsidiosso_real}
                                campo = {"propresentacion"}
                                titulo = {"Presentación"}
                                pertenenciaFiltros = {"SUBSO"}
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
                                    data_subsidiosso_real = {data_subsidiosso_real}
                                    campo = {"prosku"}
                                    titulo = {"Cod. Producto"}
                                    tieneSwitch = {true}
                                    accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                    pertenenciaFiltros = {"SUBSO"}
                                />
                                :<FiltroTablaIluminado 
                                    data_subsidiosso_real = {data_subsidiosso_real}
                                    campo = {"pronombre"}
                                    titulo = {"Nombre Producto"}
                                    tieneSwitch = {true}
                                    accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                    pertenenciaFiltros = {"SUBSO"}
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
                                data_subsidiosso_real = {data_subsidiosso_real}
                                campo = {"sdevalidado"}
                                titulo = {"Validación"}
                                esValidacion = {true}
                                pertenenciaFiltros = {"SUBSO"}
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
                                data_subsidiosso_real = {data_subsidiosso_real}
                                campo = {"sdesac"}
                                titulo = {"Conexión"}
                                esConexion = {true}
                                pertenenciaFiltros = {"SUBSO"}
                            />
                        </Col>


                        {/* <Col xl={2} xs={24}>
                            <div 
                                onClick={() => {
                                    setMostrarAutomaticos(!mostrarAutomaticos)   
                                    if(contadorEstadoAutomaticoManual == 0){
                                        setAplicarFiltrosAutomaticoValidado(true)
                                        setContadorEstadoAutomaticoManual(1)
                                    }else if(contadorEstadoAutomaticoManual == 1){
                                        setContadorEstadoAutomaticoManual(2)
                                    }else if(contadorEstadoAutomaticoManual == 2){
                                        setContadorEstadoAutomaticoManual(0)
                                        setAplicarFiltrosAutomaticoValidado(false)
                                    }
                                }}
                                className={
                                    aplicarFiltrosAutomaticoValidado == false
                                    ?"Contenedor-Filtro-Light-Tabla-Elementos CFF8023"
                                    :mostrarAutomaticos == true
                                        ?"Contenedor-Filtro-Light-Tabla-Elementos CFF8023"
                                        :"Contenedor-Filtro-Light-Tabla-Elementos CFFFFFF"
                                }
                            >
                                <span 
                                    className={
                                        aplicarFiltrosAutomaticoValidado == false
                                        ?"Wbold-S13-H19-CFFFFFF-L0015"
                                        :mostrarAutomaticos == true
                                        ?"Wbold-S13-H19-CFFFFFF-L0015"
                                        :"Wbold-S13-H19-C004FB8-L0015"
                                    }
                                >
                                    {
                                        aplicarFiltrosAutomaticoValidado == false
                                        ?"Estado"
                                        :mostrarAutomaticos == true
                                            ?"Automaticos"
                                            :"Manuales"
                                    }
                                </span>
                            </div>
                        </Col>

                        <Col xl={4} xs={24}>
                            <div 
                                onClick={() => {
                                    setMostrarValidados(!mostrarValidados)
                                    // setAplicarFiltrosAutomaticoValidado(true)
                                    if(contadorEstadoAutomaticoManual == 0){
                                        setAplicarFiltrosAutomaticoValidado(true)
                                        setContadorEstadoAutomaticoManual(1)
                                    }else if(contadorEstadoAutomaticoManual == 1){
                                        setContadorEstadoAutomaticoManual(2)
                                    }else if(contadorEstadoAutomaticoManual == 2){
                                        setContadorEstadoAutomaticoManual(0)
                                        setAplicarFiltrosAutomaticoValidado(false)
                                    }
                                }}
                                className={
                                    aplicarFiltrosAutomaticoValidado == false
                                    ?"Contenedor-Filtro-Light-Tabla-Elementos CFF8023"
                                    :mostrarValidados == true
                                        ?"Contenedor-Filtro-Light-Tabla-Elementos CFF8023"
                                        :"Contenedor-Filtro-Light-Tabla-Elementos CFFFFFF"
                                }
                            >
                                <span 
                                    className={
                                        aplicarFiltrosAutomaticoValidado == false
                                        ?"Wbold-S13-H19-CFFFFFF-L0015"
                                        :mostrarValidados == true
                                            ?"Wbold-S13-H19-CFFFFFF-L0015"
                                            :"Wbold-S13-H19-C004FB8-L0015"
                                    }
                                >
                                    {
                                        aplicarFiltrosAutomaticoValidado == false
                                        ?"Estado"
                                        :mostrarValidados == true
                                        ?"Validados"
                                        :"No Validados"
                                    }
                                </span>
                            </div>
                        </Col> */}
                    </Row>
                    
                </div>

                

                {
                    data_subsidiosso.length > 0
                    ?cargando_data_subsidiosso == false
                    ?<Table 
                        // MOCK_DATA = {data_mock}
                        MOCK_DATA = {data_subsidiosso}
                        ComunesTipoDisenio = {ComunesTipoDisenio}
                        cargando_data_subsidiosso = {cargando_data_subsidiosso}
                        data_subsidiosso = {data_subsidiosso}
                        sumaValorizadoBultosAcordadosTotal = {sumaValorizadoBultosAcordadosTotal}
                        sumaValorizadoCantidadBultosTotalDT = {sumaValorizadoCantidadBultosTotalDT}
                        sumaValorizadoCantidadBultosTotal = {sumaValorizadoCantidadBultosTotal}
                        sumaValorizadoMontosReonocerTotalDT = {sumaValorizadoMontosReonocerTotalDT}
                        sumaValorizadoMontosReonocerTotal = {sumaValorizadoMontosReonocerTotal}
                        sumaValorizadosDiferenciasAhorrosSoles = {sumaValorizadosDiferenciasAhorrosSoles}
                        clienteseleccionado = {clienteseleccionado}
                        mostrarAutomaticos = {mostrarAutomaticos}
                        mostrarValidados = {mostrarValidados}

                        ComunesMostrarMenu = {ComunesMostrarMenu}
                        aplicarFiltrosAutomaticoValidado = {aplicarFiltrosAutomaticoValidado}
                        sumaValores = {(ns) => sumaValores(ns)}

                        // variables modal
                        mostrarModalFiltrosColumnas = {mostrarModalFiltrosColumnas}
                        setMostrarModalFiltrosColumnas = {(s) => setMostrarModalFiltrosColumnas(s)}
                        AgrupacionesColumnas_Subsidios_SO = {AgrupacionesColumnas_Subsidios_SO}
                    />
                    :<IconoCargandoSITb />
                    :<IconoCargandoSITb />
                }
                
            </div>


            <div 
                id={
                    ComunesTipoDisenio == "Light"
                    ?"Btn-Flotante-Descargar-Subsidios-So-Light"
                    :"Btn-Flotante-Descargar-Subsidios-So"
                }
            >
                <Spin 
                    spinning={cargando_descargable_subsidiosso}
                    indicator={<LoadingOutlined />}
                    style={
                        cargando_descargable_subsidiosso == true
                        ?{width:'100%',
                        height:'100%',
                        cursor: 'not-allowed'}
                        :{}
                    }
                >
                    <img src={
                        ComunesTipoDisenio == "Light"
                        ?IconoDescargarLight
                        :IconoDescargar
                    } id="Icono-Flotante-Descargar-Subsidios-So" 
                    onClick={() => setMostrarModalFiltroColumnasDescargable(true) }
                    />
                </Spin>
            </div>


            {/* <div 
                id={
                    ComunesTipoDisenio == "Light"
                    ?"Btn-Flotante-Cargar-Subsidios-So-Light"
                    :"Btn-Flotante-Cargar-Subsidios-So"
                }
                onClick={() => seleccionarArchivoCargar()}
            >
                <img src={
                    ComunesTipoDisenio == "Light"
                    ?IconoCargarLight
                    :IconoCargarLight
                } id="Icono-Flotante-Cargar-Subsidios-So" />
            </div> */}
            

            <input 
                onChange={(e) => cambioInputFile(e)}
                ref={inputFileRef}
                type={"file"} style={{display:'none'}}  />


            <Modal
                footer={null}
                title={null}
                onOk={() => {setMostrarModalConfirmacionExcepciones(false)}} 
                onCancel={() => {setMostrarModalConfirmacionExcepciones(false)}}
                visible={mostrarModalConfirmacionExcepciones}
                centered={true}
                closeIcon={<img src={IconoCerrar} width='27px'/>}
            >
                <Row>
                    <Col 
                        xl={24}
                        style={{
                            paddingBottom:'20px'
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center"
                            }} 
                            className="Wbold-S15-H20-C004FB8" >¿Está seguro que desea subir el archivo?</div>
                    </Col>
                    <Col 
                        xl={12}
                        style={{
                            paddingRight:'15px',
                            textAlign: "-webkit-right",
                        }}
                    >
                        <div className="Contenedor-Btn-Aceptar-Excepciones">
                            <Spin
                                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
                                spinning={cargando_archivo_excepciones}
                            >
                                <div 
                                    className="Btn-Aceptar-Modal-Excepciones W600-S13-H17-CFFFFFF"
                                    onClick={() => EnviarArchivoExcepciones()}
                                >
                                    Aceptar
                                </div>
                            </Spin >
                        </div>
                    </Col>

                    <Col xl={12}>
                        <div className="Btn-Cancelar-Modal-Excepciones W600-S13-H17-C004FB8">
                            Cancelar
                        </div>
                    </Col>

                </Row>
            </Modal>


        
            

            <Modal 
                title={null} 
                visible={mostrarModalFiltroColumnasDescargable} 
                footer={null}
                centered
                width="620px"
                height= "407px"
                bodyStyle={{
                    borderRadius: "8px"
                }}
                closeIcon={<img onClick={() =>setMostrarModalFiltroColumnasDescargable(!mostrarModalFiltroColumnasDescargable) } src={null}/>}
                onCancel={() =>setMostrarModalFiltroColumnasDescargable(!mostrarModalFiltroColumnasDescargable) }
            >
                <div
                    className="Wbold-S16-H19-C004FB8-L0015" 
                    style={{textAlign: "-webkit-center", marginBottom:'20px'}}>Filtros de Columnas a Descargar</div>

                <Row>
                    <Col xl={11}>
                        <div
                            className="Columnas-Mostradas-Filtro-Columnas"
                        >
                            <div className="Cabecera-Columnas-Mostradas-Filtro-Columnas">
                                <div className="Wbold-S14-H19-C004FB8-L0015">Columnas</div>
                                <div className="Wnormal-S11-H15-C706C64-L0015">Lista de columnas ocultas</div>
                            </div>
                            <div style={{overflow:'auto', width:'100%', height:'215px', marginTop:'10px'}}>
                                {
                                    AgrupacionesColumnas_Subsidios_SO.map((agrupacion, posicion) => {
                                        return(
                                            <>
                                                <div className="Etiqueta-Filtro-Columnas W600-S11-H15-CFFFFFF" style={{marginBottom:'2px'}}>
                                                    {
                                                        agrupacion.seleccionado == true
                                                        ?<CaretDownOutlined 
                                                            onClick={() => dispatch(DesplegarFiltroColumnaReducer(posicion))}
                                                            style={{paddingRight:'5px', cursor:'pointer'}} /> 
                                                        :<CaretRightOutlined 
                                                            onClick={() => dispatch(DesplegarFiltroColumnaReducer(posicion))}
                                                            style={{paddingRight:'5px', cursor:'pointer'}} /> 
                                                    }
                                                    {agrupacion.agrupacion}
                                                </div>
                                                {
                                                    agrupacion.seleccionado == true
                                                    ?columnas_descargable_subsidios_so.map((columna, pos) => {
                                                        return(
                                                            columna.seleccionado == false && columna.cabeceraAgrupacion == agrupacion.cabeceraAgrupacion 
                                                            ?<div key={columna.columna} style={{paddingLeft:'10px'}}>
                                                                <Checkbox 
                                                                    onChange={(e) => dispatch(SeleccionarColumnasDescargarReducer(pos, true))}
                                                                    checked={false}
                                                                >
                                                                    <span className="W600-S13-H17-C004FB8">{columna.columna}</span>
                                                                </Checkbox>
                                                            </div>
                                                            :null
                                                        )
                                                    })
                                                    // ?allColumns.map((column, posicion) => (
                                                    //     column.isVisible == false && column.cabeceraAgrupacion == agrupacion.cabeceraAgrupacion
                                                    //     ?<div key={column.id} style={{paddingLeft:'10px'}}>
                                                    //         <Checkbox  {...column.getToggleHiddenProps()}>
                                                    //         {/* <Checkbox > */}
                                                    //             <span className="W600-S13-H17-C004FB8">{column.Homologado}</span>
                                                    //         </Checkbox>
                                                    //     </div>
                                                    //     :null
                                                    // ))
                                                    :null
                                                }
                                            </>            
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </Col>
                    <Col xl={2} 
                        style={{
                            alignSelf: "center",
                            textAlign: "-webkit-center"
                        }}
                    >
                        {/* <div className="Flecha-Medio-Filtro-Columnas">{">"}</div>
                        <div className="Flecha-Medio-Filtro-Columnas">{"<"}</div> */}
                    </Col>
                    <Col xl={11}>
                        <div
                            className="Columnas-Mostradas-Filtro-Columnas"
                        >
                            <div className="Cabecera-Columnas-Mostradas-Filtro-Columnas">
                                <div className="Wbold-S14-H19-C004FB8-L0015">Columnas a Descargar</div>
                                <div className="Wnormal-S11-H15-C706C64-L0015">Seleccionar las columnas que desea descargar</div>
                            </div>
                            <div style={{overflow:'auto', width:'100%', height:'215px', marginTop:'10px', }}>
                                
                                {
                                    AgrupacionesColumnas_Subsidios_SO.map((agrupacion, posicion) => {
                                        return(
                                            <>
                                                <div className="Etiqueta-Filtro-Columnas W600-S12-H15-CFFFFFF" style={{marginBottom:'2px'}}>
                                                    {
                                                        agrupacion.seleccionado == true
                                                        ?<CaretDownOutlined 
                                                            onClick={() => dispatch(DesplegarFiltroColumnaReducer(posicion))}
                                                            style={{paddingRight:'5px', cursor:'pointer'}} /> 
                                                        :<CaretRightOutlined 
                                                            onClick={() => dispatch(DesplegarFiltroColumnaReducer(posicion))}
                                                            style={{paddingRight:'5px', cursor:'pointer'}} /> 
                                                    }
                                                    {agrupacion.agrupacion}
                                                </div>
                                                {
                                                    agrupacion.seleccionado == true
                                                    ?columnas_descargable_subsidios_so.map((columna, pos) => {
                                                        return(
                                                            columna.seleccionado == true && columna.cabeceraAgrupacion == agrupacion.cabeceraAgrupacion 
                                                            ?<div key={columna.columna} style={{paddingLeft:'10px'}}>
                                                                <Checkbox 
                                                                    onChange={(e) => dispatch(SeleccionarColumnasDescargarReducer(pos, false))}
                                                                    checked={true}
                                                                >
                                                                    <span className="W600-S13-H17-C004FB8">{columna.columna}</span>
                                                                </Checkbox>
                                                            </div>
                                                            :null
                                                        )
                                                    })
                                                    // ?allColumns.map((column, posicion) => (
                                                    //     column.isVisible == true && column.cabeceraAgrupacion == agrupacion.cabeceraAgrupacion
                                                    //     ?<div key={column.id} style={{paddingLeft:'10px'}}>
                                                    //         <Checkbox  {...column.getToggleHiddenProps()}>
                                                    //         {/* <Checkbox > */}
                                                    //             <span className="W400-S13-H17-C004FB8">{column.Homologado}</span>
                                                    //         </Checkbox>
                                                    //     </div>
                                                    //     :null
                                                    // ))
                                                    :null
                                                }
                                            </>            
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </Col>
                </Row>

                <div
                    style={{
                        textAlign: "-webkit-center",
                        marginTop: "20px"
                    }}
                >
                    {/* <button onClick={() => dispatch(VolverArmarExcelSubSoReducer())}>armar</button> */}

                    {
                        armar_descargable_sub_so == true
                        ?<Spin 
                            spinning={cargando_descargable_subsidiosso}
                            indicator={<LoadingOutlined />}
                            style={
                                cargando_descargable_subsidiosso == true
                                ?{width:'100%',
                                height:'100%',
                                cursor: 'not-allowed'}
                                :{}
                            }
                        >

                            <div
                                style={{
                                    width: "126px",
                                    height: "24px",
                                    background: "#EDF0FA",
                                    border: "1px solid #004FB8",
                                    boxSizing: "border-box",
                                    borderRadius: "14px",
                                    paddingTop:'2px',
                                    cursor:'pointer'
                                }}
                                className="W600-S13-H17-C004FB8"
                                onClick={() => {
                                    dispatch(VolverArmarExcelSubSoReducer())
                                }}
                            >
                                Armar Descargable
                            </div>

                        </Spin>
                        :<ExcelFile 
                            filename="Subsidios So"
                            element={
                                <Spin 
                                    spinning={cargando_descargable_subsidiosso}
                                    indicator={<LoadingOutlined />}
                                    style={
                                        cargando_descargable_subsidiosso == true
                                        ?{width:'100%',
                                        height:'100%',
                                        cursor: 'not-allowed'}
                                        :{}
                                    }
                                >

                                    <div
                                        style={{
                                            width: "66px",
                                            height: "24px",
                                            background: "#EDF0FA",
                                            border: "1px solid #004FB8",
                                            boxSizing: "border-box",
                                            borderRadius: "14px",
                                            paddingTop:'2px',
                                            cursor:'pointer'
                                        }}
                                        className="W600-S13-H17-C004FB8"
                                        onClick={() => {
                                            setMostrarModalFiltroColumnasDescargable(!mostrarModalFiltroColumnasDescargable)
                                        }}
                                    >
                                        Descargar
                                    </div>

                                </Spin>
                            }>
                            <ExcelSheet 
                                dataSet={data_descarga_subsidiosso} 
                                name="Subsidios So"
                            />
                        </ExcelFile>
                    }
                    

                    
                </div>

            </Modal>
            




















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



export default Prueba
