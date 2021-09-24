import React, {useState} from 'react'
import '../../Estilos/Componentes/CargaArchivos/NotiCarga.css'
import IconoFlechaDerecha from '../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import IconoCampanaAzul from '../../Assets/Imagenes/Iconos/campanaNotificacion.png'
import IconoCampana from '../../Assets/Imagenes/Iconos/CargaArchivos/campana.svg'
import IconoCerrarNaranja from '../../Assets/Imagenes/Iconos/cerrarNaranja.png'
import IconoFlechaIzquierdaNaranja from '../../Assets/Imagenes/Iconos/flechaIzquierdaNaranja.png'
import IconoMasAzul from '../../Assets/Imagenes/Iconos/masAzul.png'

const NotiCarga = (props) => {

    const [notificacionesCompleta, setNotificacionesCompleta] = useState(false)
    const ComunesTipoDisenio = props.ComunesTipoDisenio

    return (
        <div 
            id={
                notificacionesCompleta == true
                ?"Contenedor-Animacion-Notificaciones-Carga"
                :"Contenedor-Notificaciones-Carga"
            }
            className={
                ComunesTipoDisenio == "Light"
                ?"CFFFFFF"
                :"C242526"
            }
            // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            style={
                notificacionesCompleta == true
                ?ComunesTipoDisenio == "Light" 
                    ? {width:"100%", boxShadow: "-8px 4px 15px -5px #D8DFE9" } 
                    : {width:"100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}
                :ComunesTipoDisenio == "Light" 
                    ? {marginTop:'0px', boxShadow: "-8px 4px 15px -5px #D8DFE9"} 
                    : {marginTop:'0px', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}
            }
        >
            <div id="Contenedor-Titulo-Notificaciones-Carga" style={notificacionesCompleta == true?{justifyContent: "left", marginBottom:'5px'}:{}}>
                <img 
                    // style={notificacionesCompleta==true?{}:{}}
                    onClick={() => setNotificacionesCompleta(!notificacionesCompleta)}
                    id={
                        ComunesTipoDisenio == "Light" 
                        ?"Icono-Flecha-Notificaciones-Carga-Light"
                        :"Icono-Flecha-Notificaciones-Carga" 
                    }
                    src={IconoFlechaIzquierdaNaranja} 
                />
                <img onClick={() => console.log(props.notificaciones_cargaarchivos)}  id="Icono-Campana-Notificaciones-Carga" src={IconoCampanaAzul} />
                <span 
                    className={
                        ComunesTipoDisenio == "Light" 
                        ?"Wbold-S14-H19-C004FB8"
                        :"Wbold-S14-H19-Ce4e6eb"
                    }
                >Notificaciones</span>
            </div>

            <div id="Contenedor-Cuerpo-Notificaciones-Carga" style={notificacionesCompleta == true?{padding:'10px 0 0 0'}:{}}>
                {
                    props.notificaciones_cargaarchivos.map((not, posicion) => {
                        return (
                            not.MENSAJE
                            ?<div className="Notificaciones-Carga" style={notificacionesCompleta == true?{paddingLeft:'35px', paddingRight:'80px'}:{}}>
                                <div 
                                    className={
                                        ComunesTipoDisenio == "Light" 
                                        ?not.RESPUESTA == true
                                            ?"W600-S14-H19-C004FB8 "
                                            :"W600-S14-H19-C004FB8 COFF3742"
                                        :"W600-S14-H19-Ce4e6eb"
                                    }
                                    style={{paddingBottom:'5px'}}
                                >
                                    {/* Notificación {posicion+1} */}
                                    {not.TITULO}
                                </div>
                                
                                <div style={{display:'flex'}} onClick={() => console.log(not.PRODUCTOS_NO_ENCONTRADOS.length)}>
                                    {
                                        not.MENSAJE
                                        ?<div 
                                            className={
                                                ComunesTipoDisenio == "Light" 
                                                ?not.RESPUESTA == true
                                                    ?"Wnormal-S14-H19-C706C64"
                                                    :"Wnormal-S14-H19-C706C64 COFF3742"
                                                :"Wnormal-S14-H19-Ce4e6eb"
                                            }

                                            style={{
                                                width:'90%',
                                                paddingRight:'10px'
                                            }}
                                        >

                                            {not.MENSAJE}<br/><br/>

                                            {
                                                notificacionesCompleta == true
                                                ?<>
                                                    {/* FECHA NO REGISTRADA */}

                                                    {
                                                        not.FECHA_NO_REGISTRADA
                                                        ?<>
                                                            {"FECHA NO REGISTRADA : "}<br/>
                                                            {not.FECHA_NO_REGISTRADA}
                                                        </>
                                                        :null
                                                    }

                                                    {/* CLIENTES */}

                                                    {
                                                        not.CLIENTES_NO_ENCONTRADOS
                                                        ?not.CLIENTES_NO_ENCONTRADOS.length > 0
                                                        ?<>
                                                            {"CLIENTES_NO_ENCONTRADOS : "}<br/>
                                                            {
                                                                not.CLIENTES_NO_ENCONTRADOS.map((cliente) => {
                                                                    return (
                                                                        <>
                                                                            {cliente.codigo+" en la linea: "+cliente.linea}<br/>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                        :null
                                                        :null
                                                    }
                                                    
                                                    {/* PRODUCTOS */}

                                                    {
                                                        not.PRODUCTOS_NO_ENCONTRADOS
                                                        ?not.PRODUCTOS_NO_ENCONTRADOS.length > 0
                                                        ?<>
                                                            <b>{"Productos no encontrados: "}</b><br/>
                                                            {
                                                                not.PRODUCTOS_NO_ENCONTRADOS.map((producto) => {
                                                                    return (
                                                                        <>
                                                                            <li>{producto.codigo+" en la linea: "+producto.linea}</li>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                        :null
                                                        :null
                                                    }

                                                    {/* SUBSIDIOS_NO_ENCONTRADOS */}
                                                    {
                                                        not.SUBSIDIOS_NO_ENCONTRADOS
                                                        ?not.SUBSIDIOS_NO_ENCONTRADOS.length > 0
                                                        ?<>
                                                            <b>{"Subsidios no encontrados: "}</b><br/>
                                                            {
                                                                not.SUBSIDIOS_NO_ENCONTRADOS.map((subsidio) => {
                                                                    return (
                                                                        <>
                                                                            <li>{subsidio.codigo+" en la linea: "+subsidio.linea}</li>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                        :null
                                                        :null
                                                    }
                                                </>
                                                :null
                                            }

                                        </div>
                                        :null
                                    }

                                    <div style={{width:'10%', }}>
                                        <img 
                                            style={{cursor:'pointer'}} 
                                            src={IconoCerrarNaranja} width="20px" 
                                            onClick={() => props.EliminarNotificacionReducer(posicion)}
                                        />
                                        <img 
                                            onClick={() => setNotificacionesCompleta(!notificacionesCompleta)}
                                            style={{cursor:'pointer', marginLeft:'-1px'}} src={IconoMasAzul} width="25px" 
                                        />
                                    </div>

                                </div>
                            </div>
                            :null
                        )
                    })
                }
            </div>
            {
                props.notificaciones_cargaarchivos.length > 0
                ?null
                :<div id="Contenedor-Cuerpo-Sin-Notificaciones-Carga">
                    <img id="Icono-Campana-Sin-Notificaciones-Carga" src={IconoCampana} /><br/>
                    <span className="Wnormal-S14-H19-Cacafb7">
                        No hay notificaciones recientes
                    </span>
                </div>
            }
        </div>
    )
}

export default NotiCarga
