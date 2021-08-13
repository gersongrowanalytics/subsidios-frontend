import React, {useEffect, useState} from 'react'
import { Modal, Row, Col, Button } from 'antd';
import '../../Estilos/Componentes/SubsidiosPendientes/TablaSubsidioPendiente.css'
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerSubsidiosPendientesReducer,
    ObtenerFacturasSubsidioPendienteReducer,
    EliminarFacturaAsignadaReducer
} from '../../Redux/Actions/SubsidiosPendientes/SubsidiosPendientes'
import {
    DesplegarSubsidiosPendientesReducer,
    DesplegarSubsidioPendienteReducer,
    CambiarImpactoFacturaAsignadaReducer
} from '../../Redux/Actions/SubsidiosPendientes/SubsidiosPendientesFront'
import IconoDesplegarAbajo from '../../Assets/Imagenes/Iconos/desplegar_abajo.svg'
import IconoDesplegarDerecha from '../../Assets/Imagenes/Iconos/flecha-derecha.svg'
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import ModalAsignarFacturas from './ModalAsignarFacturas';
import {
    AsignarFacturasSubsidioReducer
} from '../../Redux/Actions/SubsidiosPendientes/SubsidiosPendientes'
import IconoEliminarAzul from '../../Assets/Imagenes/Iconos/iconoEliminarAzul.png'
import IconoAgregarNaranja from '../../Assets/Imagenes/Iconos/iconoAgregarNaranja.png'

