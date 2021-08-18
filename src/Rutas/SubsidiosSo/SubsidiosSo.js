import React, {useEffect, useState} from 'react'
import '../../Estilos/Rutas/SubsidiosSo/SubsidiosSo.css'
import {
    ObtenerSubsidiosSoReducer,
    ObtenerFiltrosReducer
} from '../../Redux/Actions/SubsidiosSo/SubsidiosSo'
import {
    DesplegarSubsidiosSoReducer,
    SeleccionarSolicitanteReducer
} from '../../Redux/Actions/SubsidiosSo/SubsidiosSoFront'
import {useDispatch, useSelector} from "react-redux";
import IconoDescargar from '../../Assets/Imagenes/Iconos/descargar.svg'
import IconoDescargarLight from '../../Assets/Imagenes/Iconos/DescargarLight.svg'
import ReactExport from 'react-data-export';
import BtnFiltroSubSo from '../../Componentes/SubsidiosSo/BtnFiltroSubSo';
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas';
import { Row, Col } from 'antd'
import IconoCargando from '../../Assets/Imagenes/Iconos/Comunes/cargando.svg'
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import FiltroFechaTop from '../../Componentes/Top/FiltroFechaTop';
import DataTablaSo from '../../Componentes/SubsidiosSo/DataTablaSo';
import IconoDesplegarAbajo from '../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../Assets/Imagenes/Iconos/flecha-derecha.svg'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const SubsidiosSo = () => {

    const dispatch = useDispatch();
    const {
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

    } = useSelector(({subsidiosSo}) => subsidiosSo);

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

    const multiDataSet = [
        {
            columns: [
                {title: "Headings", width: {wpx: 80}},//pixels width 
                {title: "Text Style", width: {wch: 40}},//char width 
                {title: "Colors", width: {wpx: 90}},
            ],
            data: [
                [
                    {value: "H1", style: {font: {sz: "24", bold: true}}},
                    {value: "Bold", style: {font: {bold: true}}},
                    {value: "Red", style: {fill: {patternType: "solid", fgColor: {rgb: "FFFF0000"}}}},
                ],
                [
                    {value: "H2", style: {font: {sz: "18", bold: true}}},
                    {value: "underline", style: {font: {underline: true}}},
                    {value: "Blue", style: {fill: {patternType: "solid", fgColor: {rgb: "FF0000FF"}}}},
                ],
                [
                    {value: "H3", style: {font: {sz: "14", bold: true}}},
                    {value: "italic", style: {font: {italic: true}}},
                    {value: "Green", style: {fill: {patternType: "solid", fgColor: {rgb: "FF00FF00"}}}},
                ],
                [
                    {value: "H4", style: {font: {sz: "12", bold: true}}},
                    {value: "strike", style: {font: {strike: true}}},
                    {value: "Orange", style: {fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}}},
                ],
                [
                    {value: "H5", style: {font: {sz: "10.5", bold: true}}},
                    {value: "outline", style: {font: {outline: true}}},
                    {value: "Yellow", style: {fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}}}},
                ],
                [
                    {value: "H6", style: {font: {sz: "7.5", bold: true}}},
                    {value: "shadow", style: {font: {shadow: true}}},
                    {value: "Light Blue", style: {fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}
                ]
            ]
        }
    ];
    
    const sumaValores = (ns) => {
        let acumulado = 0
        for (let i = 0; i < ns.length; i ++ ){
            acumulado += ns[i]
        }

        return acumulado
    }

    // let sumaValorizadoCantidadBultosTotal = 0
    // let sumaValorizadoBultosAcordadosTotal = 0

    // if(data_subsidiosso.length > 0){
    //     valorizadosCantidadBultos    = zona.data.map(x => parseFloat(x.sdecantidadbultosreal))
    //     sumaValorizadoCantidadBultos = sumaValores(valorizadosCantidadBultos)
    // }

    const [aplicarFiltrosAutomaticoValidado, setAplicarFiltrosAutomaticoValidado] = useState(false)
    const [mostrarAutomaticos, setMostrarAutomaticos] = useState(true)
    const [mostrarValidados, setMostrarValidados] = useState(true)

    const valorizadosCantidadBultosTotal = data_subsidiosso.map(x => {
        const cantidadBultos = x.data.map(
            y => 
                y.sdecantidadbultosreal
                ?aplicarFiltrosAutomaticoValidado == true
                    ?mostrarValidados == true
                        ?y.sdestatus != null
                            ? mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdecantidadbultosreal) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdecantidadbultosreal) 
                                    :0
                            :0
                        :y.sdestatus != null
                            ?0
                            :mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdecantidadbultosreal) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdecantidadbultosreal) 
                                    :0
                    :parseFloat(y.sdecantidadbultosreal) 
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
                y.sdemontoareconocerreal
                ?aplicarFiltrosAutomaticoValidado == true
                    ?mostrarValidados == true
                        ?y.sdestatus != null
                            ? mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoareconocerreal) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoareconocerreal) 
                                    :0
                            :0
                        :y.sdestatus != null
                            ?0
                            :mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoareconocerreal) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoareconocerreal) 
                                    :0
                    :parseFloat(y.sdemontoareconocerreal) 
                :0
        )
        return sumaValores(montosReconocer)
    })
    const sumaValorizadoMontosReonocerTotal = sumaValores(valorizadosMontoReconcerTotal)


    const valorizadosDiferenciasAhorrosSoles = data_subsidiosso.map(x => {
        const montosReconocer = x.data.map(
            y => 
                y.sdemontoareconocerreal
                ?aplicarFiltrosAutomaticoValidado == true
                    ?mostrarValidados == true
                        ?y.sdestatus != null
                            ? mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoareconocer - y.sdemontoareconocerreal) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoareconocer - y.sdemontoareconocerreal) 
                                    :0
                            :0
                        :y.sdestatus != null
                            ?0
                            :mostrarAutomaticos == true
                                ?y.sdesac == 0
                                    ?parseFloat(y.sdemontoareconocer - y.sdemontoareconocerreal) 
                                    :0
                                :y.sdesac == 1
                                    ?parseFloat(y.sdemontoareconocer - y.sdemontoareconocerreal)
                                    :0
                    :parseFloat(y.sdemontoareconocer - y.sdemontoareconocerreal)
                :0
        )
        return sumaValores(montosReconocer)
    })
    
    const sumaValorizadosDiferenciasAhorrosSoles = sumaValores(valorizadosDiferenciasAhorrosSoles)

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

                            {/* <span style={{paddingRight:'15px'}}>Fecha Inicio</span>
                            <div className="Contenedor-Filtro-Fecha Wnormal-S13-H17-C004FB8">
                                DD/MM/AA
                            </div> */}
                        </Col>

                        <Col 
                            xl={4} 
                            style={{display:'flex', alignItems: "center", }}
                            className="Wbold-S13-H17-C004FB8"
                        >
                            <FiltroFechaTop 
                                texto = {"Fecha Fin"}
                            />
                        </Col>
                    </Row>
                </div>
                <div id="Contenedor-Filtros-Tabla-Subsidios-So">
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
                                onClick={() => {
                                    setMostrarAutomaticos(!mostrarAutomaticos)   
                                    setAplicarFiltrosAutomaticoValidado(true)
                                }}
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
                                    setAplicarFiltrosAutomaticoValidado(true)
                                }}
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
                                        aplicarFiltrosAutomaticoValidado == false
                                        ?"Estado"
                                        :mostrarValidados == true
                                        ?"Validados"
                                        :"No Validados"
                                    }
                                </span>
                            </div>
                        </Col>
                    </Row>
                    
                </div>

                <div 
                    style={{
                        overflowX:"auto", marginTop:'-10px',
                        boxShadow: "0px 0px 15px #D8DFE9", 
                    }} id="Contenedor-Tabla-Subsidios-So">
                    <table 
                        className="table-responsive-subsidios-so Tabla-SubsidiosSo" 
                        style={{width:'100%'}}
                    >
                        <thead
                            className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                        >
                            <tr>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                >Zona</th>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                >Territorio</th>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                    style={ComunesMostrarMenu == true ?{}:{zIndex:'1'}}
                                >Cliente</th>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                >Sub Cliente</th>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                // >Categoría</th>
                                >Sector</th>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                >Cod Producto</th>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                >Nombre Producto</th>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                >Bultos Acordados</th>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                >Cantidad Bultos Softys</th>
                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                >Monto a Reconocer S/IGV</th>

                                <th 
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                >Diferencia de Ahorro S/IGV</th>
                            </tr>
                        </thead>
                        <tr className={ComunesTipoDisenio == "Light" ? "CEDF0FA Wbold-S13-H17-C004FB8" : "C2d2d2e Wbold-S11-H20-Ce4e6eb"}>
                            <td 
                                // colSpan="10"
                                id="Total-Cuerpo-Tabla-Subsidios-So" 
                                className={
                                    ComunesTipoDisenio == "Light" 
                                    ? "CEDF0FA Wbold-S13-H17-C004FB8" 
                                    : "C2d2d2e Wbold-S11-H20-Ce4e6eb"
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

                            {
                                <>
                                    <td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                        {<NumberFormat value={funFomratoDecimal(sumaValorizadoBultosAcordadosTotal, 0)} displayType={'text'} thousandSeparator={true} />}
                                    </td>
                                    <td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                        {<NumberFormat value={funFomratoDecimal(sumaValorizadoCantidadBultosTotal, 0)} displayType={'text'} thousandSeparator={true} />}
                                    </td>
                                </>
                            }

                            <td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoMontosReonocerTotal, 0)} displayType={'text'} thousandSeparator={true} />}
                            </td>
                            <td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                S/{<NumberFormat value={funFomratoDecimal(sumaValorizadosDiferenciasAhorrosSoles, 0)} displayType={'text'} thousandSeparator={true} />}
                            </td>
                        </tr>
                        {
                            cargando_data_subsidiosso == true && data_subsidiosso.length == 0
                            ?<tr 
                                // style={{width:'100%'}}
                                style={
                                    ComunesTipoDisenio == "Light"
                                    ?{borderBottom: '1px solid #D7E8FF'}
                                    :{borderBottom: '1px solid #1c1e21'}
                                }
                            >
                                <td colSpan="11" style={{textAlignLast: "center"}}>
                                    <img src={IconoCargando}  />
                                </td>
                            </tr>
                            :data_subsidiosso.map((zona, posicion) => {

                                const valorizadosCantidadBultos = zona.data.map(
                                    x => 
                                        x.sdecantidadbultosreal
                                        ?aplicarFiltrosAutomaticoValidado == true
                                            ?mostrarValidados == true
                                                ?x.sdestatus != null
                                                    ? mostrarAutomaticos == true
                                                        ?x.sdesac == 0
                                                            ?parseFloat(x.sdecantidadbultosreal) 
                                                            :0
                                                        :x.sdesac == 1
                                                            ?parseFloat(x.sdecantidadbultosreal) 
                                                            :0
                                                    :0
                                                :x.sdestatus != null
                                                    ?0
                                                    :mostrarAutomaticos == true
                                                        ?x.sdesac == 0
                                                            ?parseFloat(x.sdecantidadbultosreal) 
                                                            :0
                                                        :x.sdesac == 1
                                                            ?parseFloat(x.sdecantidadbultosreal) 
                                                            :0
                                            :parseFloat(x.sdecantidadbultosreal) 
                                        :0
                                    
                                )
                                
                                const valorizadosBultosAcordados = zona.data.map(
                                    x => 
                                        x.sdebultosacordados 
                                        ?aplicarFiltrosAutomaticoValidado == true
                                            ?mostrarValidados == true
                                                ?x.sdestatus != null
                                                    ? mostrarAutomaticos == true
                                                        ?x.sdesac == 0
                                                            ?parseFloat(x.sdebultosacordados) 
                                                            :0
                                                        :x.sdesac == 1
                                                            ?parseFloat(x.sdebultosacordados) 
                                                            :0
                                                    :0
                                                :x.sdestatus != null
                                                    ?0
                                                    :mostrarAutomaticos == true
                                                        ?x.sdesac == 0
                                                            ?parseFloat(x.sdebultosacordados)
                                                            :0
                                                        :x.sdesac == 1
                                                            ?parseFloat(x.sdebultosacordados)
                                                            :0
                                            :parseFloat(x.sdebultosacordados)
                                        :0
                                )

                                const valorizadoMontosReconocer = zona.data.map(
                                    y => 
                                        y.sdemontoareconocerreal
                                        ?aplicarFiltrosAutomaticoValidado == true
                                            ?mostrarValidados == true
                                                ?y.sdestatus != null
                                                    ? mostrarAutomaticos == true
                                                        ?y.sdesac == 0
                                                            ?parseFloat(y.sdemontoareconocerreal) 
                                                            :0
                                                        :y.sdesac == 1
                                                            ?parseFloat(y.sdemontoareconocerreal) 
                                                            :0
                                                    :0
                                                :y.sdestatus != null
                                                    ?0
                                                    :mostrarAutomaticos == true
                                                        ?y.sdesac == 0
                                                            ?parseFloat(y.sdemontoareconocerreal) 
                                                            :0
                                                        :y.sdesac == 1
                                                            ?parseFloat(y.sdemontoareconocerreal) 
                                                            :0
                                            :parseFloat(y.sdemontoareconocerreal) 
                                        :0
                                )

                                const valorizadoDiferenciaAhorroSoles = zona.data.map(
                                    y => 
                                        y.sdemontoareconocerreal
                                        ?aplicarFiltrosAutomaticoValidado == true
                                            ?mostrarValidados == true
                                                ?y.sdestatus != null
                                                    ? mostrarAutomaticos == true
                                                        ?y.sdesac == 0
                                                            ?parseFloat( y.sdemontoareconocer - y.sdemontoareconocerreal ) 
                                                            :0
                                                        :y.sdesac == 1
                                                            ?parseFloat( y.sdemontoareconocer - y.sdemontoareconocerreal ) 
                                                            :0
                                                    :0
                                                :y.sdestatus != null
                                                    ?0
                                                    :mostrarAutomaticos == true
                                                        ?y.sdesac == 0
                                                            ?parseFloat(y.sdemontoareconocer - y.sdemontoareconocerreal)
                                                            :0
                                                        :y.sdesac == 1
                                                            ?parseFloat(y.sdemontoareconocer - y.sdemontoareconocerreal)
                                                            :0
                                            :parseFloat(y.sdemontoareconocer - y.sdemontoareconocerreal)
                                        :0
                                )

                                const sumaValorizadoCantidadBultos  = sumaValores(valorizadosCantidadBultos)
                                const sumaValorizadoBultosAcordados = sumaValores(valorizadosBultosAcordados)
                                const sumaValorizadoMontosReonocer  = sumaValores(valorizadoMontosReconocer)
                                const sumaValorizadoDiferenciaAhorroSoles  = sumaValores(valorizadoDiferenciaAhorroSoles)

                                return (
                                    <DataTablaSo 
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        zona = {zona}
                                        sumaValorizadoBultosAcordados = {sumaValorizadoBultosAcordados}
                                        sumaValorizadoCantidadBultos = {sumaValorizadoCantidadBultos}
                                        clienteseleccionado = {clienteseleccionado}
                                        posicion = {posicion}
                                        mostrarAutomaticos = {mostrarAutomaticos}
                                        mostrarValidados = {mostrarValidados}
                                        sumaValorizadoMontosReonocer = {sumaValorizadoMontosReonocer}
                                        sumaValorizadoDiferenciaAhorroSoles = {sumaValorizadoDiferenciaAhorroSoles}
                                    />
                                )
                            })
                        }
                    </table>
                </div>
            </div>


            <ExcelFile 
                filename="Subsidios So"
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
                    dataSet={data_descarga_subsidiosso} 
                    name="Subsidios So"
                />
            </ExcelFile>
        </div>
    )
}

export default SubsidiosSo
