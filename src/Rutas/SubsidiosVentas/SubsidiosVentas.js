import React, {useRef, useState} from 'react'
import {funPermisosObtenidos} from '../../Funciones/funPermiso'
import {useDispatch, useSelector} from "react-redux";
import { Spin, Tooltip, Button } from 'antd'
import {
    ObtenerLinkHistoricoSubsidiosSIVentas
} from '../../Redux/Actions/SubsidiosSi/SubsidiosSi'
import { LoadingOutlined } from '@ant-design/icons'
import IconoFondoSubsidiosVentas from '../../Assets/Imagenes/Iconos/SubsidiosSo/fondosubsidiosventas.png'
import Iconoflechacompletasubsidiosventas from '../../Assets/Imagenes/Iconos/SubsidiosSo/flechacompletasubsidiosventas.PNG'
import FiltroFechas from '../../Componentes/Subsidios/FiltroFechas'
import '../../Estilos/Rutas/SubsidiosVentas/SubsidiosVentas.css'
import IconoDescargaSubsidiosVentas from '../../Assets/Imagenes/Iconos/SubsidiosVentas/descargaArchivo.png'

const SubsidiosVentas = () => {

    const [linkDescargarSubVentas, setLinkDescargarSubVentas] = useState(true)
    const inputDescargaLinkSubsidiosVentas = useRef(null);
    const dispatch = useDispatch();
    const {LoginUsuario} = useSelector(({login}) => login);
    const {
        cargando_subsidiossi_ventas
    } = useSelector(({subsidiosSi}) => subsidiosSi);
    const {
        ComunesTipoDisenio,
    } = useSelector(({comunes}) => comunes);

    return (
        <div>
            <div 
                className={
                    ComunesTipoDisenio == "Light"
                    ?"Wbold-S20-H27-C004FB8 CEDF0FA"
                    :"Wbold-S20-H27-Ce4e6eb"
                }
                style={{
                    display:'flex',
                    height:'45px',
                    paddingLeft:'40px',
                    alignItems: 'center'
                }}
            >

                    <FiltroFechas 
                        titulo = {"Histórico de Subsidios"}
                    />

            </div>
            <div 
                style={{
                    marginBottom:'20px',
                    textAlign: "-webkit-center",
                    marginTop: "140px"
                }}
            >
                <img src={IconoDescargaSubsidiosVentas} className="Icono-Subsidios-Ventas" />
                <br/>
                <div className='Txt-Subsidios-Ventas Wnormal-S14-H19-C000000'>
                    Visualiza la información histórica de los Subsidios Pagados desde el 2019, <br/>de los distribuidores de Lima y Provincias.
                </div>
                <br/>
                <Button 
                    className='Btn-Descargar-Subsidios-Ventas Wbold-S14-H19-CFFFFFF'
                    loading={cargando_subsidiossi_ventas}
                    onClick={ async() => {
                        let linkDescargar = await dispatch(ObtenerLinkHistoricoSubsidiosSIVentas())
                        await setTimeout( async () => {  
                            await setLinkDescargarSubVentas(linkDescargar)
                            inputDescargaLinkSubsidiosVentas.current.click()
                        }, 1000);

                    }}
                >
                    Descargar
                </Button>
            </div>

            <a 
                href={linkDescargarSubVentas}
                download
                ref={inputDescargaLinkSubsidiosVentas}
                style={{
                    display:'none'
                }}
            >click</a>

            {/* {
                funPermisosObtenidos(
                    LoginUsuario.permisos,
                    "MENU.MODULO.SUBSIDIOSSI.DESCARGAR.SUBSIDIOSI.FORMATO.VENTAS",
                    <Tooltip placement="left" title={"Descarga Venta"}>
                    <div 
                        className='Btn-Flotante-Descargar-Subsidios-Si-Ventas-Light'
                        onClick={ async() => {
                            let linkDescargar = await dispatch(ObtenerLinkHistoricoSubsidiosSIVentas())
                            await setTimeout( async () => {  
                                await setLinkDescargarSubVentas(linkDescargar)
                                inputDescargaLinkSubsidiosVentas.current.click()
                            }, 1000);

                        }}

                        style={{bottom: "110px"}}

                    >
                        {
                            cargando_subsidiossi_ventas == true
                            ?<div 
                                className={cargando_subsidiossi_ventas == true ?'Spinner-Ventas-Subsidios': ''}
                            >
                                <Spin 
                                    spinning={cargando_subsidiossi_ventas}
                                    indicator={<LoadingOutlined />}
                                    style={
                                        true == true
                                        ?{width:'100%',
                                        height:'100%',
                                        cursor: 'not-allowed',
                                        position: "absolute",
                                        top: "19px"
                                        }
                                        :{}
                                    }
                                ></Spin>
                            </div>
                            :null
                        }
                                <div 
                                    style={{
                                        position:'relative',
                                        background: "linear-gradient(140.75deg, #1876F2 17.49%, #1EC0ED 91.77%)",
                                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                        borderRadius: "20.5px"
                                    }}
                                >
                                    <img 
                                        className='Icono-Fondo-Subsidios-Ventas-Formato'
                                        src={
                                            ComunesTipoDisenio == "Light"
                                            ?IconoFondoSubsidiosVentas
                                            :IconoFondoSubsidiosVentas
                                        }
                                    />

                                    <img 
                                        className='Icono-Flecha-Subsidios-Ventas-Formato'
                                        src={
                                            ComunesTipoDisenio == "Light"
                                            ?Iconoflechacompletasubsidiosventas
                                            :Iconoflechacompletasubsidiosventas
                                        }
                                    />
                                </div>                            
                    </div>
                    </Tooltip>
                )
            } */}
        </div>
    )
}

export default SubsidiosVentas