import React from 'react'
import {Row, Col, Tooltip} from 'antd'
import {Link} from "react-router-dom";
import '../../Estilos/Rutas/Administrador/Administrador.css'
import ErrorNoPermisos from '../../Componentes/ErrorNoPermisos/ErrorNoPermisos'

const Administrador = () => {
    return (
        <ErrorNoPermisos />
        // <Row>
            
            
                
            
        //     <Tooltip title="Tipos de Usuarios" color={"cyan"} key={"cyan"}>
        //         <Col xl={1} sm={1} md={1} xs={1} id="Caja-Menu-Administrador" >
        //             <Link to="/administrador/tipos-usuarios">
        //                 <div style={{width:'100%', height:'100%'}} />
        //             </Link>
        //         </Col>
        //     </Tooltip>
            
                


        //     <Tooltip title="Usuarios" color={"cyan"} key={"cyan"}>
        //         <Col xl={1} sm={1} md={1} xs={1} id="Caja-Menu-Administrador" >
        //             <Link to="/administrador/usuarios">
        //                 <div style={{width:'100%', height:'100%'}} />
        //             </Link>
        //         </Col>
        //     </Tooltip>

        //     <Tooltip title="Permisos" color={"cyan"} key={"cyan"}>
        //         <Col xl={1} sm={1} md={1} xs={1} id="Caja-Menu-Administrador" >
        //             <Link to="/administrador/permisos">
        //                 <div style={{width:'100%', height:'100%'}} />
        //             </Link>
        //         </Col>
        //     </Tooltip>
        // </Row>
    )
}

export default Administrador
