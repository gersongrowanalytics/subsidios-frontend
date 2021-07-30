import React, {Component} from 'react';
import {Row, Spin, message, Col} from "antd";
import '../../Estilos/Componentes/CargaArchivos/CardCargaArchivo.css'
import BtnPlus from '../../Assets/Imagenes/Iconos/BtnPlus.PNG'
import IconoEquis from '../../Assets/Imagenes/Iconos/equis.png'
import axios from 'axios'
import config from '../../config'

class CardCargarArchivo extends Component {
    constructor(){
        super();
        this.state = {
            subioArchivo     : false,
            nombreArchivo    : '',
            fileSeleccionado : null,
            cargando         : false,
            archivoExito     : false,
            guardarCambios   : false,
            enviarCambios    : false,
        }   
        this.seleccionarFile = this.seleccionarFile.bind(this)
        this.eliminarArchivo = this.eliminarArchivo.bind(this)
        this.enviarCambios   = this.enviarCambios.bind(this)
    }

    seleccionarFile(e) {
        this.refs.subirArchivoInput.click();
    }

    async cambioInputFile(event){
        event.stopPropagation();
        event.preventDefault();
        this.state.fileSeleccionado = event.target.files[0];

        this.setState({
            subioArchivo  : true,
            nombreArchivo : this.state.fileSeleccionado['name']
        })
    }

    eliminarArchivo(){
        this.setState({
            subioArchivo     : false,
            nombreArchivo    : '',
            fileSeleccionado : null
        })
    }

    async enviarCambios(){
        this.setState({
            cargando : true
        })

        const formData = new FormData();
        formData.append('file',this.state.fileSeleccionado)
        
        let url = config.api+this.props.url
        await axios.post(url, formData,{
            mode:'cors',
            headers: {
                'Accept' : 'application/json',
                'content-type': 'multipart/form-data',
                // 'api_token': localStorage.getItem('usutoken'),
                // 'api-token': localStorage.getItem('usutoken'),
            }
        })
        .then(rpta => {
            let datos = rpta.data
            if(datos.respuesta == true){
                this.setState({
                    archivoExito : true
                })
            }else{
                this.setState({
                    archivoExito : false
                })
                message.error(datos.mensaje);
            }
        })
        .catch((error)=> {
            console.log(error)
            this.setState({
                cargando : false,
                archivoExito : false
            })
        });
        

        this.setState({
            enviarCambios   : true,
            guardarCambios  : false,
            cargando        : false,
            fileSeleccionado: null
        })
    }



    render() {
        return (
            <div id="Contenedor-Card-CargaArchivos">
                <Spin tip="Enviando..." spinning={this.state.cargando}>
                    <input type="file" id="file" ref="subirArchivoInput" style={{display: "none"}} onChange={(e) => this.cambioInputFile(e)} />
                    <div id="Titulo-Card-CargaArchivos">
                        <Row >
                            <Col xl={8} md={8} sm={8} xs={8}>
                                <img
                                    onClick={this.seleccionarFile} 
                                    id="Imagen-Titulo-Card-CargaArchivos" src={BtnPlus} />
                            </Col>
                            <Col xl={16} md={16} sm={16} xs={16} style={{placeSelf: "center"}}>
                                <span id="Texto-Titulo-Card-CargaArchivos">{this.props.titulo}</span>
                            </Col>
                            
                        </Row>
                        <div id="Linea-Titulo-Card-CargarArchivos" />
                    </div>
                    <div id="Cuerpo-Card-CargaArchivos">
                        {
                            this.state.subioArchivo == true
                            ?<div>
                                <div id="Texto-Nombre-Archivo-CargarArchivos">
                                    {this.state.nombreArchivo}
                                </div>
                                <img src={IconoEquis} onClick={this.eliminarArchivo} id="Imagen-Equis-CargarArchivo" />
                            </div>
                            :null
                        }

                        <div 
                            id="Btn-Card-CargaArchivos"
                            onClick = {() => {this.enviarCambios()}}
                        >Guardar</div>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default CardCargarArchivo;
