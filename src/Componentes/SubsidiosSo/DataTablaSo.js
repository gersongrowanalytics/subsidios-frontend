import React from 'react'
import IconoDesplegarAbajo from '../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import {useDispatch, useSelector} from "react-redux";
import {
    DesplegarSubsidiosSoReducer,
    SeleccionarSolicitanteReducer
} from '../../Redux/Actions/SubsidiosSo/SubsidiosSoFront'
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import { AplicarFiltroFacturasReducer } from '../../Redux/Actions';

const DataTablaSo = (props) => {
    
    const dispatch = useDispatch();

    const ComunesTipoDisenio = props.ComunesTipoDisenio
    const zona = props.zona
    const sumaValorizadoBultosAcordados = props.sumaValorizadoBultosAcordados
    const sumaValorizadoCantidadBultos = props.sumaValorizadoCantidadBultos
    const clienteseleccionado = props.clienteseleccionado
    const posicion = props.posicion
    const mostrarAutomaticos = props.mostrarAutomaticos
    const mostrarValidados = props.mostrarValidados
    const sumaValorizadoMontosReonocer = props.sumaValorizadoMontosReonocer

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
                    style={
                        zona.desplegado == true
                        ? ComunesTipoDisenio == "Light"
                            ?{background:'white'}
                            :{background:'#565656'}
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
                    {<NumberFormat value={funFomratoDecimal(sumaValorizadoBultosAcordados, 0)} displayType={'text'} thousandSeparator={true} />}
                </td>
                <td className="Wbold-S13-H17-C004FB8">
                    {<NumberFormat value={funFomratoDecimal(sumaValorizadoCantidadBultos, 0)} displayType={'text'} thousandSeparator={true} />}
                </td>
                <td className="Wbold-S13-H17-C004FB8">
                    S/{<NumberFormat value={funFomratoDecimal(sumaValorizadoMontosReonocer, 0)} displayType={'text'} thousandSeparator={true} />}
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
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >
                                    {<NumberFormat value={dato.sdebultosacordados ?funFomratoDecimal(dato.sdebultosacordados, 2) : 0} displayType={'text'} thousandSeparator={true} />}
                                </td>
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >
                                    {<NumberFormat value={dato.sdecantidadbultosreal ?funFomratoDecimal(dato.sdecantidadbultosreal, 2) : 0} displayType={'text'} thousandSeparator={true} />}
                                </td>
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} >
                                    S/{<NumberFormat value={dato.sdemontoareconocerreal ?funFomratoDecimal(dato.sdemontoareconocerreal, 2) : 0} displayType={'text'} thousandSeparator={true} />}
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
}

export default DataTablaSo
