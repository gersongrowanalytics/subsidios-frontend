import React, {useEffect} from 'react'
import { Modal } from 'antd'
import IconoCerrar from '../../../Assets/Imagenes/Iconos/iconoCerrar.png'
import funFomratoDecimal from '../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import IconoCargandoSITB from '../../../Componentes/Elementos/Cargando'
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerFacturasAsignadasReducer
} from '../../../Redux/Actions/SubsidiosSi/SubsidiosSi'

const ModalFacturasAsignadas = (props) => {

    const dispatch = useDispatch()

    const MesesNombres = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
    const setMostrarModalFacturas = props.setMostrarModalFacturas
    const ComunesFechaInicio = props.ComunesFechaInicio
    const mostrarModalFacturas = props.mostrarModalFacturas
    const ComunesTipoDisenio = props.ComunesTipoDisenio
    const subsidioSeleccionado = props.subsidioSeleccionado
    const setPedidoOriginalSeleccionado = props.setPedidoOriginalSeleccionado
    const setMostrarModalNotasCredito = props.setMostrarModalNotasCredito
    const mostrarModalNotasCredito = props.mostrarModalNotasCredito

    const {
        cargando_facturas_asignadas,
        obtener_facturas_asignadas
    } = useSelector(({subsidiosSi}) => subsidiosSi);

    useEffect(() => {

        dispatch(ObtenerFacturasAsignadasReducer(subsidioSeleccionado.sdeid))

    }, [subsidioSeleccionado])


    return (
        <>
            
            <Modal 
                title={null} 
                visible={mostrarModalFacturas} 
                onOk={() => {setMostrarModalFacturas(false)}} 
                onCancel={() => {setMostrarModalFacturas(false)}}
                footer={null}
                width={"80%"}
                centered
                closeIcon={<img src={IconoCerrar} width='27px'/>}
            >
                <div 
                    style={{
                        overflowX:"auto", marginTop:'0px',
                        textAlign: "-webkit-center"
                    }}
                >
                    <div style={{marginBottom:'20px'}} className="Wbold-S13-H17-C004FB8" onclick={() => console.log(ComunesFechaInicio)}>
                        
                        LISTA DE FACTURAS ASIGNADAS<br/>
                        PERIODO: {
                            ComunesFechaInicio
                            ?MesesNombres[ComunesFechaInicio.getMonth()]
                            :""
                            
                        } 2021
                        
                    </div>

                    <div 
                        style={{
                            overflowX:"auto",
                            borderRadius: "20px 20px 20px 20px",
                            width:'auto'
                        }}                        
                    >

                        {
                            cargando_facturas_asignadas == true
                            ?<IconoCargandoSITB 
                        
                            />
                            :obtener_facturas_asignadas.length > 0
                                ?<table 
                                    className="table-responsive-subsidios-so Tabla-SubsidiosSi" 
                                    style={{position:'relative', width:'100%' }}>
                                    <thead
                                        className={ComunesTipoDisenio == "Light" ? "C004FB8" : "C242526"}
                                    >
                                        <tr>
                                            <th className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }>N° Fila</th>
                                            <th className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }>Factura SI</th>
                                            <th className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }>Fecha de Factura</th>
                                            <th className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }>Valor Neto</th>
                                            <th className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }>Notas Credito</th>
                                            <th className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }>30% del Valor Neto</th>
                                            <th className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }>Saldo Disponible</th>
                                            <th className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }>Reconocimiento</th>
                                            <th className={
                                                ComunesTipoDisenio == "Light"
                                                ?"Th-Tabla-Subsidios-So Wbold-S13-H20-CFFFFFF C004FB8"
                                                :"Th-Tabla-Subsidios-So Wbold-S11-H20-Ce4e6eb"
                                        }>Saldo Final</th>
        
                                            {/* <th>Valorizado</th> */}
                                            
                                            
                                            
                                            
                                        </tr>
                                    </thead>
                                    {
                                        obtener_facturas_asignadas
                                        ?obtener_facturas_asignadas.map((factura, posicion) => {
                                            return (
                                                <tr>
                                                    <td className="W600-S11-H15-C706C64">{posicion+1}</td>
                                                    <td className="W600-S11-H15-C706C64">{factura.fsifactura}</td>
                                                    <td className="W600-S11-H15-C706C64">{factura.fecfecha}</td>
        
                                                    <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.fdsvalorneto, 2)} displayType={'text'} thousandSeparator={true} />}</td>
        
                                                    <td 
                                                        className="W600-S12-H16-C1EC0ED"
                                                        onClick={() => {
                                                            setPedidoOriginalSeleccionado(factura.fsipedido)
                                                            setMostrarModalNotasCredito(!mostrarModalNotasCredito)
                                                        }}
                                                        style={{cursor:'pointer'}}
                                                    >
                                                        <u>S/{<NumberFormat value={funFomratoDecimal(factura.fdsnotacredito, 2)} displayType={'text'} thousandSeparator={true} />}</u>
                                                    </td>
        
        
                                                    <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.fdstreintaporciento, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                                    <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.sfssaldoanterior, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                                    <td className="W600-S11-H15-CFF3742">S/{<NumberFormat value={funFomratoDecimal(factura.sfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                                    <td className="W600-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(factura.sfssaldonuevo, 2)} displayType={'text'} thousandSeparator={true} />}</td>                                            
                                                    
                                                    
                                                    
                                                </tr>
                                            )
                                        })
                                        :null
                                    }
                                    <div style={{marginBottom:'20px'}}></div>
                                    <tr 
                                        style={{borderTop: "1px solid #D7E8FF"}}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="W600-S11-H15-C004FB8">Pago Subsidiado:</td>
                                        <td className="W600-S11-H15-C004FB8">
                                            S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sumsfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}
                                        </td>
                                        <td></td>
                                    </tr>
        
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="W600-S11-H15-C004FB8">Objetivo a Subsidiar:</td>
                                        <td className="W600-S11-H15-CFF3742">
                                            S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sdemontoareconocerreal, 2)} displayType={'text'} thousandSeparator={true} />}
                                        </td>
                                        <td></td>
                                    </tr>
                                    <div style={{marginBottom:'5px'}}></div>
        
                                    <tr 
                                        style={{borderTop: "1px solid #D7E8FF"}}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="Wbold-S11-H15-C706C64">Pendiente:</td>
                                        <td className="Wbold-S11-H15-C706C64">S/{<NumberFormat value={funFomratoDecimal(subsidioSeleccionado.sdemontoareconocerreal - subsidioSeleccionado.sumsfsvalorizado, 2)} displayType={'text'} thousandSeparator={true} />}</td>
                                        <td></td>
                                    </tr>
        
                                </table>
                                :<h1>No existen facturas asignadas</h1>
                        }
                        
                    </div>
                    <div style={{marginBottom:'5px'}}></div>
                </div>
            </Modal>

        </>
    )
}

export default ModalFacturasAsignadas
