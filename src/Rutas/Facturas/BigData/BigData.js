import React, {useState} from 'react'
import { Row, Col, Button } from 'antd'
import {useDispatch, useSelector} from "react-redux";
import FiltroFechas from '../../../Componentes/Subsidios/FiltroFechas'
import FiltroFechaMes from '../../../Componentes/Top/FiltroFechaMes';
import BtnDescargar from './BtnDescargar';
import '../../../Estilos/Rutas/Facturas/Facturas.css'

const BigData = () => {

    const {
        ComunesTipoDisenio,
    } = useSelector(({comunes}) => comunes);  

    const {
        data_facturas_si_bigdata,
        data_des_facturas_si_bigdata,

        data_facturas_so_bigdata,
        data_des_facturas_so_bigdata,

        data_materiales_bigdata,
        data_des_materiales_bigdata,

        data_clientes_bigdata,
        data_des_clientes_bigdata,

        cargando_bigdata
    } = useSelector(({facturas}) => facturas);  

    const {
        data_subsidiossi_formato_ventas_excel,
        cargando_subsidiossi_ventas
    } = useSelector(({subsidiosSi}) => subsidiosSi);

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
                        titulo = {"Big Data"}
                    />

            </div>

            <div style={{marginBottom:'20px', paddingLeft:'20px',}}>
                 <Row style={{
                     paddingTop:'20px',
                     paddingLeft:'20px',
                     paddingRight:'20px'
                 }}>

                     <Col 
                        xl={24} 
                        style={{display:'flex', alignItems: "center", marginBottom:'20px'}}
                        className="Wbold-S13-H17-C004FB8"
                    >
                        <FiltroFechaMes
                            texto = {"Fecha"}
                        />
                    </Col>

                    <Col xl={5} style={{marginRight:'20px'}}>
                        <BtnDescargar
                            titulo      = {"Subsidios SI Formato Ventas"}
                            data        = {data_subsidiossi_formato_ventas_excel}
                            descargable = {data_subsidiossi_formato_ventas_excel}
                            cargando    = {cargando_subsidiossi_ventas}
                            url         = {"modulo/SubsidiosSi/mostrar-subsidios-si-ventas"}
                            tipodata    = {"SUBSIDIOSIFORMATOVENTAS"}
                        />
                    </Col>

                    <Col xl={3}>
                        <BtnDescargar
                            titulo      = {"Factura SI"}
                            data        = {data_facturas_si_bigdata}
                            descargable = {data_des_facturas_si_bigdata}
                            cargando    = {cargando_bigdata}
                            url         = {"modulo/bigdata/mostrar-facturassi"}
                            tipodata    = {"FACTURASSI"}
                        />
                    </Col>

                    <Col xl={3}>
                        <BtnDescargar
                            titulo      = {"Factura SO"}
                            data        = {data_facturas_so_bigdata}
                            descargable = {data_des_facturas_so_bigdata}
                            cargando    = {cargando_bigdata}
                            url         = {"modulo/bigdata/mostrar-facturasso"}
                            tipodata    = {"FACTURASSO"}
                        />
                    </Col>

                    <Col xl={3}>
                        <BtnDescargar
                            titulo      = {"Materiales"}
                            data        = {data_materiales_bigdata}
                            descargable = {data_des_materiales_bigdata}
                            cargando    = {cargando_bigdata}
                            url         = {"modulo/bigdata/mostrar-materiales"}
                            tipodata    = {"MAESTRAMATERIALES"}
                        />
                    </Col>

                    <Col xl={3}>
                        <BtnDescargar
                            titulo      = {"Clientes"}
                            data        = {data_clientes_bigdata}
                            descargable = {data_des_clientes_bigdata}
                            cargando    = {cargando_bigdata}
                            url         = {"modulo/bigdata/mostrar-clientes"}
                            tipodata    = {"MAESTRACLIENTES"}
                        />
                    </Col>

                </Row>
            </div>


        </div>
    )
}

export default BigData
