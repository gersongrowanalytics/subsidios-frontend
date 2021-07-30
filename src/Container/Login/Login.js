import React from 'react'
import '../../Estilos/Login/Login.css'
import BannerLogin from './BannerLogin'
import FormularioLogin from './FormularioLogin'
import {useDispatch, useSelector} from "react-redux";
import {
    setMostrarVideoPreload, 
    setMostrarVideoLogin
} from '../../Redux/Actions/Login/LoginFront'
import LoginLight from './LoginLight';

const Login = () => {

    const dispatch = useDispatch();
    
    const MostrarVideoPreload = () => {
        dispatch(setMostrarVideoLogin(true));
        setTimeout(() => {
            dispatch(setMostrarVideoPreload(false))
        }, 1000)
    };

    const {
        mostrarVideoPreload,
        mostrarVideoLogin
    }= useSelector(({loginFront}) => loginFront);

    return (
        <div id="Contenedor-Login">

            {/* {
                mostrarVideoLogin == true
                ?<FormularioLogin
                    mostrarVideoLogin = {mostrarVideoLogin}
                />
                :null
            } */}
            
            {/* <BannerLogin
                mostrarVideoPreload = {mostrarVideoPreload}
                setMostrarVideoPreload = {MostrarVideoPreload}
            /> */}


            {/* <FormularioLogin
                mostrarVideoLogin = {mostrarVideoLogin}
            /> */}

            <LoginLight 
            
            />

{/* 
            <FormularioLogin/>    
            <BannerLogin/> */}

        </div>
    )
}

export default Login