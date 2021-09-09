import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {MostrarMenuReducer} from '../../Redux/Actions/Comunes/Comunes'
import '../../Estilos/Componentes/Menu/Menu.css'
import LogoPaginaBlancoNegro from '../../Assets/Imagenes/Logos/LogoTheBrainBlancoNegro.png'
import IconoEquisBlanco from '../../Assets/Imagenes/Iconos/equisblanco.PNG'
import IconoEquisBlancoLuminoso from '../../Assets/Imagenes/Iconos/IconoEquisBlancoLuminoso.PNG'
import {Link} from "react-router-dom";
import {funPermisosObtenidos} from '../../Funciones/funPermiso'

const Menu = () => {
    
    const dispatch = useDispatch();

    const {ComunesOcultarMenu, ComunesTipoDisenio} = useSelector(({comunes}) => comunes)
    const {LoginUsuario} = useSelector(({login}) => login);
    
    return (
        <div id="Contenedor-Menu">
            <div 
                id={ComunesOcultarMenu == true ? "Contenedor-Menu-PrimeraParte-Ocultar" : "Contenedor-Menu-PrimeraParte"} 
                className="CFF8023"
            >
                {/* {
                    ComunesOcultarMenu == true
                    ?null
                    :<img src={LogoPaginaBlancoNegro} id="Logo-Menu-PrimeraParte" />
                } */}
                
            </div>
            <div 
                id={ ComunesOcultarMenu == true ? "Contenedor-Menu-SegundaParte-Ocultar" : "Contenedor-Menu-SegundaParte"} 
                className="CFF8023"
            >
            </div>

            <div id="Cuerpo-Menu">
                <div id={ ComunesOcultarMenu == true ? "Contenedor-Cuerpo-Menu-Ocultar" : "Contenedor-Cuerpo-Menu"}>
                    {
                        funPermisosObtenidos(
                            LoginUsuario.permisos,
                            "MENU.MODULO.HOME.STATUS",
                            <Link to="/sistema" onClick={() => dispatch(MostrarMenuReducer(false))}>
                                <p className="Wbold-S27-H36-CFFFFFF-SinFondo">Home</p>
                            </Link>
                        )
                    }

                    {
                        funPermisosObtenidos(
                            LoginUsuario.permisos,
                            "MENU.MODULO.UPLOAD.INFORMACION",
                            <Link to="/carga-archivos" onClick={() => dispatch(MostrarMenuReducer(false))}>
                                <p className="Wbold-S27-H36-CFFFFFF-SinFondo">Upload de Información</p>
                            </Link>
                        )
                    }

                    {
                        funPermisosObtenidos(
                            LoginUsuario.permisos,
                            "MENU.MODULO.SUBSIDIOS.SELL.OUT",
                            <Link to="/subsidios-so" onClick={() => dispatch(MostrarMenuReducer(false))}>
                                <p className="Wbold-S27-H36-CFFFFFF-SinFondo">Subsidio (Sell Out)</p>
                            </Link>
                        )
                    }

                    {
                        funPermisosObtenidos(
                            LoginUsuario.permisos,
                            "MENU.MODULO.SUBSIDIOS.SELL.IN",
                            <Link to="/subsidios-si" onClick={() => dispatch(MostrarMenuReducer(false))}>
                                <p className="Wbold-S27-H36-CFFFFFF-SinFondo">Subsidio (Sell In)</p>
                            </Link>
                        )
                    }

                    {
                        funPermisosObtenidos(
                            LoginUsuario.permisos,
                            "MENU.MODULO.SUBSIDIOS.PENDIENTES.SELL.IN",
                            <Link to="/subsidios-pendientes" onClick={() => dispatch(MostrarMenuReducer(false))}>
                                <p className="Wbold-S27-H36-CFFFFFF-SinFondo">Subsidio Pendiente (Sell In)</p>
                            </Link>
                        )
                    }
                    
                    {
                        funPermisosObtenidos(
                            LoginUsuario.permisos,
                            "MENU.MODULO.HISTORIA.FACTURAS.SELL.IN",
                            <Link to="/facturas" onClick={() => dispatch(MostrarMenuReducer(false))}>
                                <p className="Wbold-S27-H36-CFFFFFF-SinFondo">Historia de Facturas (Sell In)</p>
                            </Link>
                        )
                    }
                    
                    {
                        funPermisosObtenidos(
                            LoginUsuario.permisos,
                            "MENU.MODULO.DASHBOARD",
                            // {/* <Link to="/dashboard" onClick={() => dispatch(MostrarMenuReducer(false))}> */}
                            <p className="Wbold-S27-H36-CFFFFFF-SinFondo">Dashboard</p>
                            // {/* </Link> */}
                        )
                    }
                    {/* <p className="Wbold-S27-H36-CFFFFFF-SinFondo">Facturas</p> */}
                    
                    {
                        funPermisosObtenidos(
                            LoginUsuario.permisos,
                            "MENU.MODULO.ADMINISTRADOR",
                            // {/* <Link to="/administrador" onClick={() => dispatch(MostrarMenuReducer(false))}> */}
                            <p className="Wbold-S27-H36-CFFFFFF-SinFondo">Administrador</p>
                            // {/* </Link> */}
                        )
                    }

                </div>
            </div>
            <div>
                <img 
                    onClick={() => dispatch(MostrarMenuReducer(false))}
                    style={{zIndex:'2'}}
                    id={ ComunesOcultarMenu == true ? "Icono-Equis-Cerrar-Menu-Ocultar" : "Icono-Equis-Cerrar-Menu"} 
                    src={ ComunesTipoDisenio == "Light" ?IconoEquisBlancoLuminoso :IconoEquisBlanco} 
                    className="CFF8023"
                />
            </div>
        </div>
    )
}

export default Menu
