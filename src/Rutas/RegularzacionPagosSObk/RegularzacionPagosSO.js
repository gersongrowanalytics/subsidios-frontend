import React, {useEffect, useState} from 'react'
import { Row, Col, Spin } from 'antd'
import {useDispatch, useSelector} from "react-redux";
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas'
import FiltroFechaTop from '../../Componentes/Top/FiltroFechaTop'
import IconoFiltroTablaSapBlanco from "../../Assets/Imagenes/Iconos/Comunes/FiltroTablaSapBlanco.png"
import FiltroTablaIluminado from '../../Componentes/Elementos/Tabla/Filtros/FiltroTablaIluminado';
import ReactExport from 'react-data-export';
import { LoadingOutlined } from '@ant-design/icons'
import IconoDescargar from '../../Assets/Imagenes/Iconos/descargar.svg'
import IconoDescargarLight from '../../Assets/Imagenes/Iconos/DescargarLight.svg'
import TbRegularizacionSO from './TbRegularizacionSO';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const RegularzacionPagosSO = () => {

    const dispatch = useDispatch()

    const {
        ComunesTipoDisenio,
        ComunesFechaInicio,
        ComunesFechaFinal,
    } = useSelector(({comunes}) => comunes);

    const [mostrarModalFiltrosColumnas , setMostrarModalFiltrosColumnas] = useState(false)
    const [mostrarNombreCliente, setMostrarNombreCliente] = useState(true)
    const [mostrarCodigoProducto, setMostrarCodigoProducto] = useState(true)

    useEffect(() => {

        
        
    }, [])

    return (
        <div style={{paddingBottom:'100px'}}>
            <div 
                className={
                    ComunesTipoDisenio == "Light"
                    ?"Wbold-S20-H27-C004FB8 CEDF0FA"
                    :"Wbold-S20-H27-Ce4e6eb"
                }
                style={{
                    display:'flex',
                    height:'45px',
                    paddingLeft:'40px',
                    alignItems: 'center'
                }}
            >

                    <FiltroFechas 
                        titulo = {"Regularización de Pagos Sell Out"}
                    />

            </div>

            <div style={{marginBottom:'20px'}}>
                <Row style={{ paddingTop:'15px'}}>
                    <Col 
                        xl={4} 
                        style={{display:'flex', alignItems: "center", paddingLeft:'40px',}}
                        className="Wbold-S13-H17-C004FB8"
                    >
                        <FiltroFechaTop 
                            texto = {"Fecha Inicio"}
                        /> 
                    </Col>

                    <Col 
                        xl={4} 
                        style={{display:'flex', alignItems: "center", paddingLeft:'40px',}}
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
                            paddingRight:'40px'
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
                </Row>
            </div>
            
            <div id="Contenedor-Filtros-Tabla-Subsidios-So" style={{paddingLeft:'40px', paddingRight:'40px'}}>
                <Row style={{width:'100%'}}>

                    <Col 
                        xl={2} 
                        style={{
                            paddingLeft:'5px', paddingRight:'5px',
                            position:'relative'
                        }}
                    >
                        <FiltroTablaIluminado 
                            data_subsidiosso_real = {[]}
                            campo = {"clizona"}
                            titulo = {"Zona"}
                            pertenenciaFiltros = {"SUBSI"}
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
                            data_subsidiosso_real = {[]}
                            campo = {"sdeterritorio"}
                            titulo = {"Territorio"}
                            pertenenciaFiltros = {"SUBSI"}
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
                                data_subsidiosso_real = {[]}
                                campo = {"clinombre"}
                                titulo = {"Nombre Cliente"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                pertenenciaFiltros = {"SUBSI"}
                            />
                            :<FiltroTablaIluminado 
                                data_subsidiosso_real = {[]}
                                campo = {"clicodigoshipto"}
                                titulo = {"Codigo Cliente"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarNombreCliente(!mostrarNombreCliente)}
                                pertenenciaFiltros = {"SUBSI"}
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
                            data_subsidiosso_real = {[]}
                            campo = {"catnombre"}
                            titulo = {"Categoría"}
                            pertenenciaFiltros = {"SUBSI"}
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
                            data_subsidiosso_real = {[]}
                            campo = {"sdesector"}
                            titulo = {"Sector"}
                            pertenenciaFiltros = {"SUBSI"}
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
                            data_subsidiosso_real = {[]}
                            campo = {"propresentacion"}
                            titulo = {"Presentación"}
                            pertenenciaFiltros = {"SUBSI"}
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
                            mostrarCodigoProducto == true
                            ?<FiltroTablaIluminado 
                                data_subsidiosso_real = {[]}
                                campo = {"prosku"}
                                titulo = {"Cod. Producto"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                pertenenciaFiltros = {"SUBSI"}
                            />
                            :<FiltroTablaIluminado 
                                data_subsidiosso_real = {[]}
                                campo = {"pronombre"}
                                titulo = {"Nombre Producto"}
                                tieneSwitch = {true}
                                accionSwitch = { () => setMostrarCodigoProducto(!mostrarCodigoProducto)}
                                pertenenciaFiltros = {"SUBSI"}
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
                            data_subsidiosso_real = {[]}
                            campo = {"sdesac"}
                            titulo = {"Conexión"}
                            esConexion = {true}
                            pertenenciaFiltros = {"SUBSI"}
                        />
                    </Col>

                </Row>
                
            </div>
            

            {
                <TbRegularizacionSO
                    ComunesTipoDisenio = {ComunesTipoDisenio}
                />
            }

            <ExcelFile 
                filename="Subsidios Si"
                element={
                    <div 
                        id={
                            ComunesTipoDisenio == "Light"
                            ?"Btn-Flotante-Descargar-Subsidios-So-Light"
                            :"Btn-Flotante-Descargar-Subsidios-So"
                        }
                    >
                        <Spin 
                            spinning={false}
                            indicator={<LoadingOutlined />}
                            style={
                                false == true
                                ?{width:'100%',
                                height:'100%',
                                cursor: 'not-allowed'}
                                :{}
                            }
                        >
                                <img src={
                                    ComunesTipoDisenio == "Light"
                                    ?IconoDescargarLight
                                    :IconoDescargar
                                } id="Icono-Flotante-Descargar-Subsidios-So" />
                            
                        </Spin>
                    </div>
                }>
                <ExcelSheet 
                    dataSet={[]} 
                    name="Subsidios Si"
                />
            </ExcelFile>
        </div>
    )
}

export default RegularzacionPagosSO
