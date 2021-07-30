import React, {useState} from 'react'
import IconoFlechaAbajo from '../../../Assets/Imagenes/Iconos/SubsidiosSo/Desplegar.svg'
import '../../../Estilos/Elementos/Tabla/Filtro.css'
import { Checkbox } from 'antd';
import { Row, Col } from 'antd'
import {AplicarFiltroFacturasReducer} from '../../../Redux/Actions/Facturas/FacturasFront'
import {useDispatch, useSelector} from "react-redux";

const FiltroTabla = (props) => {

    const [filtrar, setFiltrar] = useState(false)
    const [txtFiltrar, setTxtFiltrar] = useState("")

    const dispatch = useDispatch();

    return (
        <>
            <img src={IconoFlechaAbajo} onClick={() => setFiltrar(!filtrar)} className="Icono-Flecha-Abajo-Filtro-Elementos" />
            {
                filtrar == true
                ?<div className="Contenedor-Filtro-Elementos">
                    <div style={{position:'relative', width:'100%', height:'100%'}}>
                        <div className="Filtro-Buscador-Elementos">
                            {/* <img src={} /> */}
                            <input 
                                className="Input-Filtro-Buscador-Elementos" 
                                onChange={(e) => setTxtFiltrar(e.target.value)}
                            />
                        </div>
                        <div className="Cuerpo-Filtro-Elementos">
                            <>
                                <Checkbox
                                    defaultChecked={true}
                                    className="Texto-Cuerpo-Filtro-Elementos" onChange={(e) => console.log(e)}>
                                    <span className="Wbold-S12-H19-E4E6EB">{"Seleccionar todo"}</span>
                                </Checkbox><br/>
                            </>
                            <div style={{marginBottom:'7px'}}></div>
                            {
                                props.filtro.map((filtro) => {
                                    return (
                                        filtro.nombre.includes(txtFiltrar)
                                        ?<>
                                            <Checkbox 
                                                checked={filtro.seleccionado}
                                                className="Texto-Cuerpo-Filtro-Elementos" onChange={(e) => console.log(e)}>
                                                <span className="Wbold-S12-H19-E4E6EB">{filtro.nombre}</span>
                                            </Checkbox><br/>
                                        </>
                                        :null
                                    )
                                })
                            }
                        </div>
                        <div className="Pie-Filtro-Elementos">
                            
                            <div className="Contendor-Bts-Pie-Filtro-Elementos">
                                <Row
                                    style={{
                                        textAlignLast: "center",
                                        display: "flex",
                                        height: "100%",
                                        alignContent: "center"
                                    }}
                                >
                                    <Col xl={12}>
                                        <div 
                                            className="Btn-Aceptar-Pie-Filtro-Elementos" 
                                            onClick={() => {
                                                // console.log('click')
                                                dispatch(
                                                    AplicarFiltroFacturasReducer(props.posicion, txtFiltrar, props.columna)
                                                );
                                                setTxtFiltrar("");
                                                setFiltrar(false);
                                            }}
                                        >
                                            Aceptar
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className="Btn-Cancelar-Pie-Filtro-Elementos">
                                            Cancelar
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            
                        </div>
                    </div>
                </div>
                :false
            }
        </>
    )
}

export default FiltroTabla
