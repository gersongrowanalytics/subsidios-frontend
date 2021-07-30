import React from 'react'
import '../../Estilos/Componentes/SubsidiosPendientes/FiltroSubsidioPendiente.css'
import { DownOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

const FiltroSubsidioPendiente = (props) => {
    return (
        <div id="Caja-Filtro-SubsidiosPendientes">
            <div id="Texto-Filtro-SubsidiosPendientes">{props.Filtro}</div>
            {
                props.Switch == true
                ?<Switch style={{backgroundColor:'white'}} id="Icono-Filtro-SubsidiosPendientes" />
                :<DownOutlined id="Icono-Filtro-SubsidiosPendientes" />
            }
        </div>
    )
}

export default FiltroSubsidioPendiente
