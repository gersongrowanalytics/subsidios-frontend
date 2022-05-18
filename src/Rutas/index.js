import React from 'react'
import {Route, Switch, Redirect, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
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
import BigData from "./Facturas/BigData/BigData"
import NotaCredito from "./NotaCredito/NotaCredito"
import Top from '../Componentes/Top/Top'
import Menu from '../Componentes/Menu/Menu'
import '../Estilos/Rutas/Rutas.css'
import '../Estilos/Comunes/Comunes.css'
import '../Estilos/Elementos/Tabla/Campo.css'
import RegularzacionPagosSO from './RegularzacionPagosSO/RegularzacionPagosSO'
import SubsidiosVentas from './SubsidiosVentas/SubsidiosVentas'
import Terminos from './Terminos/Terminos'
import config from '../config'
import Bottom from '../Componentes/Bottom/Bottom';
import TimeLogout from '../Container/App/TimeLogout';
import {
    CerrarSesionReducer
} from '../Redux/Actions/Login/Login'

const App = () => {

    // const ComunesMostrarMenu = useSelector(({comunes}) => comunes.ComunesMostrarMenu)
    const {ComunesMostrarMenu, ComunesTipoDisenio} = useSelector(({comunes}) => comunes)

    const { 
        cookiesaceptadas,
        leyendopoliticas
    } = useSelector(({settings}) => settings);

    const { 
        datosUsuarioLogeado,
        mostrar_terminos_condiciones_login
    } = useSelector(({login}) => login);

    const dispatch = useDispatch();

    return (
        <div >
            <TimeLogout 
                CerrarSesionReducer = {async () => {
                    if(!localStorage.getItem('usutoken')){
                        await dispatch(CerrarSesionReducer())
                        window.location.reload(); 
                    }
                }}
                tiempo = {500}
            />
            
            {/* {
                config.activarpoliticas == true
                ?<>
                    {
                        cookiesaceptadas == true
                        ?null
                        :localStorage.getItem('cookiesaceptadas') == "ACEPTADO"
                        ?null
                        :window.location.href.includes('/terminos-condiciones')
                        ?null
                        :<div className="Contenedor-Cookies" >
                            <div className="Mensaje-Cookies">
                                <div 
                                    style={{
                                        // textAlignLast: "center",
                                        // fontSize: "15px",
                                        // fontWeight: "bold",
                                        // marginBottom:'5px'

                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "black",
                                        marginBottom:'5px'
                                    }}
                                >
                                    TERMINOS Y CONDICIONES DE USO
                                </div>

                                El usuario del sitio Web y/o App se compromete a leer detenidamente los términos y condiciones, antes de utilizar los portales y servicios Web ofrecidos. Ello implica que usted acepta expresamente los términos y condiciones. En caso de no aceptarlos, se le solicita que no haga uso, ni acceda, ni manipule la información de los servicios ofrecidos por el sitio Web; ya que usted (usuario) está haciendo un uso inadecuado de éste.<br/>Para continuar con el uso de la platforma ir y aceptar al siguiente link:   
                                <Link 
                                    to="/terminos-condiciones"
                                >
                                    <span
                                        style={{color:'blue', cursor:'pointer', textDecoration:'underline'}}>{" Terminos y Condiciones"}</span>
                                </Link>
                            </div>    
                        </div>
                    }
                </>
                :null
            } */}


            {
                window.location.href.includes('/terminos-condiciones')
                ?null
                :datosUsuarioLogeado.usuaceptoterminos
                    ?mostrar_terminos_condiciones_login == true
                        ?<div className="Contenedor-Cookies" >
                            <div className="Mensaje-Cookies">
                                <div 
                                    style={{
                                        // textAlignLast: "center",
                                        // fontSize: "15px",
                                        // fontWeight: "bold",
                                        // marginBottom:'5px'

                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "black",
                                        marginBottom:'5px'
                                    }}
                                >
                                    TERMINOS Y CONDICIONES DE USO
                                </div>

                                El usuario del sitio Web y/o App se compromete a leer detenidamente los términos y condiciones, antes de utilizar los portales y servicios Web ofrecidos. Ello implica que usted acepta expresamente los términos y condiciones. En caso de no aceptarlos, se le solicita que no haga uso, ni acceda, ni manipule la información de los servicios ofrecidos por el sitio Web; ya que usted (usuario) está haciendo un uso inadecuado de éste.<br/>Para continuar con el uso de la platforma ir y aceptar al siguiente link:   
                                <Link 
                                    to="/terminos-condiciones"
                                >
                                    <span
                                        style={{color:'blue', cursor:'pointer', textDecoration:'underline'}}>{" Terminos y Condiciones"}</span>
                                </Link>
                            </div>    
                        </div>
                        :null
                    :<div className="Contenedor-Cookies" >
                        <div className="Mensaje-Cookies">
                            <div 
                                style={{
                                    // textAlignLast: "center",
                                    // fontSize: "15px",
                                    // fontWeight: "bold",
                                    // marginBottom:'5px'

                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "black",
                                    marginBottom:'5px'
                                }}
                            >
                                TERMINOS Y CONDICIONES DE USO
                            </div>

                            El usuario del sitio Web y/o App se compromete a leer detenidamente los términos y condiciones, antes de utilizar los portales y servicios Web ofrecidos. Ello implica que usted acepta expresamente los términos y condiciones. En caso de no aceptarlos, se le solicita que no haga uso, ni acceda, ni manipule la información de los servicios ofrecidos por el sitio Web; ya que usted (usuario) está haciendo un uso inadecuado de éste.<br/>Para continuar con el uso de la platforma ir y aceptar al siguiente link:   
                            <Link 
                                to="/terminos-condiciones"
                            >
                                <span
                                    style={{color:'blue', cursor:'pointer', textDecoration:'underline'}}>{" Terminos y Condiciones"}</span>
                            </Link>
                        </div>    
                    </div>
            }

            <div id="Contenedor-Principal" className={ComunesTipoDisenio == "Light" ?"CFFFFFF" :"C1c1e21"} >
                <Switch>
                    <Route exact path='/login' >
                        {
                            datosUsuarioLogeado.tpuid == 3
                            ?<Redirect to="/subsidios-ventas" />
                            :<Redirect to="/sistema" />
                        }
                        
                    </Route>

                    {
                        datosUsuarioLogeado.tpuid == 3 
                        ?<>
                            <Redirect to="/subsidios-ventas" />
                            
                            <Route exact path='/subsidios-ventas' >
                                <SubsidiosVentas/>
                            </Route>
                            <Route exact path='/terminos-condiciones' >
                                <Terminos/>
                            </Route>

                        </>
                        :<>


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
                                <BigData/>
                            </Route>

                            <Route exact path='/nota-credito' >
                                <NotaCredito/>
                            </Route>

                            <Route exact path='/subsidios' >
                                <Subsidios/>
                            </Route>

                            <Route exact path='/subsidios-so' >
                                {/* <SubsidiosSo/> */}
                                <Prueba/>
                            </Route>

                            <Route exact path='/regularizacion-pagos-sell-out' >
                                <RegularzacionPagosSO/>
                            </Route>

                            <Route exact path='/subsidios-si' >
                                {/* <SubsidiosSi/> */}
                                <SubsidiosSiTb/>
                            </Route>

                            <Route exact path='/subsidios-si-tb' >
                                <SubsidiosSiTb/>
                            </Route>

                            <Route exact path='/terminos-condiciones' >
                                <Terminos/>
                            </Route>

                            <Route exact path='/subsidios-pendientes-tb' >
                                <SubPendientesTbDinamica/>
                            </Route>
                            
                            <Route exact path='/prueba' >
                                <Prueba/>
                            </Route>

                            <Route exact path='/subsidios-ventas' >
                                <SubsidiosVentas/>
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


                        </>
                    }

                </Switch>
                <Bottom />
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
