import React, {useState, useEffect} from 'react'
import IconoTopCalendario from '../../Assets/Imagenes/Iconos/Top/calendario_azul.svg'
import IconoTopCalendarioGris from '../../Assets/Imagenes/Iconos/Top/calendario_gris.svg'
import {useDispatch, useSelector} from "react-redux";
import {CambiarFechaUnicoReducer} from '../../Redux/Actions/Comunes/Comunes'
import IconoCalendario from '../../Assets/Imagenes/Iconos/Comunes/calendario.png'
// IMPORTAR DATE PICKER
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es);

const FiltroFechaMes = (props) => {

    const dispatch = useDispatch();
    
    const {
        ComunesFechaUnico,
        ComunesAnioTxtUnico,
        ComunesMesTxtUnico
    } = useSelector(({comunes}) => comunes)

    const [startDate, setStartDate] = useState(new Date());

    const CambiarFecha = (date) => {

        dispatch(CambiarFechaUnicoReducer(date))
        
    }

    useEffect(() => {

        

    },[])

    return (
        <DatePicker
            locale="es"
            selected={ComunesFechaUnico }
            dateFormat="yyyy/MM"
            showMonthYearPicker
            autoComplete={"off"}
            // onChange={(date) => console.log(date.getMonth()+1)}
            onChange={(date) => CambiarFecha(date)}
            customInput={

                <div style={{display:'flex', }}>
                    <img src={IconoCalendario} width="25px" style={{marginRight:'5px'}} />
                    <div style={{paddingRight:'8px', alignSelf: "center"}}>{props.texto}</div>
                    <div className="Contenedor-Filtro-Fecha Wnormal-S12-H17-C004FB8" style={{cursor:'pointer'}}>
                        {
                            ComunesFechaUnico != null
                            ?ComunesAnioTxtUnico+"/"+ComunesMesTxtUnico
                            :"DD/MM/AA"
                        }
                    </div> 
                </div>
            }
        />
    )
}

export default FiltroFechaMes
