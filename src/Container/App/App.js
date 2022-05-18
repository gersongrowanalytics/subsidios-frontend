import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import Login from '../Login/Login'
import LogoPaginaColor from '../../Assets/Imagenes/Logos/logoThanosColor.png'
// import { ToastProvider } from 'react-toast-notifications';
import Rutas from '../../Rutas/index'
import {ValidarUsuarioConectadoReducer, CerrarSesionReducer} from '../../Redux/Actions/Login/Login'
import RecuperarCOntrasenia from '../Login/RecuperarContrasenia'
import CambiarContrasenia from '../Login/CambiarContrasenia'
import '../../Estilos/Letras/Letras.css'
import '../../Estilos/Letras/LetraLuminoso.css'
import config from '../../config'
import TimeLogout from './TimeLogout';

function App() {

    const ComunesCargandoPagina = useSelector(({comunes}) => comunes.ComunesCargandoPagina)
    const ComunesCargandoPaginaInicio = useSelector(({comunes}) => comunes.ComunesCargandoPaginaInicio)
    const LoginUsuid = useSelector(({login}) => login.LoginUsuid)

    const dispatch = useDispatch();

    useEffect(async () => {

        await dispatch(ValidarUsuarioConectadoReducer())
        // console.log("------------------Link:")
        // console.log(window.location.href)
        // console.log(window.location.href.split(config.urlFrontend)[1])
    }, [LoginUsuid]);

    const { 
        datosUsuarioLogeado,
        mostrar_terminos_condiciones_login
    } = useSelector(({login}) => login);

    return (
        <div style={{position:'relative', width:'100%', height:'100%'}}>
            {/* <TimeLogout 
                CerrarSesionReducer = {async() => {
                    await dispatch(CerrarSesionReducer())
                    window.location.reload(); 
                }}
                tiempo = {900000}
            /> */}
            
            {/* <TimeLogout 
                CerrarSesionReducer = {async () => {
                    if(!localStorage.getItem('usutoken')){
                        await dispatch(CerrarSesionReducer())
                        window.location.reload(); 
                    }
                }}
                tiempo = {500}
            /> */}
        

            {/* <ToastProvider> */}
                <div style={{position:'absolute', width:'100%', height:'100vh'}}>
                    <div style={{position:'relative', width:'100%', height:'100%'}}>
                        
                        {
                            LoginUsuid != null
                            ?<Rutas />
                            :<Switch>
                                {/* <Route exact path='/cambiar-contrasenia/' component={CambiarContrasenia}/> */}
                                {
                                    window.location.href.split(config.urlFrontend)[1].includes('/cambiar-contrasenia')
                                    ?<Route exact path={window.location.href.split(config.urlFrontend)[1]} component={CambiarContrasenia}/>
                                    :null
                                }
                                <Route exact path='/recuperar-contrasenia' component={RecuperarCOntrasenia}/>

                                <Route exact path='/login' component={Login}/>
                            </Switch>
                        }
                        
                        {
                            LoginUsuid != null
                            ?window.location.href.split(config.urlFrontend)[1].includes('/recuperar-contrasenia') || window.location.href.split(config.urlFrontend)[1].includes('/cambiar-contrasenia') || window.location.href.split(config.urlFrontend)[1] == "/"
                                ?datosUsuarioLogeado.tpuid == 3
                                    ?<Redirect to="/subsidios-ventas" />
                                    :<Redirect to="/sistema" />
                                
                                :null
                            :window.location.href.split(config.urlFrontend)[1].includes('/recuperar-contrasenia') || window.location.href.split(config.urlFrontend)[1].includes('/cambiar-contrasenia') || window.location.href.split(config.urlFrontend).length == 1
                                ?null 
                                :<Redirect to="/login" />
                        }

                        

                        
                    </div>
                </div>
            {/* </ToastProvider> */}

            {
                ComunesCargandoPagina === true || ComunesCargandoPaginaInicio == true
                ?<div
                    style={{
                        width:'100%',
                        height:'100vh',
                        background:'#F2F2F2',
                        position:'absolute',
                        display:'flex',
                        alignItems: 'center',
                        placeContent: 'center',
                        zIndex:'10000'
                    }}
                >
                    <img src={LogoPaginaColor} width={'450px'} />
                    
                </div>
                :null
            }
        </div>
    );
}

export default App;
