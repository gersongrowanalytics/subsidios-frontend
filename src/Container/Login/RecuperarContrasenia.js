import React, {useState} from 'react'
import {Form, Button, Row, Col, Modal, message} from "antd";
import VideoIniciarSesion from '../../Assets/Videos/Login/IniciarSesion.webm';
import IconoCandado from '../../Assets/Imagenes/Login/iconoCandado.png'
import IconoCorreo from '../../Assets/Imagenes/Login/iconoCorreo.png'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    RecuperarContraseniaReducer
} from '../../Redux/Actions/Login/Login'
import IconoCerrar from '../../Assets/Imagenes/Iconos/iconoCerrar.png'
import '../../Estilos/Login/RecuperarContrasenia.css'

const RecuperarContrasenia = () => {

    const dispatch = useDispatch();

    const onFinish = async values =>  {
        // console.log(values)
        if(values.correo.length > 0){
            setCorreoInput(values)
            setCargandoBtnSiguiente(true)
            let recuperar = await dispatch(RecuperarContraseniaReducer(values))
            if(recuperar.respuesta === true){
                setMostrarModalRecuperacion(true)
            }else{
                message.error(recuperar.mensaje);
            }
            setCargandoBtnSiguiente(false)
        }else{
            message.error("Es necesario colocar un correo");
        }
    };

    const [cargandoBtnSiguiente, setCargandoBtnSiguiente] = useState(false)
    const [mostrarModalRecuperacion, setMostrarModalRecuperacion] = useState(false)
    const [correoInput, setCorreoInput] = useState({})

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
                                        name={"correo"}
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
                                    loading={cargandoBtnSiguiente}
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
            
            <Modal 
                title={null} 
                visible={mostrarModalRecuperacion} 
                onOk={() => setMostrarModalRecuperacion(!mostrarModalRecuperacion)} 
                onCancel={() => setMostrarModalRecuperacion(!mostrarModalRecuperacion)}
                footer={null}
                centered={true}
                closeIcon={
                <img 
                    src={IconoCerrar} 
                    width='27px' 
                    style={{marginRight:'20px', marginTop:'-20px'}} 
                    onClick={() => setMostrarModalRecuperacion(!mostrarModalRecuperacion)}
                />} 
            >
                
                <div className="Wbold-S14-H19-C004FB8-L0015">Su solicitud fue enviada a su correo con éxito</div>
                <div className="Wnormal-S14-H19-C004FB8" style={{display:'flex'}}>
                    Si no has recibido el email de confirmación, puedes 
                    <div 
                        className="Wbold-S14-H19-C004FB8-L0015" 
                        style={{paddingLeft:'5px', textDecoration:'underline', cursor:'pointer' }}
                        onClick={
                            () => {
                                onFinish(correoInput)
                                message.success("El correo fue reenviado");
                            }
                        }
                    > reenviarlo.</div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop:'15px'
                    }}
                >
                    <Button 
                        htmlType="submit"
                        loading={cargandoBtnSiguiente}
                        id="Btn-Listo-Recuperar-Contrasenia"
                        className="Wbold-S14-H19-CFFFFFF-L0015"
                        onClick={() => setMostrarModalRecuperacion(!mostrarModalRecuperacion)} 
                    ><span className="Wbold-S14-H19-CFFFFFF-L0015">Listo</span></Button>
                    {/* <div
                        onClick={() => setMostrarModalRecuperacion(!mostrarModalRecuperacion)} 
                        id="Btn-Listo-Recuperar-Contrasenia" className="Wbold-S14-H19-CFFFFFF-L0015">Listo</div> */}
                </div>
            </Modal>
            
        </div>
    )
}

export default RecuperarContrasenia
