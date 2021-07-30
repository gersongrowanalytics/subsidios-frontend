import React, {Component} from 'react'
import {Row, Col, message} from "antd";
import '../../Estilos/Componentes/CargaArchivos/TarjetaCargaArchivo.css'
import BtnPlus from '../../Assets/Imagenes/Iconos/BtnPlus.PNG'
import IconoEquis from '../../Assets/Imagenes/Iconos/equis.png'
import CoheteGif from '../../Assets/Gifs/CargaArchivos/cohete.gif'
import SaltandoGif from '../../Assets/Gifs/CargaArchivos/saltando.gif'
import CargandoGif from '../../Assets/Gifs/CargaArchivos/cargando.gif'
import ErrorGif from '../../Assets/Gifs/CargaArchivos/error.gif'
import IconoMundo from '../../Assets/Gifs/CargaArchivos/mundo'
import axios from 'axios'
import config from '../../config'

class TarjetaCargaArchivo extends Component {
    constructor(props){
        super(props);
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

        let estadoaxios = await this.props.CargarArchivo(url, formData)

        if(estadoaxios == true){
            this.setState({
                archivoExito : true
            })
        }else{
            this.setState({
                archivoExito : false
            })
        }

        // await axios.post(url, formData,{
        //     mode:'cors',
        //     headers: {
        //         'Accept' : 'application/json',
        //         'content-type': 'multipart/form-data',
        //         // 'api_token': localStorage.getItem('usutoken'),
        //         // 'api-token': localStorage.getItem('usutoken'),
        //     }
        // })
        // .then(rpta => {
        //     let datos = rpta.data
        //     if(datos.respuesta == true){
        //         this.setState({
        //             archivoExito : true
        //         })
        //     }else{
        //         this.setState({
        //             archivoExito : false
        //         })
        //         message.error(datos.mensaje);
        //     }

        //     let noti = this.props.notificaciones
        //     noti.push(datos.mensaje)
        //     this.props.setNotificaciones(noti)
        // })
        // .catch((error)=> {
        //     console.log(error)
        //     this.setState({
        //         cargando : false,
        //         archivoExito : false
        //     })
        // });
        

        this.setState({
            enviarCambios   : true,
            guardarCambios  : false,
            cargando        : false,
            fileSeleccionado: null
        })

        this.eliminarArchivo()
    }



    render() {
        return (
            <div id="Contenedor-TarjetaCargaArchivo" >

                <input 
                    type="file" 
                    id="file" 
                    ref="subirArchivoInput" 
                    style={{display: "none"}} 
                    onChange={(e) => this.cambioInputFile(e)} />

                <div 
                    id="Contenedor-Tarjeta-TarjetaCargaArchivo" 
                    className={
                        this.props.ComunesTipoDisenio == "Light"
                        ?"container btn CFFFFFF"
                        :"container btn C242526"

                    }
                    style={
                        this.props.ComunesTipoDisenio == "Light"
                        ?{boxShadow: "0px 0px 15px #D8DFE9"}
                        :{boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}
                    }
                >
                    <div id="PrimeraParte-Contenedor-Tarjeta-TarjetaCargaArchivo">

                        {
                            this.state.cargando == true 
                            ?<div>
                                <IconoMundo />
                            </div>
                            :<img
                                id="Gif-PrimeraParte-TarjetaCargaArchivo"
                                src={
                                    this.state.cargando == true 
                                    ?CargandoGif  
                                    : this.state.enviarCambios == true 
                                        ?this.state.archivoExito == true ?SaltandoGif :ErrorGif
                                        :CoheteGif
                                }
                            />
                                
                        }



                    </div>

                    <div id={this.state.subioArchivo == false ?"SegundaParte-Contenedor-Tarjeta-TarjetaCargaArchivo" :"SegundaParte-Contenedor-Tarjeta-TarjetaCargaArchivo-Animacion"}>

                        {
                            this.state.cargando == true
                            ?<Row style={{alignItems: "center", marginTop:'20px'}}>
                                <Col xl={24} style={{textAlign: "-webkit-center"}} className="W900-S12-H14-C4d4d4d">
                                    Cargando
                                </Col>
                                <Col xl={24} style={{textAlign: "-webkit-center"}} className="Wnormal-S11-H13-Cnegro">
                                    Cargando 1 archivo
                                </Col>
                            </Row>
                            :<Row style={{alignItems: "center"}}>
                                <Col xl={7} md={24} sm={8} xs={8} style={{textAlign: "-webkit-center", cursor:'pointer'}} onClick={this.seleccionarFile}>
                                    {/* <img
                                        onClick={this.seleccionarFile}
                                        id="Imagen-Titulo-Tarjeta-CargaArchivos" src={BtnPlus} /> */}
                                        <div className="Contenedor-Icono-Btn-Plus-Svg">
                                            <svg viewBox="0 0 72 72"><path d="M36.493 72C16.118 72 0 55.883 0 36.493 0 16.118 16.118 0 36.493 0 55.882 0 72 16.118 72 36.493 72 55.882 55.883 72 36.493 72zM34 34h-9c-.553 0-1 .452-1 1.01v1.98A1 1 0 0 0 25 38h9v9c0 .553.452 1 1.01 1h1.98A1 1 0 0 0 38 47v-9h9c.553 0 1-.452 1-1.01v-1.98A1 1 0 0 0 47 34h-9v-9c0-.553-.452-1-1.01-1h-1.98A1 1 0 0 0 34 25v9z" fill="#409fff" fill-rule="nonzero"></path></svg>
                                        </div>
                                </Col>
                                <Col xl={16} md={24} sm={16} xs={16} style={{}}>
                                    <span 
                                        id={this.props.ComunesTipoDisenio == "Light"?"" :"Texto-Titulo-Tarjeta-CargaArchivos"}
                                        className={this.props.ComunesTipoDisenio == "Light" ?"Wbold-S14-H19-C004FB8" :""}
                                    >
                                        {this.props.titulo}
                                    </span>
                                </Col>
                                <Col xl={24} md={24} sm={24} xs={24}>
                                    {
                                        this.state.subioArchivo == true
                                        ?<div style={{textAlign: "-webkit-center"}}>
                                            <div id="Texto-Nombre-Archivo-TarjetaCargaArchivo">
                                                {this.state.nombreArchivo}
                                            </div>
                                            {/* <img src={IconoEquis} onClick={this.eliminarArchivo} id="Imagen-Equis-CargarArchivo" /> */}
                                        </div>
                                        :null
                                    }
                                </Col>
                            </Row>
                        }
                        {
                            this.state.cargando == true
                            ?null
                            :<div
                                className={
                                    this.props.ComunesTipoDisenio == "Light"
                                    ?"Contenedor-Btn-Tarjeta-CargaArchivos"
                                    :"Contenedor-Btn-Tarjeta-CargaArchivos"
                                }
                                
                                onClick = {() => {this.enviarCambios()}}>
                                <div
                                    style={
                                        this.state.subioArchivo == true
                                        ?{background: "#1876F2"}
                                        :{}
                                    }  
                                    className={
                                        this.props.ComunesTipoDisenio == "Light"
                                        ?"Btn-Tarjeta-CargaArchivos-Light Wbold-S12-H16-C004FB8"
                                        :"Btn-Tarjeta-CargaArchivos"
                                    }
                                >
                                    Enviar
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TarjetaCargaArchivo;
