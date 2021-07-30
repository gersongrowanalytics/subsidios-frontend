import React, {useState} from 'react'
import IconoFlechaAbajo from '../../Assets/Imagenes/Iconos/SubsidiosSo/Desplegar.svg'
import '../../Estilos/Componentes/SubsidiosSo/BtnFiltroSubSo.css'
import { Checkbox } from 'antd';

const BtnFiltroSubSo = (props) => {

    const [mostrarFiltro, setMostrarFiltro] = useState(false)
    const [textoBuscar, setTextoBuscar] = useState("")

    return (
        <div
            style={{width:props.tamanio}} 
            className="Btn-Filtro-Filtros-Tabla-Subsidios-So Wbold-S14-H19-Ce4e6eb-LH19">

            {
                props.btnSwitch == true
                ?<label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label> 
                :null
            }
            {props.texto}
            <img
                onClick={() => setMostrarFiltro(!mostrarFiltro)} 
                className="Icono-Flecha-Filtro-Tabla-Subsidios-So" src={IconoFlechaAbajo} />
            {
                mostrarFiltro == true
                ?<div className="Contenedor-Resultado-Filtro-Btn-Tabla-Subsidios-So">
                    <div className="Contenedor-Buscador-Filtro-Tabla-Subsidios-So" >
                        <input 
                            onChange={(e) => setTextoBuscar(e.target.value)}
                            className="Input-Buscador-Filtro-Tabla-Subsidios-So" />
                    </div>

                    <div style={{marginRight:'5px', marginTop:'55px' ,marginBottom:'5px'}}><Checkbox ><span className="Wbold-S14-H19-Ce4e6eb-LH19">Seleccionar todo</span></Checkbox></div>
                    
                    {
                        props.data
                        ?props.data.filter(
                            da => da.nombre == null ?[] :da.nombre.toLowerCase().includes(textoBuscar.toLowerCase())
                        ).map((dat, posicion) => {
                            return (
                                <div style={{marginRight:'5px'}}>
                                    <Checkbox 
                                        onChange={(e) => props.seleccionar(e.target.checked, dat.id)}
                                    ><span className="Wbold-S14-H19-Ce4e6eb-LH19">{dat.nombre}</span></Checkbox>
                                </div>
                            )
                        })
                        :null
                    }
                </div>
                :null
            }
        </div>
    )
}

export default BtnFiltroSubSo
