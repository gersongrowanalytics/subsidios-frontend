import React from 'react'
import {Row, Col} from 'antd'
import FiltroSubsidioPendiente from '../../Componentes/SubsidiosPendientes/FiltroSubsidioPendiente'
import TablaSubsidioPendiente from '../../Componentes/SubsidiosPendientes/TablaSubsidioPendiente'
import {useDispatch, useSelector} from "react-redux";
import '../../Estilos/Rutas/SubsidiosPendientes/SubsidiosPendientes.css'
import '../../Estilos/Elementos/Fecha/Fecha.css'
import FiltroBtnTabla from '../../Componentes/Elementos/Tabla/FiltroBtnTabla';
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas';
import FiltroFechaTop from '../../Componentes/Top/FiltroFechaTop';

const SubsidiosPendientes = () => {

    let filtrosSubsidiosPendientes = [
        {
            "Filtro" : "AÑO",
            "Switch" : false
        },
        {
            "Filtro" : "COD. SOLICITANTE",
            "Switch" : true
        },
        {
            "Filtro" : "ZONA",
            "Switch" : false
        },
        {
            "Filtro" : "CATEGORÍA",
            "Switch" : false
        },
        {
            "Filtro" : "MES",
            "Switch" : false
        },
        {
            "Filtro" : "COD. PRODUCTO",
            "Switch" : true
        },
        {
            "Filtro" : "TERRITORIO",
            "Switch" : false
        }
    ]

    const {ComunesTipoDisenio} = useSelector(({comunes}) => comunes)

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
                        titulo = {"Subsidios Pendientes"}
                    />
                </div>

                {/* <Row>
                    <Col 
                        xl={12} md={12} sm={12} xs={12} className="Wbold-S20-H27-C004FB8" 
                        style={{paddingLeft:'40px', paddingRight:'20px'}}
                    >
                        Subsidios Pendientes
                    </Col>
                    <Col 
                        xl={12} md={12} sm={12} xs={12} className="W600-S13-H17-C1EC0ED"
                        style={{
                            textAlign: "right",
                            paddingRight: "40px"
                        }}
                    >
                        última actualización 20 Julio 2021
                    </Col>
                </Row> */}
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
                    paddingTop:'10px',
                    textAlign: "-webkit-right",
                    paddingRight:'40px'
                }}
            >
                <div className="Contenedor-Filtros-Columnas-Tabla-Elementos Wbold-S13-H17-CFF8023">
                    Filtros
                </div>
            </Col>

            <Col 
                xl={24}
                style={{paddingLeft:'40px', paddingTop:'20px'}}
            >

                <Row>
                    <Col xl={4}>
                        <FiltroBtnTabla 
                            width = '95px'
                            titulo = "Zona"
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
                        <TablaSubsidioPendiente 
                            ComunesTipoDisenio = {ComunesTipoDisenio}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default SubsidiosPendientes
