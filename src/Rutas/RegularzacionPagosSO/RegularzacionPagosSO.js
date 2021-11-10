import React, {useState, useEffect} from 'react'
import {Row, Col} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import '../../Estilos/Rutas/RegularzacionPagosSO/RegularzacionPagosSO.css'
import '../../Estilos/Elementos/Fecha/Fecha.css'
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas';
import FiltroFechaTop from '../../Componentes/Top/FiltroFechaTop';
import IconoFiltroTablaSapBlanco from "../../Assets/Imagenes/Iconos/Comunes/FiltroTablaSapBlanco.png"
import FiltroTablaIluminado from '../../Componentes/Elementos/Tabla/Filtros/FiltroTablaIluminado';
import TbRegularizacionPagosSO from './Tabla/TbRegularizacionPagosSO';
import {
    ObtenerRegularizacionPagosSoReducer,
} from '../../Redux/Actions/RegularzacionPagosSO/RegularzacionPagosSO'

const RegularzacionPagosSO = () => {

    const dispatch = useDispatch();

    const {ComunesTipoDisenio} = useSelector(({comunes}) => comunes)
    const [mostrarModalFiltrosColumnas , setMostrarModalFiltrosColumnas] = useState(false)

    const {
        data_regularizacion_pagos_so_real,
        data_regularizacion_pagos_so,

        cargando_tabla_regularizacion_pagos_so,
        cargando_tabla_facturas_asignar_regularizacion_pagos_so

    } = useSelector(({regularzacionPagosSO}) => regularzacionPagosSO);

    const {
        cargando_eliminar_facturas_subsidiossipendientes,
        cargando_asignar_facturas_subsidiossipendientes,
        AgrupacionesColumnas_Subsidios_Pendientes
    } = useSelector(({subsidiosPendientes}) => subsidiosPendientes);

    const [mostrarNombreCliente, setMostrarNombreCliente] = useState(true)
    const [mostrarCodigoProducto, setMostrarCodigoProducto] = useState(true)

    const {
        ComunesFechaInicio,
        ComunesFechaFinal,
    } = useSelector(({comunes}) => comunes);

    useEffect(() => {
        dispatch(ObtenerRegularizacionPagosSoReducer())
    }, [ComunesFechaInicio, ComunesFechaFinal]);

    return (
        <Row>
            <Col 
                xl={24} className="CEDF0FA" style={{paddingTop:'10px', paddingBottom:'10px'}}
            >
                <div 
                    className={ComunesTipoDisenio == "Light" ?"CEDF0FA Wbold-S20-H27-C004FB8" :"Wbold-S20-H27-Ce4e6eb"}
                    style={{ paddingTop:'1px', paddingLeft:'40px', paddingBottom:'1px'}}
                >
                    <FiltroFechas 
                        titulo = {"Regularización de Pagos Sell Out"}
                    />
                </div>
            </Col>

            <Col 
                xl={4} 
                style={{display:'flex', alignItems: "center", paddingLeft:'40px', paddingTop:'10px'}}
                className="Wbold-S13-H17-C004FB8"
            >

                <FiltroFechaTop 
                    texto = {"Fecha Inicio"}
                />
            </Col>

            <Col 
                xl={4} 
                style={{display:'flex', alignItems: "center", paddingLeft:'40px', paddingTop:'10px'}}
                className="Wbold-S13-H17-C004FB8"
            >
                <FiltroFechaTop 
                    texto = {"Fecha Fin"}
                />
            </Col>

            <Col 
                xl={16}
                style={{
                    width: '100%',
                    textAlign: "-webkit-right",
                    paddingRight:'40px',
                    paddingTop: '10px'
                }}
            >
                <div 
                    className="Contenedor-Filtros-Columnas-Tabla-Elementos Wbold-S13-H17-CFFFFFF"
                    style={{
                        cursor:'pointer'
                    }}
                    onClick={() => {
                        setMostrarModalFiltrosColumnas(!mostrarModalFiltrosColumnas)                
                    }}
                >
                    Filtros
                    <img className="Icono-Filtros-Tabla-Sap-Blanco" src={IconoFiltroTablaSapBlanco} /> 
                </div>
            </Col>

            <Col 
                xl={24}
                style={{paddingLeft:'40px', paddingTop:'20px', paddingRight:'40px'}}
            >

                <Row style={{width:'100%'}}>

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                            campo = {"clizona"}
                            titulo = {"Zona"}
                            pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                        />
                    </Col>

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                            campo = {"clitv"}
                            titulo = {"Territorio"}
                            pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                        />
                    </Col>

                    <Col 
                        xl={4} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        {
                            mostrarNombreCliente == true
                            ?<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                                campo = {"clihml"}
                                titulo = {"Nombre Cliente"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                            />
                            :<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                                campo = {"clicodigoshipto"}
                                titulo = {"Codigo Cliente"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                            />
                        }
                    </Col>

                    {/* <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                            campo = {"catnombre"}
                            titulo = {"Categoría"}
                            pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                        />
                    </Col> */}

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                            campo = {"cosnombre"}
                            titulo = {"Sector"}
                            pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                        />
                    </Col>

                    {/* <Col 
                        xl={3} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                            campo = {"propresentacion"}
                            titulo = {"Presentación"}
                            pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                        />
                    </Col> */}

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                            campo = {"sdevalidado"}
                            titulo = {"Validación"}
                            esValidacion = {true}
                            pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                        />
                    </Col>

                    {/* <Col xl={2}></Col> */}

                    <Col 
                        xl={4} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        {
                            mostrarCodigoProducto == true
                            ?<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                                campo = {"prosku"}
                                titulo = {"Cod. Producto"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                            />
                            :<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                                campo = {"pronombre"}
                                titulo = {"Nombre Producto"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                            />
                        }
                    </Col>

                    <Col 
                        xl={3} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_regularizacion_pagos_so_real}
                            campo = {"sdesac"}
                            titulo = {"Conexión"}
                            esConexion = {true}
                            pertenenciaFiltros = {"REGULARIZACIONPENDIENTESSO"}
                        />
                    </Col>
                </Row>
            </Col>


            <Col 
                xl={24} 
                style={{paddingLeft:'40px', paddingRight:'40px'}}
            >
                <Row>
                    <Col xl={24} md={24} sm={24} xs={24}>
                        {
                            data_regularizacion_pagos_so.length > 0
                            ?<TbRegularizacionPagosSO 
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                                data_regularizacion_pagos_so_real = {data_regularizacion_pagos_so_real}
                                data_regularizacion_pagos_so = {data_regularizacion_pagos_so}
                                MOCK_DATA = {data_regularizacion_pagos_so}
                                cargando_eliminar_facturas_subsidiossipendientes = {cargando_eliminar_facturas_subsidiossipendientes}
                                cargando_asignar_facturas_subsidiossipendientes = {cargando_asignar_facturas_subsidiossipendientes}
                                cargando_tabla_regularizacion_pagos_so = {cargando_tabla_regularizacion_pagos_so}
                                cargando_tabla_facturas_asignar_regularizacion_pagos_so = {cargando_tabla_facturas_asignar_regularizacion_pagos_so}
                                mostrarModalFiltrosColumnas = {mostrarModalFiltrosColumnas}
                                setMostrarModalFiltrosColumnas = {(s) => setMostrarModalFiltrosColumnas(s)}
                                AgrupacionesColumnas_Subsidios_Pendientes = {AgrupacionesColumnas_Subsidios_Pendientes}
                            />
                            :null
                        }
                        {/* <TablaSubsidioPendiente 
                            ComunesTipoDisenio = {ComunesTipoDisenio}
                        /> */}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default RegularzacionPagosSO