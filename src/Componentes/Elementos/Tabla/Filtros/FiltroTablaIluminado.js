import React, {useState} from 'react'
import { Checkbox } from 'antd';

const FiltroTablaIluminado = () => {

    const [mostrarFiltro, setMostrarFiltro] = useState(false)

    return (
        <>
            <div className="Wbold-S13-H17-CFFFFFF" 
                style={{
                    width:'100%',
                    height: '33px',
                    background:'#FF8023',
                    borderRadius: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor:'pointer'
                }}
                onClick={() => setMostrarFiltro(!mostrarFiltro)}
            >
                Categoría
            </div>

            {
                mostrarFiltro == true
                ?<div
                    style={{
                        marginTop:'5px',
                        width: '204px',
                        height: '190px',
                        background: '#FFFFFF',
                        border: '1px solid #D7E8FF',
                        boxSizing: 'border-box',
                        boxShadow: '0px 0px 15px #D8DFE9',
                        borderRadius: '8px',
                        position: 'absolute',
                        zIndex:'1',
                        paddingLeft:'18px',
                        paddingRight:'18px',
                        paddingTop:'13px',
                    }}
                >

                    <div
                        style={{
                            border: '1px solid #004FB8',
                            boxSizing: 'border-box',
                            borderRadius: '14px',
                            width:'100%',
                            height:'24px',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft:'10px',
                            marginBottom:'10px',
                        }}
                        className="Wnormal-S12-H16-CA2B9ED-L0015"
                    >
                        <input placeholder="Buscar" style={{border:'0'}}  />
                    </div>

                    <Checkbox><span className="W600-S13-H17-C004FB8">Seleccionar todo</span></Checkbox><br/>

                    <div style={{overflow:'auto', width:'100%', height:'115px'}}>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                        <Checkbox><span className="W600-S13-H17-C004FB8">000-000000899</span></Checkbox><br/>
                    </div>

                    {/* <Checkbox>000-000000899</Checkbox> */}

                </div>

                :null
            }
        </>
    )
}

export default FiltroTablaIluminado
