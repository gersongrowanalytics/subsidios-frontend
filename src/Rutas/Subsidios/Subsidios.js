import React from 'react'
import {Row, Col} from 'antd'
import FiltroSubsidio from '../../Componentes/Subsidios/FiltroSubsidio'
import TablaSubsidio from '../../Componentes/Subsidios/TablaSubsidio'
import '../../Estilos/Rutas/Subsidios/Subsidios.css'

const Subsidios = () => {

    let filtrosSubsidios = [
        {
            "Filtro" : "AÑO",
            "Switch" : false
        },
        {
            "Filtro" : "COD. SOLICITANTE",
            "Switch" : false
        },
        {
            "Filtro" : "ZONA",
            "Switch" : false
        },
        {
            "Filtro" : "CATEGORÍA",
            "Switch" : false
        },
        {
            "Filtro" : "MES",
            "Switch" : false
        },
        {
            "Filtro" : "COD. PRODUCTO",
            "Switch" : false
        },
        {
            "Filtro" : "TERRITORIO",
            "Switch" : false
        }
    ]

    return (
        <Row>
            <Col xl={24} md={24} sm={24} xs={24} id="Titulo-Subsidios">
                SUBSIDIOS
            </Col>
            {
                filtrosSubsidios.map((filtro) => {
                    return ( 
                        <Col xl={6} md={6} sm={12} xs={24}>
                            <FiltroSubsidio 
                                Filtro = {filtro.Filtro}
                                Switch = {filtro.Switch}
                            />
                        </Col>
                    )
                })
            }

            <Col xl={24} md={24} sm={24} xs={24}>
                <TablaSubsidio />
            </Col>
        </Row>
    )
}

export default Subsidios
