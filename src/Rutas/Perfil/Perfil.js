import React, {useState} from 'react'
import '../../Estilos/Perfil/Perfil.css'
import { Row, Col, Modal } from 'antd'
import IconoCargo from '../../Assets/Imagenes/Iconos/Perfil/iconoCargo.png'
import IconoContrasenia from '../../Assets/Imagenes/Iconos/Perfil/iconoContrasenia.png'
import IconoCorreo from '../../Assets/Imagenes/Iconos/Perfil/iconoCorreo.png'
import IconoCumpleanios from '../../Assets/Imagenes/Iconos/Perfil/iconoCumpleanios.png'
import IconoTelefono from '../../Assets/Imagenes/Iconos/Perfil/iconoTelefono.png'
import IconoUsuario from '../../Assets/Imagenes/Iconos/Perfil/iconoUsuario.png'
import IconoEditar from '../../Assets/Imagenes/Iconos/Perfil/iconoEditar.png'
import IconoCamara from '../../Assets/Imagenes/Iconos/Perfil/iconoCamara.png'
import IconoFoto from '../../Assets/Imagenes/Iconos/Perfil/foto.png'
import {useDispatch, useSelector} from "react-redux";
import {
    EditarCamposPerfilReducer,
    EditarImagenUsuarioPerfilReducer
} from '../../Redux/Actions/Perfil/Perfil'
import { message, Button } from 'antd';


