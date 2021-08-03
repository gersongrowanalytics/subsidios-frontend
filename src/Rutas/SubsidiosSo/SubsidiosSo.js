import React, {useEffect} from 'react'
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
import IconoDesplegarAbajo from '../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../Assets/Imagenes/Iconos/flecha-derecha.svg'
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
        ComunesTipoDisenio
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

    const valorizadosCantidadBultosTotal = data_subsidiosso.map(x => {
        const cantidadBultos = x.data.map(y => parseFloat(y.sdecantidadbultosreal))
        return sumaValores(cantidadBultos)
    })
    const sumaValorizadoCantidadBultosTotal = sumaValores(valorizadosCantidadBultosTotal)

    const valorizadosBultosAcordadosTotal = data_subsidiosso.map(x => {
        const bultosAcordados = x.data.map(y => y.sdebultosacordados ?parseFloat(y.sdebultosacordados): 0)
        return sumaValores(bultosAcordados)
    })
    const sumaValorizadoBultosAcordadosTotal = sumaValores(valorizadosBultosAcordadosTotal)

    return (
        <div style={{paddingBottom:'100px'}}>
            <div 
                className={ComunesTipoDisenio == "Light" ?"CEDF0FA Wbold-S20-H27-C004FB8" :"Wbold-S20-H27-Ce4e6eb"}
                style={{ paddingTop:'20px', paddingLeft:'40px', paddingBottom:'20px'}}
            >

                    <FiltroFechas 
                        titulo = {"Subsidios Sell Out"}
                    />

            </div>

            <div style={{background:'white', padding:'30px 40px 40px 40px'}}>
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

                <div style={{overflowX:"auto"}} id="Contenedor-Tabla-Subsidios-So">
                    <table className="table-responsive-subsidios-so" style={{boxShadow: "0px 0px 15px #D8DFE9", width:'100%'}}>
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
                                <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Bultos Acordados</th>
                                <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Cantidad Bultos Softys</th>
                                <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb">Monto a Reconocer S/IGV</th>
                            </tr>
                        </thead>
                        <tr className={ComunesTipoDisenio == "Light" ? "CEDF0FA Wbold-S13-H17-C004FB8" : "C2d2d2e Wbold-S11-H20-Ce4e6eb"}>
                            <td 
                                // colSpan="10"
                                id="Total-Cuerpo-Tabla-Subsidios-So" 
                                className={ComunesTipoDisenio == "Light" ? "CEDF0FA Wbold-S13-H17-C004FB8" : "C2d2d2e Wbold-S11-H20-Ce4e6eb"}
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
                                    <td className="Wbold-S13-H17-C004FB8">
                                        {<NumberFormat value={funFomratoDecimal(sumaValorizadoBultosAcordadosTotal, 2)} displayType={'text'} thousandSeparator={true} />}
                                    </td>
                                    <td className="Wbold-S13-H17-C004FB8">
                                        {<NumberFormat value={funFomratoDecimal(sumaValorizadoCantidadBultosTotal, 2)} displayType={'text'} thousandSeparator={true} />}
                                    </td>
                                </>
                            }

                            <td className="Wbold-S13-H17-C004FB8">
                                S/{<NumberFormat value={funFomratoDecimal(total_soles_subsidiosso, 2)} displayType={'text'} thousandSeparator={true} />}
                            </td>
                        </tr>
                        {
                            cargando_data_subsidiosso == true
                            ?<tr 
                                // style={{width:'100%'}}
                                style={
                                    ComunesTipoDisenio == "Light"
                                    ?{borderBottom: '1px solid #D7E8FF'}
                                    :{borderBottom: '1px solid #1c1e21'}
                                }
                            >
                                <td colSpan="10" style={{textAlignLast: "center"}}>
                                    <img src={IconoCargando}  />
                                </td>
                            </tr>
                            :data_subsidiosso.map((zona, posicion) => {

                                

                                const valorizadosCantidadBultos = zona.data.map(x => parseFloat(x.sdecantidadbultosreal))
                                const valorizadosBultosAcordados = zona.data.map(x => x.sdebultosacordados ?parseFloat(x.sdebultosacordados): 0)
                                const sumaValorizadoCantidadBultos = sumaValores(valorizadosCantidadBultos)
                                const sumaValorizadoBultosAcordados = sumaValores(valorizadosBultosAcordados)

                                // sumaValorizadoCantidadBultosTotal = sumaValorizadoCantidadBultosTotal + sumaValorizadoCantidadBultos
                                // sumaValorizadoBultosAcordadosTotal = sumaValorizadoBultosAcordadosTotal + sumaValorizadoBultosAcordados

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
                                                // style={zona.desplegado == true?{background:'#565656'}:{}}
                                                style={
                                                    zona.desplegado == true
                                                    ? ComunesTipoDisenio == "Light"
                                                        ?{background:'white'}
                                                        :{background:'#565656'}
                                                    // ?{ ?background:'#565656' :background:'#565656'}
                                                    :{}
                                                }
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"CFFFFFF Wbold-S13-H17-C004FB8"
                                                    :"Zona-Cuerpo-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                                }
                                            >
                                                {
                                                    zona.desplegado == true
                                                    ?<img onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarAbajo} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                    :<img onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarDerecha} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                }
                                                {zona.clizona}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="Wbold-S13-H17-C004FB8">
                                                {<NumberFormat value={funFomratoDecimal(sumaValorizadoBultosAcordados, 2)} displayType={'text'} thousandSeparator={true} />}
                                            </td>
                                            <td className="Wbold-S13-H17-C004FB8">
                                                S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoCantidadBultos, 2)} displayType={'text'} thousandSeparator={true} />}
                                            </td>
                                            <td className="Wbold-S13-H17-C004FB8">
                                                S/{<NumberFormat value={funFomratoDecimal(zona.sumSdeZona, 2)} displayType={'text'} thousandSeparator={true} />}
                                            </td>
                                        </tr>
                                        {
                                            zona.desplegado == true
                                            ?
                                            zona.data.map((dato) => {
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
                                                        <tr
                                                            style={
                                                                ComunesTipoDisenio == "Light"
                                                                ?{borderBottom: '1px solid #D7E8FF'}
                                                                :{borderBottom: '1px solid #1c1e21'}
                                                            }
                                                        >
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{}</td>
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.clizona}</td>
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.clinombre}</td>
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.sdesubcliente}</td>
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.catnombre}</td>
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.prosku}</td>
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.pronombre}</td>
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.sdebultosacordados}</td>
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >
                                                                {funFomratoDecimal(dato.sdecantidadbultosreal, 2)}
                                                            </td>
                                                            <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >
                                                                S/{<NumberFormat value={funFomratoDecimal(dato.sdemontoareconocerreal, 2)} displayType={'text'} thousandSeparator={true} />}
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
