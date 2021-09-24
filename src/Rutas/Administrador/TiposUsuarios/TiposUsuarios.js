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
import {ObtenerTiposUsuariosReducer} from '../../../Redux/Actions/Administrador/TiposUsuarios/TiposUsuarios'

const TiposUsuarios = () => {

    const dispatch = useDispatch();
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false)

    useEffect(() => {
        dispatch(ObtenerTiposUsuariosReducer())
    }, [])

    return (
        <div>
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
                    <Col xl={20}>
                        <div style={{width:'100%'}} className="Contenedor-Input-Buscador">
                            <SearchOutlined style={{width:'5%'}} />
                            <input className="Input-Buscador-Tabla-Modulos-Administrador" />
                        </div>
                    </Col>
                    <Col xl={2}></Col>

                </Row>
            </div>
            <div className="Contenedor-Tabla-Listado">

                {
                    [{},{},{},{},{},{}].map(() => {
                        return (
                            <div className="Fila-Tabla-Listado">
                                <Row>
                                    <Col xl={4}>
                                        <div 
                                            className="W600-S13-H17-C706C64"
                                            style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            <img className="Icono-Modulo-Administrador" src={IconoTpu} />
                                            Administrador
                                        </div>
                                    </Col>
                                    <Col xl={8} style={{alignSelf: "center"}}>
                                        <div className="W600-S13-H17-C706C64">Permiso</div>
                                    </Col>
                                    <Col xl={4} style={{alignSelf: "center"}}>
                                        <div className="W600-S13-H17-C706C64">24 abr</div>
                                    </Col>
                                    <Col xl={4} style={{alignSelf: "center"}}>
                                        <div className="W600-S13-H17-C706C64 Switch-Tabla-Listado" style={{display:'flex'}}>
                                            <Switch className="" size="small" defaultChecked />
                                            Desactivado
                                        </div>
                                    </Col>
                                    <Col xl={4} style={{alignSelf: "center"}}>
                                        <div>
                                            <img className="Icono-Modulo-Administrador" src={IconoEditar} />
                                            <img className="Icono-Modulo-Administrador" src={IconoEliminarAzul} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                        )
                    })
                }
            </div>

            <Modal 
                title={null}
                visible={mostrarModalCrear} 
                onOk={() => setMostrarModalCrear(!mostrarModalCrear)} 
                onCancel={() => setMostrarModalCrear(!mostrarModalCrear)}
                footer={null}
                centered={true}
                closeIcon={<img src={null}/>}
            >
                
                <div className="W600-S13-H17-C004FB8">Nombre</div>
                <div>
                    <input className="Input-Modal-Crear-Administrador" />
                </div>
                <div className="W600-S13-H17-C004FB8" style={{marginTop:'10px'}}>Privilegio</div>
                <div>
                    <input className="Input-Modal-Crear-Administrador" />
                </div>

                <div className="Contenedor-Btns-Modal-Administrador">
                    <div className="Btn-Aceptar-Modal-Administrador W600-S13-H17-CFFFFFF">
                        Aceptar
                    </div>
                    <div className="Btn-Cancelar-Modal-Administrador W600-S13-H17-C004FB8" onClick={() => setMostrarModalCrear(!mostrarModalCrear)}>
                        Cancelar
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TiposUsuarios
