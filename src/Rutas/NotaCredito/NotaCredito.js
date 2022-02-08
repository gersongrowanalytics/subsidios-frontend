import React, {useState, useEffect, useRef} from 'react'
import {Row, Col, Carousel, Button, message } from 'antd'
import {useDispatch, useSelector} from "react-redux";
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas';
import '../../Estilos/Rutas/NotaCredito/NotaCredito.css'
import { Checkbox } from 'antd';
import ImgNotaCredito from '../../Assets/Imagenes/NotaCredito/img.png'
import {ObtenerNotaCreditoReducer, ObtenerDataDistribuidorasReducer, CambiarDataDistribuidoresReducer} from '../../Redux/Actions/NotaCredito/NotaCredito'
import FiltroFechaXmesXanio from '../../Componentes/Elementos/FiltroFechaXmesXanio/FiltroFechaXmesXanio';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const NotaCredito = () => {

    const dispatch = useDispatch()

    // CONSTANTES DE FILTRO DE AÑO Y MES
    const [anioSeleccionado, setAnioSeleccionado] = useState("")
    const [mesSeleccionado, setMesSeleccionado] = useState("")

    const {ComunesTipoDisenio} = useSelector(({comunes}) => comunes)
    const {
        cargando_obtener_nota_credito, 
        cargando_obtener_data_distribuidoras_nota_credito, 
        data_distribuidoras_nota_credito
    } = useSelector(({notaCredito}) => notaCredito)

    const [urlDescarga, setUrlDescarga] = useState("")

    const [mostrarDataZona, setMostrarDataZona] = useState(false)
    const [zonasSeleccionadas, setZonasSeleccionadas] = useState([{"clizona": "LIMA", "seleccionado": false}, {"clizona" : "PROVINCIA","seleccionado": false}])

    const [mostrarDataTerritorio, setMostrarDataTerritorio] = useState(false)
    const [territoriosSeleccionados, setTerritoriosSeleccionados] = useState([
        {"data": "CENTRO ORIENTE", "seleccionado": false},
        {"data": "NORTE 1", "seleccionado": false},
        {"data": "NORTE 2", "seleccionado": false},
        {"data": "SUR 1", "seleccionado": false},
        {"data": "SUR 2", "seleccionado": false},
        {"data": "DIRECTOS 1", "seleccionado": false},
        {"data": "LIMA 1", "seleccionado": false},
        {"data": "LIMA 2", "seleccionado": false},
        {"data": "LIMA 3", "seleccionado": false},
        {"data": "LIMA 4", "seleccionado": false},
        {"data": "INDIRECTO ESTADO", "seleccionado": false}
    ])

    const [mostrarDataDistribuidora, setMostrarDataDistribuidora] = useState(false)
    const [mostrarDataTipoCodigoCliente, setMostrarDataTipoCodigoCliente] = useState(false)


    const onChange = (a, b, c) => {
        console.log(a, b, c);
    }
      
    const DescargarExcel = async () => {

        if(mostrarDataZona == false && mostrarDataTerritorio == false && mostrarDataDistribuidora == false ){
            
            message.error('Lo sentimos, debes seleccionar algun filtro');

        }else{
            let nuevasZonas = []
            let nuevosTerritorios = []
            let nuevosDistribuidores = []
            
            if(mostrarDataZona == true){

                zonasSeleccionadas.map((zona) => {

                    if(zona.seleccionado == true){
                        nuevasZonas.push({"clizona":zona.clizona})
                    }
                    
                })

            }else if(mostrarDataTerritorio == true){

                territoriosSeleccionados.map((data) => {

                    if(data.seleccionado == true){
                        nuevosTerritorios.push({"data":data.data})
                    }
                    
                })

            }else if(mostrarDataDistribuidora == true){

                data_distribuidoras_nota_credito.map((data) => {

                    if(data.seleccionado == true){
                        nuevosDistribuidores.push({"clisuchml":data.clisuchml})
                    }
                    
                })

            }

            if(nuevasZonas.length == 0 && nuevosTerritorios.length == 0 && nuevosDistribuidores.length == 0){

                message.error('Lo sentimos, debes seleccionar por lo menos 1 dato');

            }else{
                let rutaDescarga = await dispatch(ObtenerNotaCreditoReducer(nuevasZonas, nuevosTerritorios, nuevosDistribuidores, mostrarDataZona, mostrarDataTerritorio, mostrarDataDistribuidora, anioSeleccionado, mesSeleccionado ))

                setUrlDescarga(rutaDescarga)

                if(urlDescarga == "/"){

                }else{
                    btnDescargar.current.click()
                }
            }
            

            
        }

    }


    const btnDescargar = useRef(null);

    const SeleccionarZona = (e) => {

        let nuevasZonas = [] 

        zonasSeleccionadas.map((zona) => {
            if(e.target.value == zona.clizona){
                nuevasZonas.push({"clizona":zona.clizona, seleccionado:!zona.seleccionado})
            }else{
                nuevasZonas.push({"clizona":zona.clizona, seleccionado:zona.seleccionado})
            }
            
        })

        setZonasSeleccionadas(nuevasZonas)
    }

    const SeleccionarTerritorio = (e) => {

        let nuevaData = [] 

        territoriosSeleccionados.map((data) => {
            if(e.target.value == data.data){
                nuevaData.push({"data":data.data, seleccionado:!data.seleccionado})
            }else{
                nuevaData.push({"data":data.data, seleccionado:data.seleccionado})
            }
            
        })

        setTerritoriosSeleccionados(nuevaData)
    }

    const SeleccionarDistribuidor = (e) => {

        let nuevaData = [] 

        data_distribuidoras_nota_credito.map((data) => {
            if(e.target.value == data.clisuchml){
                nuevaData.push({"clisuchml":data.clisuchml, seleccionado:!data.seleccionado})
            }else{
                nuevaData.push({"clisuchml":data.clisuchml, seleccionado:data.seleccionado})
            }
            
        })

        dispatch(CambiarDataDistribuidoresReducer(nuevaData))
    }

    useEffect(() => {

        dispatch(ObtenerDataDistribuidorasReducer())

    }, [])

    return (
        <Row>
            <Col 
                xl={24} className="CEDF0FA" style={{paddingTop:'10px', paddingBottom:'10px'}}
            >
                <div 
                    className={ComunesTipoDisenio == "Light" ?"CEDF0FA Wbold-S20-H27-C004FB8" :"Wbold-S20-H27-Ce4e6eb"}
                    style={{ paddingTop:'1px', paddingLeft:'40px', paddingBottom:'1px'}}
                >
                    <FiltroFechas 
                        titulo = {"Nota de Crédito"}
                    />
                </div>
            </Col>

            <Col 
                xl={24} 
                style={{ paddingLeft:'40px', paddingTop:'10px' }}
            >

                <Row style={{marginRight:'40px'}}>
                    <Col xl={12}>
                        <FiltroFechaXmesXanio 
                            anioSeleccionado = {anioSeleccionado}
                            mesSeleccionado = {mesSeleccionado}
                            setAnioSeleccionado = {setAnioSeleccionado}
                            setMesSeleccionado = {setMesSeleccionado}
                        />
                    </Col>
                    <Col xl={12} style={{textAlign: "-webkit-right"}}>
                        <Button 
                            className={
                                mostrarDataZona == false && mostrarDataTerritorio == false && mostrarDataDistribuidora == false
                                ?'Btn-Descargar-Desactivado-Nota-Credito Wnormal-S14-H19-CFFFFFF'
                                :'Btn-Descargar-Nota-Credito Wnormal-S14-H19-CFFFFFF'
                            }
                            // onClick={() => dispatch(ObtenerNotaCreditoReducer())}
                            onClick={() => DescargarExcel()}
                            loading={cargando_obtener_nota_credito}
                        >
                            Descargar
                        </Button>
                        <a 
                            style={{display:'none'}}
                            ref={btnDescargar} 
                            // href='http://192.168.100.5:8000/LIMA.xlsx' 
                            href={urlDescarga}
                            download>Click to download</a>
                    </Col>
                </Row>

                <Row style={{marginTop:'30px'}}>
                    <Col xl={6}>
                        <div className="Contenedor-Filtros-Nota-Credito" >

                            <div className="Wbold-S13-H17-C004FB8" style={{marginBottom:'10px'}}>
                                Filtros
                            </div>
                            
                            <div 
                                className={
                                    mostrarDataTerritorio == true || mostrarDataDistribuidora == true
                                    ?"Filtro-Nota-Credito-Desactivado Wbold-S13-H17-CFFFFFF" 
                                    :"Filtro-Nota-Credito Wbold-S13-H17-CFFFFFF" 
                                }
                                style={{paddingLeft:'10px'}}
                                onClick={() => {
                                    setMostrarDataZona(!mostrarDataZona)
                                    setMostrarDataTerritorio(false)
                                    setMostrarDataDistribuidora(false)
                                }}
                            >
                                Zona
                                <div className='Icono-Arrow-Filtro-Nota-Credito'>
                                    {
                                        mostrarDataZona == true
                                        ?<UpOutlined />
                                        :<DownOutlined />
                                    }
                                </div>
                            </div>

                            {
                                mostrarDataZona == true
                                ?<div className='Cuerpo-Filtro-Nota-Credito'>
                                    <div className='Wnormal-S13-H17-Crgba07918405' style={{marginBottom:'3px'}}>
                                        {/* Borrar Filtro */}
                                    </div>

                                    <div className='Wnormal-S13-H17-C004FB8' style={{marginBottom:'3px'}}>
                                        <Checkbox className='Check-Select-Nota-Credito' style={{paddingRight:'5px'}} /> Seleccionar todo
                                    </div>

                                    {
                                        zonasSeleccionadas.map((zona, posicion) => {
                                            return(
                                                <>
                                                    <div className='Wnormal-S13-H17-C004FB8' style={{marginBottom:'3px'}}>
                                                        <Checkbox 
                                                            onChange={(e) => SeleccionarZona(e)}
                                                            value={zona.clizona}
                                                            checked={zona.seleccionado}
                                                            className='Check-Select-Nota-Credito' style={{paddingRight:'5px'}} /> {zona.clizona}
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                :null
                            }
                            

                            <div 
                                className={
                                    mostrarDataZona == true || mostrarDataDistribuidora == true
                                    ?"Filtro-Nota-Credito-Desactivado Wbold-S13-H17-CFFFFFF" 
                                    :"Filtro-Nota-Credito Wbold-S13-H17-CFFFFFF" 
                                }
                                onClick={() => {
                                    setMostrarDataTerritorio(!mostrarDataTerritorio)
                                    setMostrarDataZona(false)
                                    setMostrarDataDistribuidora(false)
                                }}
                            >
                                Territorio
                                <div className='Icono-Arrow-Filtro-Nota-Credito'>
                                    {
                                        mostrarDataTerritorio == true
                                        ?<UpOutlined />
                                        :<DownOutlined />
                                    }
                                </div>
                            </div>

                            {
                                mostrarDataTerritorio == true
                                ?<div className='Cuerpo-Filtro-Nota-Credito'>
                                    <div className='Wnormal-S13-H17-Crgba07918405' style={{marginBottom:'3px'}}>
                                        {/* Borrar Filtro */}
                                    </div>

                                    <div className='Wnormal-S13-H17-C004FB8' style={{marginBottom:'3px'}}>
                                        <Checkbox className='Check-Select-Nota-Credito' style={{paddingRight:'5px'}} /> Seleccionar todo
                                    </div>

                                    {
                                        territoriosSeleccionados.map((data, posicion) => {
                                            return(
                                                <>
                                                    <div className='Wnormal-S13-H17-C004FB8' style={{marginBottom:'3px'}}>
                                                        <Checkbox 
                                                            onChange={(e) => SeleccionarTerritorio(e)}
                                                            value={data.data}
                                                            checked={data.seleccionado}
                                                            className='Check-Select-Nota-Credito' style={{paddingRight:'5px'}} /> {data.data}
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                :null
                            }


                            
                            <div 
                                className={
                                    mostrarDataTerritorio == true || mostrarDataZona == true
                                    ?"Filtro-Nota-Credito-Desactivado Wbold-S13-H17-CFFFFFF" 
                                    :"Filtro-Nota-Credito Wbold-S13-H17-CFFFFFF"
                                }
                                
                                onClick={() => {
                                    setMostrarDataZona(false)
                                    setMostrarDataTerritorio(false)
                                    setMostrarDataDistribuidora(!mostrarDataDistribuidora)
                                }}
                            >
                                Distribuidora
                                <div className='Icono-Arrow-Filtro-Nota-Credito'>
                                    {
                                        mostrarDataDistribuidora == true
                                        ?<UpOutlined />
                                        :<DownOutlined />
                                    }
                                </div>
                            </div>



                            {
                                mostrarDataDistribuidora == true
                                ?<div className='Cuerpo-Filtro-Nota-Credito'>
                                    <div className='Wnormal-S13-H17-Crgba07918405' style={{marginBottom:'3px'}}>
                                        {/* Borrar Filtro */}
                                    </div>

                                    <div className='Wnormal-S13-H17-C004FB8' style={{marginBottom:'3px'}}>
                                        <Checkbox className='Check-Select-Nota-Credito' style={{paddingRight:'5px'}} /> Seleccionar todo
                                    </div>

                                    {
                                        data_distribuidoras_nota_credito.map((data, posicion) => {
                                            return(
                                                <>
                                                    <div className='Wnormal-S13-H17-C004FB8' style={{marginBottom:'3px'}}>
                                                        <Checkbox 
                                                            onChange={(e) => SeleccionarDistribuidor(e)}
                                                            value={data.clisuchml}
                                                            checked={data.seleccionado}
                                                            className='Check-Select-Nota-Credito' style={{paddingRight:'5px'}} /> {data.clisuchml}
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                :null
                            }


                            
                            <div className="Filtro-Nota-Credito Wbold-S13-H17-CFFFFFF">
                                Tipo Código de Cliente
                                <div className='Icono-Arrow-Filtro-Nota-Credito'>
                                    {
                                        mostrarDataDistribuidora == true
                                        ?<UpOutlined />
                                        :<DownOutlined />
                                    }
                                </div>
                            </div>

                        </div>
                    </Col>
                    <Col xl={13}>
                        <div className='Wbold-S13-H17-C004FB8' style={{textAlign: "-webkit-center", marginBottom:'20px'}}>
                            {
                                mostrarDataZona == true
                                ?"Excel por Zona"
                                :mostrarDataTerritorio == true
                                    ?"Excel por Territorio"
                                    :mostrarDataDistribuidora == true
                                        ?"Excel por Distribuidora"
                                        :"Selecciona un Tipo de Filtro"
                            }
                            
                        </div>
                        <Carousel afterChange={(a,b,c) => onChange(a,b,c)} className='Contenedor-Carousel-Nota-Credito'>
                            <div className='Contenedor-Carousel-Img-Nota-Credito'>
                                <img src={ImgNotaCredito}  />
                            </div>
                            <div className='Contenedor-Carousel-Img-Nota-Credito'>
                                <img src={ImgNotaCredito} />
                            </div>
                        </Carousel>

                    </Col>
                    <Col xl={5}>
                    </Col>
                </Row>

            </Col>

        </Row>
    )
}

export default NotaCredito
