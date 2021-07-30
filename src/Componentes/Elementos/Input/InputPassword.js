import React, {useState} from 'react'
import {Form} from "antd";
import IconoOjo from '../../../Assets/Imagenes/Iconos/ojo.svg'
import IconoOjoTachado from '../../../Assets/Imagenes/Iconos/ojotachado.svg'
import '../../../Estilos/Elementos/Input/InputPassword.css'

const InputPassword = (props) => {

    const [mostrarInput, setMostrarInput] = useState(false)

    return (
        <Form.Item
            initialValue=""
            name={props.name}
        >
            <div className={"Contenedor-Input-Password-Componente"}>
                {
                    mostrarInput == true
                    ?<img 
                        onClick={() => setMostrarInput(false)} 
                        src={IconoOjoTachado} className={"Icono-Ojo-Input-Password-Componente"} />
                    :<img 
                        onClick={() => setMostrarInput(true)} 
                        src={IconoOjo} className={"Icono-Ojo-Input-Password-Componente"} />
                }
                <input 
                    type={mostrarInput == true ?"text" :"password"}
                    className={"Input-Password-Componente" +" "+ props.className} 
                    placeholder={"Contraseña"}
                    name={props.name}
                />

            </div>
        </Form.Item>
    )
}

export default InputPassword
