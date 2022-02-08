import React, {useEffect, useState} from 'react'
import {Form, Button, Row, Col} from "antd";
import VideoIniciarSesion from '../../Assets/Videos/Login/IniciarSesion.webm';
import IconoCandado from '../../Assets/Imagenes/Login/iconoCandado.png'
import IconoCorreo from '../../Assets/Imagenes/Login/iconoCorreo.png'
import { LoginReducer } from "../../Redux/Actions/Login/Login"
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import config from "../../config"
import '../../Estilos/Login/LoginLight.css'
import {
    EyeOutlined,
    EyeInvisibleOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';

const LoginLight = () => {

    const dispatch = useDispatch();

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
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setMostrarVideo(true)
        }, 1000)
    }, [])

    return (
        <div style={{width:'100%', height:'100%'}}>

            <Row style={{width:'100%', height:'100%',}}>
                <Col xl={16} style={{width:'100%', height:'100%', }}>
                    <div style={{width:'100%', height:'100%'}}>
                        <video width="100%" height="100%" autoPlay loop muted style={{objectFit: "fill"}}>
                            <source src={VideoIniciarSesion} type="video/webm"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </Col>
                <Col xl={8}>
                    <Form
                        onFinish={onFinish}
                        style={{
                            width:'100%', height:'100%',
                        }}
                    >
                        <div 
                            style={{
                                width:'100%', height:'100%',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                                
                            }}
                        >
                            <div>
                                <div
                                    onClick={() => {
                                        
                                        console.log(window.location.href.split(config.urlFrontend))
                                    }} 
                                    className="Wbold-S30-H40-C004FB8">¡Bienvenido!</div>
                                {/* <div  style={{marginTop:'30px'}} className="W600-S15-H20-C004FB8">Correo electrónico Softys</div> */}
                                <div  style={{marginTop:'30px'}} className="W600-S15-H20-C004FB8">Usuario</div>
                                <div style={{borderBottom:'1px solid #004FB8', paddingBottom:'7px', marginTop:'10px', display:'flex'}}>
                                    <img src={IconoCorreo} width={"15px"} height={"15px"} style={{marginRight:'10px'}}/>

                                    <Form.Item
                                        initialValue=""
                                        name={"usuario"}
                                        style={{height:"0px", marginTop:'-10px'}}
                                    >
                                        <input style={{border:'0'}} autoComplete={"off"}/>
                                    </Form.Item>  
                                    
                                </div>
                                {/* <div style={{marginTop:'20px'}} className="W600-S15-H20-C004FB8">Clave de Subsidios</div> */}
                                <div style={{marginTop:'20px'}} className="W600-S15-H20-C004FB8">Contraseña</div>
                                <div style={{borderBottom:'1px solid #004FB8', paddingBottom:'7px', marginTop:'10px', display:'flex', position:'relative'}}>
                                    <img src={IconoCandado} width={"15px"} height={"15px"} style={{marginRight:'10px'}}/>
                                    <Form.Item
                                        initialValue=""
                                        name={"contrasenia"}
                                        style={{height:"0px", marginTop:'-10px'}}
                                    >
                                        <input style={{border:'0'}} type={mostrarContrasenia == true ? "text" :"password"}/>
                                    </Form.Item>  
                                    {/* <img 
                                        src={IconoCandado} width={"15px"} height={"15px"}
                                        style={{position:'absolute', right:'5px'}}
                                    /> */}
                                    {
                                        mostrarContrasenia == true
                                        ?<EyeInvisibleOutlined style={{position:'absolute', right:'5px', color:'#004FB8'}} onClick={() => setMostrarContrasenia(false)} />
                                        :<EyeOutlined style={{position:'absolute', right:'5px', color:'#004FB8'}} onClick={() => setMostrarContrasenia(true)} />
                                    }
                                </div>
                                <Link to="/recuperar-contrasenia">
                                    <div 
                                        style={{
                                            marginTop:'30px',
                                            cursor:'pointer'
                                        }}
                                        className="Wnormal-S14-H19-CFF8023-Underline">¿Olvidaste o bloqueaste tu contraseña?</div>

                                </Link>
                                <div
                                    style={{
                                        width:'100%',
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Button 
                                        htmlType="submit"
                                        loading={cargandoLogin}
                                        style={{
                                            height: "47px",
                                            background: "#FF8023",
                                            borderRadius: "26px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor:'pointer',
                                            // width:'80%',
                                            marginTop:'30px'
                                        }}
                                        className="Btn-Iniciar-sesion-login-light butt butt--orange anchor"
                                    >
                                        <span className="Wbold-S18-H24-CFFFFFF">Iniciar Sesión</span>
                                        <ArrowRightOutlined 
                                            style={{
                                                fontSize:'25px',
                                                color:'white'
                                            }}
                                        />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
            
        </div>
    )
}

export default LoginLight
