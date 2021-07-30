import React from 'react'
import {Form} from "antd";
import '../../../Estilos/Elementos/Input/Input.css'

const Input = (props) => {
    return (
        <Form.Item
            initialValue=""
            name={props.name}
        >
            <input 
                className={"Input-Componente"+" "+props.className} 
                placeholder={"Correo"} 
            />
        </Form.Item>        
    )
}

export default Input
