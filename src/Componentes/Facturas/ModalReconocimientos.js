import React, {useEffect} from 'react'
import { Modal } from 'antd';
import {
    ObtenerReconocimientosFacturasSiReducer
} from '../../Redux/Actions/Facturas/Facturas'


import {useDispatch, useSelector} from "react-redux";
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import IconoCerrar from '../../Assets/Imagenes/Iconos/iconoCerrar.png'

const ModalReconocimientos = (props) => {

    const dispatch = useDispatch();

    const {
        cargando_reconocimiento_factura_si,
        data_reconocimiento_factura_si,
        total_reconocimiento_factura_si
    } = useSelector(({facturas}) => facturas);

    useEffect(() => {

        console.log('ejecutar')
        dispatch(ObtenerReconocimientosFacturasSiReducer(props.fdsid))

    }, [])

    const ComunesTipoDisenio = props.ComunesTipoDisenio

    return (
        <>
            <Modal
                title={null} 
                visible={props.mostrarModal} 
                onOk={() => props.setMostrarModal()} 
                onCancel={() => props.setMostrarModal()}
                footer={null}
                width={"1200px"}
                centered
                closeIcon={<img src={IconoCerrar} width='27px'/>}
            >
                <div 
                    style={{
                        overflowX:"auto", marginTop:'0px',
                        textAlign: "-webkit-center"
                    }}
                >
                    <div 
                        style={{marginBottom:'10px'}}
                        className="Wbold-S13-H17-C004FB8"
                    >
                        Subsidios Asignados
                    </div>

                    <table>
                        <thead
                            className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                        >
                            <tr>
                                <th className="Wbold-S13-H17-CFFFFFF">N° Fila</th>
                                <th className="Wbold-S13-H17-CFFFFFF">Fecha</th>
                                <th className="Wbold-S13-H17-CFFFFFF">Destinatario</th>
                                <th className="Wbold-S13-H17-CFFFFFF">RUC Sub Cliente</th>
                                <th className="Wbold-S13-H17-CFFFFFF">Codigo Producto</th>
                                <th className="Wbold-S13-H17-CFFFFFF">Cantidad a Reconocer</th>
                                <th className="Wbold-S13-H17-CFFFFFF">Monto a Reconocer</th>
                                <th className="Wbold-S13-H17-CFFFFFF">Reconocimiento</th>
                            </tr>
                        </thead>
                        {
                            data_reconocimiento_factura_si.map((data, posicion) => {
                                return (
                                    <tr>
                                        <td>{posicion+1}</td>
                                        <td>{data.fecfecha}</td>
                                        <td>{data.sdecodigodestinatario}</td>
                                        <td>{data.sderucsubcliente}</td>
                                        <td title={data.pronombre}>{data.prosku}</td>
                                        <td>{data.sdecantidadbultosreal}</td>
                                        <td>
                                            {"S/"}<NumberFormat value={funFomratoDecimal(data.sdemontoareconocerreal, 2)} displayType={'text'} thousandSeparator={true} />
                                        </td>
                                        <td>{"S/"} <NumberFormat value={funFomratoDecimal(data.sfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} /> </td>
                                    </tr>
                                )
                            })
                        }
                        <div style={{marginBottom:'20px'}}></div>
                        <tr style={{borderTop: "1px solid #D7E8FF"}}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="Wbold-S11-H15-C706C64">Total: </td>
                            <td className="Wbold-S11-H15-C706C64">{"S/"} <NumberFormat value={funFomratoDecimal(total_reconocimiento_factura_si, 2)} displayType={'text'} thousandSeparator={true} /> </td>
                        </tr>

                    </table>
                </div>
            </Modal>
        </>
    )
}

export default ModalReconocimientos
