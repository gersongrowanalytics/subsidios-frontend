import React, {useState, useEffect} from 'react'
import {Row, Col} from 'antd'
import FiltroSubsidioPendiente from '../../../Componentes/SubsidiosPendientes/FiltroSubsidioPendiente'
import TablaSubsidioPendiente from '../../../Componentes/SubsidiosPendientes/TablaSubsidioPendiente'
import {useDispatch, useSelector} from "react-redux";
import '../../../Estilos/Rutas/SubsidiosPendientes/SubsidiosPendientes.css'
import '../../../Estilos/Elementos/Fecha/Fecha.css'
import FiltroBtnTabla from '../../../Componentes/Elementos/Tabla/FiltroBtnTabla';
import FiltroFechas from '../../../Componentes/Subsidios/FiltroFechas';
import FiltroFechaTop from '../../../Componentes/Top/FiltroFechaTop';
import IconoFiltroTablaSapBlanco from "../../../Assets/Imagenes/Iconos/Comunes/FiltroTablaSapBlanco.png"
import FiltroTablaIluminado from '../../../Componentes/Elementos/Tabla/Filtros/FiltroTablaIluminado';
import TbSubPendientes from './Tabla/TbSubPendientes';
import {
    ObtenerSubsidiosPendientesReducer,
} from '../../../Redux/Actions/SubsidiosPendientes/SubsidiosPendientes'

