import React, {useState, useEffect} from 'react'
import {Row, Col, Modal} from 'antd'
import {
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import IconoTpu from '../../../Assets/Imagenes/Iconos/Administrador/adm.png'
import IconoEditar from '../../../Assets/Imagenes/Iconos/Administrador/editar.png'
import IconoEliminarAzul from '../../../Assets/Imagenes/Iconos/Administrador/eliminarAzul.png'
import { Switch } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {ObtenerUsuariosReducer} from '../../../Redux/Actions/Administrador/Usuarios/Usuarios'

const Usuarios = () => {

    const dispatch = useDispatch();
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false)
    const {
        ComunesTipoDisenio,
        ComunesMostrarMenu
    } = useSelector(({comunes}) => comunes);

    useEffect(() => {
        dispatch(ObtenerUsuariosReducer())
    }, [])

    return (
        <div
        >
            <div>
                <Row>
                    <Col xl={2} style={{alignSelf: "center"}}>
                        <div
                            onClick={() => setMostrarModalCrear(true)} 
                            className="Btn-Crear-Tabla-Modulo-Administrador W600-S14-H19-CFFFFFF">
                            <PlusOutlined style={{marginRight:'5px'}} />
                            Crear
                        </div>
                    </Col>
                    <Col xl={22}>
                        <div style={{width:'100%'}} className="Contenedor-Input-Buscador">
                            <SearchOutlined style={{width:'5%'}} />
                            <input className="Input-Buscador-Tabla-Modulos-Administrador" />
                        </div>
                    </Col>
                </Row>
            </div>

            <div
                style={{
                    overflowX:"auto", marginTop:'20px',
                    boxShadow: "0px 0px 15px #D8DFE9", 
                }} id="Contenedor-Tabla-Subsidios-So"
            >
                <table
                    className="table-responsive-subsidios-so Tabla-SubsidiosSo" 
                    style={{width:'100%'}}
                    cellPadding="0" 
                    cellSpacing="0"
                >

                    <thead
                        className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                    >
                        <tr>
                            <th 
                                className={
                                    ComunesTipoDisenio == "Light"
                                    ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                    :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Tipo de Usuario</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                    ComunesTipoDisenio == "Light"
                                    ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                    :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Nombre Completo</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                    ComunesTipoDisenio == "Light"
                                    ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                    :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                                style={ComunesMostrarMenu == true ?{}:{zIndex:'1'}}
                            >Usuario</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                    ComunesTipoDisenio == "Light"
                                    ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                    :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                                style={ComunesMostrarMenu == true ?{}:{zIndex:'1'}}
                            >Correo</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                    ComunesTipoDisenio == "Light"
                                    ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                    :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Contraseña</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                    ComunesTipoDisenio == "Light"
                                    ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                    :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Fecha de Creación</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                    ComunesTipoDisenio == "Light"
                                    ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                    :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Fecha de Caducidad</th>
                            <th 
                                style={{textAlignLast: "center"}}
                                className={
                                    ComunesTipoDisenio == "Light"
                                    ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                    :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                }
                            >Editar</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            [{},{},{},{},{},{}].map(() => {
                                return (
                                    <tr 
                                        style={{
                                            background: "#FFFFFF",
                                            border: "1px solid #D7E8FF",
                                            boxSizing: "border-box",
                                            borderRadius: "8px"
                                        }}
                                    >
                                        <td className="td-Tabla-Administrador">
                                            Cliente
                                        </td>
                                        <td className="td-Tabla-Administrador">
                                            Nombre Completo
                                        </td>
                                        <td className="td-Tabla-Administrador">
                                            Nombre.apellido@empresa.com
                                        </td>
                                        <td className="td-Tabla-Administrador">
                                            Nombre.apellido@empresa.com
                                        </td>
                                        <td className="td-Tabla-Administrador">
                                            **************
                                        </td>
                                        <td className="td-Tabla-Administrador">
                                            24 abr
                                        </td>
                                        <td className="td-Tabla-Administrador">
                                            24 abr
                                        </td>
                                        <td className="td-Tabla-Administrador">
                                            
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Usuarios