const TablaSubsidioPendiente = (props) => {

    const dispatch = useDispatch();
    const {
        data_subsidiossipendientes,
        data_descarga_subsidiossipendientes,
        total_soles_subsidiossipendientes,
        cargando_eliminar_facturas_subsidiossipendientes,
        cargando_asignar_facturas_subsidiossipendientes
    } = useSelector(({subsidiosPendientes}) => subsidiosPendientes);

    const {
        ComunesFechaInicio,
        ComunesFechaFinal,
    } = useSelector(({comunes}) => comunes);

    useEffect(() => {
        dispatch(ObtenerSubsidiosPendientesReducer())
    }, [ComunesFechaInicio, ComunesFechaFinal]);

    const ComunesTipoDisenio = props.ComunesTipoDisenio

    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [dataFacturaEliminar, setDataFacturaEliminar] = useState({});

    return (
        <div 
            style={{overflowX:"auto", marginTop:'15px', boxShadow: "0px 0px 15px #D8DFE9", height:'500px'}} 
            id="Contenedor-Tabla-Subsidios-So"
            
        >       

            <Modal
                title={null}
                footer={null}
                visible={mostrarModalEliminar} 
                onOk={() => setMostrarModalEliminar(!mostrarModalEliminar)}
                onCancel={() => setMostrarModalEliminar(!mostrarModalEliminar)}
                width={"406px"}
                closeIcon={" "}
                className="Contenedor-Modal-Asignar-Facturas-Confirmacion"
                centered
            >

                <div 
                    style={{
                        textAlign: "-webkit-center"
                    }}
                    className="W600-S13-H17-C004FB8"
                >
                    ¿Está seguro que desea Eliminar factura seleccionadas?
                </div>

                <div style={{width:'100%', marginTop:'25px'}}>
                    <Row
                        style={{
                            display: "flex",
                        }}
                    >
                        <Col xl={12} style={{paddingRight: '10px', textAlign: "-webkit-right"}}>
                            <Button
                                id="Btn-Aceptar-Modal-Asignar-Facturas-Confirmacion"
                                className="W600-S13-H17-CFFFFFF"
                                onClick={async() => {
                                    await dispatch(EliminarFacturaAsignadaReducer(dataFacturaEliminar))
                                    setMostrarModalEliminar(!mostrarModalEliminar)
                                }}
                                loading={cargando_eliminar_facturas_subsidiossipendientes}
                            >
                                Aceptar
                            </Button>
                        </Col>

                        <Col 
                            xl={12} style={{paddingLeft: '10px'}}
                            onClick={() => setMostrarModalEliminar(!mostrarModalEliminar)}
                        >
                            <div className="W600-S13-H17-C004FB8-L0015 Btn-Cancelar-Modal-Asignar-Facturas-Confirmacion">
                                Cancelar
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>

            <table className="table-responsive-subsidios-so" style={{position:'relative' ,width:'100%'}}>
                <thead 
                    className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                >
                    <tr>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Zona</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Territorio</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Cliente</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Sub Cliente </th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >RUC Sub Cliente</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Sector</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Cod Producto</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Nombre Producto</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Sub Objetivo</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Fac Impactar</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Fecha</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Diferencia Ahorro</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        >Estado</th>
                        <th 
                            className={
                                ComunesTipoDisenio == "Light"
                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF"
                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                            }
                        ></th>
                    </tr>
                </thead>
                <tr>
                    <td 
                        colSpan="14" 
                        id="Total-Cuerpo-Tabla-Subsidios-So" 
                        className={ComunesTipoDisenio == "Light" ? "CEDF0FA Wbold-S13-H17-C004FB8" : "C2d2d2e Wbold-S11-H20-Ce4e6eb"}
                    >
                        Grand Total
                    </td>
                </tr>

                {
                    data_subsidiossipendientes.map((zona, posicion) => {
                        return (
                            <>
                                <tr 
                                    style={
                                        ComunesTipoDisenio == "Light"
                                        ?{borderBottom: '1px solid #D7E8FF'}
                                        :{borderBottom: '1px solid #1c1e21'}
                                    }
                                >
                                    <td 
                                        style={
                                            zona.desplegado == true
                                            ? ComunesTipoDisenio == "Light"
                                                ?{background:'white'}
                                                :{background:'#565656'}
                                            // ?{ ?background:'#565656' :background:'#565656'}
                                            :{}
                                        }
                                        // colSpan="13" 
                                        className={
                                            ComunesTipoDisenio == "Light"
                                            ?"CFFFFFF Wbold-S13-H17-C004FB8"
                                            :"Zona-Cuerpo-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }
                                    >
                                        {
                                            zona.desplegado == true
                                            ?<img 
                                                onClick={() => dispatch(DesplegarSubsidiosPendientesReducer(posicion))} src={IconoDesplegarAbajo} className="Icono-Flecha-Tabla-Subsidios-So" />
                                            :<img 
                                                onClick={() => dispatch(DesplegarSubsidiosPendientesReducer(posicion))} src={IconoDesplegarDerecha} className="Icono-Flecha-Tabla-Subsidios-So" />
                                        }
                                        {zona.clizona}
                                        {/* {" "}(S/<NumberFormat value={funFomratoDecimal(zona.sumSdeZona, 2)} displayType={'text'} thousandSeparator={true} />) */}
                                    </td>
                                </tr>
                                {
                                    zona.desplegado == true
                                    ?
                                    zona.data.map((dato, posicionData) => {

                                        const sumaValores = (ns) => {
                                            let acumulado = 0
                                            for (let i = 0; i < ns.length; i ++ ){
                                                acumulado += ns[i]
                                            }

                                            return acumulado
                                        }

                                        const valorizados = dato.facturas.map(x => parseFloat(x.sfsvalorizado))
                                        const sumaValorizado = sumaValores(valorizados)

                                        return (
                                            <>
                                                <tr 
                                                    style={
                                                        ComunesTipoDisenio == "Light"
                                                        ?{borderBottom: '1px solid #D7E8FF'}
                                                        :{borderBottom: '1px solid #1c1e21'}
                                                    }
                                                >
                                                    {/* <td className="Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7">{dato.cliid+" - "+dato.clizona}</td> */}
                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }
                                                        style={{textAlign: "right"}}
                                                    >
                                                        {
                                                            dato.desplegado == true
                                                            ?<img 
                                                                onClick={() => dispatch(DesplegarSubsidioPendienteReducer(posicion, posicionData))} src={IconoDesplegarAbajo} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                            :<img 
                                                                onClick={() => dispatch(DesplegarSubsidioPendienteReducer(posicion, posicionData))} src={IconoDesplegarDerecha} className="Icono-Flecha-Tabla-Subsidios-So" />
                                                        }
                                                    </td>
                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            {dato.clizona}
                                                    </td>
                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            {dato.clinombre}
                                                    </td>
                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            {dato.sdesubcliente}
                                                    </td>
                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            {dato.sderucsubcliente}
                                                    </td>
                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            {dato.sdesector}
                                                    </td>

                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            {dato.prosku}
                                                    </td>

                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            {dato.pronombre}
                                                    </td>

                                                    {/* <td className="Celda-td-Tabla-Subsidios-So W500-S14-H16-Cacafb7">{funFomratoDecimal(dato.sdemontoareconocerreal)}</td> */}
                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            S/{<NumberFormat value={funFomratoDecimal(dato.sdemontoareconocerreal, 2)} displayType={'text'} thousandSeparator={true} />}
                                                    </td>

                                                    <td 
                                                        className="Celda-td-Tabla-Subsidios-So W500-S12-H16-1876F2" 
                                                    >

                                                        
                                                    </td>

                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            
                                                    </td>
                                                    <td 
                                                        className={
                                                            ComunesTipoDisenio == "Light"
                                                            ? "Wbold-S13-H17-C004FB8"
                                                            : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                        }>
                                                            {
                                                                dato.facturas.length > 0 
                                                                ?<>
                                                                    S/{<NumberFormat value={funFomratoDecimal(sumaValorizado, 2)} displayType={'text'} thousandSeparator={true} />}
                                                                </> 
                                                                :null
                                                            }
                                                    </td>
                                                    {/* <td 
                                                        className="Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7" style={{display:'flex'}}>

                                                            asdasd
                                                    </td> */}
                                                    <td>
                                                        {/* <div style={{width:'20px', height:'20px', background:'green', cursor:'pointer'}}></div> */}
                                                        <ModalAsignarFacturas

                                                            ComunesTipoDisenio = {ComunesTipoDisenio}
                                                            obtenerFacturasAsignadas = {
                                                                () => {
                                                                    dispatch(ObtenerFacturasSubsidioPendienteReducer(posicion, posicionData, dato.sdecodigodestinatario))
                                                                }
                                                            }
                                                            facturas = {dato.facturasasignar?dato.facturasasignar :[] }

                                                            CambiarImpactoFacturaAsignada = {
                                                                (posicionFactura, impacto) => dispatch(CambiarImpactoFacturaAsignadaReducer(posicion, posicionData, posicionFactura, impacto))
                                                            }

                                                            objetivo = {parseFloat(dato.sdemontoareconocerreal) - parseFloat(sumaValorizado)}

                                                            asignarFacturas = {
                                                                () => {
                                                                    dispatch(AsignarFacturasSubsidioReducer(dato.sdeid, dato.sdemontoareconocerreal, dato.facturasasignar))
                                                                }
                                                            }

                                                            cargando_asignar_facturas_subsidiossipendientes = {cargando_asignar_facturas_subsidiossipendientes}
                                                        />
                                                    </td>
                                                    
                                                </tr>

                                                {
                                                    dato.desplegado == true
                                                    ?dato.facturas.map((factura) => {
                                                        return (
                                                            <tr
                                                                style={
                                                                    ComunesTipoDisenio == "Light"
                                                                    ?{borderBottom: '1px solid #D7E8FF'}
                                                                    :{borderBottom: '1px solid #1c1e21'}
                                                                }
                                                            >
                                                                <td></td>
                                                                <td 
                                                                    className={
                                                                        ComunesTipoDisenio == "Light"
                                                                        ? "W600-S12-H16-C706C64"
                                                                        : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                    }>
                                                                        {dato.clizona}
                                                                </td>
                                                                <td 
                                                                    className={
                                                                        ComunesTipoDisenio == "Light"
                                                                        ? "W600-S12-H16-C706C64"
                                                                        : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                    }>
                                                                        {dato.clinombre}
                                                                </td>
                                                                <td 
                                                                    className={
                                                                        ComunesTipoDisenio == "Light"
                                                                        ? "W600-S12-H16-C706C64"
                                                                        : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                    }>
                                                                        {dato.sdesubcliente}
                                                                </td>
                                                                <td 
                                                                    className={
                                                                        ComunesTipoDisenio == "Light"
                                                                        ? "W600-S12-H16-C706C64"
                                                                        : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                    }>
                                                                        {dato.sderucsubcliente}
                                                                </td>
                                                                <td 
                                                                    className={
                                                                        ComunesTipoDisenio == "Light"
                                                                        ? "W600-S12-H16-C706C64"
                                                                        : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                    }>
                                                                        {dato.sdesector}
                                                                </td>

                                                                <td 
                                                                    className={
                                                                        ComunesTipoDisenio == "Light"
                                                                        ? "W600-S12-H16-C706C64"
                                                                        : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                    }>
                                                                        {dato.prosku}
                                                                </td>

                                                                <td 
                                                                    className={
                                                                        ComunesTipoDisenio == "Light"
                                                                        ? "W600-S12-H16-C706C64"
                                                                        : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                    }>
                                                                        {dato.pronombre}
                                                                </td>
                                                                <td 
                                                                    className={
                                                                        ComunesTipoDisenio == "Light"
                                                                        ? "W600-S12-H16-C706C64"
                                                                        : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                                    }>
                                                                        S/{<NumberFormat value={funFomratoDecimal(factura.sfsdiferenciaobjetivo, 2)} displayType={'text'} thousandSeparator={true} />}
                                                                </td>
                                                                <td>
                                                                    <div className="Input-Blanco-Negro-Tabla-Campo W600-S12-H16-C706C64">
                                                                        {factura.fsifactura}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="Input-Azul-Tabla-Campo W600-S12-H16-C706C64">
                                                                        {factura.fecfecha}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="Input-Azul-Tabla-Campo W600-S12-H16-C706C64">
                                                                        S/{<NumberFormat value={funFomratoDecimal(factura.sfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}
                                                                    </div>
                                                                </td>
                                                                {/* <td></td> */}
                                                                <td>
                                                                    <div
                                                                        onClick={
                                                                            () => {
                                                                                setDataFacturaEliminar({
                                                                                    "sfsid" : factura.sfsid,
                                                                                    "fdsid" : factura.fdsid,
                                                                                })
                                                                                setMostrarModalEliminar(!mostrarModalEliminar)
                                                                            }
                                                                        }
                                                                        style={{width:'20px', height:'20px',  cursor:'pointer'}}>
                                                                            <img src={IconoEliminarAzul}  width="20px"/>
                                                                        </div>
                                                                </td>
                                                                {/* <td>{factura.fsifactura}</td> */}
                                                            </tr>
                                                        )
                                                    })
                                                    :null
                                                }



                                            </>
                                        )
                                    })
                                    :null
                                }
                            </>
                        )
                    })
                }
                
            </table>
        </div>
    )
}

export default TablaSubsidioPendiente
