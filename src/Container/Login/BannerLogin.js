import React, {Suspense, lazy} from 'react'
import '../../Estilos/Login/BannerLogin.css'
import LoginIconoFlecha from '../../Assets/Imagenes/Login/flecha.png'
import IconoG from '../../Assets/Imagenes/Login/g.png'
import LogoBlancoNegroPagina from '../../Assets/Imagenes/Logos/LogoTheBrainBlancoNegro.png'
import LogoGrowBlancoNegro from '../../Assets/Imagenes/Logos/LogoGrowBlancoNegro.png'
import LogoPaginaColor from '../../Assets/Imagenes/Logos/LogoTheBrainColor.png'
const ComVideoPreload = lazy(() => import('./Video'))

class BannerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            idLoginPreload : 'Login-Imagen-Preload'
        };
    }
    
    
    render(){
        return (
            <div 
                id={this.state.idLoginPreload}
                style={{
                    // background: `url(${ImagenPortada})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat : 'no-repeat',
                    position:'relative'
                }}
            >

                <div style={{position:'absolute', width:'100%', textAlignLast: "center"}}>
                    
                    {
                        <Suspense fallback={<img src={LogoPaginaColor} width={'450px'} />}>
                            <ComVideoPreload />
                        </Suspense>
                    }
                </div>





                <div
                    id="Login-Capa-Preload"
                    onClick={() => {this.setState({idLoginPreload: 'Login-Imagen-Preload'})}}
                >
                    {
                        this.props.mostrarVideoPreload == true
                        ?<div>
                            <img width={"110px"} src={IconoG} />
                        </div>
                        :null
                    }
                </div>
                


                
                {
                    this.props.mostrarVideoPreload == true
                    ?<img 
                        onClick={
                            () => {
                                this.setState({idLoginPreload: 'Login-Imagen-Preload-Animacion'})
                                this.props.setMostrarVideoPreload()
                            }
                        }
                        src={LoginIconoFlecha} id="Login-Boton-Desaparecer-Preload" />
                    :null
                }

                
            </div>
        )
    }
}
  
export default BannerLogin





