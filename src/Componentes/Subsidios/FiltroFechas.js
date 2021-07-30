import React from 'react'
import { Row, Col } from 'antd'
import CerrarAzul from '../../Assets/Imagenes/Iconos/Comunes/cerrarAzul.svg'
import cerrarNaranja from '../../Assets/Imagenes/Iconos/Comunes/cerrarNaranja.png'
import {useDispatch, useSelector} from "react-redux";
import {EliminarFechaReducer} from "../../Redux/Actions/Comunes/Comunes"

const FiltroFechas = (props) => {
    
    const dispatch = useDispatch();

    const {
        ComunesFechaInicio,
        ComunesFechaFinal,

        ComunesAnioTxtIncio,
        ComunesMesTxtInicio,
        ComunesAnioTxtFinal,
        ComunesMesTxtFinal,
    } = useSelector(({comunes}) => comunes)

    return (
        <Row style={{ width:'100%'}}>
            <Col xl={4} xs={24}>
                {props.titulo}
            </Col>
            {/* {
                ComunesFechaInicio != null
                ?<Col xl={5} xs={24} style={{display:'flex'}}>

                    <div className="Fecha-Incio-Seleccionada-Contenedor-Comunes Wbold-S14-H19-C1876F2">
                        {ComunesAnioTxtIncio}
                        <img onClick={() => dispatch(EliminarFechaReducer())} src={CerrarAzul} className="Icono-Cerrar-Filtros-Fechas-Comunes" />
                    </div>

                    <div className="Fecha-Incio-Seleccionada-Contenedor-Comunes Wbold-S14-H19-C1876F2">
                        {ComunesMesTxtInicio}
                        <img onClick={() => dispatch(EliminarFechaReducer())} src={CerrarAzul} className="Icono-Cerrar-Filtros-Fechas-Comunes" />
                    </div>

                </Col>
                :null
            } */}
            {/* {
                ComunesFechaFinal != null
                ?<Col xl={5} xs={24} style={{display:'flex'}}>
                    <div className="Fecha-Final-Seleccionada-Contenedor-Comunes Wbold-S14-H19-EEB328">
                        {ComunesAnioTxtFinal}
                        <img onClick={() => dispatch(EliminarFechaReducer())} src={cerrarNaranja} className="Icono-Cerrar-Filtros-Fechas-Comunes" />
                    </div>

                    <div className="Fecha-Final-Seleccionada-Contenedor-Comunes Wbold-S14-H19-EEB328">
                        {ComunesMesTxtFinal}
                        <img onClick={() => dispatch(EliminarFechaReducer())} src={cerrarNaranja} className="Icono-Cerrar-Filtros-Fechas-Comunes" />
                    </div>
                </Col>
                :null
            } */}
        </Row>
    )
}

export default FiltroFechas
