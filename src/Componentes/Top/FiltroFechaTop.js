import React, {useState, useEffect} from 'react'
import IconoTopCalendario from '../../Assets/Imagenes/Iconos/Top/calendario_azul.svg'
import IconoTopCalendarioGris from '../../Assets/Imagenes/Iconos/Top/calendario_gris.svg'
import {useDispatch, useSelector} from "react-redux";
import {CambiarFechaReducer} from '../../Redux/Actions/Comunes/Comunes'

// IMPORTAR DATE PICKER
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es);

const FiltroFechaTop = (props) => {

    const dispatch = useDispatch();
    
    const {
        ComunesFechaInicio,
        ComunesFechaFinal,

        ComunesAnioTxtIncio,
        ComunesMesTxtInicio,
        ComunesAnioTxtFinal,
        ComunesMesTxtFinal,
    } = useSelector(({comunes}) => comunes)

    const [startDate, setStartDate] = useState(new Date());

    const CambiarFecha = (date) => {

        if(props.texto == "Fecha Inicio"){
            dispatch(CambiarFechaReducer(date, null))
        }else{
            dispatch(CambiarFechaReducer(null, date))
        }
        
    }

    useEffect(() => {

        if(ComunesFechaInicio == null){
            // dispatch(CambiarFechaReducer(startDate, null))
        }

    },[])

    return (
        <DatePicker
            locale="es"
            selected={props.texto == "Fecha Inicio" ?ComunesFechaInicio :ComunesFechaFinal }
            dateFormat="yyyy/MM"
            showMonthYearPicker
            autoComplete={"off"}
            // onChange={(date) => console.log(date.getMonth()+1)}
            onChange={(date) => CambiarFecha(date)}
            customInput={

                <div style={{display:'flex', }}>
                    <div style={{paddingRight:'8px', alignSelf: "center"}}>{props.texto}</div>
                    <div className="Contenedor-Filtro-Fecha Wnormal-S13-H17-C004FB8" style={{cursor:'pointer'}}>
                        {
                            ComunesFechaInicio != null
                            ?
                            props.texto == "Fecha Inicio" 
                            ?ComunesAnioTxtIncio+"/"+ComunesMesTxtInicio
                            :ComunesAnioTxtFinal+"/"+ComunesMesTxtFinal
                            :"DD/MM/AA"
                        }
                    </div> 
                </div>
                // <div className="Contenedor-Filtro-Fecha Wnormal-S13-H17-C004FB8">
                //     <img src={IconoTopCalendarioGris} className="IconoTopFiltro" />
                //     {/* Fecha Fin */}
                //     {props.texto}
                // </div>
            }
        />
    )
}

export default FiltroFechaTop
