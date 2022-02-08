import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AceptarCookiesReducer, LeyendoCookiesReducer} from '../../Redux/Actions/Settings'
import {Link} from "react-router-dom";
import config from '../../config'
import '../../Estilos/Rutas/Terminos/Terminos.css'

const Terminos = () => {

    const dispatch = useDispatch();
    const { 
        cookiesaceptadas,
        leyendopoliticas
    } = useSelector(({settings}) => settings);

    useEffect(() => {
        // dispatch(LeyendoCookiesReducer(true))
    })

    return (
        <div style={{paddingLeft:'40px', paddingRight:'40px', paddingTop:'40px', paddingBottom:'40px', fontFamily:'Montserrat, sans-serif', fontSize: "14px", background:'#F9F9F9'}} >



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
                    TERMINOS Y CONDICIONES DE USO 
                </div>
                {/* <br/> */}
                <br/>
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
                {/* <br/> */}
                {/* Uso responsable de sus datos<br/>
                Nosotros y nuestros socios tratamos sus datos personales, por ejemplo, su número de IP, utilizando tecnología como cookies para almacenar y acceder a información en su dispositivo con el fin de ofrecer anuncios y contenidos personalizados, medición de anuncios y contenidos, información sobre el público y desarrollo de productos. Usted puede elegir quién utiliza sus datos y con qué fines.<br/> */}
                El usuario del sitio Web y/o App se compromete a leer detenidamente los términos y condiciones, antes de utilizar los portales y servicios Web ofrecidos. Ello implica que usted acepta expresamente los términos y condiciones. En caso de no aceptarlos, se le solicita que no haga uso, ni acceda, ni manipule la información de los servicios ofrecidos por el sitio Web; ya que usted (usuario) está haciendo un uso inadecuado de éste.
                {/* Si lo permite, también quisiéramos:<br/>
                Recopilar información sobre su ubicación geográfica que puede tener una precisión de varios metros<br/>
                Identificar su dispositivo analizándolo activamente para buscar características específicas (huellas digitales)<br/>
                Obtenga más información sobre cómo se procesan sus datos personales y establezca sus preferencias en la sección de datos. Puede cambiar o retirar su consentimiento en cualquier momento en la Declaración de cookies.<br/> */}

                <br/>
                <br/>
                El propósito del sitio Web y/o App, es el cumplimiento del proyecto {config.nombreSistemaHo}; cuyo uso está dirigido exclusivamente a aquellos usuarios autorizados por {config.nombreCliente}. 
                <br/>
                <br/>
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
                {/* <br/> */}
                {/* <br/> */}
                Todos los derechos de propiedad intelectual del sitio Web y/o App son de propiedad de Grow Analytics. Se prohíbe el uso de cualquier derecho de propiedad intelectual sin contar con el consentimiento previo, expreso y por escrito de aquella
                <br/>
                <br/>
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
                        fontWeight: "bold",
                        color: '#1876F2',
                        fontSize:'19px',
                        marginBottom:'10px'
                    }}
                >
                    Aceptación de términos
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
                        fontWeight: "bold",
                        color: '#1876F2',
                        fontSize:'19px',
                        marginBottom:'10px'
                    }}
                >
                    Obligaciones de los usuarios
                </div>
                {/* <br/> */}
                {/* <br/> */}
                El Usuario, previamente autorizado por {config.nombreCliente}, acepta, reconoce y se obliga a que la contraseña, debe ser mantenida en reserva personal, no debe ser divulgada ni permitido su conocimiento, por acción u omisión, por parte de terceros. Es de total e ilimitada responsabilidad del Usuario mantener la confidencialidad de la contraseña. El Usuario es totalmente responsable de todas y cada una de las actividades que se realicen bajo su contraseña. El proporcionar la contraseña a terceros o el posibilitar que terceros la conozcan (por acción, omisión o descuido), importa la asunción del Usuario de todos los riesgos, daños, perjuicios y las responsabilidades civiles o penales que ello implique directa, indirecta o consecuentemente. Grow Analytics no asumirá en ningún caso responsabilidad y queda exenta totalmente de ella por un uso indebido por parte del Usuario o de terceros de la referida contraseña o equivalentes. <br/><br/>Asimismo, a efectos de garantizar la seguridad, toda transacción realizada con su Usuario y contraseña será vigilada para que no intente hacer de un mal uso o un uso distinta del Sitio, respecto de la finalidad del Proyecto.

                {
                    cookiesaceptadas == true
                    ?"LEIDO Y ACEPTADO"
                    :localStorage.getItem('cookiesaceptadas') == "ACEPTADO"
                        ?<div className='Txt-Aceptado-Leido-Terminos'>
                            LEIDO Y ACEPTADO
                        </div>
                        :<Link 
                            to="/Sistema" 
                            onClick={() => {dispatch(AceptarCookiesReducer())}}
                        >
                            <div className='Btn-Aceptar-Terminos-Condiciones'>
                                {
                                    cookiesaceptadas == true
                                    ?"LEIDO Y ACEPTADO"
                                    :localStorage.getItem('cookiesaceptadas') == "ACEPTADO"
                                        ?"LEIDO Y ACEPTADO"
                                        :"ACEPTAR"
                                }
                            </div>
                        </Link>
                }
            </div>




        </div>
    )
};

export default Terminos;
