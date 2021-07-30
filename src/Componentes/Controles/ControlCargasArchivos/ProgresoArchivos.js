import React from 'react'
import {Row, Col} from 'antd'
import '../../../Estilos/Componentes/Controles/ControlCargasArchivos/ProgresoArchivos.css' 

const ProgresoArchivos = () => {

    let arrayPorcentaje = [
        {
            "TipoArchivo" : "Ventas",
            "porcentaje" : "50"
        },
        {
            "TipoArchivo" : "Revenue",
            "porcentaje" : "60"
        },
        {
            "TipoArchivo" : "SAC",
            "porcentaje" : "40"
        },
        {
            "TipoArchivo" : "Sistemas",
            "porcentaje" : "90"
        },
    ]

    return (
        <Row id="Contenedor-ProgresoArchivo-ControlCargaArchivos">
            <Col xl={24} md={24} sm={24} xs={24} id="Titulo-ProgresoArchivo-ControlCargaArchivos" >
                PROGRESO %
            </Col>
            <Col xl={24} md={24} sm={24} xs={24}>
                <Row style={{position:'relative'}}>
                    <div id="Linea-ProgresoArchivo-ControlCargaArchivos"></div> 
                    {
                        arrayPorcentaje.map((archivo) => {
                            return (
                                <Col xl={6} md={6} sm={6} xs={6}>
                                    <div id="Porcentaje-ProgresoArchivo-ControlCargaArchivos">{archivo.porcentaje}%</div>
                                    <div id="Contenedor-Circulo-ProgresoArchivo-ControlCargaArchivos">
                                        {/* <div id="Circulo-ProgresoArchivo-ControlCargaArchivos">
                                            <div style={{width:'100%', height:'100%', background:'white', borderTopLeftRadius:'50px', borderTopRightRadius:'50px'}}>

                                            </div>
                                            <div style={{width:'100%', height:'0%', background:'white', borderBottomLeftRadius:'50px', borderBottomRightRadius:'50px'}}>

                                            </div>
                                            


                                        </div> */}
                                        <div 
                                            id="Circulo-ProgresoArchivo-ControlCargaArchivos" 
                                            style={
                                                archivo.porcentaje >= 50
                                                ?{
                                                    backgroundImage: "linear-gradient(0deg, transparent "+(archivo.porcentaje)+"%, white "+(100 - archivo.porcentaje)+"%)"
                                                }
                                                :{
                                                    backgroundImage: "linear-gradient(180deg, white "+(100 - archivo.porcentaje)+"%, transparent "+(archivo.porcentaje)+"%)"
                                                }
                                            }
                                        >
                                                
                                        </div>
                                    </div>
                                    <div id="Subtitulo-ProgresoArchivo-ControlCargaArchivos">{archivo.TipoArchivo}</div>
                                </Col>
                            )
                        })
                    }
                    
                </Row>
            </Col>
        </Row>
    )
}

export default ProgresoArchivos
