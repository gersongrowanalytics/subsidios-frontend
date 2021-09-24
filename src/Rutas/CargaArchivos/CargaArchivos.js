import React, {useState} from 'react'
import {Row, Col} from 'antd'
import CardCargarArchivo from '../../Componentes/CargaArchivos/CardCargaArchivo'
import TarjetaCargaArchivo from '../../Componentes/CargaArchivos/TarjetaCargaArchivo'
import NotiCarga from '../../Componentes/CargaArchivos/NotiCarga'
import {useDispatch, useSelector} from "react-redux";
import {CargarArchivoReducer, EliminarNotificacionReducer} from '../../Redux/Actions/CargaArchivos/CargaArchivos'
import {funPermisosObtenidos} from '../../Funciones/funPermiso'
import config from '../../config'

const CargaArchivos = () => {

    const dispatch = useDispatch();
    const [notificaciones, setNotificaciones] = useState([])
    const {notificaciones_cargaarchivos} = useSelector(({cargaArchivos}) => cargaArchivos);
    const {ComunesTipoDisenio} = useSelector(({comunes}) => comunes)
    const {LoginUsuario} = useSelector(({login}) => login);

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
                                <div onClick={() => console.log(LoginUsuario)} className="Wbold-S20-H27-C004FB8" style={{paddingLeft:'40px'}}>
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
                                    {/* última actualización 20 Julio 2021 */}
                                </div>
                            </Col>
                        </Row>

                    </div>
                </Col>
                <Col xl={18}>
                    <Row
                        style={{
                            display: 'flex',
                            placeContent: 'center',
                            marginLeft:'20px'
                        }}
                    >
                        {
                            funPermisosObtenidos(
                                LoginUsuario.permisos,
                                "CARGA.ARCHIVOS.TARJETA.SUBSIDIOS.APROBADOS",
                                <Col xl={6} md={6} sm={12} xs={24}>
                                    <TarjetaCargaArchivo
                                        titulo = {'Subsidio Aprobado'}
                                        subtitulo = {"(Plantilla)"}
                                        // url    = {'modulo/cargaArchivos/so/subsidios-no-aprobados'}
                                        url    = {'modulo/cargaArchivos/so/subsidios-so-plantilla'}
                                        CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        descargarPlantilla = {config.api+"Sistema/Modulos/CargaArchivos/Plantillas/Subsidios%20Aprobados_P.xlsx"}
                                    />
                                </Col>       
                            )
                        }

                        {
                            funPermisosObtenidos(
                                LoginUsuario.permisos,
                                "CARGA.ARCHIVOS.TARJETA.SUBSIDIOS.RECONOCIDO",
                                <Col xl={6} md={6} sm={12} xs={24}>
                                    <TarjetaCargaArchivo
                                        titulo = {'Subsidio Reconocido'}
                                        subtitulo = {"(Formato enviado por la Distribuidora)"}
                                        // url    = {'modulo/cargaArchivos/so/subsidios-sac'}
                                        url    = {'modulo/cargaArchivos/so/subsidios-so-automaticos-manuales'}
                                        CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        descargarPlantilla = {config.api+"Sistema/Modulos/CargaArchivos/Plantillas/Subsidios%20Reconocidos_P.xlsx"}
                                    />
                                </Col>  
                            )
                        }

                        {
                            funPermisosObtenidos(
                                LoginUsuario.permisos,
                                "CARGA.ARCHIVOS.TARJETA.SELL.OUT",
                                <Col xl={6} md={6} sm={12} xs={24}>
                                    <TarjetaCargaArchivo
                                        titulo = {'Sell Out'}
                                        subtitulo = {"(Efectivo)"}
                                        url    = {'modulo/cargaArchivos/so/so'}
                                        CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        descargarPlantilla = {config.api+"Sistema/Modulos/CargaArchivos/Plantillas/Sell%20Out%20Efectivo_P.xlsx"}
                                    />
                                </Col>       
                            )
                        }
                        
                        {
                            funPermisosObtenidos(
                                LoginUsuario.permisos,
                                "CARGA.ARCHIVOS.TARJETA.FACTURA.EFECTIVA",
                                <Col xl={6} md={6} sm={12} xs={24}>
                                    <TarjetaCargaArchivo
                                        titulo = {'Sell In'}
                                        subtitulo = {"(Factura Efectiva)"}
                                        url    = {'modulo/cargaArchivos/si/facturas'}
                                        CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        descargarPlantilla = {config.api+"Sistema/Modulos/CargaArchivos/Plantillas/Sell%20In%20(fectura%20efectiva).xlsx"}
                                    />
                                </Col>       
                            )
                        }
                        
                        {
                            funPermisosObtenidos(
                                LoginUsuario.permisos,
                                "CARGA.ARCHIVOS.TARJETA.OPERACIONES.SUNAT",
                                <Col xl={6} md={6} sm={12} xs={24}>
                                    <TarjetaCargaArchivo
                                        titulo = {'Operaciones Sunat'}
                                        url    = {'/modulo/cargaArchivos/si/estado-sunat-facturas'}
                                        CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        descargarPlantilla = {config.api+"Sistema/Modulos/CargaArchivos/Plantillas/Operaciones%20Sunat_P.xlsx"}
                                    />
                                </Col>
                            )
                        }

                        {
                            funPermisosObtenidos(
                                LoginUsuario.permisos,
                                "CARGA.ARCHIVOS.TARJETA.MAESTRA.PRODUCTOS",
                                <Col xl={6} md={6} sm={12} xs={24}>
                                    <TarjetaCargaArchivo
                                        titulo = {'Maestra de Productos'}
                                        url    = {'modulo/cargaArchivos/productos'}
                                        CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        
                                    />
                                </Col>
                            )
                        }

                        {
                            funPermisosObtenidos(
                                LoginUsuario.permisos,
                                "CARGA.ARCHIVOS.TARJETA.MAESTRA.CLIENTES",
                                <Col xl={6} md={6} sm={12} xs={24}>
                                    <TarjetaCargaArchivo
                                        titulo = {'Maestra de Clientes'}
                                        url    = {'modulo/cargaArchivos/clientes'}
                                        CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        descargarPlantilla = {config.api+"Sistema/Modulos/CargaArchivos/Plantillas/Maestra%20Clientes_P.xlsx"}
                                    />
                                </Col>  
                            )
                        }

                        {
                            funPermisosObtenidos(
                                LoginUsuario.permisos,
                                "CARGA.ARCHIVOS.TARJETA.MAESTRA.FECHAS",
                                <Col xl={6} md={6} sm={12} xs={24}>
                                    <TarjetaCargaArchivo
                                        titulo = {'Maestra de Fechas'}
                                        url    = {'modulo/cargaArchivos/asdasd'}
                                        CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                        ComunesTipoDisenio = {ComunesTipoDisenio}
                                        descargarPlantilla = ""
                                    />
                                </Col>                                
                            )
                        }
                        
                        <Col xl={3}></Col>
                        
                        
                        {/* <Col xl={6} md={6} sm={12} xs={24}> */}
                            {/* <TarjetaCargaArchivo
                                titulo = {'Facturas Anuladas'}
                                url    = {'/'}
                                CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                            /> */}
                        {/* </Col> */}
                    </Row>
                </Col>
                <Col xl={1}>
                    <NotiCarga 
                        notificaciones = {notificaciones}
                        notificaciones_cargaarchivos = {notificaciones_cargaarchivos}
                        ComunesTipoDisenio = {ComunesTipoDisenio}
                        EliminarNotificacionReducer = {(posicion) => dispatch(EliminarNotificacionReducer(posicion))}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default CargaArchivos
