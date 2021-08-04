import React, {useState} from 'react'
import {Row, Col} from 'antd'
import CardCargarArchivo from '../../Componentes/CargaArchivos/CardCargaArchivo'
import TarjetaCargaArchivo from '../../Componentes/CargaArchivos/TarjetaCargaArchivo'
import NotiCarga from '../../Componentes/CargaArchivos/NotiCarga'
import {useDispatch, useSelector} from "react-redux";
import {CargarArchivoReducer} from '../../Redux/Actions/CargaArchivos/CargaArchivos'

const CargaArchivos = () => {

    const dispatch = useDispatch();
    const [notificaciones, setNotificaciones] = useState([])
    const {notificaciones_cargaarchivos} = useSelector(({cargaArchivos}) => cargaArchivos);
    const {ComunesTipoDisenio} = useSelector(({comunes}) => comunes)

    const CargarArchivo = async (url, data) => {
        return await dispatch(CargarArchivoReducer(url, data))
    }

    return (
        <div>
            <Row>
                <Col xl={24}>
                    <div 
                        className={
                            ComunesTipoDisenio == "Light"
                            ?"CEDF0FA"
                            :""
                        }
                        style={{
                            width:'100%', height:'45px',

                        }}
                    >
                        <Row style={{height:'100%'}}>
                            <Col 
                                xl={18}
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <div className="Wbold-S20-H27-C004FB8" style={{paddingLeft:'40px'}}>
                                    Carga de archivos
                                </div>
                            </Col>
                            <Col 
                                xl={6}
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    position:'relative',
                                }}
                            >
                                <div 
                                    className="W600-S13-H17-C1EC0ED"
                                    style={{
                                        position: "absolute",
                                        right: "20px"
                                    }}
                                >
                                    última actualización 20 Julio 2021
                                </div>
                            </Col>
                        </Row>

                    </div>
                </Col>
                <Col xl={18}>
                    <Row
                        style={{
                            display: 'flex',
                            placeContent: 'center'
                        }}
                    >
                        <Col xl={3}></Col>
                        <Col xl={6} md={6} sm={12} xs={24}>
                            <TarjetaCargaArchivo
                                titulo = {'Subsidios'}
                                url    = {'modulo/cargaArchivos/so/subsidios-no-aprobados'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={12} xs={24}>
                            <TarjetaCargaArchivo
                                titulo = {'Subsidios SAC'}
                                url    = {'modulo/cargaArchivos/so/subsidios-sac'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={12} xs={24}>
                            <TarjetaCargaArchivo
                                titulo = {'Facturas SO'}
                                url    = {'modulo/cargaArchivos/so/so'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                            />
                        </Col>
                        <Col xl={3}></Col><Col xl={3}></Col>
                        <Col xl={6} md={6} sm={12} xs={24}>
                            <TarjetaCargaArchivo
                                titulo = {'Añadir Productos'}
                                url    = {'modulo/cargaArchivos/productos'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={12} xs={24}>
                            <TarjetaCargaArchivo
                                titulo = {'Añadir Clientes'}
                                url    = {'modulo/cargaArchivos/clientes'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={12} xs={24}>
                            {/* <TarjetaCargaArchivo
                                titulo = {'Clientes SAC'}
                                url    = {'modulo/cargaArchivos/clientes/sac'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                            /> */}

                            <TarjetaCargaArchivo
                                titulo = {'Añadir Fechas'}
                                url    = {'modulo/cargaArchivos/fechas'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                            />

                        </Col>
                        <Col xl={3}></Col>
                        <Col xl={6} md={6} sm={12} xs={24}>
                            <TarjetaCargaArchivo
                                    titulo = {'Facturas SI'}
                                    url    = {'modulo/cargaArchivos/si/facturas'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                    notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                    ComunesTipoDisenio = {ComunesTipoDisenio}
                                />
                        </Col>
                        <Col xl={6} md={6} sm={12} xs={24}>
                            <TarjetaCargaArchivo
                                titulo = {'Operaiones Sunat'}
                                url    = {'/modulo/cargaArchivos/si/estado-sunat-facturas'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={12} xs={24}>
                            <TarjetaCargaArchivo
                                titulo = {'Facturas Anuladas'}
                                url    = {'/'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xl={1}>
                    <NotiCarga 
                        notificaciones = {notificaciones}
                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                        ComunesTipoDisenio = {ComunesTipoDisenio}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default CargaArchivos
