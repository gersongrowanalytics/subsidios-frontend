import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {MostrarMenuReducer} from '../../Redux/Actions/Comunes/Comunes'
import '../../Estilos/Componentes/Menu/Menu.css'
import LogoPaginaBlancoNegro from '../../Assets/Imagenes/Logos/LogoTheBrainBlancoNegro.png'
import IconoEquisBlanco from '../../Assets/Imagenes/Iconos/equisblanco.PNG'
import IconoEquisBlancoLuminoso from '../../Assets/Imagenes/Iconos/IconoEquisBlancoLuminoso.PNG'
import {Link} from "react-router-dom";

const Menu = () => {
    
    const dispatch = useDispatch();

    const {ComunesOcultarMenu, ComunesTipoDisenio} = useSelector(({comunes}) => comunes)

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
                    <Link to="/sistema" onClick={() => dispatch(MostrarMenuReducer(false))}>
                        <p className="Wbold-S27-H36-CFFFFFF">Home</p>
                    </Link>

                    <Link to="/carga-archivos" onClick={() => dispatch(MostrarMenuReducer(false))}>
                        <p className="Wbold-S27-H36-CFFFFFF">Upload de Información</p>
                    </Link>

                    <Link to="/subsidios-so" onClick={() => dispatch(MostrarMenuReducer(false))}>
                        <p className="Wbold-S27-H36-CFFFFFF">Subsidio (Sell Out)</p>
                    </Link>
                    <Link to="/subsidios-si" onClick={() => dispatch(MostrarMenuReducer(false))}>
                        <p className="Wbold-S27-H36-CFFFFFF">Subsidio (Sell In)</p>
                    </Link>
                    <Link to="/subsidios-pendientes" onClick={() => dispatch(MostrarMenuReducer(false))}>
                        <p className="Wbold-S27-H36-CFFFFFF">Subsidio Pendiente (Sell In)</p>
                    </Link>
                    
                    <Link to="/facturas" onClick={() => dispatch(MostrarMenuReducer(false))}>
                        <p className="Wbold-S27-H36-CFFFFFF">Historia de Facturas (Sell In)</p>
                    </Link>

                    {/* <Link to="/dashboard" onClick={() => dispatch(MostrarMenuReducer(false))}> */}
                        <p className="Wbold-S27-H36-CFFFFFF">Dashboard</p>
                    {/* </Link> */}
                    {/* <p className="Wbold-S27-H36-CFFFFFF">Facturas</p> */}
                    

                    {/* <Link to="/administrador" onClick={() => dispatch(MostrarMenuReducer(false))}> */}
                        <p className="Wbold-S27-H36-CFFFFFF">Administrador</p>
                    {/* </Link> */}
                </div>
            </div>
            <div>
                <img 
                    onClick={() => dispatch(MostrarMenuReducer(false))}
                    id={ ComunesOcultarMenu == true ? "Icono-Equis-Cerrar-Menu-Ocultar" : "Icono-Equis-Cerrar-Menu"} 
                    src={ ComunesTipoDisenio == "Light" ?IconoEquisBlancoLuminoso :IconoEquisBlanco} 
                    className="CFF8023"
                />
            </div>
        </div>
    )
}

export default Menu
