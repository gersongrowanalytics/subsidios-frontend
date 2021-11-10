import React from 'react'
import { Row, Col } from 'antd'
import CerrarAzul from '../../Assets/Imagenes/Iconos/Comunes/cerrarAzul.svg'
import cerrarNaranja from '../../Assets/Imagenes/Iconos/Comunes/cerrarNaranja.png'
import {useDispatch, useSelector} from "react-redux";
import {EliminarFechaReducer} from "../../Redux/Actions/Comunes/Comunes"
import IconoActualizacion from '../../Assets/Imagenes/Iconos/iconoActualizacion.svg'

const FiltroFechas = (props) => {
    
    const dispatch = useDispatch();

    const fechaActualizacion = useSelector(({login}) => login.fechaActualizacion)
    const {
        ComunesTipoDisenio
    } = useSelector(({comunes}) => comunes);

    return (
        <Row style={{ width:'100%'}}>
            <Col xl={10} xs={24} className={ComunesTipoDisenio == "Light" ?"Wbold-S20-H27-C004FB8" :"Wbold-S20-H27-Ce4e6eb"}>
                {props.titulo}
            </Col>

            <Col xl={14} 
                className="W600-S13-H17-C1EC0ED"
                style={{
                    textAlign: "-webkit-right",
                    alignSelf: "center",
                    paddingRight:'40px'
                }}
            >
                <img src={IconoActualizacion} width={"15px"} style={{marginRight:'5px'}}/>
                última actualización {fechaActualizacion}
            </Col>
        </Row>
    )
}

export default FiltroFechas
