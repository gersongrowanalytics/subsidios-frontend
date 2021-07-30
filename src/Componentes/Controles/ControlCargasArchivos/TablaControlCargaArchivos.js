import React from 'react'
import '../../../Estilos/Componentes/Controles/ControlCargasArchivos/TablaControlCargaArchivos.css'

const TablaControlCargaArchivos = () => {

    let arrayArchivos = [
        {
            titulo : "VENTAS",
            archivos: [
                {
                    nombre : "base de datos 1 VENTAS",
                    responsable : "Pedro Espinoza",
                    fechaCargaProgramada : "12 de Abril del 2021",
                    fechaCargaReal : "14 de Abril del 2021",
                    fechaActividad : "15 de Abril del 2021",
                    diaRetraso : "0 días"
                },
                {
                    nombre : "base de datos 2 VENTAS",
                    responsable : "Pedro Espinoza",
                    fechaCargaProgramada : "12 de Abril del 2021",
                    fechaCargaReal : "14 de Abril del 2021",
                    fechaActividad : "15 de Abril del 2021",
                    diaRetraso : "0 días"
                }
            ]
        },
    
        {
            titulo : "Revenue",
            archivos: [
                {
                    nombre : "base de datos 1",
                    responsable : "Pedro Espinoza",
                    fechaCargaProgramada : "12 de Abril del 2021",
                    fechaCargaReal : "14 de Abril del 2021",
                    fechaActividad : "15 de Abril del 2021",
                    diaRetraso : "0 días"
                },
                {
                    nombre : "base de datos 2",
                    responsable : "Pedro Espinoza",
                    fechaCargaProgramada : "12 de Abril del 2021",
                    fechaCargaReal : "14 de Abril del 2021",
                    fechaActividad : "15 de Abril del 2021",
                    diaRetraso : "0 días"
                }
            ]
        },

        {
            titulo : "SAC",
            archivos: [
                {
                    nombre : "base de datos 1",
                    responsable : "Pedro Espinoza",
                    fechaCargaProgramada : "12 de Abril del 2021",
                    fechaCargaReal : "14 de Abril del 2021",
                    fechaActividad : "15 de Abril del 2021",
                    diaRetraso : "0 días"
                },
                {
                    nombre : "base de datos 2",
                    responsable : "Pedro Espinoza",
                    fechaCargaProgramada : "12 de Abril del 2021",
                    fechaCargaReal : "14 de Abril del 2021",
                    fechaActividad : "15 de Abril del 2021",
                    diaRetraso : "0 días"
                }
            ]
        },

        {
            titulo : "Sistemas",
            archivos: [
                {
                    nombre : "base de datos 1",
                    responsable : "Pedro Espinoza",
                    fechaCargaProgramada : "12 de Abril del 2021",
                    fechaCargaReal : "14 de Abril del 2021",
                    fechaActividad : "15 de Abril del 2021",
                    diaRetraso : "0 días"
                },
                {
                    nombre : "base de datos 2",
                    responsable : "Pedro Espinoza",
                    fechaCargaProgramada : "12 de Abril del 2021",
                    fechaCargaReal : "14 de Abril del 2021",
                    fechaActividad : "15 de Abril del 2021",
                    diaRetraso : "0 días"
                }
            ]
        },
    ]

    return (
        // "overflow-x:auto"
        <div style={{overflowX:'auto'}}>
            <table id="Tabla-ControlCargaArchivos">
                <thead>
                    <tr>
                        <th>ÁREAS</th>
                        <th>BASE DE DATOS</th>
                        <th>RESPONSABLE</th>
                        <th>FECHA DE CARGA PROGRAMADO </th>
                        <th>FECHA DE CARGA REAL</th>
                        <th>FECHA DE ACTUALIZACIÓN</th>
                        <th>DÍA DE RETRASO</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrayArchivos.map((tipoArchivo) => {
                            return(
                                <>
                                    {
                                        tipoArchivo.archivos.map((archivo, posicionArchivo) => {
                                            return (
                                                <tr style={{paddingBottom:'20px'}}>
                                                    {
                                                        posicionArchivo == 0
                                                        ?<td rowspan={tipoArchivo.archivos.length}>
                                                            {tipoArchivo.titulo + "("+tipoArchivo.archivos.length+") posicion:"+posicionArchivo}
                                                        </td>
                                                        :null
                                                    }
                                                    <td>
                                                        {archivo.nombre}
                                                    </td>
                                                    <td>
                                                        {archivo.responsable}
                                                    </td>
                                                    <td>
                                                        {archivo.fechaCargaProgramada}
                                                    </td>
                                                    <td>
                                                        {archivo.fechaCargaReal}
                                                    </td>
                                                    <td>
                                                        {archivo.fechaActividad}
                                                    </td>
                                                    <td>
                                                        {archivo.diaRetraso}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr><td style={{paddingBottom:'15px'}}></td></tr>
                                </>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <div style={{margin:'28px'}} />
                </tfoot>
            </table>
        </div>
    )
}

export default TablaControlCargaArchivos
