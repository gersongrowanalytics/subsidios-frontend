import React from 'react'
import {Row, Col} from 'antd'
import {Link} from "react-router-dom";
import '../../Estilos/Componentes/ErrorNoPermisos/ErrorNoPermisos.css'
const ErrorNoPermisos = () => {
    return (
        <Row>
            <Col xl={24} sm={24} md={24} xs={24} id="Titulo-ErrorNoPermisos">
                404
            </Col>
            <Col xl={24} sm={24} md={24} xs={24} id="SubTitulo-ErrorNoPermisos">
                Lo sentimos, usted no tiene permiso para ver esta pagina!
            </Col>
            <Col xl={24} sm={24} md={24} xs={24} id="Col-Btn-ErrorNoPermisos">
                <Link to="/">
                    <div id="Btn-ErrorNoPermisos" style={{fontSize: "11px"}}>
                        Regresar
                    </div>
                </Link>
            </Col>
        </Row>
    )
}

export default ErrorNoPermisos
