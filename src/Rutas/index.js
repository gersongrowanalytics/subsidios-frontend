import React from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import Home from "./Home/Home"
import Perfil from "./Perfil/Perfil";
import CargaArchivos from "./CargaArchivos/CargaArchivos";
import Dashboard from "./Dashboard/Dashboard";
import Administrador from "./Administrador/Administrador";
import SubsidiosPendientes from "./SubsidiosPendientes/SubsidiosPendientes";
import Controles from "./Controles/ControlCargasArchivos/ControlCargasArchivos";
import Subsidios from "./Subsidios/Subsidios"
import SubsidiosSo from "./SubsidiosSo/SubsidiosSo"
import SubsidiosSi from "./SubsidiosSi/SubsidiosSi"
import Facturas from "./Facturas/Facturas"
import Top from '../Componentes/Top/Top'
import Menu from '../Componentes/Menu/Menu'
import '../Estilos/Rutas/Rutas.css'
import '../Estilos/Comunes/Comunes.css'
import '../Estilos/Elementos/Tabla/Campo.css'

const App = () => {

    // const ComunesMostrarMenu = useSelector(({comunes}) => comunes.ComunesMostrarMenu)
    const {ComunesMostrarMenu, ComunesTipoDisenio} = useSelector(({comunes}) => comunes)

    return (
        <div >
            
            <div id="Contenedor-Principal" className={ComunesTipoDisenio == "Light" ?"CFFFFFF" :"C1c1e21"} >
                <Switch>

                    <Route exact path='/login' >
                        <Redirect to="/sistema" />
                    </Route>

                    <Route exact path='/sistema' >
                        <Home/>
                    </Route>

                    <Route exact path='/perfil' >
                        <Perfil/>
                    </Route>

                    <Route exact path='/carga-archivos' >
                        <CargaArchivos/>
                    </Route>

                    <Route exact path='/dashboard' >
                        <Dashboard/>
                    </Route>
                    

                    <Route exact path='/control/carga-archivos' >
                        <Controles/>
                    </Route>

                    <Route exact path='/administrador' >
                        <Administrador/>
                    </Route>

                    <Route exact path='/subsidios-pendientes' >
                        <SubsidiosPendientes/>
                    </Route>

                    <Route exact path='/facturas' >
                        <Facturas/>
                    </Route>

                    <Route exact path='/subsidios' >
                        <Subsidios/>
                    </Route>

                    <Route exact path='/subsidios-so' >
                        <SubsidiosSo/>
                    </Route>

                    <Route exact path='/subsidios-si' >
                        <SubsidiosSi/>
                    </Route>
                    
                </Switch>
            </div>    
            <Top />
            {
                ComunesMostrarMenu == true
                ?<Menu/>
                :null
            }
        </div>
    )
}

export default App
