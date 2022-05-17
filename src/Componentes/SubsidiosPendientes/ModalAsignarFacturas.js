import React, { useState, useEffect } from 'react';
import { Modal, notification, Row, Col, Button } from 'antd';
import '../../Estilos/Componentes/SubsidiosPendientes/ModalAsignarFacturas.css'
import IconoAgregarNaranja from '../../Assets/Imagenes/Iconos/iconoAgregarNaranja.png'
import ModalNotasCredito from '../../Componentes/Subsidios/ModalNotasCredito'
import ModalReconocimientos from '../../Componentes/Facturas/ModalReconocimientos'
import TbAsignarFacturas from './ModalAsignarFacturas/TbAsignarFacturas';
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import IconoCerrar from '../../Assets/Imagenes/Iconos/iconoCerrar.png'
import {useSelector} from "react-redux";

const ModalAsignarFacturas = (props) => {

    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
    const [objetivo, setObjetivo] = useState("");
    const [mostrarModalNotasCredito, setMostrarModalNotasCredito] = useState(false)
    const [pedidoOriginalSeleccionado, setPedidoOriginalSeleccionado] = useState("")
    const [proidSeleccionado, setProidSeleccionado] = useState(0)
    
    // RECONOCER
    const [fdsIdDetalleSeleccionado, setFdsIdDetalleSeleccionado] = useState("0")
    const [mostrarModalReconocimiento, setMostrarModalReconocimiento] = useState(false)

    const ComunesTipoDisenio = props.ComunesTipoDisenio
    const cargandoTabla = props.cargando_tabla_facturas_asignar_subsidiospendientes

    const {
        data_facturas_asignar_subpendientes
    } = useSelector(({subsidiosPendientes}) => subsidiosPendientes);

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
        const impactos = data_facturas_asignar_subpendientes.map(x => x.impacto?parseFloat(x.impacto) :0)

        const acumulado = await sumaValores(impactos)

        setObjetivo(parseFloat(props.objetivo) - parseFloat(acumulado))
    }

    return (
        <>
            <div 
                style={{width:'20px', height:'20px',cursor:'pointer'}}
                onClick={() => setMostrarModal(!mostrarModal)}
            >
                <img  width="20px" src={IconoAgregarNaranja} />
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
                closeIcon={<img onClick={() => setMostrarModal(!mostrarModal) } src={IconoCerrar} width='27px'/>}
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
                            Saldo Pendiente
                        </div>
                        <div
                            style={{
                                background: "#EDF0FA",
                                borderRadius: "22px",
                                padding:'8px 15px 8px 15px',
                                marginLeft:'15px'
                            }}
                        >
                            S/{<NumberFormat value={funFomratoDecimal(objetivo, 4)} displayType={'text'} thousandSeparator={true} />}
                        </div>
                    </div><br />
                            
                
                    {
                        props.facturas
                        ?props.facturas.length > 0
                            ?<TbAsignarFacturas 
                                
                                cargandoTabla   = {cargandoTabla}
                                IconoCargando   = {props.IconoCargando}
                                facturas        = {props.facturas}
                                
                                CambiarImpactoFacturaAsignada = {props.CambiarImpactoFacturaAsignada}
                                calcularNuevoObjetivo         = {calcularNuevoObjetivo}
                                setFdsIdDetalleSeleccionado   = {setFdsIdDetalleSeleccionado}
                                mostrarModalReconocimiento    = {mostrarModalReconocimiento}
                                setMostrarModalReconocimiento = {setMostrarModalReconocimiento}
                                setProidSeleccionado          = {setProidSeleccionado}
                                setPedidoOriginalSeleccionado = {setPedidoOriginalSeleccionado}
                                setMostrarModalNotasCredito   = {setMostrarModalNotasCredito}
                                mostrarModalNotasCredito      = {mostrarModalNotasCredito}
                                ComunesTipoDisenio            = {ComunesTipoDisenio}

                            />
                            :null
                        :null
                    }

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
                        onClick={ async () => {
                            // console.log(props.facturas_asignadas_enviar_subpendientes)
                            
                            let existenCamposExcedientes = false

                            await data_facturas_asignar_subpendientes.map((factura) => {
                                if(parseFloat(factura.fdssaldo) < parseFloat(factura.impacto)){
                                    existenCamposExcedientes = true
                                }
                            })

                            if(existenCamposExcedientes == true){

                                notification.error({
                                    message: 'Notificación',
                                    description: 'Lo sentimos, encontramos algunas facturas que exceden el 30% del saldo disponible',
                                    placement : 'topRight',
                                    duration:'10'
                                });

                            }else{
                                setMostrarModalConfirmacion(!mostrarModalConfirmacion)
                            }


                        }}
                    >
                        Seleccionar
                    </div>
                    
                    <div style={{height:'30px'}}></div>
                </div>
            </Modal>  







            {
                mostrarModalNotasCredito == true
                ?<ModalNotasCredito 
                    setMostrarModalNotasCredito = {() => setMostrarModalNotasCredito(!mostrarModalNotasCredito)}
                    mostrarModalNotasCredito = {mostrarModalNotasCredito}
                    pedidooriginal = {pedidoOriginalSeleccionado}
                    proid = {proidSeleccionado}
                    ComunesTipoDisenio = {ComunesTipoDisenio}
                />
                :null
            }

            {
                mostrarModalReconocimiento
                ?<ModalReconocimientos 
                    setMostrarModal = {() => setMostrarModalReconocimiento(!mostrarModalReconocimiento)}
                    mostrarModal = {mostrarModalReconocimiento}
                    fdsid = {fdsIdDetalleSeleccionado}
                    ComunesTipoDisenio = {ComunesTipoDisenio}

                />
                :null
            }
        </>
    )
}

export default ModalAsignarFacturas
