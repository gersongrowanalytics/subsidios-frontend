import { format } from 'date-fns'
import { SelectColumnFilter} from './SelectColumnFilter'

export const COLUMNS_SUBSO = [
  // {
  //   Header: 'Id',
  //   accessor: 'id',
  // },
  {
    Header: 'Zona',
    Homologado: 'Zona',
    accessor: 'clizona',
    cabeceraAgrupacion: 'ClienteSI'
  },
  {
    Header: 'Territorio',
    Homologado: 'Territorio',
    accessor: 'sdeterritorio',
    cabeceraAgrupacion: 'ClienteSI'
  },
  {
    Header: 'Cliente',
    Homologado: 'Cliente',
    accessor: 'clinombre',
    cabeceraAgrupacion: 'ClienteSI'
  },
  {
    Header: 'Sucursal',
    Homologado: 'Sucursal',
    accessor: 'clisuchml',
    cabeceraAgrupacion: 'ClienteSI'
  },
  {
    Header: 'Sub Cliente',
    Homologado: 'Sub Cliente',
    accessor: 'sdesubcliente',
    cabeceraAgrupacion: 'ClienteSI'
  },
  {
    Header: 'Sector',
    Homologado: 'Sector',
    accessor: 'sdesector',
    cabeceraAgrupacion: 'Materiales'
  },
  {
    Header: 'Cod Producto',
    Homologado: 'Cod Producto',
    accessor: 'prosku',
    cabeceraAgrupacion: 'Materiales'
  },
  {
    Header: 'Nombre Producto',
    Homologado: 'Nombre Producto',
    accessor: 'pronombre',
    cabeceraAgrupacion: 'Materiales'
  },
  {
    Header: <>Bultos<br/>(Acordados)</>,
    Homologado: "Bultos (Acordados)",
    accessor: 'sdebultosacordados',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Bultos<br/>(Distribuidor)</>,
    Homologado: "Bultos (Distribuidor)",
    accessor: 'sdecantidadbultos',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Bultos<br/>(Softys)</>,
    Homologado: "Bultos (Softys)",
    accessor: 'sdecantidadbultosreal',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Monto<br/>(S/IGV DT)</>,
    Homologado: "Monto (S/IGV DT)",
    accessor: 'sdemontoareconocer',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Monto<br/>(S/IGV Softys)</>,
    Homologado: "Monto (S/IGV Softys)",
    accessor: 'sdemontoareconocerreal',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: 'Dif. Ahorro S/.',
    Homologado: 'Dif. Ahorro S/.',
    accessor: 'diferencia',
    cabeceraAgrupacion: 'metricas'
  },
]

export const AgrupacionesColumnas = [
  {
    agrupacion: "Cliente Sell In",
    seleccionado: false,
    cabeceraAgrupacion: "ClienteSI"
  },
  {
    agrupacion: "Materiales",
    seleccionado: false,
    cabeceraAgrupacion: "Materiales"
  },
  {
    agrupacion: "Otros",
    seleccionado: false,
    cabeceraAgrupacion: "otros"
  },
]