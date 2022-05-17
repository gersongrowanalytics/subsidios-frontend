import React, { useMemo } from "react";
import { useTable, usePagination, useFilters} from "react-table";
// import MOCK_DATA from "./MOCK_DATA.json";
import {COLUMNS_SUBSO } from "./columns";
import Checkboxs from "./Checkbox";
import { ColumnFilter } from './ColumnFilter'
import { SelectColumnFilter} from './SelectColumnFilter'
import funFomratoDecimal from '../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import DataTablaSo from "../../../Componentes/SubsidiosSo/DataTablaSo";
import IconoCargando from '../../../Assets/Imagenes/Iconos/Comunes/cargando.svg'
import {useDispatch, useSelector} from "react-redux";
import {
    DesplegarSubsidiosSoReducer,
    SeleccionarSolicitanteReducer,
    DesplegarFiltroColumnaReducer,
    HabilitarEdicionBultosReducer,
    CambiarBultosReducer,
    CambiarBultosDTReducer
} from '../../../Redux/Actions/SubsidiosSo/SubsidiosSoFront'
import {
    AceptarCambioBultosReducer
} from '../../../Redux/Actions/SubsidiosSo/SubsidiosSo'
import IconoDesplegarAbajo from '../../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import { Row, Col, Modal, Checkbox, Spin } from 'antd'
import {
    CaretDownOutlined,
    CaretRightOutlined,
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    LoadingOutlined
} from '@ant-design/icons'
import {
    funPermisosObtenidos
} from '../../../Funciones/funPermiso'

export const Table = (props) => {
    const columns = useMemo(() => COLUMNS_SUBSO, []);
    const data = useMemo(() => props.MOCK_DATA, []);

    const {LoginUsuario} = useSelector(({login}) => login);

    const dispatch = useDispatch();
    const ComunesTipoDisenio = props.ComunesTipoDisenio
    const cargando_data_subsidiosso = props.cargando_data_subsidiosso
    const data_subsidiosso = props.data_subsidiosso
    const sumaValorizadoBultosAcordadosTotal = props.sumaValorizadoBultosAcordadosTotal
    const sumaValorizadoCantidadBultosTotalDT = props.sumaValorizadoCantidadBultosTotalDT
    const sumaValorizadoCantidadBultosTotal = props.sumaValorizadoCantidadBultosTotal
    const sumaValorizadoMontosReonocerTotalDT = props.sumaValorizadoMontosReonocerTotalDT
    const sumaValorizadoMontosReonocerTotal = props.sumaValorizadoMontosReonocerTotal
    const sumaValorizadosDiferenciasAhorrosSoles = props.sumaValorizadosDiferenciasAhorrosSoles
    const clienteseleccionado = props.clienteseleccionado
    const mostrarAutomaticos = props.mostrarAutomaticos
    const mostrarValidados = props.mostrarValidados
    const ComunesMostrarMenu = props.ComunesMostrarMenu
    const aplicarFiltrosAutomaticoValidado = props.aplicarFiltrosAutomaticoValidado
    const sumaValores = props.sumaValores
    const mostrarModalFiltrosColumnas = props.mostrarModalFiltrosColumnas
    const setMostrarModalFiltrosColumnas = props.setMostrarModalFiltrosColumnas
    const AgrupacionesColumnas_Subsidios_SO = props.AgrupacionesColumnas_Subsidios_SO


  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    // nextPage,
    // previousPage,
    // canPreviousPage,
    // canNextPage,
    // pageOptions,
    state,
    // gotoPage,
    // pageCount,
    // setPageSize,
    prepareRow,
    allColumns,
    // getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn
    },
    useFilters,
    usePagination,
    
  );
