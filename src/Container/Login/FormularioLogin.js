import React, {useEffect, useState} from 'react'
import ImagenPortada from '../../Assets/Imagenes/Login/fondoVideoFormulario.PNG';
import VideoIniciarSesion from '../../Assets/Videos/Login/IniciarSesion.webm';
import {Form, Button} from "antd";
import '../../Estilos/Login/FormularioLogin.css'
import { LoginReducer } from "../../Redux/Actions/Login/Login"
import {useDispatch} from "react-redux";
// import { useToasts } from 'react-toast-notifications';
import Input from '../../Componentes/Elementos/Input/Input';
import InputPassword from '../../Componentes/Elementos/Input/InputPassword';
import BanderasPaises from '../../Componentes/Login/BanderasPaises';
import GrowLogoLogin from '../../Assets/Imagenes/Login/Banderas/growlogo.png'

const FormularioLogin = () => {
    const dispatch = useDispatch();
    // const { addToast } = useToasts();

    const onFinish = async values =>  {
        // console.log(values)
        setCargandoLogin(true)
        let login = await dispatch(LoginReducer(values))
        if(login.respuesta === true){
            // addToast(login.mensaje, { appearance: 'success', autoDismiss: true});
        }else{
            // addToast(login.mensaje, { appearance: 'error', autoDismiss: true});
        }
        setCargandoLogin(false)
    };

    const [mostrarVideo, setMostrarVideo] = useState(false)
    const [cargandoLogin, setCargandoLogin] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setMostrarVideo(true)
        }, 1000)
    }, [])

    return (
        <div id="Login-Contenedor-Formulario">
            
            {
                mostrarVideo == true
                ?<div style={{position:'absolute', width:'100%'}}>
                    
                    <video width="100%" height="100%" autoPlay loop >
                        <source src={VideoIniciarSesion} type="video/webm"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
                :null
            }

            <div id="Login-Formulario-Capa" />
            <img src={ImagenPortada} id="Login-Formulario-Fondo" />
            
            <div id="Login-Formulario">
                <Form
                    onFinish={onFinish}
                >
                    <p className="Wbold-S36-H48-Cwhite">Iniciar sesión</p>
                        
                    <Input name="usuario" className="W600-S16-H21-C4d4d4d" />

                    <InputPassword name="contrasenia" className="W600-S16-H21-C4d4d4d" />
                    <p 
                        style={{textAlignLast: "left", marginTop:'10px', marginBottom:'20px'}}
                        className="Wbold-S18-H24-Cwhite">¿Olvidaste tu contraseña?</p>

                    <Button 
                        htmlType="submit"
                        type="primary" 
                        id="Btn-Iniciar-FormularioLogin" 
                        loading={cargandoLogin}
                    ><span className="Wbold-S18-H24-Cwhite">Iniciar Sesión</span></Button>


                </Form>
            </div>
        
            <BanderasPaises />
            <div id="Contenedor-Logo-Grow-Login">
                <img 
                    src={GrowLogoLogin}
                    id="Logo-Grow-Blanco-Negro-Login"
                />
            </div>
        </div>
    )
}

export default FormularioLogin
