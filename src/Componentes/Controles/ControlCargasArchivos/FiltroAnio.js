import React from 'react'
import '../../../Estilos/Componentes/Controles/ControlCargasArchivos/FiltroAnio.css'
import {Row, Col} from 'antd'

const FiltroAnio = () => {

    let arrayMeses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SET", "OCT", "NOV", "DIC"]

    return (
        <Row id="Contenedor-FiltroAnio-ControlCargaArchivos">
            <Col xl={12} md={12} sm={12} xs={24} id="Anio-FiltroAnio-ControlCargaArchivos">
                <div style={{placeSelf: "center"}}>
                    <span id="Texto-Anio-FiltroAnio-ControlCargaArchivos">MARZO<br/>2021</span>
                </div>
            </Col>
            <Col xl={12} md={12} sm={12} xs={24} id="Meses-FiltroAnio-ControlCargaArchivos">
                <Row>
                    <Col xl={24} md={24} sm={24} xs={24} id="Titulo-Meses-FiltroAnio-ControlCargaArchivos">
                        MES
                    </Col>
                    {
                        arrayMeses.map((mes) => {
                            return (
                                <Col xl={6} md={6} sm={6} xs={6} id="Texto-Meses-FiltroAnio-ControlCargaArchivos">
                                    {mes}
                                </Col>
                            )
                        })
                    }
                    
                </Row>
            </Col>
        </Row>
    )
}

export default FiltroAnio
