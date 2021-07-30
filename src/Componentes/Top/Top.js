import React, {useState} from 'react'
import {Row, Col} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {MostrarMenuReducer, CambiarDisenioReducer} from '../../Redux/Actions/Comunes/Comunes'
import {CerrarSesionReducer} from '../../Redux/Actions/Login/Login'
import IconoMenu from '../../Assets/Imagenes/Iconos/menu.svg'
import LogoGrowColor from '../../Assets/Imagenes/Logos/LogoGrowBlancoNegro.png'
import IconoUsuario from '../../Assets/Imagenes/Iconos/iconoUsuario.png'
// import IconoMenu from '../../Assets/Imagenes/Iconos/PuntosMenu.PNG'
import '../../Estilos/Componentes/Top/Top.css'
import '../../Estilos/Componentes/Top/Top.scss'
import IconoTopHome from '../../Assets/Imagenes/Iconos/Top/home_azul.svg'
import IconoTopHomeGris from '../../Assets/Imagenes/Iconos/Top/home_gris.svg'
import IconoTopNotificacion from '../../Assets/Imagenes/Iconos/Top/notificacion_azul.svg'
import IconoTopNotificacionGris from '../../Assets/Imagenes/Iconos/Top/notificacion_gris.svg'
import IconoTopCalendario from '../../Assets/Imagenes/Iconos/Top/calendario_azul.svg'
import IconoTopCalendarioGris from '../../Assets/Imagenes/Iconos/Top/calendario_gris.svg'
import FiltroFechaTop from './FiltroFechaTop';

const Top = () => {

    const dispatch = useDispatch();
    const NombreCompleto = useSelector(({login}) => login.LoginUsuario.pernombrecompleto)
    const Nombre = useSelector(({login}) => login.LoginUsuario.pernombre)
    const {ComunesTipoDisenio} = useSelector(({comunes}) => comunes)

    const [startDate, setStartDate] = useState(new Date());


    return (
        <div>
            <div id="Barra-Top" className={ComunesTipoDisenio == "Light" ? "CFFFFFF" : "C1c1e21"}>
                <div id="Top-Contenedor">
                    <Row>
                        <Col  xl={5} md={12} sm={12} xs={12} id="" >
                            <div
                                style={{
                                    height: "8vh",
                                    display: "flex"
                                }}
                            >
                                <img 
                                    onClick={() => dispatch(MostrarMenuReducer(true))} src={IconoMenu} 
                                    id={ComunesTipoDisenio == "Light" ?"Icono-Menu-Top-Luminoso" :"Icono-Menu-Top"}
                                />
                                {/* <div id="Icono-Menu-Top">
                                    <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                                </div> */}

                                {/* <div id="hamburger "  className="hamburglar is-closed">

                                    <div className="burger-icon">
                                        <div className="burger-container">
                                            <span className="burger-bun-top"></span>
                                            <span className="burger-filling"></span>
                                            <span className="burger-bun-bot"></span>
                                        </div>
                                    </div>

                                    <div className="burger-ring">
                                        <svg className="svg-ring">
                                            <path className="path" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4" d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2" />
                                        </svg>
                                    </div>

                                    <svg width="0" height="0">
                                        <mask id="mask">
                                            <path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-miterlimit="10" stroke-width="4" d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4" />
                                        </mask>
                                    </svg>
                                    <div className="path-burger">
                                        <div className="animate-path">
                                            <div className="path-rotation"></div>
                                        </div>
                                    </div>
                                
                                </div> */}

                                <img src={LogoGrowColor} id="Top-Logo"/>
                            </div>
                        </Col>

                        <Col xl={12} xs={0}>
                            {/* <Row style={{height: "8vh"}}>
                                <Col xl={6}>
                                    <div className="Contenedor-Icono-Top-Filtro Wbold-S14-H19-C9c9b9b">
                                        <img src={IconoTopHomeGris} className="IconoTopFiltro" />
                                        Home
                                    </div>
                                </Col>

                                <Col xl={6} style={{cursor:'pointer'}}>

                                    <FiltroFechaTop
                                        texto = {"Fecha Inicio"}
                                    />

                                </Col>

                                <Col xl={6} style={{cursor:'pointer'}}>

                                    <FiltroFechaTop
                                        texto = {"Fecha Fin"}
                                    />

                                </Col>

                                <Col xl={6}>
                                    <div className="Contenedor-Icono-Top-Filtro Wbold-S14-H19-C9c9b9b">
                                        <img src={IconoTopNotificacionGris} className="IconoTopFiltro" />
                                        Notificaciones
                                        <button
                                            onClick={() => {
                                                dispatch(CambiarDisenioReducer(ComunesTipoDisenio == "Light" ? "Dark" : "Light"))
                                                console.log(ComunesTipoDisenio)
                                            }}
                                        >cambiar{" "+ComunesTipoDisenio}</button>
                                    </div>
                                </Col>
                            </Row> */}
                        </Col>
                        
                        <Col  xl={7} md={12} sm={12} xs={0}>
                            <div id="Top-Usuario">
                                <div class="dropdown">
                                    <span id="Top-Nombre-Usuario" className={ComunesTipoDisenio == "Light" ? "CEDF0FA Wbold-S14-H19-C004FB8" :"C3A3B3C"}>
                                        <img src={IconoUsuario} id="Top-Img-Usuario" /> {NombreCompleto}
                                    </span>

                                    <div class="dropdown-content">
                                        <a href="#">Perfil</a>
                                        <a onClick={() => dispatch(CerrarSesionReducer())}>Salir</a>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col  xl={0} md={0} sm={0} xs={12}>
                            <div id="Top-Usuario">
                                <div class="dropdown">
                                    <span id="Top-Nombre-Usuario" className={ComunesTipoDisenio == "Light" ? "CEDF0FA Wbold-S14-H19-C004FB8" :"C3A3B3C"}>
                                        <img src={IconoUsuario} id="Top-Img-Usuario" /> {Nombre}
                                    </span>

                                    <div class="dropdown-content">
                                        <a href="#">Perfil</a>
                                        <a onClick={() => dispatch(CerrarSesionReducer())}>Salir</a>
                                    </div>
                                </div>
                                {/* <img onClick={() => dispatch(MostrarMenuReducer(true))} src={IconoMenu} id="Top-Img-Menu"/> */}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Top