import React, {useState} from 'react'
import {Form, Button, Row, Col} from "antd";
import VideoIniciarSesion from '../../Assets/Videos/Login/IniciarSesion.webm';
import IconoCandado from '../../Assets/Imagenes/Login/iconoCandado.png'
import IconoCorreo from '../../Assets/Imagenes/Login/iconoCorreo.png'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

const RecuperarContrasenia = () => {

    const dispatch = useDispatch();

    const onFinish = async values =>  {
        
    };

    const [cargandoLogin, setCargandoLogin] = useState(false)

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
                                <div className="Wbold-S30-H40-C004FB8">¿Olvidaste tu contraseña?</div>
                                
                                <div className="W600-S15-H20-C004FB8" style={{marginTop:'10px'}}>
                                    Paso 1 de 2
                                </div>

                                <div className="W600-S15-H20-C004FB8">
                                    Introducir tu correo
                                </div>

                                <div>

                                </div>

                                <div  style={{marginTop:'30px'}} className="W600-S15-H20-C004FB8">Correo electrónico</div>
                                <div style={{borderBottom:'1px solid #004FB8', paddingBottom:'7px', marginTop:'10px', display:'flex', width:'100%'}}>
                                    <img src={IconoCorreo} width={"15px"} height={"15px"} style={{marginRight:'10px'}}/>

                                    <Form.Item
                                        initialValue=""
                                        name={"usuario"}
                                        style={{height:"0px", marginTop:'-10px', width:'100%'}}
                                    >
                                        <input style={{border:'0', width:'100%'}} autoComplete={"off"} />
                                    </Form.Item>  
                                    
                                </div>
                                <Link to="/login">
                                    <div 
                                        style={{
                                            marginTop:'30px',
                                            cursor:'pointer'
                                        }}
                                        className="Wnormal-S14-H19-CFF8023-Underline">Regresar al Login</div>

                                </Link>
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
                                        width:'100%',
                                        marginTop:'30px'
                                    }}
                                ><span className="Wbold-S18-H24-CFFFFFF">Siguiente</span></Button>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
            
        </div>
    )
}

export default RecuperarContrasenia
