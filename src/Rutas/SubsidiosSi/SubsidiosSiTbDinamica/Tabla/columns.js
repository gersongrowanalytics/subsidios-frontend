import { format } from 'date-fns'

export const COLUMNS_SUBSI = [
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
    Header: <>Reconocimiento S/<br/>(Distribuidor)</>,
    Homologado: <>Reconocimiento S/(Distribuidor)</>,
    accessor: 'sdemontoareconocerreal',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Reconocimiento S/<br/>(SAC/APP))</>,
    Homologado: <>Reconocimiento S/(SAC/APP))</>,
    accessor: 'sumsfsvalorizado',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Factura<br/>Impactar</>,
    Homologado: <>Factura Impactar</>,
    accessor: 'facturas',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Fecha</>,
    Homologado: <>Fecha</>,
    accessor: 'fecfecha',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Estado</>,
    Homologado: <>Estado</>,
    accessor: 'sdependiente',
    cabeceraAgrupacion: 'metricas'
  },
]