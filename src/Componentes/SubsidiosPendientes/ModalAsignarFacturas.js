import React, { useState, useEffect } from 'react';
import { Modal, Checkbox, Row, Col, Button } from 'antd';
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import '../../Estilos/Componentes/SubsidiosPendientes/ModalAsignarFacturas.css'

const ModalAsignarFacturas = (props) => {

    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
    const [objetivo, setObjetivo] = useState("");

    const ComunesTipoDisenio = props.ComunesTipoDisenio

    useEffect(() => {

        if(mostrarModal == true){
            props.obtenerFacturasAsignadas()
        }

    }, [mostrarModal])

    useEffect(() => {

        setObjetivo(props.objetivo)

    }, [])
    
    const sumaValores = (ns) => {
        let acumulado = 0
        for (let i = 0; i < ns.length; i ++ ){
            acumulado += ns[i]
        }

        return acumulado
    }

    const calcularNuevoObjetivo = async () => {
        const impactos = props.facturas.map(x => x.impacto?parseFloat(x.impacto) :0)

        const acumulado = await sumaValores(impactos)

        setObjetivo(parseFloat(props.objetivo) - parseFloat(acumulado))
    }

    return (
        <>
            <div 
                style={{width:'20px', height:'20px', background:'green', cursor:'pointer'}}
                onClick={() => setMostrarModal(!mostrarModal)}
            >
                
            </div>

            <Modal
                title={null}
                footer={null}
                visible={mostrarModalConfirmacion} 
                onOk={() => setMostrarModalConfirmacion(!mostrarModalConfirmacion)}
                onCancel={() => setMostrarModalConfirmacion(!mostrarModalConfirmacion)}
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
                    ¿Está seguro que desea Subsidiar con las facturas seleccionadas?
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
                                onClick={() => props.asignarFacturas()}
                                loading={props.cargando_asignar_facturas_subsidiossipendientes}
                            >
                                Aceptar
                            </Button>
                        </Col>

                        <Col 
                            xl={12} style={{paddingLeft: '10px'}}
                            onClick={() => setMostrarModalConfirmacion(!mostrarModalConfirmacion)}
                        >
                            <div className="W600-S13-H17-C004FB8-L0015 Btn-Cancelar-Modal-Asignar-Facturas-Confirmacion">
                                Cancelar
                            </div>
                        </Col>
                    </Row>
                </div>


            </Modal>

            <Modal 
                title={null}
                footer={null}
                visible={mostrarModal} 
                onOk={() => setMostrarModal(!mostrarModal)}
                onCancel={() => setMostrarModal(!mostrarModal)}
                width={"100%"}
            >
                <div>
                    <div className="Wbold-S20-H27-C004FB8">Facturas Disponibles</div>

                    <div 
                        className="Wbold-S13-H17-C004FB8" 
                        style={{ 
                            display:'flex',
                            float: 'right',
                            alignItems: 'center'
                        }}
                    >
                        <div className="" >
                            Sub. Objetivo
                        </div>
                        <div
                            style={{
                                background: "#EDF0FA",
                                borderRadius: "22px",
                                padding:'8px 15px 8px 15px',
                                marginLeft:'15px'
                            }}
                        >
                            S/{<NumberFormat value={funFomratoDecimal(objetivo, 2)} displayType={'text'} thousandSeparator={true} />}
                        </div>
                    </div><br />
                    <div 
                        style={{overflowX:"auto", marginTop:'30px', height:'450px', width:'100%'}}
                        id="Contenedor-Tabla-Subsidios-So"
                        
                    >       
                        <table className="table-responsive-subsidios-so" style={{position:'relative', width:'100%'}}>
                            <thead 
                                className={ComunesTipoDisenio == "Light" ? "" : "C242526"}
                            >
                                <tr>
                                    <th 
                                        style={{borderRadius: "23px 0px 0px 23px"}}
                                        className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb C004FB8">Elegir</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb C004FB8">Fecha</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb C004FB8">Factura SI</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb C004FB8">Cod Producto </th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb C004FB8">Descripción</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb C004FB8">Valor Neto</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb C004FB8">Saldo Disponible</th>
                                    <th className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb C004FB8">Impacto</th>
                                    <th 
                                        style={{borderRadius: "0px 23px 23px 0px"}}
                                        className="Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb C004FB8">Nuevo Saldo</th>
                                </tr>
                            </thead>
                            
                            {
                                props.facturas.map((factura, posicionFactura) => {
                                    return (
                                        <tr
                                            style={
                                                ComunesTipoDisenio == "Light"
                                                ?{borderBottom: '1px solid #D7E8FF'}
                                                :{borderBottom: '1px solid #1c1e21'}
                                            }
                                        >
                                            <td
                                                style={{textAlign: "-webkit-center"}}
                                            >
                                                <Checkbox 
                                                    checked={factura.seleccionado}
                                                    className="checkbox-luminoso" onChange={()=>{}}></Checkbox>
                                            </td>
                                            
                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ? "W600-S12-H16-C706C64"
                                                    : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                }>
                                                    {factura.fecfecha}
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ? "W600-S12-H16-C706C64"
                                                    : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                }>
                                                    {factura.fsifactura}
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ? "W600-S12-H16-C706C64"
                                                    : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                }>
                                                    {factura.prosku}
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ? "W600-S12-H16-C706C64"
                                                    : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                }>
                                                    {factura.pronombre}
                                            </td>

                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ? "W600-S12-H16-C706C64"
                                                    : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                }>
                                                    S/{<NumberFormat value={funFomratoDecimal(factura.fdsvalorneto, 2)} displayType={'text'} thousandSeparator={true} />}
                                            </td>
                                            <td 
                                                className={
                                                    ComunesTipoDisenio == "Light"
                                                    ? "W600-S12-H16-C706C64"
                                                    : "Celda-td-Tabla-Subsidios-So W500-S12-H16-Cacafb7"
                                                }>
                                                    S/{<NumberFormat value={funFomratoDecimal(factura.fdssaldo, 2)} displayType={'text'} thousandSeparator={true} />}
                                            </td>

                                            <td>
                                                <div 
                                                    className={
                                                        parseFloat(factura.fdssaldo) < parseFloat(factura.impacto)
                                                        ?"Input-Blanco-Negro-Tabla-Campo W600-S13-H17-CFF3742"
                                                        :"Input-Blanco-Negro-Tabla-Campo W600-S12-H16-C706C64"
                                                    }
                                                    style={
                                                        parseFloat(factura.fdssaldo) < parseFloat(factura.impacto)
                                                        ?{border: "1px solid #FF3742", textAlignLast: "center"}
                                                        :{textAlignLast: "center"}
                                                    }
                                                >
                                                    <input 
                                                        className="Input-Sin-Estilo-Tabla-Campo"
                                                        type='number'
                                                        onChange={
                                                            async (e) => {
                                                                // setObjetivo(objetivo - e.target.value)
                                                                await props.CambiarImpactoFacturaAsignada(posicionFactura, e.target.value)
                                                                calcularNuevoObjetivo()
                                                            }
                                                        }
                                                        value={factura.impacto}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="Input-Azul-Tabla-Campo W600-S12-H16-C706C64">
                                                    {
                                                        factura.impacto
                                                        ?<>
                                                            S/<NumberFormat value={funFomratoDecimal(parseFloat(factura.fdssaldo) - parseFloat(factura.impacto), 2)} displayType={'text'} thousandSeparator={true} />
                                                        </>
                                                        :<>
                                                            S/<NumberFormat value={funFomratoDecimal(parseFloat(factura.fdssaldo), 2)} displayType={'text'} thousandSeparator={true} />
                                                        </>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                            
                        </table>
                    </div>

                    <div
                        className="Wbold-S13-H17-C004FB8"
                        style={{
                            background: "#EDF0FA",
                            border: "1px solid #004FB8",
                            boxSizing: "border-box",
                            borderRadius: "14px",
                            width:'104px',                            
                            display: 'flex',
                            height: '28px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            float:'right',
                            marginTop:'10px',
                            cursor:'pointer'
                        }}
                        onClick={() => setMostrarModalConfirmacion(!mostrarModalConfirmacion)}
                    >
                        Seleccionar
                    </div>
                    
                    <div style={{height:'30px'}}></div>
                </div>
            </Modal>
        </>
    )
}

export default ModalAsignarFacturas
