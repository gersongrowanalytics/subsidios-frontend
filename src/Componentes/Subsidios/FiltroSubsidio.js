import React from 'react'
import '../../Estilos/Componentes/Subsidios/FiltroSubsidio.css'
import { DownOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

const FiltroSubsidio = (props) => {
    return (
        <div id="Caja-Filtro-Subsidios">
            <div id="Texto-Filtro-Subsidios">{props.Filtro}</div>
            {
                props.Switch == true
                ?<Switch style={{backgroundColor:'white'}} id="Icono-Filtro-Subsidios" />
                :<DownOutlined id="Icono-Filtro-Subsidios" />
            }
        </div>
    )
}

export default FiltroSubsidio
