import React, {useMemo} from 'react';
import { useTable, usePagination, useFilters} from "react-table";
import { Row, Col, Spin, Checkbox } from 'antd'
import funFomratoDecimal from '../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import {COLUMNAS_FACTURAS_ASIGNAR_SUBSIDIOS_PENDIENTES } from "./Columnas";
import FiltroTablaIluminado from '../../../Componentes/Elementos/Tabla/Filtros/FiltroTablaIluminado';
import {useSelector} from "react-redux";

const TbAsignarFacturas = (props) => {

    const {
        data_facturas_asignar_subpendientes_real,
        data_facturas_asignar_subpendientes
    } = useSelector(({subsidiosPendientes}) => subsidiosPendientes);

    const ComunesTipoDisenio = props.ComunesTipoDisenio
    
    const cargandoTabla = props.cargandoTabla
    const IconoCargando= props.IconoCargando
    const facturas= props.facturas
    

    const CambiarImpactoFacturaAsignada= props.CambiarImpactoFacturaAsignada
    const calcularNuevoObjetivo= props.calcularNuevoObjetivo

    const setFdsIdDetalleSeleccionado = props.setFdsIdDetalleSeleccionado
    const mostrarModalReconocimiento = props.mostrarModalReconocimiento
    const setMostrarModalReconocimiento = props.setMostrarModalReconocimiento

    
    

    const setProidSeleccionado = props.setProidSeleccionado
    const setPedidoOriginalSeleccionado = props.setPedidoOriginalSeleccionado
    const setMostrarModalNotasCredito = props.setMostrarModalNotasCredito
    const mostrarModalNotasCredito = props.mostrarModalNotasCredito

    // 

    const columns = useMemo(() => COLUMNAS_FACTURAS_ASIGNAR_SUBSIDIOS_PENDIENTES, []);
    const data = useMemo(() => props.facturas, []);

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
          initialState: { pageIndex: 0 }
        },
        useFilters,
        usePagination,
        
    );

    return (
        <>

            <div id="Contenedor-Filtros-Tabla-Subsidios-So" style={{paddingLeft:'40px', paddingRight:'40px'}}>
                <Row style={{width:'100%', marginLeft:'-40px', paddingLeft:'-40px'}}>

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_facturas_asignar_subpendientes_real}
                            campo = {"fecanionumero"}
                            titulo = {"Año"}
                            pertenenciaFiltros = {"SUBPENDIENTESFACTURAS"}
                            datalimpia = {true}
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
                            data_subsidiosso_real = {data_facturas_asignar_subpendientes_real}
                            campo = {"fecmesabreviacion"}
                            titulo = {"Mes"}
                            pertenenciaFiltros = {"SUBPENDIENTESFACTURAS"}
                            datalimpia = {true}
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
                            data_subsidiosso_real = {data_facturas_asignar_subpendientes_real}
                            campo = {"fecfecha"}
                            titulo = {"Fecha"}
                            pertenenciaFiltros = {"SUBPENDIENTESFACTURAS"}
                            datalimpia = {true}
                        />
                    </Col>
                    
                    <Col 
                        xl={4} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_facturas_asignar_subpendientes_real}
                            campo = {"fsidestinatario"}
                            titulo = {"Cod. Destinatario"}
                            pertenenciaFiltros = {"SUBPENDIENTESFACTURAS"}
                            datalimpia = {true}
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
                            data_subsidiosso_real = {data_facturas_asignar_subpendientes_real}
                            campo = {"fsisolicitante"}
                            titulo = {"Cod. Solicitante"}
                            pertenenciaFiltros = {"SUBPENDIENTESFACTURAS"}
                            datalimpia = {true}
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
                            data_subsidiosso_real = {data_facturas_asignar_subpendientes_real}
                            campo = {"fdsmaterial"}
                            titulo = {"Cod. Producto"}
                            pertenenciaFiltros = {"SUBPENDIENTESFACTURAS"}
                            datalimpia = {true}
                        />
                    </Col>


                </Row>
                
            </div>


            <div 
                style={{overflowX:"auto", marginTop:'30px', height:'450px', width:'100%'}}
                id="Contenedor-Tabla-Subsidios-So"
                
            >       
                <table 
                    {...getTableProps()}
                    className="table-responsive-subsidios-so Tabla-Modal-Asignar-Facturas-SubsidiosPendientes" style={{position:'relative', width:'100%'}}
                >
                    <thead 
                        className={ComunesTipoDisenio == "Light" ? "" : "C242526"}
                    >
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, posicion) => (
                                   <th 
                                        {...column.getHeaderProps()}
                                        style={{borderRadius: "23px 0px 0px 23px"}}
                                        className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8" 
                                        style={{zIndex:'1'}} 
                                    >
                                        {column.render("Header")}
                                        {/* <span {...column.getHeaderProps(column.getSortByToggleProps())}> 
                                            {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : '  ➖'}
                                        </span> */}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        {/* <tr>
                            <th 
                                {...column.getHeaderProps()}
                                style={{borderRadius: "23px 0px 0px 23px"}}
                                className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8" style={{zIndex:'1'}} >{column.render("Header")}</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Fecha<br/>Factura</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Factura SI</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Cod Producto </th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Descripción</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Valor Neto</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Notas Credito</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Liquidación S/<br/>(APP))</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Saldo<br/>Disponible</th>
                            <th className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Impacto</th>
                            <th 
                                style={{borderRadius: "0px 23px 0px 0px"}}
                                className="Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8">Nuevo Saldo</th>
                        </tr> */}
                    </thead>
                    
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, posicion) => {
                            prepareRow(row);
                            return(
                                <>
                                {
                                    posicion != 0
                                    ?null
                                    :cargandoTabla == true
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

                                    :data_facturas_asignar_subpendientes.map((factura, posicionFactura) => {

                                        return (
                                            factura.fdssaldo == 0
                                            ?null
                                            :<tr
                                                {...row.getRowProps()} 
                                                style={
                                                    ComunesTipoDisenio == "Light"
                                                    ?{borderBottom: '1px solid #D7E8FF'}
                                                    :{borderBottom: '1px solid #1c1e21'}
                                                }
                                            >
                                                {row.cells.map((cell, pos) => {
                                                    return (
                                                        cell.column.id == "elegir"
                                                        ?<td
                                                            style={{textAlign: "-webkit-center"}}
                                                        >
                                                            <Checkbox 
                                                                checked={factura.seleccionado}
                                                                className="checkbox-luminoso" onChange={()=>{}}></Checkbox>
                                                        </td>
                                                        :cell.column.id == "fecfecha"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "W600-S12-H16-C706C64"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {factura.fecfecha}
                                                        </td>
                                                        :cell.column.id == "cliclientegrupo"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "W600-S12-H16-C706C64"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {factura.cliclientegrupo}
                                                        </td>
                                                        :cell.column.id == "clicodigoshipto"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "W600-S12-H16-C706C64"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {factura.clicodigoshipto}
                                                        </td>
                                                        :cell.column.id == "fsifactura"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "W600-S12-H16-C706C64"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {factura.fsifactura}
                                                        </td>
                                                        :cell.column.id == "fdsmaterial"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "W600-S12-H16-C706C64"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {factura.prosku}
                                                        </td>
                                                        :cell.column.id == "pronombre"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "W600-S12-H16-C706C64"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }
                                                            {...cell.getCellProps()}
                                                        >
                                                                {factura.pronombre}
                                                                {/* {cell.render("Cell")} */}
                                                                {/* {factura.pronombre} */}
                                                        </td>
                                                        :cell.column.id == "fdsvalorneto"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "W600-S12-H16-C706C64"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                S/{<NumberFormat value={funFomratoDecimal(factura.fdsvalorneto, 2)} displayType={'text'} thousandSeparator={true} />}
                                                        </td>
                                                        :cell.column.id == "fdsnotacredito"
                                                        ?<td 
                                                            className="W600-S12-H16-C1EC0ED"
                                                            onClick={() => {
                                                                setProidSeleccionado(factura.proid)
                                                                setPedidoOriginalSeleccionado(factura.fsipedido)
                                                                setMostrarModalNotasCredito(!mostrarModalNotasCredito)
                                                            }}
                                                            style={{cursor:'pointer'}}
                                                        >
                                                            <u>S/{<NumberFormat value={funFomratoDecimal(factura.fdsnotacredito, 2)} displayType={'text'} thousandSeparator={true} />}</u>
                                                        </td>
                                                        :cell.column.id == "fdsreconocer"
                                                        ?<td 
                                                            className="W600-S12-H16-C1EC0ED"
                                                            onClick={() => {
                                                                setFdsIdDetalleSeleccionado(factura.fdsid)
                                                                setMostrarModalReconocimiento(!mostrarModalReconocimiento)
                                                            }}
                                                            style={{cursor:'pointer'}}
                                                        >
                                                            <u>S/{<NumberFormat value={funFomratoDecimal(factura.fdsreconocer, 2)} displayType={'text'} thousandSeparator={true} />}</u>
                                                        </td>
                                                        :cell.column.id == "fdssaldo"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "W600-S12-H16-C706C64"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                S/{<NumberFormat value={funFomratoDecimal(factura.fdssaldo, 2)} displayType={'text'} thousandSeparator={true} />}
                                                        </td>
                                                        :cell.column.id == "impacto"
                                                        ?<td>
                                                            <div 
                                                                className={
                                                                    parseFloat(factura.fdssaldo) < parseFloat(factura.impacto)
                                                                    ?"Input-Blanco-Negro-Tabla-Campo W600-S13-H17-CFF3742"
                                                                    :"Input-Blanco-Negro-Tabla-Campo W600-S12-H16-C706C64"
                                                                }
                                                                style={
                                                                    parseFloat(factura.fdssaldo) < parseFloat(factura.impacto)
                                                                    ?{border: "1px solid #FF3742", textAlignLast: "center"}
                                                                    :{textAlignLast: "center"}
                                                                }
                                                            >
                                                                <input 
                                                                    className="Input-Sin-Estilo-Tabla-Campo"
                                                                    type='number'
                                                                    onChange={
                                                                        async (e) => {
                                                                            // setObjetivo(objetivo - e.target.value)
                                                                            // console.log(posicionFactura)
                                                                            // console.log(e.target.value)
                                                                            // console.log(factura.fdsid)
                                                                            await CambiarImpactoFacturaAsignada(posicionFactura, e.target.value, factura.fdsid, factura.fsiid)
                                                                            calcularNuevoObjetivo()
                                                                        }
                                                                    }
                                                                    value={factura.impacto}
                                                                />
                                                            </div>
                                                        </td>
                                                        :cell.column.id == "nuevosaldo"
                                                        ?<td>
                                                            <div className="Input-Azul-Tabla-Campo W600-S12-H16-C706C64">
                                                                {
                                                                    factura.impacto
                                                                    ?<>
                                                                        S/<NumberFormat value={funFomratoDecimal(parseFloat(factura.fdssaldo) - parseFloat(factura.impacto), 2)} displayType={'text'} thousandSeparator={true} />
                                                                    </>
                                                                    :<>
                                                                        S/<NumberFormat value={funFomratoDecimal(parseFloat(factura.fdssaldo), 2)} displayType={'text'} thousandSeparator={true} />
                                                                    </>
                                                                }
                                                            </div>
                                                        </td>
                                                        :null
                                                    )
                                                })}
                                                

                                            </tr>
                                        )
                                    })
                                }
                                </>
                            )

                        })}
                    </tbody>

                    
                </table>
            </div>
        </>
    )
}

export default TbAsignarFacturas
