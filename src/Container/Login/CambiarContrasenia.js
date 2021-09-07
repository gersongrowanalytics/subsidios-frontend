import React, {useEffect, useState} from 'react'
import {Form, Button, Row, Col, message} from "antd";
import VideoIniciarSesion from '../../Assets/Videos/Login/IniciarSesion.webm';
import IconoCandado from '../../Assets/Imagenes/Login/iconoCandado.png'
import IconoCorreo from '../../Assets/Imagenes/Login/iconoCorreo.png'
import { CambiarContraseniaReducer, LoginReducer } from "../../Redux/Actions/Login/Login"
import {
    EyeOutlined,
    EyeInvisibleOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import config from "../../config"
import {useDispatch} from "react-redux";

const CambiarContrasenia = () => {
    const dispatch = useDispatch();

    const onFinish = async values =>  {

        if(values.contrasenia.length > 0){
            if(values.contrasenia == values.confirmarcontrasenia){
                values.token = window.location.href.split("/cambiar-contrasenia/")[1]
                // console.log(values)
                setCargandoCambiarContrasenia(true)
                let cambiar = await dispatch(CambiarContraseniaReducer(values))
                if(cambiar.respuesta === true){
                    let valores = {
                        usuario : cambiar.correo,
                        contrasenia : values.contrasenia,
                    }

                    await dispatch(LoginReducer(valores))

                }else{
                    message.error(cambiar.mensaje);
                }
                setCargandoCambiarContrasenia(false)
            }else{
                message.error("Las contraseñas deben ser la misma")
            }   
        }else{
            message.error("Debes colocar una contraseña nueva")
        }
    };

    const [mostrarVideo, setMostrarVideo] = useState(false)
    const [cargandoCambiarContrasenia, setCargandoCambiarContrasenia] = useState(false)
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setMostrarVideo(true)
        }, 1000)
        // console.log("------------------Link:")
        // console.log(window.location.href)
        // console.log(window.location.href.split("/cambiar-contrasenia/")[1])
        // console.log(window.location.href.split("/cambiar-contrasenia/")[1][window.location.href.split("/cambiar-contrasenia/")[1].length-1])
    }, [])

    return (
        <div style={{width:'100%', height:'100%'}}>

            <Row style={{width:'100%', height:'100%',}}>
                <Col xl={16} style={{width:'100%', height:'100%', }}>
                    <div style={{width:'100%', height:'100%'}}>
                        <video width="100%" height="100%" autoPlay loop  style={{objectFit: "fill"}}>
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
                                    className="Wbold-S20-H27-C004FB8">¿Olvidaste tu contraseña?</div>
                                {/* <div  style={{marginTop:'30px'}} className="W600-S15-H20-C004FB8">Correo electrónico Softys</div> */}
                                <div className="Wnormal-S15-H20-C004FB8" style={{marginTop:'10px'}}>
                                    Paso 2 de 2
                                </div>
                                <div className="Wnormal-S15-H20-C004FB8" style={{marginTop:'3px'}}>
                                    Introducir una nueva contraseña
                                </div>

                                <div  style={{marginTop:'30px'}} className="W600-S15-H20-C004FB8">Ingresa nueva contraseña</div>
                                <div style={{borderBottom:'1px solid #004FB8', paddingBottom:'7px', marginTop:'10px', display:'flex', position:'relative'}}>
                                    <img src={IconoCandado} width={"15px"} height={"15px"} style={{marginRight:'10px'}}/>

                                    <Form.Item
                                        initialValue=""
                                        name={"contrasenia"}
                                        style={{height:"0px", marginTop:'-10px'}}
                                    >
                                        <input autoComplete={"off"} style={{border:'0'}} type={mostrarContrasenia == true ? "text" :"password"}/>
                                    </Form.Item>  
                                    {
                                        mostrarContrasenia == true
                                        ?<EyeInvisibleOutlined style={{position:'absolute', right:'5px', color:'#004FB8'}} onClick={() => setMostrarContrasenia(false)} />
                                        :<EyeOutlined style={{position:'absolute', right:'5px', color:'#004FB8'}} onClick={() => setMostrarContrasenia(true)} />
                                    }
                                    
                                </div>
                                {/* <div style={{marginTop:'20px'}} className="W600-S15-H20-C004FB8">Clave de Subsidios</div> */}
                                <div style={{marginTop:'20px'}} className="W600-S15-H20-C004FB8">Confirma tu contraseña</div>
                                <div style={{borderBottom:'1px solid #004FB8', paddingBottom:'7px', marginTop:'10px', display:'flex', position:'relative'}}>
                                    <img src={IconoCandado} width={"15px"} height={"15px"} style={{marginRight:'10px'}}/>
                                    <Form.Item
                                        initialValue=""
                                        name={"confirmarcontrasenia"}
                                        style={{height:"0px", marginTop:'-10px'}}
                                    >
                                        <input autoComplete={"off"} style={{border:'0'}} type={mostrarContrasenia == true ? "text" :"password"}/>
                                    </Form.Item>  
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
                                <Button 
                                    htmlType="submit"
                                    loading={cargandoCambiarContrasenia}
                                    style={{
                                        height: "47px",
                                        background: "#FF8023",
                                        borderRadius: "26px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor:'pointer',
                                        width:'100%',
                                        marginTop:'30px'
                                    }}
                                    className="Btn-Iniciar-sesion-login-light"
                                ><span className="Wbold-S18-H24-CFFFFFF">Iniciar Sesión</span></Button>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
            
        </div>
    )
}

export default CambiarContrasenia
