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
import SubsidiosSiTb from "./SubsidiosSi/SubsidiosSiTbDinamica/SubsidiosSiTb"
import SubPendientesTbDinamica from './SubsidiosPendientes/SubPendientesTbDinamica/SubPendientesTbDinamica'
import Usuarios from './Administrador/Usuarios/Usuarios'
import TiposUsuarios from './Administrador/TiposUsuarios/TiposUsuarios'
import ControlArchivos from './Administrador/ControlArchivos/ControlArchivos'
import Prueba from "./Prueba/Prueba"
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
                        {/* <SubsidiosPendientes/> */}
                        <SubPendientesTbDinamica/>
                    </Route>

                    <Route exact path='/facturas' >
                        <Facturas/>
                    </Route>

                    <Route exact path='/subsidios' >
                        <Subsidios/>
                    </Route>

                    <Route exact path='/subsidios-so' >
                        {/* <SubsidiosSo/> */}
                        <Prueba/>
                    </Route>

                    <Route exact path='/subsidios-si' >
                        {/* <SubsidiosSi/> */}
                        <SubsidiosSiTb/>
                    </Route>

                    <Route exact path='/subsidios-si-tb' >
                        <SubsidiosSiTb/>
                    </Route>

                    <Route exact path='/subsidios-pendientes-tb' >
                        <SubPendientesTbDinamica/>
                    </Route>
                    
                    <Route exact path='/prueba' >
                        <Prueba/>
                    </Route>

                    <Route exact path='/administrador/tipos-usuarios' >
                        <Administrador
                            contenido = {<TiposUsuarios/>}
                            titulo = {"Administrador"}
                            moduloseleccionado = {"TPU"}
                        />
                    </Route>

                    <Route exact path='/administrador/usuarios' >
                        <Administrador
                            contenido = {<Usuarios/>}
                            titulo = {"Administrador"}
                            moduloseleccionado = {"USU"}
                        />
                    </Route>

                    <Route exact path='/administrador/permisos' >
                        <Administrador
                            contenido = {<Usuarios/>}
                            titulo = {"Administrador"}
                            moduloseleccionado = {"PEM"}
                        />
                    </Route>

                    <Route exact path='/administrador/control-archivos' >
                        <Administrador
                            contenido = {<ControlArchivos/>}
                            titulo = {"Administrador"}
                            moduloseleccionado = {"CAR"}
                        />
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
