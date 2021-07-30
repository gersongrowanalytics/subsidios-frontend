import React from 'react'
import ImagenPeru from '../../Assets/Imagenes/Login/Banderas/banderaPeru.png'
import ImagenChile from '../../Assets/Imagenes/Login/Banderas/banderaChile.png'
import ImagenMexico from '../../Assets/Imagenes/Login/Banderas/banderaMexico.png'
import ImagenBolivia from '../../Assets/Imagenes/Login/Banderas/banderaBolivia.png'
import ImagenEeuu from '../../Assets/Imagenes/Login/Banderas/banderaEeuu.png'
import ImagenArgentina from '../../Assets/Imagenes/Login/Banderas/banderaArgentina.png'
import '../../Estilos/Componentes/Login/BanderasPaises.css'

const BanderasPaises = () => {
    return (
        <div
            id="Contenedor-Logos-Paises"
        >
            <img
                className="Bandera-Pais-Login" 
                src={ImagenPeru} />
            <img
                className="Bandera-Pais-Login" 
                src={ImagenChile} />
            <img
                className="Bandera-Pais-Login" 
                src={ImagenMexico} />
            <img
                className="Bandera-Pais-Login" 
                src={ImagenArgentina} />
            <img
                className="Bandera-Pais-Login" 
                src={ImagenBolivia} />
            <img
                className="Bandera-Pais-Login" 
                src={ImagenEeuu} />
        </div>
    )
}

export default BanderasPaises
