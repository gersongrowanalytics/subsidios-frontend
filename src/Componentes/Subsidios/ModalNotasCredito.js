import React, {useEffect} from 'react'
import { Modal } from 'antd';
import {
    ObtenerNotasCreditoFacturaSiReducer
} from '../../Redux/Actions/SubsidiosSi/SubsidiosSi'
import {useDispatch, useSelector} from "react-redux";
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import IconoCerrar from '../../Assets/Imagenes/Iconos/iconoCerrar.png'

const ModalNotasCredito = (props) => {

    const dispatch = useDispatch();

    const {
        cargando_notas_creditos_factura_si,
        data_notas_creditos_factura_si,
        total_notas_creditos_factura_si,
    } = useSelector(({subsidiosSi}) => subsidiosSi);

    useEffect(() => {

        console.log('ejecutar')
        dispatch(ObtenerNotasCreditoFacturaSiReducer(props.pedidooriginal, props.proid))

    }, [])

    const ComunesTipoDisenio = props.ComunesTipoDisenio

    return (
        <>
            
            <Modal
                title={null} 
                visible={props.mostrarModalNotasCredito} 
                onOk={() => props.setMostrarModalNotasCredito()} 
                onCancel={() => props.setMostrarModalNotasCredito()}
                footer={null}
                width={"800px"}
                centered
                closeIcon={<img src={IconoCerrar} width='27px'/>}
            >
                <div 
                    style={{
                        overflowX:"auto", marginTop:'0px',
                        textAlign: "-webkit-center"
                    }}
                >
                    <div style={{marginBottom:'10px'}} className="Wbold-S13-H17-C004FB8" >
                        Notas de Credito Asignadas
                    </div>

                    <table>
                        <thead
                            className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                        >
                            <tr>
                                <th className="Wbold-S13-H17-CFFFFFF">Fecha</th>
                                <th className="Wbold-S13-H17-CFFFFFF">Clase</th>
                                <th className="Wbold-S13-H17-CFFFFFF">Nota Credito</th>
                                <th className="Wbold-S13-H17-CFFFFFF">Valorizado</th>
                            </tr>
                        </thead>
                        {
                            data_notas_creditos_factura_si.map((notaCredito) => {
                                return (
                                    <tr>
                                        <td className="W600-S11-H15-C706C64">{notaCredito.fecfecha}</td>
                                        <td className="W600-S11-H15-C706C64">{notaCredito.ndsclase}</td>
                                        <td className="W600-S11-H15-C706C64">{notaCredito.ndsnotacredito}</td>
                                        <td className="W600-S11-H15-C706C64">{"S/"} <NumberFormat value={funFomratoDecimal(notaCredito.ndsvalorneto, 2)} displayType={'text'} thousandSeparator={true} /> </td>
                                    </tr>
                                )
                            })
                        }
                        <div style={{marginBottom:'20px'}}></div>
                        <tr style={{borderTop: "1px solid #D7E8FF"}}>
                            <td></td>
                            <td></td>
                            <td className="Wbold-S11-H15-C706C64">TOTAL: </td>
                            <td className="Wbold-S11-H15-C706C64">{"S/"} <NumberFormat value={funFomratoDecimal(total_notas_creditos_factura_si, 2)} displayType={'text'} thousandSeparator={true} /> </td>
                        </tr>

                    </table>
                </div>
            </Modal>

        </>
    )
}

export default ModalNotasCredito
