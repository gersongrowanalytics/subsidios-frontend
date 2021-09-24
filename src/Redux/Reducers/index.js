import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import EstadoRequest from './EstadoRequest'
import Login from './Login/Login'
import LoginFront from './Login/LoginFront'
import Comunes from './Comunes/Comunes'
import SubsidiosSo from './SubsidiosSo/SubsidiosSo'
import SubsidiosSi from './SubsidiosSi/SubsidiosSi'
import CargaArchivos from './CargaArchivos/CargaArchivos'
import Facturas from './Facturas/Facturas'
import FacturasFront from './Facturas/FacturasFront'
import SubsidiosPendientes from './SubsidiosPendientes/SubsidiosPendientes'
import Home from './Home/Home'
import TiposUsuarios from './Administrador/TiposUsuarios/TiposUsuarios'
import Usuarios from './Administrador/Usuarios/Usuarios'
import ControlArchivos from './Administrador/ControlArchivos/ControlArchivos'
import Perfil from './Perfil/Perfil'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  estadoRequest : EstadoRequest,
  login : Login,
  comunes : Comunes,
  loginFront : LoginFront,
  subsidiosSo : SubsidiosSo,
  subsidiosSi : SubsidiosSi,
  cargaArchivos : CargaArchivos,
  facturas : Facturas,
  facturasFront : FacturasFront,
  subsidiosPendientes : SubsidiosPendientes,
  home : Home,
  tiposUsuarios : TiposUsuarios,
  usuarios : Usuarios,
  perfil : Perfil,
  controlArchivos : ControlArchivos,
});

export default createRootReducer
