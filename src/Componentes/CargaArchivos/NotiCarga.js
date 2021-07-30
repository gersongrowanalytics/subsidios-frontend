import React, {useState} from 'react'
import '../../Estilos/Componentes/CargaArchivos/NotiCarga.css'
import IconoFlechaDerecha from '../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import IconoCampanaAzul from '../../Assets/Imagenes/Iconos/CargaArchivos/campana-azul.svg'
import IconoCampana from '../../Assets/Imagenes/Iconos/CargaArchivos/campana.svg'

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
                    style={notificacionesCompleta==true?{transform: "rotate(0deg)"}:{}}
                    onClick={() => setNotificacionesCompleta(!notificacionesCompleta)}
                    id={
                        ComunesTipoDisenio == "Light" 
                        ?"Icono-Flecha-Notificaciones-Carga-Light"
                        :"Icono-Flecha-Notificaciones-Carga" 
                    }
                    src={IconoFlechaDerecha} 
                />
                <img id="Icono-Campana-Notificaciones-Carga" src={IconoCampanaAzul} />
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
                            <div className="Notificaciones-Carga" style={notificacionesCompleta == true?{paddingLeft:'35px', paddingRight:'90px'}:{}}>
                                <div className="W600-S14-H19-Ce4e6eb" style={{paddingBottom:'5px'}}>
                                    {/* Notificación {posicion+1} */}
                                    {not.TITULO}
                                </div>
                                {
                                    not.MENSAJE
                                    ?<div className="Wnormal-S14-H19-Ce4e6eb">
                                        {not.MENSAJE}<br/>

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
                                        }
                                        
                                        {/* PRODUCTOS */}

                                        {
                                            not.PRODUCTOS_NO_ENCONTRADOS
                                            ?<>
                                                {"PRODUCTOS_NO_ENCONTRADOS : "}<br/>
                                                {
                                                    not.PRODUCTOS_NO_ENCONTRADOS.map((producto) => {
                                                        return (
                                                            <>
                                                                {producto.codigo+" en la linea: "+producto.linea}<br/>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                            :null
                                        }

                                    </div>
                                    :null
                                }
                            </div>
                        )
                    })
                }
            </div>
            {/* <div id="Contenedor-Cuerpo-Sin-Notificaciones-Carga">
                <img id="Icono-Campana-Sin-Notificaciones-Carga" src={IconoCampana} /><br/>
                <span className="Wnormal-S14-H19-Cacafb7">
                    No hay notificaciones recientes
                </span>
            </div> */}
        </div>
    )
}

export default NotiCarga
