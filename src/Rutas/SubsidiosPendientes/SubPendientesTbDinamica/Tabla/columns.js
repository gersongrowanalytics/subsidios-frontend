import { format } from 'date-fns'

export const COLUMNS_SUBPENDIENTES = [
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
    Header: 'RUC Sub Cliente',
    Homologado: 'RUC Sub Cliente',
    accessor: '',
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
    Header: <>Reconocimiento S/<br/>(SAC/APP))</>,
    Homologado: <>Reconocimiento S/(SAC/APP))</>,
    accessor: '',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Factura<br/>Impactar</>,
    Homologado: <>Factura Impactar</>,
    accessor: '',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Fecha</>,
    Homologado: <>Fecha</>,
    accessor: '',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Valorizado Subsidiado</>,
    Homologado: <>Valorizado<br/>Subsidiado</>,
    accessor: '',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Estado</>,
    Homologado: <>Estado</>,
    accessor: 'sdependiente',
    cabeceraAgrupacion: 'metricas'
  },
]