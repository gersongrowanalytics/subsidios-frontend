import React, {useEffect, useState, useMemo} from 'react'
import { Modal, Row, Col, Button, Checkbox } from 'antd';
import '../../../Estilos/Componentes/RegularzacionPagosSO/TablaRegularizacionPagosSO.css'
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {
    DesplegarFiltroColumnaReducer,
    CambiarImpactoFacturaAsignadaListaFacturasReducer,
} from '../../../Redux/Actions/SubsidiosPendientes/SubsidiosPendientesFront'

import {
    ObtenerFacturasRegularizacionesPagosSOReducer,
    AsignarFacturasRegularizacionReducer,
    EliminarFacturaAsignadaRegularizacionReducer
} from '../../../Redux/Actions/RegularzacionPagosSO/RegularzacionPagosSO'

import {
    DesplegarRegularizacionesPagosSOReducer,
    DesplegarRegularizacionPagosSOReducer
} from '../../../Redux/Actions/RegularzacionPagosSO/RegularzacionPagosSOFront'

import IconoDesplegarAbajo from '../../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import funFomratoDecimal from '../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import ModalAsignarFacturas from '../../../Componentes/SubsidiosPendientes/ModalAsignarFacturas';
import IconoEliminarAzul from '../../../Assets/Imagenes/Iconos/iconoEliminarAzul.png'
import IconoAgregarNaranja from '../../../Assets/Imagenes/Iconos/iconoAgregarNaranja.png'
import IconoCargando from '../../../Assets/Imagenes/Iconos/Comunes/cargando.svg'
import { useTable, usePagination, useFilters} from "react-table"
import {COLUMNS_SUBPENDIENTES } from "./columns";
import {
    CaretDownOutlined,
    CaretRightOutlined
} from '@ant-design/icons'

