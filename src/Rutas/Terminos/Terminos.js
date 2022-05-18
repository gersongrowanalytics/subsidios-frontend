import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AceptarCookiesReducer, LeyendoCookiesReducer,  } from '../../Redux/Actions/Settings'
import {Link} from "react-router-dom";
import config from '../../config'
import '../../Estilos/Rutas/Terminos/Terminos.css'
import { Switch, Modal } from 'antd';
import {CheckCircleTwoTone } from '@ant-design/icons';
import IconoEquisAzul from '../../Assets/Imagenes/Iconos/equisazul.svg'
import GifSwitch from '../../Assets/Gifs/switch.gif'
import {
    LoginUsaurioCambiar
} from '../../Redux/Actions/Login/Login'

const Terminos = () => {

    const dispatch = useDispatch();
    const { 
        cookiesaceptadas,
        leyendopoliticas
    } = useSelector(({settings}) => settings);

    const { 
        datosUsuarioLogeado,
        LoginUsuario
    } = useSelector(({login}) => login);

    useEffect(() => {
        // dispatch(LeyendoCookiesReducer(true))

        if(localStorage.getItem('cookiesaceptadas') == "ACEPTADO"){
            
        }
    })

    const [primeraLinea, setPrimeraLinea] = useState(false)
    const [segundaLinea, setSegundaLinea] = useState(false)
    const [terceraLinea, setTerceraLinea] = useState(false)
    const [cuartaLinea, setCuartaLinea] = useState(false)
    const [quintaLinea, setQuintaLinea] = useState(false)

    const [mostrarModalWarning, setMostrarModalWarning] = useState(false)
    const [mostrarModalInstructivo, setMostrarModalInstructivo] = useState(true)

    return (
        <div style={{paddingLeft:'40px', paddingRight:'40px', paddingTop:'40px', paddingBottom:'40px', fontFamily:'Montserrat, sans-serif', fontSize: "14px", background:'#F9F9F9', marginBottom:'70px'}} >



            <div 
                style={{
                    textAlignLast: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color:'black'
                }}
            >
                AVISO LEGAL DEL USO DEL SITIO WEB
            </div>
            

            <div className='Contenedor-Tarjeta-Terminos'>
                <div
                    style={{
                        textAlignLast: "left",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginTop:'40px',
                        color: '#1876F2'
                    }}
                >
                    TÉRMINOS Y CONDICIONES DE USO 
                </div>
                {/* <br/> */}
                <br/>
                <div
                    style={{
                        display: "flex",
                        position: "relative"
                    }}
                >
                    <div
                        style={{
                            fontSize: "20px",
                            marginRight:'10px'
                        }}
                    >
                        {
                            datosUsuarioLogeado.usuaceptoterminos
                            ?<CheckCircleTwoTone 
                                twoToneColor="#52c41a" 
                            />
                            :primeraLinea == true
                                ?<CheckCircleTwoTone 
                                    twoToneColor="#52c41a"
                                />
                                :<CheckCircleTwoTone 
                                    twoToneColor="#A4A3A3" 
                                />
                        }
                        
                    </div>
                    <div
                        style={{
                            fontWeight: "bold",
                            color: '#1876F2',
                            fontSize:'19px',
                            marginBottom:'10px'
                        }}
                    >
                        Condiciones de uso
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            right: "0"
                        }}
                    >
                        <Switch 
                            className='Swtich-Terminos'
                            defaultChecked={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            onChange={(e) => {
                                setPrimeraLinea(e)
                            }} 
                            disabled={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            style={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?{
                                    background:'#1876F2'
                                }
                                :primeraLinea == true
                                    ?{background:'#1876F2'}
                                    :{background:'#8F8F8F'}
                            }
                        />
                    </div>
                </div>
                El usuario del sitio Web y/o App se compromete a leer detenidamente los términos y condiciones, antes de utilizar los portales y servicios Web ofrecidos. Ello implica que usted acepta expresamente los términos y condiciones. En caso de no aceptarlos, se le solicita que no haga uso, ni acceda, ni manipule la información de los servicios ofrecidos por el sitio Web; ya que usted (usuario) está haciendo un uso inadecuado de éste.
                <br/>
                <br/>
                El propósito del sitio Web y/o App, es el cumplimiento del proyecto {config.nombreSistemaHo}; cuyo uso está dirigido exclusivamente a aquellos usuarios autorizados por {config.nombreCliente}. 
                <br/>
                <br/>
                <div
                    style={{
                        display: "flex",
                        position: "relative"
                    }}
                >
                    <div
                        style={{
                            fontSize: "20px",
                            marginRight:'10px'
                        }}
                    >
                        {
                            datosUsuarioLogeado.usuaceptoterminos
                            ?<CheckCircleTwoTone 
                                twoToneColor="#52c41a" 
                            />
                            :segundaLinea == true
                                ?<CheckCircleTwoTone 
                                    twoToneColor="#52c41a"
                                />
                                :<CheckCircleTwoTone 
                                    twoToneColor="#A4A3A3" 
                                />
                        }
                        
                    </div>
                    <div
                        style={{
                            fontWeight: "bold",
                            color: '#1876F2',
                            fontSize:'19px',
                            marginBottom:'10px'
                        }}
                    >
                        Derechos de Propiedad Intelectual 
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            right: "0"
                        }}
                    >
                        <Switch 
                            className='Swtich-Terminos'
                            defaultChecked={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            onChange={(e) => {
                                setSegundaLinea(e)
                            }} 
                            disabled={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            style={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?{
                                    background:'#1876F2'
                                }
                                :segundaLinea == true
                                    ?{background:'#1876F2'}
                                    :{background:'#8F8F8F'}
                            }
                        />
                    </div>
                </div>
                {/* <br/> */}
                {/* <br/> */}
                Todos los derechos de propiedad intelectual del sitio Web y/o App son de propiedad de Grow Analytics. Se prohíbe el uso de cualquier derecho de propiedad intelectual sin contar con el consentimiento previo, expreso y por escrito de aquella
                <br/>
                <br/>
                <div
                    style={{
                        display: "flex",
                        position: "relative"
                    }}
                >
                    <div
                        style={{
                            fontSize: "20px",
                            marginRight:'10px'
                        }}
                    >
                        {
                            datosUsuarioLogeado.usuaceptoterminos
                            ?<CheckCircleTwoTone 
                                twoToneColor="#52c41a" 
                            />
                            :terceraLinea == true
                                ?<CheckCircleTwoTone 
                                    twoToneColor="#52c41a"
                                />
                                :<CheckCircleTwoTone 
                                    twoToneColor="#A4A3A3" 
                                />
                        }
                        
                    </div>

                    <div
                        style={{
                            fontWeight: "bold",
                            color: '#1876F2',
                            fontSize:'19px',
                            marginBottom:'10px'
                        }}
                    >
                        Derechos de Autor y Marca
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            right: "0"
                        }}
                    >
                        <Switch
                            className='Swtich-Terminos'
                            defaultChecked={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            onChange={(e) => {
                                setTerceraLinea(e)
                            }} 
                            disabled={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            style={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?{
                                    background:'#1876F2'
                                }
                                :terceraLinea == true
                                    ?{background:'#1876F2'}
                                    :{background:'#8F8F8F'}
                            }
                        />
                    </div>
                </div>
                {/* <br/> */}
                {/* <br/> */}
                Este Sitio se encuentra Protegido por la Normativa Vigente sobre derechos de autor. Todos los derechos involucrados, como, por ejemplo, textos, imágenes gráficas, dashboards y su diseño visual, son de titularidad de Grow Analytics, por lo que <b><i>se encuentra estrictamente prohibido su empleo, replica similar, parecida o equivalente al layaout de los graficos e indicadores creados,</i></b> modificación, reproducción, distribución, transmisión, o comercialización de los derechos involucrados sin el permiso previo, expreso y por escrito de Grow Analytics; o, transferir los contenidos, creaciones publicadas en el portal, marcas, textos e imágenes gráficas de este Sitio a terceros que no formen parte de este proyecto, ni competidores directos de Grow Analytics. 
                <br/>
                <br/>
                Las prohibiciones antes mencionadas son a título enunciativo y no taxativo, por lo que se extenderán a todas aquellas que se deriven del respeto y reconocimiento de los derechos de Grow Analytics protegidos por las leyes de la propiedad intelectual e industrial y derechos de autor.  
                <br/>
                <br/>
                <div
                    style={{
                        display: "flex",
                        position: "relative"
                    }}
                >
                    <div
                        style={{
                            fontSize: "20px",
                            marginRight:'10px'
                        }}
                    >
                        {
                            datosUsuarioLogeado.usuaceptoterminos
                            ?<CheckCircleTwoTone 
                                twoToneColor="#52c41a" 
                            />
                            :cuartaLinea == true
                                ?<CheckCircleTwoTone 
                                    twoToneColor="#52c41a"
                                />
                                :<CheckCircleTwoTone 
                                    twoToneColor="#A4A3A3" 
                                />
                        }
                        
                    </div>

                    <div
                        style={{
                            fontWeight: "bold",
                            color: '#1876F2',
                            fontSize:'19px',
                            marginBottom:'10px'
                        }}
                    >
                        Aceptación de términos
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            right: "0"
                        }}
                    >
                        <Switch 
                            className='Swtich-Terminos'
                            defaultChecked={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            onChange={(e) => {
                                setCuartaLinea(e)
                            }} 
                            disabled={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            style={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?{
                                    background:'#1876F2'
                                }
                                :cuartaLinea == true
                                    ?{background:'#1876F2'}
                                    :{background:'#8F8F8F'}
                            }
                        />
                    </div>
                </div>
                {/* <br/> */}
                {/* <br/> */}
                El sitio Web está disponible para que el usuario bajo su responsabilidad lo utilice adecuadamente sin aprovecharse de alguna falla que ocurra y saque provecho de la misma. Si encuentra alguna falla en nuestro sitio Web reportarla a <a href="mailto: soporte@grow-analytics.com.pe">soporte@grow-analytics.com.pe</a> <br/>
                <br/>Queda prohibido el uso del nombre, logotipos, marcas, diseños o cualquier signo distintivo de autoría de Grow Analytics, sin previa y expresa autorización de ésta.  <br/>
                <br/>El Usuario, en general, deberá cumplir con todas y cada una de las demás obligaciones establecidas en las presentes Condiciones, así como las demás que puedan inferirse de un uso correcto, de buena fe y/o racional del Sitio. El incumplimiento de las mismas dará lugar a las responsabilidades civiles y penales correspondientes. 
                <br/>
                <br/>
                <div
                    style={{
                        display: "flex",
                        position: "relative"
                    }}
                >
                    <div
                        style={{
                            fontSize: "20px",
                            marginRight:'10px'
                        }}
                    >
                        {
                            datosUsuarioLogeado.usuaceptoterminos
                            ?<CheckCircleTwoTone 
                                twoToneColor="#52c41a" 
                            />
                            :quintaLinea == true
                                ?<CheckCircleTwoTone 
                                    twoToneColor="#52c41a"
                                />
                                :<CheckCircleTwoTone 
                                    twoToneColor="#A4A3A3" 
                                />
                        }
                        
                    </div>

                    <div
                        style={{
                            fontWeight: "bold",
                            color: '#1876F2',
                            fontSize:'19px',
                            marginBottom:'10px'
                        }}
                    >
                        Obligaciones de los usuarios
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            right: "0"
                        }}
                    >
                        <Switch 
                            className='Swtich-Terminos'
                            defaultChecked={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            onChange={(e) => {
                                setQuintaLinea(e)
                            }} 
                            disabled={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?true
                                :false
                            }
                            style={
                                datosUsuarioLogeado.usuaceptoterminos
                                ?{
                                    background:'#1876F2'
                                }
                                :quintaLinea == true
                                    ?{background:'#1876F2'}
                                    :{background:'#8F8F8F'}
                            }
                        />
                    </div>
                </div>
                {/* <br/> */}
                {/* <br/> */}
                El Usuario, previamente autorizado por {config.nombreCliente}, acepta, reconoce y se obliga a que la contraseña, debe ser mantenida en reserva personal, no debe ser divulgada ni permitido su conocimiento, por acción u omisión, por parte de terceros. Es de total e ilimitada responsabilidad del Usuario mantener la confidencialidad de la contraseña. El Usuario es totalmente responsable de todas y cada una de las actividades que se realicen bajo su contraseña. El proporcionar la contraseña a terceros o el posibilitar que terceros la conozcan (por acción, omisión o descuido), importa la asunción del Usuario de todos los riesgos, daños, perjuicios y las responsabilidades civiles o penales que ello implique directa, indirecta o consecuentemente. Grow Analytics no asumirá en ningún caso responsabilidad y queda exenta totalmente de ella por un uso indebido por parte del Usuario o de terceros de la referida contraseña o equivalentes. <br/><br/>Asimismo, a efectos de garantizar la seguridad, toda transacción realizada con su Usuario y contraseña será vigilada para que no intente hacer de un mal uso o un uso distinta del Sitio, respecto de la finalidad del Proyecto.

                {/* {
                    cookiesaceptadas == true
                    ?"LEÍ Y ESTOY CONFORME"
                    :localStorage.getItem('cookiesaceptadas') == "ACEPTADO"
                        ?<div className='Txt-Aceptado-Leido-Terminos'>
                            LEÍ Y ESTOY CONFORME
                        </div>
                        :<Link 
                            to="/Sistema" 
                            onClick={() => {dispatch(AceptarCookiesReducer())}}
                        >
                            <div className='Btn-Aceptar-Terminos-Condiciones'>
                                {
                                    cookiesaceptadas == true
                                    ?"LEÍ Y ESTOY CONFORME"
                                    :localStorage.getItem('cookiesaceptadas') == "ACEPTADO"
                                        ?"LEÍ Y ESTOY CONFORME"
                                        :"YO ACEPTO"
                                }
                            </div>
                        </Link>
                } */}


                {
                    datosUsuarioLogeado.usuaceptoterminos
                    ?<Link 
                        to={
                            datosUsuarioLogeado.tpuid == 3
                            ?"/subsidios-ventas" 
                            :"/sistema" 
                        }
                        onClick={() => {dispatch(AceptarCookiesReducer())}}
                    >
                        <div 
                            className='Btn-Aceptar-Terminos-Condiciones'
                            style={{
                                display: "flex",
                                textAlign: "center"
                            }}
                        >
                            {
                                "LEÍ Y ESTOY CONFORME"
                            }
                        </div>
                    </Link>
                    :
                    primeraLinea == true && segundaLinea == true && terceraLinea == true && cuartaLinea == true && quintaLinea == true
                    ?<Link 
                        to={
                            datosUsuarioLogeado.tpuid == 3
                            ?"/subsidios-ventas" 
                            :"/sistema" 
                        }
                        onClick={() => {
                            dispatch(AceptarCookiesReducer())
                            // dispatch(LoginUsaurioCambiar())
                        }}
                    >
                        <div className='Btn-Aceptar-Terminos-Condiciones'>
                            {
                                "YO ACEPTO"
                            }
                        </div>
                    </Link>
                    :<div 
                        className='Btn-Aceptar-Terminos-Condiciones'
                        style={{
                            color:'white',
                            background:'#A4A3A3',
                            border:'none',
                            cursor:'not-allowed'
                        }}
                        onClick={() => {
                            setMostrarModalWarning(true)
                        }}
                    >
                        {
                            "YO ACEPTO"
                        }
                    </div>
                }


            </div>
            
            {
                datosUsuarioLogeado.usuaceptoterminos
                ?<Modal
                    visible={mostrarModalInstructivo}
                    title={null}
                    footer={null}
                    centered
                    closeIcon={
                        <div 
                            style={{
                                borderRadius:'30px', background:'#E7F3FF', width:'30px', height:'30px', marginTop:'10px',
                                position: "absolute",
                                right: "10px"
                            }}
                            onClick={() => setMostrarModalInstructivo(false)}
                        >
                            <img src={IconoEquisAzul} 
                                style={{
                                    width:'30px', position:'absolute', left:'0', 
                                    top: "1px"
                                }} 
                            />
                        </div>
                    }
                    width="380px"
                    height="121px"
                >

                    <div
                    >
                        <div 
                            style={{
                                marginTop:'0px',
                                fontFamily: "Segoe UI",
                                fontStyle: "normal",
                                fontWeight: "bold",
                                fontSize: "14px",
                                lineHeight: "19px",
                                //textTransform: "capitalize",
                                color: "#000000",
                                display: "flex",
                                justifyContent: "center",
                                paddingTop:'20px'
                            }}
                        >Notificación</div>
                        <div
                            style={{
                                fontFamily: "Segoe UI",
                                fontStyle: "normal",
                                fontWeight: "normal",
                                fontSize: "12px",
                                lineHeight: "16px",
                                // //textTransform: "capitalize",
                                color: "#000000",
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "-webkit-center",
                                marginTop:'10px',
                                display:'flex',
                                marginBottom:'20px'
                            }}
                        >
                            <div style={{whiteSpace: "nowrap"}}>Para continuar ir a  <b>Leí y estoy conforme</b></div>
                        </div>

                    </div>



                </Modal>
                :<Modal
                    visible={mostrarModalInstructivo}
                    title={null}
                    footer={null}
                    centered
                    closeIcon={
                        <div 
                            style={{borderRadius:'30px', background:'#E7F3FF', width:'35px', height:'35px', position:'relative', marginTop:'10px'}}
                            onClick={() => setMostrarModalInstructivo(false)}
                        >
                            <img src={IconoEquisAzul} style={{width:'35px', position:'absolute', left:'0', top:'2px'}} />
                        </div>
                    }
                    width="365px"
                    height="183px"
                >

                    <div 
                        style={{
                            marginTop:'0px',
                            fontFamily: "Segoe UI",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: "14px",
                            lineHeight: "19px",
                            //textTransform: "capitalize",
                            color: "#000000",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >Instructivo</div>
                    <div
                        style={{
                            fontFamily: "Segoe UI",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: "12px",
                            lineHeight: "16px",
                            //textTransform: "capitalize",
                            color: "#000000",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "-webkit-center",
                            marginTop:'10px',
                            display:'flex',
                            marginBottom:'20px'
                        }}
                    >
                        <div style={{whiteSpace: "nowrap"}}>Para aceptar los <b>Términos y Condiciones</b> deberá<br/> activar <b>todos</b> los <b>Switches</b> de cada subtítulo</div>
                    </div>

                    <div
                        style={{
                            paddingLeft:'10px',
                            paddingRight:'10px'
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                position:'relative',
                                marginBottom:'5px'
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "Segoe UI",
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                    //textTransform: "capitalize",
                                    color: '#1876F2'
                                }}
                            >
                                Condiciones de uso
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "0"

                                }}
                            >
                                <img src={GifSwitch} style={{width:'25px'}} />
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                position:'relative',
                                marginBottom:'5px'
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "Segoe UI",
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                    //textTransform: "capitalize",
                                    color: '#1876F2'
                                }}
                            >
                                Derechos de Propiedad Intelectual
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "0"

                                }}
                            >
                                <img src={GifSwitch} style={{width:'25px'}} />
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                position:'relative',
                                marginBottom:'5px'
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "Segoe UI",
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                    //textTransform: "capitalize",
                                    color: '#1876F2'
                                }}
                            >
                                Derechos de autor y marca
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "0"

                                }}
                            >
                                <img src={GifSwitch} style={{width:'25px'}} />
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                position:'relative',
                                marginBottom:'5px'
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "Segoe UI",
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                    //textTransform: "capitalize",
                                    color: '#1876F2'
                                }}
                            >
                                Aceptación de términos 
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "0"

                                }}
                            >
                                <img src={GifSwitch} style={{width:'25px'}} />
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                position:'relative',
                                marginBottom:'5px'
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "Segoe UI",
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                    //textTransform: "capitalize",
                                    color: '#1876F2'
                                }}
                            >
                                Obligaciones de los usuarios
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "0"

                                }}
                            >
                                <img src={GifSwitch} style={{width:'25px'}} />
                            </div>
                        </div>
                    </div>



                </Modal>
            }
            
            
            


            <Modal
                title={null}
                footer={null}
                visible={mostrarModalWarning}
                centered
                closeIcon={
                    <div 
                        style={{borderRadius:'30px', background:'#E7F3FF', width:'35px', height:'35px', position:'relative', marginTop:'10px'}}
                        onClick={() => setMostrarModalWarning(false)}
                    >
                        <img src={IconoEquisAzul} style={{width:'35px', position:'absolute', left:'0', top:'2px'}} />
                    </div>
                }
                width="365px"
                height="183px"
            >
                <div 
                    style={{
                        marginTop:'15px',
                        fontFamily: "Segoe UI",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: "14px",
                        lineHeight: "19px",
                        //textTransform: "capitalize",
                        color: "#000000",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >Notificación</div>
                <div
                    style={{
                        fontFamily: "Segoe UI",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "12px",
                        lineHeight: "16px",
                        //textTransform: "capitalize",
                        color: "#000000",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "-webkit-center",
                        marginTop:'10px'
                    }}
                >
                    <div style={{whiteSpace: "nowrap"}}>Para aceptar los <b>Términos y Condiciones</b> deberá<br/> activar <b>todos</b> los <b>Switches</b> de cada subtítulo</div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <img src={GifSwitch} style={{width:'50px'}} />
                </div>

                


            </Modal>





        </div>
    )
};

export default Terminos;
