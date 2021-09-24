import React from 'react'
import {Row, Col} from 'antd'
import '../../Estilos/Rutas/Administrador/Administrador.css'
import IconoActualizacion from '../../Assets/Imagenes/Iconos/iconoActualizacion.svg'
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas'
import IconoTpu from '../../Assets/Imagenes/Iconos/Administrador/adm.png'
import IconoUsu from '../../Assets/Imagenes/Iconos/Administrador/admun.png'
import IconoPem from '../../Assets/Imagenes/Iconos/Administrador/admplus.png'
import {Link} from "react-router-dom";

const Administrador = (props) => {

    const Contenido = props.contenido
    const titulo = props.titulo
    const moduloseleccionado = props.moduloseleccionado

    return (
        <div
            className="Contenedor-Cuerpo-Modulos-Administradores"
        >
            <div className="CEDF0FA Contenedor-Primer-Bloque-Modulo-Administrador">
                <FiltroFechas
                    titulo = {"Administrador"}
                />
            </div>
            <div className="Contenedor-Segundo-Bloque-Modulo-Administrador">
                <Row>
                    <Col xl={4}>
                        <Link to="/administrador/tipos-usuarios">
                            <div className={moduloseleccionado == "TPU" ?"Fila-Modulo-Administrador-Seleccionado" :"Fila-Modulo-Administrador"}>
                                <img src={IconoTpu} className="Icono-Modulo-Administrador" />
                                <span className={moduloseleccionado == "TPU"?"Wbold-S13-H17-C004FB8" :"W600-S13-H17-C706C64"}>Tipos de Usuarios</span>
                            </div>
                        </Link>
                        <Link to="/administrador/usuarios">
                            <div className={moduloseleccionado == "USU" ?"Fila-Modulo-Administrador-Seleccionado" :"Fila-Modulo-Administrador"}>
                                <img src={IconoUsu} className="Icono-Modulo-Administrador" />
                                <span className={moduloseleccionado == "USU" ?"Wbold-S13-H17-C004FB8" :"W600-S13-H17-C706C64"}>Usuarios</span>
                            </div>
                        </Link>
                        <Link to="/administrador/permisos">
                            <div className={moduloseleccionado == "PEM" ?"Fila-Modulo-Administrador-Seleccionado" :"Fila-Modulo-Administrador"}>
                                <img src={IconoPem} className="Icono-Modulo-Administrador" />
                                <span className={moduloseleccionado == "PEM"?"Wbold-S13-H17-C004FB8" :"W600-S13-H17-C706C64"}>Permisos</span>
                            </div>
                        </Link>
                        <Link to="/administrador/control-archivos">
                            <div className={moduloseleccionado == "CAR" ?"Fila-Modulo-Administrador-Seleccionado" :"Fila-Modulo-Administrador"}>
                                <img src={IconoTpu} className="Icono-Modulo-Administrador" />
                                <span className={moduloseleccionado == "CAR"?"Wbold-S13-H17-C004FB8" :"W600-S13-H17-C706C64"}>Archivos Cargados</span>
                            </div>
                        </Link>
                    </Col>
                    <Col xl={20}>
                        {Contenido}     
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Administrador