const TbRegularizacionPagosSO = (props) => {

    const columns = useMemo(() => COLUMNS_SUBPENDIENTES, []);
    const data = useMemo(() => props.MOCK_DATA, []);

    const dispatch = useDispatch();

    const data_regularizacion_pagos_so = props.data_regularizacion_pagos_so
    const cargando_eliminar_facturas_subsidiossipendientes = props.cargando_eliminar_facturas_subsidiossipendientes
    const cargando_asignar_facturas_subsidiossipendientes = props.cargando_asignar_facturas_subsidiossipendientes
    const cargando_tabla_facturas_asignar_subsidiospendientes = props.cargando_tabla_facturas_asignar_subsidiospendientes
    const mostrarModalFiltrosColumnas = props.mostrarModalFiltrosColumnas
    const setMostrarModalFiltrosColumnas = props.setMostrarModalFiltrosColumnas
    const AgrupacionesColumnas_Subsidios_Pendientes = props.AgrupacionesColumnas_Subsidios_Pendientes
    

    const ComunesTipoDisenio = props.ComunesTipoDisenio

    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [dataFacturaEliminar, setDataFacturaEliminar] = useState({});

    const sumaValores = (ns) => {
        let acumulado = 0
        for (let i = 0; i < ns.length; i ++ ){
            acumulado += ns[i]
        }

        return acumulado
    }

    const valorizadosMontoReconcerTotal = data_regularizacion_pagos_so.map(x => {
        const montosReconocer = x.data.map(
            y => 
                y.sdemontoacido
                ?parseFloat(y.sdemontoacido) 
                :0
        )
        return sumaValores(montosReconocer)
    })

    const sumaValorizadoMontosReonocerTotal = sumaValores(valorizadosMontoReconcerTotal)


    const valorizadosSubsidiadoTotal = data_regularizacion_pagos_so.map(x => {
        const valorizadoSubsidiado = x.data.map(y => {
            const valorizadoFacturas = y.facturas.map(
                z => z.sfsvalorizado
                ?parseFloat(z.sfsvalorizado) 
                :0
            )
            return sumaValores(valorizadoFacturas)
        })
        return sumaValores(valorizadoSubsidiado)
    })

    const sumaValorizadosSubsidiadoTotal = sumaValores(valorizadosSubsidiadoTotal)

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
        <div 
            style={{
                overflowX:"auto", 
                marginTop:'15px', 
                boxShadow: "0px 0px 15px #D8DFE9", 
                height:'500px'
            }} 
            id="Contenedor-Tabla-Subsidios-So"
            
        >       

            <Modal
                title={null}
                footer={null}
                visible={mostrarModalEliminar} 
                onOk={() => setMostrarModalEliminar(!mostrarModalEliminar)}
                onCancel={() => setMostrarModalEliminar(!mostrarModalEliminar)}
                width={"406px"}
                closeIcon={" "}
                className="Contenedor-Modal-Asignar-Facturas-Confirmacion"
                centered
            >

                <div 
                    style={{
                        textAlign: "-webkit-center"
                    }}
                    className="W600-S13-H17-C004FB8"
                >
                    ¿Está seguro que desea Eliminar factura seleccionadas?
                </div>

                <div style={{width:'100%', marginTop:'25px'}}>
                    <Row
                        style={{
                            display: "flex",
                        }}
                    >
                        <Col xl={12} style={{paddingRight: '10px', textAlign: "-webkit-right"}}>
                            <Button
                                id="Btn-Aceptar-Modal-Asignar-Facturas-Confirmacion"
                                className="W600-S13-H17-CFFFFFF"
                                onClick={async() => {
                                    await dispatch(EliminarFacturaAsignadaRegularizacionReducer(dataFacturaEliminar))
                                    setMostrarModalEliminar(!mostrarModalEliminar)
                                }}
                                loading={cargando_eliminar_facturas_subsidiossipendientes}
                            >
                                Aceptar
                            </Button>
                        </Col>

                        <Col 
                            xl={12} style={{paddingLeft: '10px'}}
                            onClick={() => setMostrarModalEliminar(!mostrarModalEliminar)}
                        >
                            <div className="W600-S13-H17-C004FB8-L0015 Btn-Cancelar-Modal-Asignar-Facturas-Confirmacion">
                                Cancelar
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>

            <table 
                className="table-responsive-subsidios-so Tabla-Subsidios-Pendientes" 
                style={{position:'relative' ,width:'100%'}}
                {...getTableProps()}
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
                                    style={{
                                        textAlignLast: "center"
                                    }}
                                > {column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>


                    {page.map((row, posicion) => {
                        

                        const valorizadoObjetivo = data_regularizacion_pagos_so[posicion]['data'].map(
                            y => 
                                y.sdemontoacido
                                ?parseFloat(y.sdemontoacido) 
                                :0
                        )

                        const sumaValorizadoObjetivo  = sumaValores(valorizadoObjetivo)

                        const valorizadoSubsidiado = data_regularizacion_pagos_so[posicion]['data'].map(y => {
                            const valorizadoFacturas = y.facturas.map(
                                z => z.sfsvalorizado
                                ?parseFloat(z.sfsvalorizado) 
                                :0
                            )

                            return sumaValores(valorizadoFacturas)
                        })

                        const sumaValorizadoSubsidiado  = sumaValores(valorizadoSubsidiado)

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
                                                    className={ComunesTipoDisenio == "Light" ? "Wbold-S13-H17-C004FB8" : "Wbold-S11-H20-Ce4e6eb"}
                                                    id="Total-Cuerpo-Tabla-Subsidios-So" 
                                                >
                                                    Grand Total
                                                </td>
                                                :cell.column.id == "reconocimientosacapp"
                                                ?<td 
                                                    className={ComunesTipoDisenio == "Light" ? "Wbold-S13-H17-C004FB8" : "Wbold-S11-H20-Ce4e6eb"}>
                                                        S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoMontosReonocerTotal, 0)} displayType={'text'} thousandSeparator={true} />}
                                                </td>
                                                :cell.column.id == "valorizadosubsidiado"
                                                ?<td 
                                                    className={ComunesTipoDisenio == "Light" ? "Wbold-S13-H17-C004FB8" : "Wbold-S11-H20-Ce4e6eb"}>
                                                        S/{<NumberFormat value={funFomratoDecimal(sumaValorizadosSubsidiadoTotal, 0)} displayType={'text'} thousandSeparator={true} />}
                                                </td>
                                                :cell.column.id == "liquidacionpendiente"
                                                ?<td 
                                                    className={ComunesTipoDisenio == "Light" ? "Wbold-S13-H17-C004FB8" : "Wbold-S11-H20-Ce4e6eb"}>
                                                        S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoMontosReonocerTotal - sumaValorizadosSubsidiadoTotal, 0)} displayType={'text'} thousandSeparator={true} />}
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
                                            cell.column.id == "items"
                                            ?<td
                                                style={
                                                    data_regularizacion_pagos_so[posicion]
                                                    ?data_regularizacion_pagos_so[posicion]['desplegado']
                                                    ? ComunesTipoDisenio == "Light"
                                                        ?{background:'white', textAlign: "-webkit-right"}
                                                        :{background:'#565656'}
                                                    :{textAlign: "-webkit-right"}
                                                    :{textAlign: "-webkit-right"}
                                                }
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"CFFFFFF Wbold-S13-H17-C004FB8"
                                                    :"Zona-Cuerpo-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                                }
                                            >
                                                {pos+1}
                                            </td>
                                            :cell.column.id == "reconocimientosacapp"
                                            ?<td
                                                style={
                                                    data_regularizacion_pagos_so[posicion]
                                                    ?data_regularizacion_pagos_so[posicion]['desplegado']
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
                                            >
                                                S/<NumberFormat value={funFomratoDecimal(sumaValorizadoObjetivo, 0)} displayType={'text'} thousandSeparator={true} />
                                            </td>
                                            :cell.column.id == "valorizadosubsidiado"
                                            ?<td
                                                style={
                                                    data_regularizacion_pagos_so[posicion]
                                                    ?data_regularizacion_pagos_so[posicion]['desplegado']
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
                                                onClick={() => console.log(sumaValorizadoSubsidiado)}
                                            >
                                                S/<NumberFormat value={funFomratoDecimal(sumaValorizadoSubsidiado, 0)} displayType={'text'} thousandSeparator={true} />
                                            </td>
                                            :cell.column.id == "liquidacionpendiente"
                                            ?<td
                                                style={
                                                    data_regularizacion_pagos_so[posicion]
                                                    ?data_regularizacion_pagos_so[posicion]['desplegado']
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
                                            >
                                                S/<NumberFormat value={funFomratoDecimal(sumaValorizadoObjetivo - sumaValorizadoSubsidiado, 0)} displayType={'text'} thousandSeparator={true} />
                                            </td>
                                            
                                            :cell.column.id == "fecanionumero"
                                            ?<td
                                                style={
                                                    data_regularizacion_pagos_so[posicion]
                                                    ?data_regularizacion_pagos_so[posicion]['desplegado']
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
                                                {cell.render("Cell")}
                                            </td>
                                            
                                            
                                            :<td 
                                                style={
                                                    data_regularizacion_pagos_so[posicion]
                                                    ?data_regularizacion_pagos_so[posicion]['desplegado']
                                                    ? ComunesTipoDisenio == "Light"
                                                        ?{background:'white'}
                                                        :{background:'#565656'}
                                                    // ?{ ?background:'#565656' :background:'#565656'}
                                                    :{}
                                                    :{}
                                                }
                                                // colSpan="13" 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ?"CFFFFFF Wbold-S13-H17-C004FB8"
                                                    :"Zona-Cuerpo-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                                }
                                                {...cell.getCellProps()}
                                            >
                                                {
                                                    pos == 1
                                                    ?<>
                                                        {
                                                            data_regularizacion_pagos_so[posicion]
                                                            ?data_regularizacion_pagos_so[posicion]['desplegado']
                                                                ?<img onClick={() => dispatch(DesplegarRegularizacionesPagosSOReducer(posicion))} src={IconoDesplegarAbajo} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                                :<img onClick={() => dispatch(DesplegarRegularizacionesPagosSOReducer(posicion))} src={IconoDesplegarDerecha} className="Icono-Flecha-Tabla-Subsidios-So" />
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
                                data_regularizacion_pagos_so[posicion]
                                ?data_regularizacion_pagos_so[posicion]['desplegado'] == true
                                ?
                                data_regularizacion_pagos_so[posicion]['data'].map((dato, posicionData) => {
                                    
                                    let mostrar = true

                                    const sumaValores = (ns) => {
                                        let acumulado = 0
                                        for (let i = 0; i < ns.length; i ++ ){
                                            acumulado += ns[i]
                                        }

                                        return acumulado
                                    }

                                    const valorizados = dato.facturas.map(x => x.sfsvalorizado ? parseFloat(x.sfsvalorizado) : 0)
                                    const sumaValorizado = sumaValores(valorizados)

                                    let objetivoSubsidiar = dato.sdemontoacido

                                    return (
                                        mostrar == true
                                        ?<>
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
                                                        cell.column.id == "clizona"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }
                                                            style={{textAlign: "right"}}
                                                        >
                                                            {
                                                                dato.desplegado == true
                                                                ?<img 
                                                                    onClick={() => dispatch(DesplegarRegularizacionPagosSOReducer(posicion, posicionData))} src={IconoDesplegarAbajo} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                                :<img 
                                                                    onClick={() => dispatch(DesplegarRegularizacionPagosSOReducer(posicion, posicionData))} src={IconoDesplegarDerecha} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                            }
                                                        </td>
                                                        :cell.column.id == "fecanionumero"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.fecanionumero}
                                                        </td>
                                                        :cell.column.id == "fecmesabreviacion"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.fecmesabreviacion}
                                                        </td>
                                                        :cell.column.id == "sdeterritorio"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.clitv}
                                                        </td>
                                                        :cell.column.id == "clinombre"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.clihml}
                                                        </td>
                                                        :cell.column.id == "clisuchml"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.clisuchml}
                                                        </td>
                                                        :cell.column.id == "sderucsubcliente"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.sderucsubcliente}
                                                        </td>
                                                        :cell.column.id == "sdesubcliente"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.sdesubcliente}
                                                        </td>
                                                        :cell.column.id == "sdesector"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.cosnombre}
                                                        </td>
                                                        :cell.column.id == "prosku"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.prosku}
                                                        </td>
                                                        :cell.column.id == "pronombre"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {dato.pronombre}
                                                        </td>

                                                        :cell.column.id == "reconocimientosacapp"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                S/{<NumberFormat 
                                                                    value={
                                                                        funFomratoDecimal(
                                                                            dato.sdemontoacido, 0
                                                                        )
                                                                    }
                                                                    displayType={'text'} 
                                                                    thousandSeparator={true} 
                                                                />}
                                                        </td>

                                                        :cell.column.id == "valorizadosubsidiado"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {
                                                                    dato.facturas.length > 0 
                                                                    ?<>
                                                                        S/{<NumberFormat 
                                                                            value={
                                                                                funFomratoDecimal(sumaValorizado, 0)
                                                                            } 
                                                                            displayType={'text'} 
                                                                            thousandSeparator={true} 
                                                                        />}
                                                                    </> 
                                                                    :<>
                                                                        S/{<NumberFormat 
                                                                                value={
                                                                                    funFomratoDecimal(0, 0)
                                                                                } 
                                                                                displayType={'text'} 
                                                                                thousandSeparator={true} 
                                                                            />}
                                                                    </>
                                                                }
                                                        </td>
                                                        :cell.column.id == "liquidacionpendiente"
                                                        ?<td 
                                                            className={
                                                                ComunesTipoDisenio == "Light"
                                                                ? "Wbold-S13-H17-C004FB8"
                                                                : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                            }>
                                                                {
                                                                    dato.facturas.length > 0 
                                                                    ?<>
                                                                        S/{<NumberFormat 
                                                                            value={
                                                                                funFomratoDecimal(dato.sdemontoacido - sumaValorizado, 0)
                                                                            } 
                                                                            displayType={'text'} 
                                                                            thousandSeparator={true} 
                                                                        />}
                                                                    </> 
                                                                    :<>
                                                                        S/{<NumberFormat 
                                                                                value={
                                                                                    funFomratoDecimal(dato.sdemontoacido, 0)
                                                                                } 
                                                                                displayType={'text'} 
                                                                                thousandSeparator={true} 
                                                                            />}
                                                                    </>
                                                                }
                                                        </td>
        
                                                        :cell.column.id == "estadoSubPendientes"
                                                        ?<td>
                                                            {/* <div style={{width:'20px', height:'20px', background:'green', cursor:'pointer'}}></div> */}
                                                            <ModalAsignarFacturas
                                                                cargando_tabla_facturas_asignar_subsidiospendientes = {cargando_tabla_facturas_asignar_subsidiospendientes}
                                                                IconoCargando = {IconoCargando}
                                                                
                                                                ComunesTipoDisenio = {ComunesTipoDisenio}
                                                                obtenerFacturasAsignadas = {
                                                                    () => {
                                                                        dispatch(ObtenerFacturasRegularizacionesPagosSOReducer(posicion, posicionData, dato.sdecodigodestinatario))
                                                                    }
                                                                }
                                                                facturas = {dato.facturasasignar?dato.facturasasignar :[] }

                                                                CambiarImpactoFacturaAsignada = {
                                                                    // (posicionFactura, impacto) => dispatch(CambiarImpactoFacturaAsignadaReducer(posicion, posicionData, posicionFactura, impacto))
                                                                    (posicionFactura, impacto, fdsid, fsiid) => dispatch(CambiarImpactoFacturaAsignadaListaFacturasReducer(posicion, posicionData, posicionFactura, impacto, fdsid, fsiid))
                                                                }

                                                                objetivo = {parseFloat(dato.sdemontoacido) - parseFloat(sumaValorizado)}

                                                                asignarFacturas = {
                                                                    () => {
                                                                        dispatch(AsignarFacturasRegularizacionReducer(dato.sdeid, dato.sdemontoacido, dato.facturasasignar))
                                                                    }
                                                                }

                                                                cargando_asignar_facturas_subsidiossipendientes = {cargando_asignar_facturas_subsidiossipendientes}
                                                            />
                                                        </td>
                                                        :<td></td>
                                                    )
                                                })}
                                            </tr>

                                            {

                                                

                                                dato.desplegado == true
                                                ?dato.facturas.map((factura, posicionFacturaAsignada) => {

                                                    objetivoSubsidiar = objetivoSubsidiar - factura.sfsvalorizado

                                                    return (
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
                                                                    cell.column.id == "sdeterritorio"
                                                                    ?<td 
                                                                        className={
                                                                            ComunesTipoDisenio == "Light"
                                                                            ? "W600-S12-H16-C706C64"
                                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                        }>
                                                                            {dato.clitv}
                                                                    </td>
                                                                    :cell.column.id == "clinombre"
                                                                    ?<td 
                                                                        className={
                                                                            ComunesTipoDisenio == "Light"
                                                                            ? "W600-S12-H16-C706C64"
                                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                        }>
                                                                            {dato.clihml}
                                                                    </td>
                                                                    :cell.column.id == "clisuchml"
                                                                    ?<td 
                                                                        className={
                                                                            ComunesTipoDisenio == "Light"
                                                                            ? "W600-S12-H16-C706C64"
                                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                        }>
                                                                            {dato.clisuchml}
                                                                    </td>
                                                                    :cell.column.id == "sdesubcliente"
                                                                    ?<td 
                                                                        className={
                                                                            ComunesTipoDisenio == "Light"
                                                                            ? "W600-S12-H16-C706C64"
                                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                        }>
                                                                            {dato.sdesubcliente}
                                                                    </td>
                                                                    :cell.column.id == "sderucsubcliente"
                                                                    ?<td 
                                                                        className={
                                                                            ComunesTipoDisenio == "Light"
                                                                            ? "W600-S12-H16-C706C64"
                                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                        }>
                                                                            {dato.sderucsubcliente}
                                                                    </td>
                                                                    :cell.column.id == "sdesector"
                                                                    ?<td 
                                                                        className={
                                                                            ComunesTipoDisenio == "Light"
                                                                            ? "W600-S12-H16-C706C64"
                                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                        }>
                                                                            {factura.coscodigo + " "+ factura.cosnombre}
                                                                    </td>
                                                                    :cell.column.id == "prosku"
                                                                    ?<td 
                                                                        className={
                                                                            ComunesTipoDisenio == "Light"
                                                                            ? "W600-S12-H16-C706C64"
                                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                        }>
                                                                            {factura.fdsmaterial}
                                                                    </td>
                                                                    :cell.column.id == "pronombre"
                                                                    ?<td 
                                                                        className={
                                                                            ComunesTipoDisenio == "Light"
                                                                            ? "W600-S12-H16-C706C64"
                                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                        }>
                                                                            {factura.pronombre}
                                                                    </td>
                                                                    :cell.column.id == "reconocimientosacapp"
                                                                    ?<td 
                                                                        style={
                                                                            dato.facturas.length == posicionFacturaAsignada+1
                                                                            ?{color:'red'}
                                                                            :{}
                                                                        }
                                                                        className={
                                                                            ComunesTipoDisenio == "Light"
                                                                            ? "W600-S12-H16-C706C64"
                                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                        }>
                                                                            {/* S/{<NumberFormat value={funFomratoDecimal(factura.sfsdiferenciaobjetivo, 2)} displayType={'text'} thousandSeparator={true} />} */}
                                                                            S/{<NumberFormat value={funFomratoDecimal(objetivoSubsidiar, 2)} displayType={'text'} thousandSeparator={true} />}
                                                                    </td>
                                                                    :cell.column.id == "facturaimpactar"
                                                                    ?<td>
                                                                        <div className="Input-Blanco-Negro-Tabla-Campo W600-S12-H16-C706C64">
                                                                            {factura.fsifactura}
                                                                        </div>
                                                                    </td>
                                                                    :cell.column.id == "fechafactura"
                                                                    ?<td>
                                                                        <div className="Input-Azul-Tabla-Campo W600-S12-H16-C706C64">
                                                                            {factura.fecfecha}
                                                                        </div>
                                                                    </td>
                                                                    :cell.column.id == "valorizadosubsidiado"
                                                                    ?<td>
                                                                        <div className="Input-Azul-Tabla-Campo W600-S12-H16-C706C64">
                                                                            S/{<NumberFormat value={funFomratoDecimal(factura.sfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}
                                                                        </div>
                                                                    </td>
                                                                    :cell.column.id == "liquidacionpendiente"
                                                                    ?<td>
                                                                        <div className="Input-Azul-Tabla-Campo W600-S12-H16-C706C64">
                                                                            S/{<NumberFormat value={funFomratoDecimal(objetivoSubsidiar - factura.sfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}
                                                                        </div>
                                                                    </td>
                                                                    :cell.column.id == "estadoSubPendientes"
                                                                    ?<td>
                                                                        <div
                                                                            onClick={
                                                                                () => {
                                                                                    setDataFacturaEliminar({
                                                                                        "sfsid" : factura.sfsid,
                                                                                        "fdsid" : factura.fdsid,
                                                                                    })
                                                                                    setMostrarModalEliminar(!mostrarModalEliminar)
                                                                                }
                                                                            }
                                                                            style={{width:'20px', height:'20px',  cursor:'pointer'}}>
                                                                                <img src={IconoEliminarAzul}  width="20px"/>
                                                                            </div>
                                                                    </td>
                                                                    :<td></td>
                                                                )
                                                            })}                                                            
                                                            
                                                            
                                                            
                                                            
                                                            {/* <td></td> */}
                                                            {/* <td>{factura.fsifactura}</td> */}
                                                        </tr>
                                                    )
                                                })
                                                :null
                                            }
                                        
                                        </>
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
                                    AgrupacionesColumnas_Subsidios_Pendientes.map((agrupacion, posicion) => {
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
                                    AgrupacionesColumnas_Subsidios_Pendientes.map((agrupacion, posicion) => {
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
    )
}

export default TbRegularizacionPagosSO