const SubPendientesTbDinamica = () => {
    
    const dispatch = useDispatch();

    const {ComunesTipoDisenio} = useSelector(({comunes}) => comunes)
    const [mostrarModalFiltrosColumnas , setMostrarModalFiltrosColumnas] = useState(false)

    const {
        data_subsidiossipendientes_real,
        data_subsidiossipendientes,
        data_descarga_subsidiossipendientes,
        total_soles_subsidiossipendientes,
        cargando_eliminar_facturas_subsidiossipendientes,
        cargando_asignar_facturas_subsidiossipendientes,
        cargando_tabla_subsidiospendientes,
        cargando_tabla_facturas_asignar_subsidiospendientes,
        AgrupacionesColumnas_Subsidios_Pendientes,
        facturas_asignadas_enviar_subpendientes
    } = useSelector(({subsidiosPendientes}) => subsidiosPendientes);

    const [mostrarNombreCliente, setMostrarNombreCliente] = useState(true)
    const [mostrarCodigoProducto, setMostrarCodigoProducto] = useState(true)

    const {
        ComunesFechaInicio,
        ComunesFechaFinal,
    } = useSelector(({comunes}) => comunes);

    useEffect(() => {
        dispatch(ObtenerSubsidiosPendientesReducer())
    }, [ComunesFechaInicio, ComunesFechaFinal]);

    return (
        <Row style={{marginBottom:'150px'}}>
            <Col 
                xl={24} className="CEDF0FA" style={{paddingTop:'10px', paddingBottom:'10px'}}
            >
                <div 
                    className={ComunesTipoDisenio == "Light" ?"CEDF0FA Wbold-S20-H27-C004FB8" :"Wbold-S20-H27-Ce4e6eb"}
                    style={{ paddingTop:'1px', paddingLeft:'40px', paddingBottom:'1px'}}
                >
                    <FiltroFechas 
                        titulo = {"Subsidios Pendientes"}
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
                {/* <span style={{paddingRight:'15px'}}>Fecha Inicio</span>
                <div className="Contenedor-Filtro-Fecha Wnormal-S13-H17-C004FB8">
                    DD/MM/AA
                </div> */}
            </Col>

            <Col 
                xl={4} 
                style={{display:'flex', alignItems: "center", paddingLeft:'40px', paddingTop:'10px'}}
                className="Wbold-S13-H17-C004FB8"
            >
                <FiltroFechaTop 
                    texto = {"Fecha Fin"}
                />
                {/* <span style={{paddingRight:'15px'}}>Fecha Fin</span>
                <div className="Contenedor-Filtro-Fecha Wnormal-S13-H17-C004FB8">
                    DD/MM/AA
                </div> */}
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
                        // dispatch(DesplegarSubsidiosSoReducer(0, true))
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
                            data_subsidiosso_real = {data_subsidiossipendientes_real}
                            campo = {"clizona"}
                            titulo = {"Zona"}
                            pertenenciaFiltros = {"SUBPENDIENTES"}
                        />
                    </Col>

                    <Col 
                        xl={3} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossipendientes_real}
                            campo = {"sdeterritorio"}
                            titulo = {"Territorio"}
                            pertenenciaFiltros = {"SUBPENDIENTES"}
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
                                data_subsidiosso_real = {data_subsidiossipendientes_real}
                                campo = {"clinombre"}
                                titulo = {"Nombre Cliente"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                pertenenciaFiltros = {"SUBPENDIENTES"}
                            />
                            :<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_subsidiossipendientes_real}
                                campo = {"clicodigoshipto"}
                                titulo = {"Codigo Cliente"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                pertenenciaFiltros = {"SUBPENDIENTES"}
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
                            data_subsidiosso_real = {data_subsidiossipendientes_real}
                            campo = {"catnombre"}
                            titulo = {"Categoría"}
                            pertenenciaFiltros = {"SUBPENDIENTES"}
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
                            data_subsidiosso_real = {data_subsidiossipendientes_real}
                            campo = {"sdesector"}
                            titulo = {"Sector"}
                            pertenenciaFiltros = {"SUBPENDIENTES"}
                        />
                    </Col>

                    <Col 
                        xl={3} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossipendientes_real}
                            campo = {"propresentacion"}
                            titulo = {"Presentación"}
                            pertenenciaFiltros = {"SUBPENDIENTES"}
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
                                data_subsidiosso_real = {data_subsidiossipendientes_real}
                                campo = {"prosku"}
                                titulo = {"Cod. Producto"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                pertenenciaFiltros = {"SUBPENDIENTES"}
                            />
                            :<FiltroTablaIluminado 
                                data_subsidiosso_real = {data_subsidiossipendientes_real}
                                campo = {"pronombre"}
                                titulo = {"Nombre Producto"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                pertenenciaFiltros = {"SUBPENDIENTES"}
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
                            data_subsidiosso_real = {data_subsidiossipendientes_real}
                            campo = {"sdevalidado"}
                            titulo = {"Validación"}
                            esValidacion = {true}
                            pertenenciaFiltros = {"SUBPENDIENTES"}
                        />
                    </Col> */}

                    <Col 
                        xl={3} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {data_subsidiossipendientes_real}
                            campo = {"sdesac"}
                            titulo = {"Conexión"}
                            esConexion = {true}
                            pertenenciaFiltros = {"SUBPENDIENTES"}
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
                            data_subsidiossipendientes.length > 0
                            ?<TbSubPendientes 
                                ComunesTipoDisenio = {ComunesTipoDisenio}
                                data_subsidiossipendientes_real = {data_subsidiossipendientes_real}
                                data_subsidiossipendientes = {data_subsidiossipendientes}
                                MOCK_DATA = {data_subsidiossipendientes}
                                data_descarga_subsidiossipendientes = {data_descarga_subsidiossipendientes}
                                total_soles_subsidiossipendientes = {total_soles_subsidiossipendientes}
                                cargando_eliminar_facturas_subsidiossipendientes = {cargando_eliminar_facturas_subsidiossipendientes}
                                cargando_asignar_facturas_subsidiossipendientes = {cargando_asignar_facturas_subsidiossipendientes}
                                cargando_tabla_subsidiospendientes = {cargando_tabla_subsidiospendientes}
                                cargando_tabla_facturas_asignar_subsidiospendientes = {cargando_tabla_facturas_asignar_subsidiospendientes}
                                mostrarModalFiltrosColumnas = {mostrarModalFiltrosColumnas}
                                setMostrarModalFiltrosColumnas = {(s) => setMostrarModalFiltrosColumnas(s)}
                                AgrupacionesColumnas_Subsidios_Pendientes = {AgrupacionesColumnas_Subsidios_Pendientes}
                                facturas_asignadas_enviar_subpendientes = {facturas_asignadas_enviar_subpendientes}
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

export default SubPendientesTbDinamica