const Perfil = () => {
    const dispatch = useDispatch();
    const {
        LoginUsuario
    } = useSelector(({login}) => login);

    const {
        cargando_editar_contrasenia,
        cargando_editar_cumpleanios,
        cargando_editar_telefono,
        cargando_editar_perfil,
    } = useSelector(({perfil}) => perfil);

    const [mostrarModalEditarImagen, setMostrarModalEditarImagen] = useState(false)

    const [editarContrasenia, setEditarContrasenia] = useState(false)
    const [editarCumpleanios, setEditarCumpleanios] = useState(false)
    const [editarTelefono, setEditarTelefono] = useState(false)

    const [txtContraseniaActual, setTxtContraseniaActual] = useState("")
    const [txtContraseniaNueva, setTxtContraseniaNueva] = useState("")
    const [txtContraseniaConfirmar, setTxtContraseniaConfirmar] = useState("")

    const [txtCumpleanios, setTxtCumpleanios] = useState("")
    const [txtTelefono, setTxtTelefono] = useState("")

    const EditarCampo = async (editarCampo) => {

        if(editarCampo == 1){

            if(txtContraseniaNueva == txtContraseniaConfirmar){
                let rpta = await dispatch(EditarCamposPerfilReducer(
                    editarCampo,
                    txtContraseniaActual,
                    txtContraseniaNueva,
                    null,null
                ))

                if(rpta == true){
                    setEditarContrasenia(false)
                }

            }else{
                message.error("Lo sentimos las contraseñas deben ser las mismas");
            }

        }else if(editarCampo == 2){

            let rpta = await dispatch(EditarCamposPerfilReducer(
                editarCampo,
                null,
                null,
                txtCumpleanios,null
            ))

            if(rpta == true){
                setEditarCumpleanios(false)
            }

        }else if(editarCampo == 3){
            let rpta = await dispatch(EditarCamposPerfilReducer(
                editarCampo,
                null,
                null,
                null,txtTelefono
            ))
            if(rpta == true){
                setEditarTelefono(false)
            }
        }
    }

    const SubirFoto = async (imagen) => {
        dispatch(EditarImagenUsuarioPerfilReducer(imagen))
    }

    return (
        <div style={{position:'relative'}}>
           
            <div id="Banner-Perfil">
                <div style={{position:'absolute', width:'100%', height:'100%', textAlign: "-webkit-center"}}>
                    <div 
                        id="Contenedor-Imagen-Perfil"
                        style={{
                            backgroundImage:'url("'+LoginUsuario.usuimagen+'")'
                        }}
                    >
                        <div id="Contenedor-Camara-Imagen-Perfil">
                            <img 
                                src={IconoCamara} id="Icono-Camara-Perfil" 
                                onClick={() => setMostrarModalEditarImagen(true)}
                            />
                        </div>
                    </div>

                    <div className="Wbold-S15-H20-C004FB8">
                        {LoginUsuario.pernombrecompleto}
                    </div>
                    <div className="Wnormal-S13-H17-C004FB8">
                        {LoginUsuario.tpunombre}
                    </div>
                </div>
            </div>

            <div id="Contenedor-Principal-Informacion-Basica-Perfil">
                
                <div id="Contenedor-Informacion-Basica-Perfil" >

                    <div className="Wbold-S15-H20-C004FB8">Información básica</div>

                    <div id="Card-Informacion-Basica-Perfil">
                        <Row className="Fila-Tabla-Perfil">
                            <Col className="Wbold-s13-17-C004fb8" xl={12}>
                                <img src={IconoUsuario} className="Iconos-Perfil" />
                                Nombre
                            </Col>
                            <Col
                                style={{alignSelf: "center"}}
                                className="Wnormal-S13-H17-C706C64" 
                                xl={12}
                            >
                                {LoginUsuario.pernombrecompleto}
                            </Col>
                        </Row>
                        <Row className="Fila-Tabla-Perfil">
                            <Col className="Wbold-s13-17-C004fb8" xl={12}>
                                <img src={IconoCorreo} className="Iconos-Perfil" />
                                Correo electrónico
                            </Col>
                            <Col
                                style={{alignSelf: "center"}}
                                className="Wnormal-S13-H17-C706C64" 
                                xl={12}
                            >
                                {LoginUsuario.usucorreo}
                            </Col>
                        </Row>
                        <Row className="Fila-Tabla-Perfil">
                            <Col className="Wbold-s13-17-C004fb8" xl={12}>
                                <img src={IconoCargo} className="Iconos-Perfil" />
                                Cargo
                            </Col>
                            <Col
                                style={{alignSelf: "center"}}
                                className="Wnormal-S13-H17-C706C64" 
                                xl={12}
                            >
                                {LoginUsuario.tpunombre}
                            </Col>
                        </Row>
                        <Row className={editarContrasenia == true?"Fila-Tabla-Editar-Perfil":"Fila-Tabla-Perfil"}>
                            <Col className="Wbold-s13-17-C004fb8" xl={12}>
                                <img src={IconoContrasenia} className="Iconos-Perfil" />
                                Contraseña
                                {
                                    editarContrasenia == true
                                    ?<div 
                                        className="Wnormal-S13-H17-C706C64" 
                                        style={{marginLeft:'25px', marginRight:'25px'}} 
                                    >
                                        Su contraseña tiene que tener mayúsculas o minúsculas pero no espaccios en blanco
                                    </div>
                                    :null
                                }
                            </Col>
                            <Col 
                                className="Wnormal-S13-H17-C1EC0ED" xl={12} 
                                style={editarContrasenia == true ?{alignItems: "center"} :{display:'flex', alignItems: "center"}}
                                
                            >
                                {
                                    editarContrasenia == true
                                    ?<>
                                        <div className="W600-S13-H17-C1876F2">* Contraseña actual</div>
                                        <input
                                            type="password" 
                                            onChange={(e) => setTxtContraseniaActual(e.target.value)}
                                            className="Input-Editar-Perfil" />
                                        <div className="W600-S13-H17-C1876F2">* Nueva contraseña</div>
                                        <input 
                                            type="password" 
                                            onChange={(e) => setTxtContraseniaNueva(e.target.value)}
                                            className="Input-Editar-Perfil" />
                                        <div className="W600-S13-H17-C1876F2">* Confirmar nueva contraseña</div>
                                        <input 
                                            type="password" 
                                            onChange={(e) => setTxtContraseniaConfirmar(e.target.value)}
                                            className="Input-Editar-Perfil" />
                                        
                                        <div style={{display:'flex', justifyContent: "right", marginTop:'10px'}}>
                                            <Button 
                                                loading={cargando_editar_contrasenia}
                                                onClick={() => EditarCampo(1)}
                                                id="Btn-Guardar-Editar-Perfil">
                                                    <span className="W600-S13-H17-C004FB8">Guardar</span>
                                            </Button>
                                            <div
                                                onClick={() => setEditarContrasenia(false)}
                                                id="Btn-Cancelar-Editar-Perfil" 
                                                className="W600-S13-H17-C004FB8" >Cancelar</div>
                                        </div>
                                        
                                    </>
                                    :<>
                                        <div style={{width:'100%'}}>Cambiar contraseña</div>
                                        <div style={{width:'100%', textAlign: "-webkit-right"}}>
                                            <img
                                                onClick={() => setEditarContrasenia(true)} 
                                                src={IconoEditar} className="Iconos-Editar-Perfil" />
                                        </div>
                                    </>
                                }
                            </Col>
                        </Row>
                        <Row className={editarCumpleanios == true?"Fila-Tabla-Editar-Perfil":"Fila-Tabla-Perfil"}>
                            <Col 
                                className="Wbold-s13-17-C004fb8" xl={12}
                            >
                                <img src={IconoCumpleanios} className="Iconos-Perfil" />
                                Cumpleaños
                            </Col>
                            <Col 
                                className="Wnormal-S13-H17-C706C64" xl={12} 
                                style={
                                    editarCumpleanios == true
                                    ?{}
                                    :{display:'flex', alignItems: "center"}
                                }
                            >

                                {
                                    editarCumpleanios == true
                                    ?<>
                                        <input 
                                            onChange={(e) => setTxtCumpleanios(e.target.value)}
                                            className="Input-Editar-Perfil" />
                                        <div style={{display:'flex', justifyContent: "right", marginTop:'10px'}}>
                                            <Button 
                                                id="Btn-Guardar-Editar-Perfil" 
                                                loading={cargando_editar_cumpleanios}
                                                onClick={() => EditarCampo(2)}
                                            >
                                                <span className="W600-S13-H17-C004FB8">Guardar</span>
                                            </Button>
                                            <div
                                                onClick={() => setEditarCumpleanios(false)}
                                                id="Btn-Cancelar-Editar-Perfil" 
                                                className="W600-S13-H17-C004FB8" >Cancelar</div>
                                        </div>
                                    </>
                                    :<>
                                        
                                        {/* <div style={{width:'100%'}}>Día/Mes/Año</div> */}
                                        <div style={{width:'100%'}}>
                                            {
                                                LoginUsuario.percumpleanios
                                                ?LoginUsuario.percumpleanios
                                                :"Día/Mes/Año"
                                            }
                                        </div>
                                        <div style={{width:'100%', textAlign: "-webkit-right"}}>
                                            <img 
                                                onClick={() => setEditarCumpleanios(true)}
                                                src={IconoEditar} className="Iconos-Editar-Perfil" 
                                            />
                                        </div>

                                    </>
                                }
                            </Col>
                        </Row>
                        <Row className={editarTelefono == true?"Fila-Tabla-Editar-Perfil":"Fila-Tabla-Perfil"}>
                            <Col className="Wbold-s13-17-C004fb8" xl={12}>
                                <img src={IconoTelefono} className="Iconos-Perfil" />
                                Teléfono
                            </Col>
                            <Col 
                                className="Wnormal-S13-H17-C706C64" xl={12} 
                                style={
                                    editarTelefono == true
                                    ?{}
                                    :{display:'flex', alignItems: "center"}
                                }
                                
                            >
                                {
                                    editarTelefono == true
                                    ?<>
                                        <input 
                                            onChange={(e) => setTxtTelefono(e.target.value)}
                                            className="Input-Editar-Perfil" />
                                        <div style={{display:'flex', justifyContent: "right", marginTop:'10px'}}>
                                            <Button 
                                                id="Btn-Guardar-Editar-Perfil" 
                                                loading={cargando_editar_telefono}
                                                onClick={() => EditarCampo(3)}
                                            >
                                                <span className="W600-S13-H17-C004FB8">Guardar</span>
                                            </Button>
                                            <div
                                                onClick={() => setEditarTelefono(false)}
                                                id="Btn-Cancelar-Editar-Perfil" 
                                                className="W600-S13-H17-C004FB8" >Cancelar</div>
                                        </div>
                                    </>
                                    :<>
                                        <div style={{width:'100%'}}>
                                            {LoginUsuario.pernumero}
                                        </div>
                                        <div style={{width:'100%', textAlign: "-webkit-right"}}>
                                            <img 
                                                onClick={() => setEditarTelefono(true)}
                                                src={IconoEditar} className="Iconos-Editar-Perfil" 
                                            />
                                        </div>
                                    </>
                                }
                            </Col>
                        </Row>
                    </div>

                </div>

            </div>
            
            <ClassPerfil 
                SubirFoto = {(imagen) => SubirFoto(imagen)}
                cargando = {cargando_editar_perfil}
                mostrarModal = {mostrarModalEditarImagen}
                setMostrarModalEditarImagen = {(e) => setMostrarModalEditarImagen(e)}
            />
        </div>
    )
}


class ClassPerfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            filePrincipal : null,
        }
        this.seleccionarFile = this.seleccionarFile.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    seleccionarFile() {
        this.refs.subirArchivoInput.click();
    }

    handleChange(e) {
        var file = e.target.files[0];
        var fileData = new FileReader();

        if(file){
            fileData.readAsDataURL(file);
        }
        
        fileData.onload = (e) => {
            this.setState({
                file : fileData.result
            })
        }
    }

    render() {
        return (
            <div>
                <Modal
                    title={null}
                    footer={null}
                    closeIcon={<img src={null} />}
                    visible={this.props.mostrarModal}
                    centered
                    onCancel={() => this.props.setMostrarModalEditarImagen(false)}
                >

                    <div style={{textAlign: "-webkit-center"}}>
                        <div
                            style={{marginBottom:'20px'}} 
                            className="Wbold-S17-H20-C004FB8">Actualizar tu foto de perfil</div>

                        <div
                            style={{marginBottom:'20px'}}  
                            id="Contenedor-Imagen-Cambiar-Pefil"
                        >
                            {
                                <img
                                onClick={this.seleccionarFile} 
                                src={this.state.file == null ?IconoFoto : this.state.file} 
                                id="Icono-Foto-Editar-Perfil" />
                            }
                            </div>

                        <Button
                            loading={this.props.cargando}
                            onClick={() => this.props.SubirFoto(this.state.file)} 
                            id="Btn-Subir-Foto-Editar-Perfil">
                            <span className="Wbold-S13-H17-C004FB8">+ Subir Foto</span>
                        </Button>
                    </div>

                </Modal>
                <input 
                    type="file" 
                    ref="subirArchivoInput" 
                    style={{display: "none"}} onChange={(e) => this.handleChange(e)} />
            </div>
        )
    }


}

export default Perfil
