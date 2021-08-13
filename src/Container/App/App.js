import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import Login from '../Login/Login'
import LogoPaginaColor from '../../Assets/Imagenes/Logos/logoThanosColor.png'
// import { ToastProvider } from 'react-toast-notifications';
import Rutas from '../../Rutas/index'
import {ValidarUsuarioConectadoReducer} from '../../Redux/Actions/Login/Login'
import '../../Estilos/Letras/Letras.css'
import '../../Estilos/Letras/LetraLuminoso.css'

function App() {

    const ComunesCargandoPagina = useSelector(({comunes}) => comunes.ComunesCargandoPagina)
    const ComunesCargandoPaginaInicio = useSelector(({comunes}) => comunes.ComunesCargandoPaginaInicio)
    const LoginUsuid = useSelector(({login}) => login.LoginUsuid)

    const dispatch = useDispatch();

    useEffect(async () => {

        await dispatch(ValidarUsuarioConectadoReducer())
        
    }, [LoginUsuid]);



    return (
        <div style={{position:'relative'}}>
            {/* <ToastProvider> */}
                <div style={{position:'absolute', width:'100%', height:'100vh'}}>
                    <div style={{position:'relative'}}>
                        
                        {
                            LoginUsuid != null
                            ?<Rutas />
                            :<Switch>
                                <Route exact path='/login' component={Login}/>
                            </Switch>
                        }
                        
                        {
                            LoginUsuid != null
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
                        placeContent: 'center'
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
