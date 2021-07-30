import React from 'react'
import {Row, Col} from 'antd'
import '../../Estilos/Rutas/Dashboard/Dashboard.css'
import CoberturaVideo from '../../Assets/Videos/Dashboards/Cobertura.webm'
import Ticket from '../../Assets/Videos/Dashboards/Ticket.webm'

const Dashboard = () => {
    return (
        <Row>
            <Col xl={24} md={24} sm={24} xs={24} id="Titulo-Dashboard" >
                KPIs
            </Col>
            <Col xl={24} md={24} sm={24} xs={24} id="SubTitulo-Dashboard" >
                archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias  
            </Col>

            <Col xl={24} md={24} sm={24} xs={24}>
                <Row id="Contenedor-Tarjetas-Dashboard">
                    {
                        [{"video" : CoberturaVideo}, {"video" : Ticket},{"video" : Ticket}, {"video" : Ticket}].map((video) => {
                            return ( 
                                <Col xl={4} md={8} sm={12} xs={24} id="Tarjeta-Dashboard">
                                    <div style={{position:'absolute', width:'100%'}}>
                                        <video width="100%"  height="445px" autoPlay loop id="Video-Dashboard"  >
                                            <source src={video.video} type="video/webm" codecs="vp8, vorbis"/>
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div id="Capa-Video-Dashboard">
                                        <div id="PrimeraParte-Tarjeta-Dashboard"></div>

                                        <div id="SegundaParte-Tarjeta-Dashboard">
                                            <Row id="Row-SegundaParte-Tarjeta-Dashboard">
                                                <Col xl={24} md={24} sm={24} xs={24} id="Titulo-SegundaParte-Tarjeta-Dashboard">
                                                    Cobertura y Volumen de cliente subsidiado
                                                </Col>
                                                <Col xl={12} md={12} sm={12} xs={24} id="SubTitulo-SegundaParte-Tarjeta-Dashboard">
                                                    DHH<br/>
                                                    123,233
                                                </Col>
                                                <Col xl={12} md={12} sm={12} xs={24} id="SubTitulo-SegundaParte-Tarjeta-Dashboard">
                                                    MMMMMMM<br/>
                                                    123,233
                                                </Col>
                                                <Col xl={24} md={24} sm={24} xs={24} id="Col-Btn-SegundaParte-Tarjeta-Dashboard">
                                                    <div id="Btn-SegundaParte-Tarjeta-Dashboard">
                                                        SABER MÁS
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }

                </Row>
            </Col>
        </Row>
    )
}

export default Dashboard
