import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerRegularizacionPagosSoReducer
} from '../../Redux/Actions/RegularzacionPagosSO/RegularzacionPagosSO'
// import { COLUMNAS } from "./Columna";
import { useTable, usePagination, useFilters, useExpanded, useGroupBy, useSortBy} from "react-table";
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import IconoAgregarNaranja from '../../Assets/Imagenes/Iconos/iconoAgregarNaranja.png'

const TbRegularizacionSO = (props) => {

    // COLUMNASs
    const COLUMNAS = [
        {
            Header: 'Item',
            accessor: '',
            disableFilters: true,
        },
        {
            Header: 'Año',
            accessor: 'fecanionumero',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique tcanombre`,
        },
        {
            Header: 'Mes',
            accessor: 'fecmesabreviacion',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique usuusuario`,
        },
        {
            Header: 'Zona',
            accessor: 'clizona',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Zona`,
        },
        {
            Header: 'Territorio',
            accessor: 'clitv',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Territorio`,
        },
        {
            Header: 'Cliente',
            accessor: 'clihml',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Cliente`,
        },
        {
            Header: 'Sucursal',
            accessor: 'clisuchml',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Sucursal`,
        },
        {
            Header: 'RUC Sub Cliente',
            accessor: 'sderucsubcliente',
            aggregate: 'average',
            Aggregated: ({ value }) => `${value} Unique RUC Sub Cliente`,
        },

        {
            Header: 'Sector',
            accessor: 'cosnombre',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Sector`,
        },

        {
            Header: 'Cod Producto',
            accessor: 'prosku',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Cod Producto`,
        },

        {
            Header: 'Nombre Producto',
            accessor: 'pronombre',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Nombre Producto`,
        },
        {
            Header: 'Monto (S/IGV Softys)',
            accessor: 'sdemontoacido',
            aggregate: 'uniqueCount',
            Cell: ({ value }) => {
                return (
                    <>
                        S/<NumberFormat value={funFomratoDecimal(value, 0)} displayType={'text'} thousandSeparator={true} />
                    </>
                )
            },//
            Aggregated: ({ value }) => `${value} Unique Cod Producto`,
        },

        {
            Header: 'Liquidación (S/IGV Softys)',
            accessor: 'sumsfsvalorizado',
            aggregate: 'uniqueCount',
            Cell: ({ value }) => {
                return (
                    <>
                        S/<NumberFormat value={funFomratoDecimal(value, 0)} displayType={'text'} thousandSeparator={true} />
                    </>
                )
            },//
            Aggregated: ({ value }) => `${value} Unique Cod Producto`,
        },

        {
            Header: 'Liquidación Pendiente',
            accessor: '',
            aggregate: 'uniqueCount',
            Cell: row => {
                return (
                  <>
                    S/<NumberFormat value={funFomratoDecimal(row.row.original.sdemontoacido - row.row.original.sumsfsvalorizado, 0)} displayType={'text'} thousandSeparator={true} />
                  </>
                )
            },
            Aggregated: ({ value }) => `${value} Unique Cod Producto`,
        },

        {
            Header: 'Opciones',
            accessor: '',
            aggregate: 'uniqueCount',
            Cell: row => {
                return (
                  <>
                    <img 
                        src={IconoAgregarNaranja} 
                        style={{
                            width:'25px',
                            cursor:'pointer'
                        }}
                    />
                  </>
                )
            },
            Aggregated: ({ value }) => `${value} Unique Cod Producto`,
        },
    ]

    const dispatch = useDispatch()
    const ComunesTipoDisenio = props.ComunesTipoDisenio

    const {
        cargando_tabla_regularizacion_pagos_so,
        data_regularizacion_pagos_so,
        data_regularizacion_pagos_so_real,
        descargable_regularizacion_pagos_so_real,
        filtros_tabla_regularizacion_pagos_so
    } = useSelector(({regularzacionPagosSO}) => regularzacionPagosSO);

    useEffect(() => {
        setdata(data_regularizacion_pagos_so)
    }, data_regularizacion_pagos_so)

    useEffect(() => {
        cargarDatosTabla()
    }, [])

    const columns = useMemo(() => COLUMNAS, data_regularizacion_pagos_so);
    const [data, setdata] = useState([]);

    const cargarDatosTabla = ()=>{
        dispatch(ObtenerRegularizacionPagosSoReducer())
        // setdata(data_regularizacion_pagos_so)
        setAllFilters([])
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        allColumns,
        setAllFilters,
        getToggleHideAllColumnsProps,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination
    );
    const { pageIndex, pageSize } = state;

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
                    className="table-responsive-subsidios-so Tabla-SubsidiosSi" 
                    style={{position:'relative', width:'100%'}}
                    {...getTableProps()}
                >
                    <thead
                        className={
                            ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"
                        }
                    >
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                <th 
                                    {...column.getHeaderProps()}
                                    className={
                                        ComunesTipoDisenio == "Light"
                                        ?"Th-Tabla-Subsidios-So Wbold-S10-H20-CFFFFFF C004FB8"
                                        :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                    }
                                    style={0 == 0?{textAlignLast: "center"}:{textAlignLast: "center", zIndex:'1'}}
                                >
                                    {column.canGroupBy ? (
                                    <span {...column.getGroupByToggleProps()}>
                                        {column.isGrouped ? "🛑 " : "👊 "}
                                    </span>
                                    ) : null}
                                    {column.render("Header")}
                                    <span {...column.getHeaderProps(column.getSortByToggleProps())}> 
                                    {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : '  ➖'}
                                    </span>
                                    {/* <div className="fields_filter">
                                    {column.canFilter ? column.render("Filter") : null}
                                    </div> */}
                                </th>
                                ))}
                            </tr>
                        ))}

                    </thead>
                    <tbody
                        {...getTableBodyProps()}
                    >
                        <tr
                            className={
                                ComunesTipoDisenio == "Light" 
                                ? "CEDF0FA Wbold-S13-H17-C004FB8" : "C2d2d2e Wbold-S11-H20-Ce4e6eb"
                            }
                        >
                            <td 
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {
                            page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr 
                                        {...row.getRowProps()}
                                        style={
                                            ComunesTipoDisenio == "Light"
                                            ?{borderBottom: '1px solid #D7E8FF'}
                                            :{borderBottom: '1px solid #1c1e21'}
                                        }
                                    >
                                        {
                                            row.cells.map((cell) => {
                                                return(
                                                    <td
                                                        {...cell.getCellProps()}
                                                        style={{textAlign: "-webkit-right"}}
                                                        className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}
                                                    >
                                                        {
                                                            cell.isGrouped 
                                                            ? (
                                                                    <>
                                                                        <span {...row.getToggleRowExpandedProps()}>
                                                                            {row.isExpanded ? "👇" : "👉"}
                                                                        </span>{" "}
                                                                        {cell.render("Cell")} ({row.subRows.length})
                                                                    </>
                                                            ) 
                                                            : cell.isAggregated 
                                                                ? (
                                                                    cell.render("Aggregated")
                                                                ) 
                                                                : cell.isPlaceholder 
                                                                    ? null 
                                                                    : (
                                                                        cell.render("Cell")
                                                                    )
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TbRegularizacionSO
