import React, {useState} from 'react'
import {Checkbox} from 'antd'

const FiltroBtnTabla = (props) => {

    const [mostrarFiltro, setMostrarFiltro] = useState(true)

    return (
        <div style={{position:'relative'}}>
            <div 
                className="Btn-Filtro-Tabla-Elementos Wbold-S14-H19-CFFFFFF-L0015"
                style={{
                    width:props.width,
                }}
                onClick={() => setMostrarFiltro(!mostrarFiltro)}
            >
                {props.titulo}
            </div>

            {
                mostrarFiltro == true
                ?<div className="Contenedor-Filtro-Btn-Filtro-Tabla-Elementos">

                    <div className="Filtro-Filtro-Btn-Filtro-Tabla-Elementos">
                        <div className="Buscar-Filtro-Btn-Filtro-Tabla-Elementos">
                            <input placeholder="Buscar" className="Wnormal-S12-H16-CA2B9ED-L0015" />
                        </div>
                    </div>
                    <div className="Cuerpo-Filtro-Btn-Filtro-Tabla-Elementos">
                        <Checkbox className="checkbox-luminoso"></Checkbox>
                        <span className="W600-S13-H17-C004FB8-L0015" style={{marginLeft:'10px'}}>Seleccionar todo</span>
                    </div>


                </div>
                :null
            }

        </div>
    )
}

export default FiltroBtnTabla
