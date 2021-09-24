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
import {
    ObtenerControlArchivosReducer
} from '../../../Redux/Actions/Administrador/ControlArchivos/ControlArchivos'
import {useDispatch, useSelector} from "react-redux";
import IconoExcel from '../../../Assets/Imagenes/Iconos/Administrador/excel.png'
import IconoNoIdentificado from '../../../Assets/Imagenes/Iconos/Administrador/noidentificado.png'
import IconoPpt from '../../../Assets/Imagenes/Iconos/Administrador/ppt.png'
import IconoWord from '../../../Assets/Imagenes/Iconos/Administrador/word.png'
import Moment from 'moment';

const ControlArchivos = () => {

    Moment.locale('en');

    const dispatch = useDispatch();
    const {
        data_archivos_control_archivos,
        cargando_archivos_control_archivos
    } = useSelector(({controlArchivos}) => controlArchivos);

    useEffect(() => {
        dispatch(ObtenerControlArchivosReducer())
    }, [])

    const [txtBuscar, setTxtBuscar] = useState("")

    return (
        <div>
            <div>
                <Row>
                    <Col xl={24}>
                        <div style={{width:'100%'}} className="Contenedor-Input-Buscador">
                            <SearchOutlined style={{width:'5%'}} />
                            <input 
                                className="Input-Buscador-Tabla-Modulos-Administrador" 
                                onChange={(e) => setTxtBuscar(e.target.value)}
                            />
                        </div>
                    </Col>
                    {/* <Col xl={2}></Col> */}

                </Row>
            </div>
            <div className="Contenedor-Tabla-Listado">

                {
                    data_archivos_control_archivos
                    ?data_archivos_control_archivos.map((archivo) => {
                        return (
                            archivo.carnombre.includes(txtBuscar.toUpperCase()) || archivo.carnombre.includes(txtBuscar.toLowerCase())
                            ?<div className="Fila-Tabla-Listado">
                                <Row>
                                    <Col xl={8}>
                                        <div 
                                            className="W600-S13-H17-C1EC0ED"
                                            style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            {
                                                archivo.carextension == "xlsx"
                                                ?<img className="Icono-Modulo-Administrador" src={IconoExcel} />
                                                :archivo.carextension == "pptx"
                                                    ?<img className="Icono-Modulo-Administrador" src={IconoPpt} />
                                                    :archivo.carextension == "docx"
                                                        ?<img className="Icono-Modulo-Administrador" src={IconoWord} />
                                                        :<img className="Icono-Modulo-Administrador" src={IconoNoIdentificado} />
                                            }
                                            <a
                                                download={archivo.carnombre}
                                                href={archivo.carurl}
                                            >
                                                <u style={{cursor:'pointer'}}>{archivo.carnombre}</u>
                                            </a>
                                        </div>
                                    </Col>
                                    <Col xl={6} style={{alignSelf: "center"}}>
                                        <div className="W600-S13-H17-C004FB8">{archivo.tcanombre}</div>
                                    </Col>
                                    <Col xl={4} style={{alignSelf: "center"}}>
                                        <div className="W600-S13-H17-C004FB8">{archivo.usuusuario}</div>
                                    </Col>
                                    <Col xl={2} style={{alignSelf: "center"}}>
                                        <div className="W600-S13-H17-C004FB8">
                                            {Moment(archivo.created_at).format('D MMM YYYY')}
                                        </div>
                                    </Col>
                                    <Col xl={2} style={{alignSelf: "center"}}>
                                        <div className="W600-S13-H17-C004FB8">
                                            {Moment(archivo.created_at).format("LT")}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            :null
                        )
                    })
                    :null
                }
            </div>
        </div>
    )
}

export default ControlArchivos
