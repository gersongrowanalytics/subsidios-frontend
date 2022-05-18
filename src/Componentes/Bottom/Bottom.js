import React from 'react'
import '../../Estilos/Componentes/Bottom/Bottom.css'
import { Row, Col } from 'antd'
import {Route, Switch, Redirect, Link} from "react-router-dom";

const Bottom = () => {
    return (
        <div className='Contenedor-Bottom' >
            <Row
                style={{
                    height: "100%",
                    textAlignLast: "center",
                    alignContent: "center"
                }}
            >
                <Col xl={8}>
                    <div className='Contenedor-Footer-Fila'>
                        © 2022 Grow Analytics.Todos los Derechos Reservados
                    </div>
                </Col>
                <Col 
                    xl={4} 
                    className={
                        window.location.href.includes('/terminos-condiciones')
                        ?'Contenedor-Footer-Fila-Seleccionado'
                        :'Contenedor-Footer-Fila'
                    }
                >
                    <Link to="/terminos-condiciones" >
                        <div 
                            style={
                                window.location.href.includes('/terminos-condiciones')
                                ?{background: "#E7F3FF", paddingTop:'25px', paddingLeft:'35px', paddingBottom:'25px', paddingRight:'35px'}
                                :{color:'black',}
                            } 
                        >
                            Términos & Condiciones
                        </div>
                    </Link>
                </Col>
                <Col xl={4}>
                    <div className='Contenedor-Footer-Fila'>
                        Política de Privacidad
                    </div>
                </Col>
                <Col xl={4}>
                    <div className='Contenedor-Footer-Fila'>
                        Cookies & Datos
                    </div>
                </Col>
                <Col xl={4}>
                    <div className='Contenedor-Footer-Fila'>
                        Entra en Contacto
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Bottom