import React, {useState} from 'react'
import { Button } from 'antd'
import {
    ReloadOutlined,
    DownloadOutlined,
    LoadingOutlined 
} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerDataBigDataReducer
} from '../../../Redux/Actions/Facturas/Facturas'
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const BtnDescargar = (props) => {

    const dispatch = useDispatch()

    const {
        ComunesAnioTxtUnico,
        ComunesMesTxtUnico
    } = useSelector(({comunes}) => comunes);  

    const titulo = props.titulo
    const cargando = props.cargando
    const data = props.data
    const descargable = props.descargable
    const url = props.url
    const tipodata = props.tipodata

    return (
        <div className="Btn-Descargar-BigData">
            {/* <Button 
                type="primary" loading={cargando} 
                onClick={() => setCargando(!cargando)}
            >
                {titulo}
            </Button>   */}

            <div 
                className={
                    cargando == true
                    ?"Contenedor-Loading-Cargando-BtnDescargar-BigData"
                    :"Contenedor-Loading-BtnDescargar-BigData"
                }
                onClick={() => {
                    if(cargando == false){
                        dispatch(
                            ObtenerDataBigDataReducer(url, tipodata)
                        )
                    }
                }}
            >
                {
                    cargando == true
                    ?<LoadingOutlined  />
                    :<ReloadOutlined />
                }
            </div>
            <div className="Contenedor-Cuerpo-BtnDescargar-BigData W600-S14-H19-CFFFFFF">
                {titulo}
            </div>

            <ExcelFile 
                filename={titulo}
                element={
                    <div 
                        className={
                            cargando == true
                            ?"Contenedor-Descargar-Bloqueado-BtnDescargar-BigData"
                            :data.length == 0
                                ?"Contenedor-Descargar-Bloqueado-BtnDescargar-BigData"
                                :"Contenedor-Descargar-BtnDescargar-BigData"
                        }
                    >
                        <DownloadOutlined />
                    </div>
                }>
                <ExcelSheet 
                    dataSet={descargable} 
                    name={
                        titulo
                    }
                />
            </ExcelFile>

            
        </div>
    )
}

export default BtnDescargar
