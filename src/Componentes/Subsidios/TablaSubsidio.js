import React from 'react'
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import '../../Estilos/Componentes/Subsidios/TablaSubsidio.css'

const TablaSubsidio = () => {

    let arrayColumnas = [
        {
            "titulo" : "NORTE",
            "mostrando" : false,
            "contenido" : [
                {
                    "zona"         : "NORTE",
                    "territorio"   : "COMISIONISTA",
                    "cliente"      : "COMISIONISTA",
                    "subCliente"   : "CHARLOTE SAC",
                    "categoria"    : "CHARLOTE SAC",
                    "codProducto"  : "PROD-000001929",
                    "nombProducto" : "NOBLE 2HOJA"
    
                }
            ]
        },
        {
            "titulo" : "SUR",
            "mostrando" : true,
            "contenido" : [
                {
                    "zona"         : "NORTE",
                    "territorio"   : "COMISIONISTA",
                    "cliente"      : "COMISIONISTA",
                    "subCliente"   : "CHARLOTE SAC",
                    "categoria"    : "CHARLOTE SAC",
                    "codProducto"  : "PROD-000001929",
                    "nombProducto" : "NOBLE 2HOJA"
    
                }
            ]
        },
        {
            "titulo" : "LIMA",
            "mostrando" : false,
            "contenido" : [
                {
                    "zona"         : "NORTE",
                    "territorio"   : "COMISIONISTA",
                    "cliente"      : "COMISIONISTA",
                    "subCliente"   : "CHARLOTE SAC",
                    "categoria"    : "CHARLOTE SAC",
                    "codProducto"  : "PROD-000001929",
                    "nombProducto" : "NOBLE 2HOJA"
    
                }
            ]
        },
        {
            "titulo" : "ESTE",
            "mostrando" : false,
            "contenido" : [
                {
                    "zona"         : "NORTE",
                    "territorio"   : "COMISIONISTA",
                    "cliente"      : "COMISIONISTA",
                    "subCliente"   : "CHARLOTE SAC",
                    "categoria"    : "CHARLOTE SAC",
                    "codProducto"  : "PROD-000001929",
                    "nombProducto" : "NOBLE 2HOJA"
    
                }
            ]
        }
    ]

    return (
        <div style={{overflowX:'auto'}}>
            <table id="Contenedor-TablaSubsidio">
                <thead id="Cabecera-TablaSubsidio">
                    <tr>
                        <th id="Titulo-Cabecera-TablaSubsidio">ZONA</th>
                        <th id="Titulo-Cabecera-TablaSubsidio">TERRITORIO</th>
                        <th id="Titulo-Cabecera-TablaSubsidio">CLIENTE</th>
                        <th id="Titulo-Cabecera-TablaSubsidio">SUB CLIENTE </th>
                        <th id="Titulo-Cabecera-TablaSubsidio">CATEGORÍA</th>
                        <th id="Titulo-Cabecera-TablaSubsidio">COD PRODUCTO</th>
                        <th id="Titulo-Cabecera-TablaSubsidio">NOMBRE PROCUC.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="Total-TablaSubsidio">
                        <div id="Texto-Total-TablaSubsidio">TOTAL</div>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td id="Texto-Total-TablaSubsidio"><br/></td>
                    </tr>
                    {
                        arrayColumnas.map((zona, posicionZona) => {
                            return (
                                <>
                                    <tr id="Agrupado-TablaSubsidio">
                                        <div id="Texto-Agrupado-TablaSubsidio">
                                            {
                                                zona.mostrando == true
                                                ?<DownOutlined id="Icono-Agrupado-TablaSubsidio" /> 
                                                :<RightOutlined id="Icono-Agrupado-TablaSubsidio" /> 
                                            }
                                            {zona.titulo}
                                        </div>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td id="Texto-Agrupado-TablaSubsidio" onClick={() => console.log(zona.contenido)}>TOTAL</td>
                                    </tr>
                                    {
                                        zona.mostrando == true
                                        ?zona.contenido.map((contenido) => {
                                            return (
                                                <tr>
                                                    <td id="Texto-Contenido-TablaSubsidio">{contenido.zona}</td>
                                                    <td id="Texto-Contenido-TablaSubsidio">{contenido.territorio}</td>
                                                    <td id="Texto-Contenido-TablaSubsidio">{contenido.cliente}</td>
                                                    <td id="Texto-Contenido-TablaSubsidio">{contenido.subCliente}</td>
                                                    <td id="Texto-Contenido-TablaSubsidio">{contenido.categoria}</td>
                                                    <td id="Texto-Contenido-TablaSubsidio">{contenido.codProducto}</td>
                                                    <td id="Texto-Contenido-TablaSubsidio">{contenido.nombProducto}</td>
                                                </tr>
                                            )
                                        })
                                        :null
                                    }
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

export default TablaSubsidio
