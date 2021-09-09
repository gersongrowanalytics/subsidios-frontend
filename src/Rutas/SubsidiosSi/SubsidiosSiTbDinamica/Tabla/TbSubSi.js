import React, {useMemo} from 'react'
import { useTable, usePagination, useFilters} from "react-table"
import funFomratoDecimal from '../../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import IconoCargando from '../../../../Assets/Imagenes/Iconos/Comunes/cargando.svg'
import {COLUMNS_SUBSI } from "./columns";
import {useDispatch, useSelector} from "react-redux";
import {
    DesplegarSubsidiosSoReducer,
    DesplegarFiltroColumnaReducer
} from '../../../../Redux/Actions/SubsidiosSi/SubsidiosSiFront'
import IconoDesplegarAbajo from '../../../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import { Modal, Row, Col, Checkbox } from 'antd';
import {
    CaretDownOutlined,
    CaretRightOutlined
} from '@ant-design/icons'

const TbSubSi = (props) => {

    const columns = useMemo(() => COLUMNS_SUBSI, []);
    const data = useMemo(() => props.MOCK_DATA, []);
    const dispatch = useDispatch();

    const ComunesTipoDisenio = props.ComunesTipoDisenio
    const sumaValores = props.sumaValores
    const cargando_data_subsidiossi = props.cargando_data_subsidiossi
    const data_subsidiossi = props.data_subsidiossi
    const sumaValorizadoMontosReonocerTotal = props.sumaValorizadoMontosReonocerTotal
    const sumaValorizadosValorizadoTotal = props.sumaValorizadosValorizadoTotal
    const clienteseleccionado = props.clienteseleccionado
    const mostrarValidados = props.mostrarValidados
    const mostrarAutomaticos = props.mostrarAutomaticos
    const mostrarModalFiltrosColumnas = props.mostrarModalFiltrosColumnas
    const setMostrarModalFiltrosColumnas = props.setMostrarModalFiltrosColumnas
    const AgrupacionesColumnas_Subsidios_SI = props.AgrupacionesColumnas_Subsidios_SI
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        state,
        prepareRow,
        allColumns,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        usePagination,
        
    );

    return (
        <>
            <div 
                style={{
                    overflowX:"auto", marginLeft:'40px', marginRight:'40px', marginTop:'-10px',
                    boxShadow: "0px 0px 15px #D8DFE9", 
                }} 
                id="Contenedor-Tabla-Subsidios-So"
            >
                
                <table 
                    {...getTableProps()}
                    className="table-responsive-subsidios-so Tabla-SubsidiosSi" 
                    style={{position:'relative', width:'100%'}}
                >
                    <thead
                        className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                    >
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, posicion) => (
                                    <th 
                                        {...column.getHeaderProps()}
                                        className={
                                            ComunesTipoDisenio == "Light"
                                            ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                            :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }
                                        style={posicion == 0?{}:{textAlignLast: "center", zIndex:'1'}}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}

                        {/* <tr>
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
                        </tr> */}
                    </thead>


                    <tbody {...getTableBodyProps()}>







                        {page.map((row, posicion) => {

                            const valorizadoObjetivo = data_subsidiossi[posicion]['data'].map(
                                y => 
                                    y.sdemontoareconocerreal
                                    ?parseFloat(y.sdemontoareconocerreal) 
                                    :0
                            )

                            const sumaValorizadoObjetivo  = sumaValores(valorizadoObjetivo)

                            const valorizadosValorizado = data_subsidiossi[posicion]['data'].map(
                                y => 
                                    y.sumsfsvalorizado
                                    ?parseFloat(y.sumsfsvalorizado) 
                                    :0
                            )

                            const sumaValorizadosValorizado  = sumaValores(valorizadosValorizado)
                            
                            prepareRow(row);
                            return (
                                <>
                                    {
                                        posicion == 0
                                        ?<tr
                                            {...row.getRowProps()} 
                                            className={ComunesTipoDisenio == "Light" ? "CEDF0FA Wbold-S13-H17-C004FB8" : "C2d2d2e Wbold-S11-H20-Ce4e6eb"}
                                        >
                                            {row.cells.map((cell, pos) => {
                                                return (
                                                    pos == 0
                                                    ?<td 
                                                        id="Total-Cuerpo-Tabla-Subsidios-So" 
                                                        className={
                                                            ComunesTipoDisenio == "Light" 
                                                            ? "CEDF0FA Wbold-S13-H17-C004FB8" 
                                                            : "C2d2d2e Wbold-S11-H20-Ce4e6eb"
                                                        }
                                                    >
                                                        Grand Total
                                                    </td>
                                                    :cell.column.id == "sdemontoareconocerreal"
                                                    ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                        S/<NumberFormat value={funFomratoDecimal(sumaValorizadoMontosReonocerTotal, 0)} displayType={'text'} thousandSeparator={true} />
                                                    </td>
                                                    :cell.column.id == "sumsfsvalorizado"
                                                    ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                        S/<NumberFormat value={funFomratoDecimal(sumaValorizadosValorizadoTotal, 0)} displayType={'text'} thousandSeparator={true} />
                                                    </td>
                                                    :<td></td>
                                                )
                                            })}
                                        </tr>
                                        :null
                                    }

                                    <tr 
                                        {...row.getRowProps()}
                                        style={
                                            ComunesTipoDisenio == "Light"
                                            ?{borderBottom: '1px solid #D7E8FF'}
                                            :{borderBottom: '1px solid #1c1e21'}
                                        }
                                        className={
                                            ComunesTipoDisenio == "Light"
                                            ?"CFFFFFF Wbold-S13-H17-C004FB8"
                                            :"Zona-Cuerpo-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }
                                    >
                                        {row.cells.map((cell, pos) => {
                                            return (
                                                cell.column.id == "sdemontoareconocerreal"
                                                ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                    S/<NumberFormat value={funFomratoDecimal(sumaValorizadoObjetivo, 0)} displayType={'text'} thousandSeparator={true} />
                                                </td>
                                                :cell.column.id == "sumsfsvalorizado"
                                                ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                    S/<NumberFormat value={funFomratoDecimal(sumaValorizadosValorizado, 0)} displayType={'text'} thousandSeparator={true} />
                                                </td>
                                                :<td 
                                                    style={
                                                        data_subsidiossi[posicion]
                                                        ?data_subsidiossi[posicion]['desplegado']
                                                        ? ComunesTipoDisenio == "Light"
                                                            ?{background:'white'}
                                                            :{background:'#565656'}
                                                        :{}
                                                        :{}
                                                    }
                                                    className={
                                                        ComunesTipoDisenio == "Light"
                                                        ?"Wbold-S13-H17-C004FB8"
                                                        :"Wbold-S11-H20-Ce4e6eb"
                                                    }
                                                    {...cell.getCellProps()}
                                                >
                                                    {
                                                        pos == 0
                                                        ?<>
                                                            {
                                                                data_subsidiossi[posicion]
                                                                ?data_subsidiossi[posicion]['desplegado']
                                                                    ?<img onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarAbajo} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                                    :<img onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarDerecha} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                                :null
                                                            }
                                                            {cell.render("Cell")}
                                                        </>
                                                        :null
                                                    }
                                                </td>
                                            );
                                        })}
                                    </tr>



                                {
                                    data_subsidiossi[posicion]
                                    ?data_subsidiossi[posicion]['desplegado'] == true
                                    ?
                                    data_subsidiossi[posicion]['data'].map((dato) => {
                                        
                                        let mostrar = true

                                        if(clienteseleccionado != 0){
                                            if(clienteseleccionado == dato.cliid){
                                                mostrar = true
                                            }
                                        }else{
                                            mostrar = true
                                        }

                                        if(mostrarValidados == true){
                                            
                                            if(dato.sdestatus != null){
                                                mostrar = true
                                            }else{
                                                mostrar = false
                                            }
                                            
                                        }else{
                                            if(dato.sdestatus != null){
                                                mostrar = false
                                            }else{
                                                mostrar = true
                                            }
                                        }

                                        if(mostrar == true){
                                            if(mostrarAutomaticos == true){
                                                if(dato.sdesac == 0){
                                                    mostrar = true
                                                }else{
                                                    mostrar = false
                                                }
                                            }else{
                                                if(dato.sdesac == 1){
                                                    mostrar = true
                                                }else{
                                                    mostrar = false
                                                }
                                            }
                                        }

                                        return (
                                            mostrar == true
                                            ?<tr
                                                {...row.getRowProps()}
                                                style={
                                                    ComunesTipoDisenio == "Light"
                                                    ?{borderBottom: '1px solid #D7E8FF'}
                                                    :{borderBottom: '1px solid #1c1e21'}
                                                }
                                            >
                                                
                                                {row.cells.map((cell, pos) => {
                                                    return (
                                                        cell.column.id == "sdeterritorio"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.sdeterritorio}</td>
                                                        :cell.column.id == "clinombre"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.clinombre}</td>
                                                        :cell.column.id == "clisuchml"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.clisuchml}</td>
                                                        :cell.column.id == "sdesubcliente"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.sdesubcliente}</td>
                                                        :cell.column.id == "sdesector"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.sdesector}</td>
                                                        :cell.column.id == "prosku"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.prosku}</td>
                                                        :cell.column.id == "pronombre"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.pronombre}</td>
                                                        :cell.column.id == "sdemontoareconocerreal"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{textAlign: "-webkit-right"}}>
                                                            S/{<NumberFormat value={dato.sdemontoareconocerreal ?funFomratoDecimal(dato.sdemontoareconocerreal, 2) : 0} displayType={'text'} thousandSeparator={true} />}
                                                        </td>
                                                        :cell.column.id == "sumsfsvalorizado"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{textAlign: "-webkit-right"}}>
                                                            S/{<NumberFormat value={dato.sumsfsvalorizado ?funFomratoDecimal(dato.sumsfsvalorizado, 2) : 0} displayType={'text'} thousandSeparator={true} />}
                                                        </td>

                                                        :cell.column.id == "facturas"
                                                        ?<td 
                                                            className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C1EC0ED": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}
                                                            style={{cursor:'pointer'}} 
                                                            onClick={() => {
                                                                // console.log(dato)
                                                                props.seleccionarFacturas(dato)
                                                            }}>

                                                            <u>Facturas</u>
                                                        </td>

                                                        :cell.column.id == "fecfecha"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.fecfecha}</td>
                                                        
                                                        :cell.column.id == "sdependiente"
                                                        ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{display:'flex'}}>
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
                                                        :<td></td>
                                                    )
                                                })}
                                            </tr>
                                            :null
                                        )
                                    })
                                    :null
                                    :null
                                }

                                </>
                            );
                        })}


                    </tbody>
                </table>





                <Modal 
                    title={null} 
                    visible={mostrarModalFiltrosColumnas} 
                    footer={null}
                    centered
                    width="620px"
                    height= "407px"
                    bodyStyle={{
                        borderRadius: "8px"
                    }}
                    closeIcon={<img onClick={() =>setMostrarModalFiltrosColumnas(!mostrarModalFiltrosColumnas) } src={null}/>}
                    onCancel={() =>setMostrarModalFiltrosColumnas(!mostrarModalFiltrosColumnas) }
                >
                    <div
                        className="Wbold-S16-H19-C004FB8-L0015" 
                        style={{textAlign: "-webkit-center", marginBottom:'20px'}}>Filtros de Columnas</div>

                    <Row>
                        <Col xl={11}>
                            <div
                                className="Columnas-Mostradas-Filtro-Columnas"
                            >
                                <div className="Cabecera-Columnas-Mostradas-Filtro-Columnas">
                                    <div className="Wbold-S14-H19-C004FB8-L0015">Columnas</div>
                                    <div className="Wnormal-S11-H15-C706C64-L0015">Lista de columnas disponibles</div>
                                </div>
                                <div style={{overflow:'auto', width:'100%', height:'215px', marginTop:'10px'}}>
                                    {
                                        AgrupacionesColumnas_Subsidios_SI.map((agrupacion, posicion) => {
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
                                                        ?allColumns.map((column, posicion) => (
                                                            column.isVisible == false && column.cabeceraAgrupacion == agrupacion.cabeceraAgrupacion
                                                            ?<div key={column.id} style={{paddingLeft:'10px'}}>
                                                                <Checkbox  {...column.getToggleHiddenProps()}>
                                                                {/* <Checkbox > */}
                                                                    <span className="W600-S13-H17-C004FB8">{column.Homologado}</span>
                                                                </Checkbox>
                                                            </div>
                                                            :null
                                                        ))
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
                                    <div className="Wbold-S14-H19-C004FB8-L0015">Columnas a Mostrar</div>
                                    <div className="Wnormal-S11-H15-C706C64-L0015">Seleccionar las columnas que desea mostrar</div>
                                </div>
                                <div style={{overflow:'auto', width:'100%', height:'215px', marginTop:'10px', }}>
                                    
                                    {
                                        AgrupacionesColumnas_Subsidios_SI.map((agrupacion, posicion) => {
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
                                                        ?allColumns.map((column, posicion) => (
                                                            column.isVisible == true && column.cabeceraAgrupacion == agrupacion.cabeceraAgrupacion
                                                            ?<div key={column.id} style={{paddingLeft:'10px'}}>
                                                                <Checkbox  {...column.getToggleHiddenProps()}>
                                                                {/* <Checkbox > */}
                                                                    <span className="W400-S13-H17-C004FB8">{column.Homologado}</span>
                                                                </Checkbox>
                                                            </div>
                                                            :null
                                                        ))
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
                </Modal>

            </div>  
        </>
    )
}

export default TbSubSi
