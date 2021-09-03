import React from 'react'
import IconoDesplegarAbajo from '../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import {useDispatch, useSelector} from "react-redux";
import {
    DesplegarSubsidiosSoReducer
} from '../../Redux/Actions/SubsidiosSi/SubsidiosSiFront'
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';

const DataTablaSi = (props) => {
    const dispatch = useDispatch();

    const ComunesTipoDisenio = props.ComunesTipoDisenio
    const zona = props.zona
    const clienteseleccionado = props.clienteseleccionado
    const posicion = props.posicion
    const mostrarValidados = props.mostrarValidados
    const mostrarAutomaticos = props.mostrarAutomaticos
    const sumaValorizadoObjetivo = props.sumaValorizadoObjetivo
    const sumaValorizadosValorizado = props.sumaValorizadosValorizado
    
    return (

        <>
            <tr
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
                        ?"Wbold-S13-H17-C004FB8"
                        :"Wbold-S11-H20-Ce4e6eb"
                    }
                >
                    {
                        zona.desplegado == true
                        ?<img 
                            onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarAbajo} className="Icono-Flecha-Tabla-Subsidios-So" />
                        :<img 
                            onClick={() => dispatch(DesplegarSubsidiosSoReducer(posicion))} src={IconoDesplegarDerecha} className="Icono-Flecha-Tabla-Subsidios-So" />
                    }
                    {zona.clizona}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                    S/<NumberFormat value={funFomratoDecimal(sumaValorizadoObjetivo, 0)} displayType={'text'} thousandSeparator={true} />
                </td>
                
                <td className="Wbold-S13-H17-C004FB8" style={{textAlign: "-webkit-right"}}>
                    S/<NumberFormat value={funFomratoDecimal(sumaValorizadosValorizado, 0)} displayType={'text'} thousandSeparator={true} />
                </td>

            </tr>
            {
                zona.desplegado == true
                ?
                zona.data.map((dato, posicionData) => {
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

                    if(mostrar == true){
                        return (
                            <tr
                                style={
                                    ComunesTipoDisenio == "Light"
                                    ?{borderBottom: '1px solid #D7E8FF'}
                                    :{borderBottom: '1px solid #1c1e21'}
                                }
                            >
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{}</td>
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.sdeterritorio}</td>
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.clinombre}</td>
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.clisuchml}</td>
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.sdesubcliente}</td>
                                {/* <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.catnombre}</td> */}
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.sdesector}</td>
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.prosku}</td>
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.pronombre}</td>

                                {/* <td className="Celda-td-Tabla-Subsidios-So W500-S14-H16-Cacafb7">{funFomratoDecimal(dato.sdemontoareconocerreal)}</td> */}
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{textAlign: "-webkit-right"}}>
                                    S/{<NumberFormat value={dato.sdemontoareconocerreal ?funFomratoDecimal(dato.sdemontoareconocerreal, 2) : 0} displayType={'text'} thousandSeparator={true} />}
                                </td>

                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{textAlign: "-webkit-right"}}>
                                    S/{<NumberFormat value={dato.sumsfsvalorizado ?funFomratoDecimal(dato.sumsfsvalorizado, 2) : 0} displayType={'text'} thousandSeparator={true} />}
                                </td>

                                <td 
                                    className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C1EC0ED": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}
                                    style={{cursor:'pointer'}} 
                                    onClick={() => {
                                        // console.log(dato)
                                        props.seleccionarFacturas(dato)
                                    }}>

                                    <u>Facturas</u>
                                </td>

                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"}>{dato.fecfecha}</td>
                                <td className={ComunesTipoDisenio == "Light"? "W600-S12-H16-C706C64": "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"} style={{display:'flex'}}>



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

export default DataTablaSi