//   const { pageIndex, pageSize} = state;

  return (
    <>
            <div 
                style={{
                    overflowX:"auto", marginTop:'-10px',
                    boxShadow: "0px 0px 15px #D8DFE9", 
                }} id="Contenedor-Tabla-Subsidios-So"
            >
                <table 
                    {...getTableProps()}
                    className="table-responsive-subsidios-so Tabla-SubsidiosSo" 
                    style={{width:'100%'}}
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
                                            ?"Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8"
                                            :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }
                                        style={posicion == 0?{textAlignLast: "center",}:{textAlignLast: "center", zIndex:'1'}}
                                    >
                                        {column.render("Header")}
                                        {/* <div className="fields_filter">{column.canFilter ? column.render('Filter') : null}</div> */}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {
                        cargando_data_subsidiosso == true && data_subsidiosso.length == 0
                        ?null
                        :null
                    }
                    {
                        cargando_data_subsidiosso == true && data_subsidiosso.length == 0
                        // true == false
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
                        :<tbody {...getTableBodyProps()}>
                            {page.map((row, posicion) => {

                                const valorizadosCantidadBultos = data_subsidiosso[posicion]['data'].map(
                                    x => 
                                        x.sdebultosacido
                                        ?aplicarFiltrosAutomaticoValidado == true
                                            ?mostrarValidados == true
                                                ?x.sdestatus != null
                                                    ? mostrarAutomaticos == true
                                                        ?x.sdesac == 0
                                                            ?parseFloat(x.sdebultosacido) 
                                                            :0
                                                        :x.sdesac == 1
                                                            ?parseFloat(x.sdebultosacido) 
                                                            :0
                                                    :0
                                                :x.sdestatus != null
                                                    ?0
                                                    :mostrarAutomaticos == true
                                                        ?x.sdesac == 0
                                                            ?parseFloat(x.sdebultosacido) 
                                                            :0
                                                        :x.sdesac == 1
                                                            ?parseFloat(x.sdebultosacido) 
                                                            :0
                                            :parseFloat(x.sdebultosacido) 
                                        :0
                                    
                                )
                                
                                const valorizadosBultosAcordados = data_subsidiosso[posicion]['data'].map(
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

                                const valorizadoMontosReconocer = data_subsidiosso[posicion]['data'].map(
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

                                const valorizadoDiferenciaAhorroSoles = data_subsidiosso[posicion]['data'].map(
                                    y => 
                                        y.sdemontoareconocer
                                        ?aplicarFiltrosAutomaticoValidado == true
                                            ?mostrarValidados == true
                                                ?y.sdestatus != null
                                                    ? mostrarAutomaticos == true
                                                        ?y.sdesac == 0
                                                            ?parseFloat( y.sdemontoareconocer - y.sdemontoacido ) 
                                                            :0
                                                        :y.sdesac == 1
                                                            ?parseFloat( y.sdemontoareconocer - y.sdemontoacido ) 
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

                                // 

                                const cantidadBultosDT = data_subsidiosso[posicion]['data'].map(
                                    y => 
                                        y.sdecantidadbultos
                                        ?aplicarFiltrosAutomaticoValidado == true
                                            ?mostrarValidados == true
                                                ?y.sdestatus != null
                                                    ? mostrarAutomaticos == true
                                                        ?y.sdesac == 0
                                                            ?parseFloat(y.sdecantidadbultos ) 
                                                            :0
                                                        :y.sdesac == 1
                                                            ?parseFloat(y.sdecantidadbultos ) 
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

                                const valorizadoReconocimientoDT = data_subsidiosso[posicion]['data'].map(
                                    y => 
                                        y.sdemontoareconocer
                                        ?aplicarFiltrosAutomaticoValidado == true
                                            ?mostrarValidados == true
                                                ?y.sdestatus != null
                                                    ? mostrarAutomaticos == true
                                                        ?y.sdesac == 0
                                                            ?parseFloat(y.sdemontoareconocer ) 
                                                            :0
                                                        :y.sdesac == 1
                                                            ?parseFloat(y.sdemontoareconocer ) 
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

                                const sumaValorizadoCantidadBultos  = sumaValores(valorizadosCantidadBultos)
                                const sumaValorizadoBultosAcordados = sumaValores(valorizadosBultosAcordados)
                                const sumaValorizadoMontosReonocer  = sumaValores(valorizadoMontosReconocer)
                                const sumaValorizadoDiferenciaAhorroSoles  = sumaValores(valorizadoDiferenciaAhorroSoles)
                                const sumaCantidadBultosDT  = sumaValores(cantidadBultosDT)
                                const sumaValorizadoReconocimientoDT  = sumaValores(valorizadoReconocimientoDT)

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
                                                        :cell.column.id == "sdebultosacordados"
                                                        ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                            {<NumberFormat value={funFomratoDecimal(sumaValorizadoBultosAcordadosTotal, 0)} displayType={'text'} thousandSeparator={true} />}
                                                        </td>
                                                        :cell.column.id == "sdecantidadbultos"
                                                        ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                            {<NumberFormat value={funFomratoDecimal(sumaValorizadoCantidadBultosTotalDT, 0)} displayType={'text'} thousandSeparator={true} />}
                                                        </td>
                                                        :cell.column.id == "sdecantidadbultosreal"
                                                        ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                            {<NumberFormat value={funFomratoDecimal(sumaValorizadoCantidadBultosTotal, 0)} displayType={'text'} thousandSeparator={true} />}
                                                        </td>
                                                        :cell.column.id == "sdemontoareconocer"
                                                        ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                            S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoMontosReonocerTotalDT, 0)} displayType={'text'} thousandSeparator={true} />}
                                                        </td>
                                                        :cell.column.id == "sdemontoareconocerreal"
                                                        ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                            S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoMontosReonocerTotal, 0)} displayType={'text'} thousandSeparator={true} />}
                                                        </td>
                                                        :cell.column.id == "diferencia"
                                                        ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                            S/{<NumberFormat value={funFomratoDecimal(sumaValorizadosDiferenciasAhorrosSoles, 0)} displayType={'text'} thousandSeparator={true} />}
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
                                        >
                                            {row.cells.map((cell, pos) => {
                                                return (
                                                    cell.column.id == "sdebultosacordados"
                                                    ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                        {<NumberFormat value={funFomratoDecimal(sumaValorizadoBultosAcordados, 0)} displayType={'text'} thousandSeparator={true} />}
                                                    </td>
                                                    :cell.column.id == "sdecantidadbultos"
                                                    ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                        {<NumberFormat value={funFomratoDecimal(sumaCantidadBultosDT, 0)} displayType={'text'} thousandSeparator={true} />}
                                                    </td>
                                                    :cell.column.id == "sdecantidadbultosreal"
                                                    ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                        {<NumberFormat value={funFomratoDecimal(sumaValorizadoCantidadBultos, 0)} displayType={'text'} thousandSeparator={true} />}
                                                    </td>
                                                    :cell.column.id == "sdemontoareconocer"
                                                    ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                        S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoReconocimientoDT, 0)} displayType={'text'} thousandSeparator={true} />}
                                                    </td>
                                                    :cell.column.id == "sdemontoareconocerreal"
                                                    ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                        S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoMontosReonocer, 0)} displayType={'text'} thousandSeparator={true} />}
                                                    </td>
                                                    :cell.column.id == "diferencia"
                                                    ?<td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                                                        S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoDiferenciaAhorroSoles, 0)} displayType={'text'} thousandSeparator={true} />}
                                                    </td>
                                                    :<td 
                                                        style={
                                                            // zona.desplegado == true
                                                            data_subsidiosso[posicion]
                                                            ?data_subsidiosso[posicion]['desplegado']
                                                            // 0 == true
                                                            ? ComunesTipoDisenio == "Light"
                                                                ?{background:'white'}
                                                                :{background:'#565656'}
                                                            :{}
                                                            :{}
                                                        }
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ?"CFFFFFF Wbold-S13-H17-C004FB8"
                                                            :"Zona-Cuerpo-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                                        }
                                                        {...cell.getCellProps()}
                                                    >
                                                        {
                                                            pos == 0
                                                            ?<>
                                                                {
                                                                    data_subsidiosso[posicion]
                                                                    ?data_subsidiosso[posicion]['desplegado']
                                                                        ?<img onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarAbajo} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                                        :<img onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarDerecha} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                                    :null
                                                                }
                                                                {cell.render("Cell")}
                                                                {/* <button onClick={() => {
                                                                    console.log(row)
                                                                    console.log(cell)
                                                                    console.log(cell.column.id)
                                                                }}>click</button> */}
                                                            </>
                                                            :null
                                                        }
                                                    </td>
                                                );
                                            })}
                                        </tr>



                                    {
                                        data_subsidiosso[posicion]
                                        ?data_subsidiosso[posicion]['desplegado'] == true
                                        ?
                                        data_subsidiosso[posicion]['data'].map((dato, posicionData) => {
                                            let mostrar = true

                                            // if(clienteseleccionado != 0){
                                            //     if(clienteseleccionado == dato.cliid){
                                            //         mostrar = true
                                            //     }
                                            // }else{
                                            //     mostrar = true
                                            // }

                                            // if(mostrarValidados == true){
                                                
                                            //     if(dato.sdestatus != null){
                                            //         mostrar = true
                                            //     }else{
                                            //         mostrar = false
                                            //     }
                                                
                                            // }else{
                                            //     if(dato.sdestatus != null){
                                            //         mostrar = false
                                            //     }else{
                                            //         mostrar = true
                                            //     }
                                            // }

                                            // if(mostrar == true){
                                            //     if(mostrarAutomaticos == true){
                                            //         if(dato.sdesac == 0){
                                            //             mostrar = true
                                            //         }else{
                                            //             mostrar = false
                                            //         }
                                            //     }else{
                                            //         if(dato.sdesac == 1){
                                            //             mostrar = true
                                            //         }else{
                                            //             mostrar = false
                                            //         }
                                            //     }
                                            // }
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
                                                            ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.sdeterritorio}</td>
                                                            :cell.column.id == "clinombre"
                                                            ?<td 
                                                                className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} 
                                                                style={{position:'relative'}}
                                                            >
                                                                <div >{dato.clinombre}</div>
                                                                {/* <div style={{color:'white'}}>{dato.clinombre}</div> */}
                                                                {/* <div style={{position:'absolute', top:'5px'}}>
                                                                    {dato.clinombre}
                                                                </div> */}
                                                            </td>
                                                            :cell.column.id == "clisuchml"
                                                            ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.clisuchml}</td>
                                                            :cell.column.id == "sdesubcliente"
                                                            ?<td
                                                                style={{
                                                                    textAlignLast: "center"
                                                                }}
                                                                className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.sdesubcliente}</td>
                                                            :cell.column.id == "sdesector"
                                                            ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.sdesector}</td>
                                                            :cell.column.id == "prosku"
                                                            ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.prosku}</td>
                                                            :cell.column.id == "pronombre"
                                                            ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >{dato.pronombre}</td>
                                                            :cell.column.id == "sdebultosacordados"
                                                            ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{textAlign: "-webkit-right"}}>
                                                                {<NumberFormat value={dato.sdebultosacordados ?funFomratoDecimal(dato.sdebultosacordados, 2) : 0} displayType={'text'} thousandSeparator={true} />}
                                                            </td>
                                                            :cell.column.id == "sdecantidadbultos"
                                                            ?<td
                                                                className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} 
                                                                style={
                                                                    dato.editarbulto == true
                                                                    ?{textAlign: "-webkit-right"}
                                                                    :{
                                                                        textAlign: "-webkit-right",
                                                                        cursor:'pointer'
                                                                    }
                                                                }
                                                                onDoubleClick={() => dispatch(HabilitarEdicionBultosReducer(posicion, posicionData, true)) }
                                                                title={
                                                                    dato.editarbulto == true
                                                                    ?""
                                                                    :"Editar"
                                                                }
                                                            >
                                                                {/* {<NumberFormat value={dato.sdecantidadbultos ?funFomratoDecimal(dato.sdecantidadbultos, 2) : 0} displayType={'text'} thousandSeparator={true} />} */}

                                                                {
                                                                    
                                                                    <Spin
                                                                        spinning={dato.editandobulto ? dato.editandobulto : false}
                                                                        indicator={
                                                                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                                                                        }
                                                                    >
                                                                        {
                                                                            dato.editarbulto == true
                                                                            ?<>

                                                                                {
                                                                                    funPermisosObtenidos(
                                                                                        LoginUsuario.permisos,
                                                                                        "MODULO.SUBSIDIOS.SO.EDITAR.CANTIDAD.BULTOS.DT",
                                                                                        <input 
                                                                                            className="Input-Editar-Bultos-Subsidios-So"
                                                                                            type="number"
                                                                                            value={
                                                                                                dato.sdecantidadbultos ?dato.sdecantidadbultos : 0
                                                                                            }
                                                                                            onChange={(e) => dispatch(CambiarBultosDTReducer(posicion, posicionData, e.target.value))}
                                                                                        />
                                                                                    )
                                                                                }

                                                                                

                                                                                {/* <CheckCircleTwoTone 
                                                                                    size={10}
                                                                                    twoToneColor="#52c41a" 
                                                                                    style={{fontSize:'20px', marginLeft:'5px', cursor:'pointer'}}
                                                                                    title="Aceptar"
                                                                                    onClick={() => dispatch(AceptarCambioBultosReducer(posicion, posicionData))}
                                                                                />

                                                                                <CloseCircleTwoTone 
                                                                                    size={10}
                                                                                    twoToneColor="#D14527" 
                                                                                    style={{fontSize:'20px', marginLeft:'5px', cursor:'pointer'}}
                                                                                    onClick={() => dispatch(HabilitarEdicionBultosReducer(posicion, posicionData, false))}
                                                                                    title="Cancelar"
                                                                                /> */}

                                                                            </>
                                                                            :<>
                                                                            {<NumberFormat value={dato.sdecantidadbultos ?funFomratoDecimal(dato.sdecantidadbultos, 2) : 0} displayType={'text'} thousandSeparator={true} />} 
                                                                            </>
                                                                        }
                                                                    </Spin>
                                                                }
                                                            </td>
                                                            
                                                            
                                                            :cell.column.id == "sdecantidadbultosreal"
                                                            ?<td 
                                                                className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} 
                                                                style={
                                                                    dato.editarbulto == true
                                                                    ?{textAlign: "-webkit-right"}
                                                                    :{
                                                                        textAlign: "-webkit-right",
                                                                        cursor:'pointer'
                                                                    }
                                                                }
                                                                onDoubleClick={() => dispatch(HabilitarEdicionBultosReducer(posicion, posicionData, true)) }
                                                                title={
                                                                    dato.editarbulto == true
                                                                    ?""
                                                                    :"Editar"
                                                                }
                                                            >
                                                                <Spin
                                                                    spinning={dato.editandobulto ? dato.editandobulto : false}
                                                                    indicator={
                                                                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                                                                    }
                                                                >
                                                                    {
                                                                        dato.editarbulto == true
                                                                        ?<>
                                                                            <input 
                                                                                className="Input-Editar-Bultos-Subsidios-So"
                                                                                type="number"
                                                                                value={
                                                                                    dato.sdebultosacido ?dato.sdebultosacido : 0
                                                                                }
                                                                                onChange={(e) => dispatch(CambiarBultosReducer(posicion, posicionData, e.target.value))}
                                                                            />

                                                                                <CheckCircleTwoTone 
                                                                                    size={10}
                                                                                    twoToneColor="#52c41a" 
                                                                                    style={{fontSize:'20px', marginLeft:'5px', cursor:'pointer'}}
                                                                                    title="Aceptar"
                                                                                    onClick={() => dispatch(AceptarCambioBultosReducer(posicion, posicionData))}
                                                                                />

                                                                                <CloseCircleTwoTone 
                                                                                    size={10}
                                                                                    twoToneColor="#D14527" 
                                                                                    style={{fontSize:'20px', marginLeft:'5px', cursor:'pointer'}}
                                                                                    onClick={() => dispatch(HabilitarEdicionBultosReducer(posicion, posicionData, false))}
                                                                                    title="Cancelar"
                                                                                />

                                                                        </>
                                                                        :<>
                                                                        {<NumberFormat value={dato.sdebultosacido ?funFomratoDecimal(dato.sdebultosacido, 2) : 0} displayType={'text'} thousandSeparator={true} />} 
                                                                        </>
                                                                    }
                                                                </Spin>

                                                            </td>


                                                            :cell.column.id == "sdemontoareconocer"
                                                            ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{textAlign: "-webkit-right"}}>
                                                                S/{<NumberFormat value={dato.sdemontoareconocer ?funFomratoDecimal(dato.sdemontoareconocer, 2) : 0} displayType={'text'} thousandSeparator={true} />}
                                                            </td>


                                                            :cell.column.id == "sdemontoareconocerreal"
                                                            ?<td 
                                                                className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} 
                                                                style={{textAlign: "-webkit-right"}}
                                                            >
                                                                S/{<NumberFormat value={dato.sdemontoacido ?funFomratoDecimal(dato.sdemontoacido, 2) : 0} displayType={'text'} thousandSeparator={true} />}
                                                            </td>


                                                            :cell.column.id == "diferencia"
                                                            ?<td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{textAlign: "-webkit-right"}}>
                                                                S/{<NumberFormat value={funFomratoDecimal(dato.sdemontoareconocer - dato.sdemontoacido, 2)} displayType={'text'} thousandSeparator={true} />}
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
                    }
                </table>
            </div>

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

                <div
                    style={{
                        textAlign: "-webkit-center",
                        marginTop: "20px"
                    }}
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
                            setMostrarModalFiltrosColumnas(!mostrarModalFiltrosColumnas)
                        }}
                    >
                        Aceptar
                    </div>
                </div>

            </Modal>

        </>
    );
};
