import React from 'react'
import {Row, Col} from 'antd'
import FiltroAnio from '../../../Componentes/Controles/ControlCargasArchivos/FiltroAnio'
import TablaControlCargaArchivos from '../../../Componentes/Controles/ControlCargasArchivos/TablaControlCargaArchivos'
import ProgresoArchivos from '../../../Componentes/Controles/ControlCargasArchivos/ProgresoArchivos'
const ControlCargasArchivos = () => {
    return (
        <div>
            <Row>
                <Col xl={8} md={8} sm={12} xs={24} style={{marginRight: "20px", marginBottom:'20px'}}>
                    <FiltroAnio />
                </Col>
                <Col xl={8} md={8} sm={12} xs={24} style={{marginRight: "20px", marginBottom:'20px'}}>
                    <ProgresoArchivos />
                </Col>
                <Col xl={8} md={8} sm={12} xs={24}>
                </Col>

                <Col xl={24} md={24} sm={24} xs={24}>
                    <TablaControlCargaArchivos />
                </Col>
            </Row>
        </div>
    )
}

export default ControlCargasArchivos
