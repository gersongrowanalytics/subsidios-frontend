import { format } from 'date-fns'

export const COLUMNS_SUBPENDIENTES = [
  {
    Header: 'Item',
    Homologado: 'Item',
    accessor: 'items',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: 'Zona',
    Homologado: 'Zona',
    accessor: 'clizona',
    cabeceraAgrupacion: 'ClienteSI'
  },
  {
    Header: 'Año',
    Homologado: 'Año',
    accessor: 'fecanionumero',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: 'Mes',
    Homologado: 'Mes',
    accessor: 'fecmesabreviacion',
    cabeceraAgrupacion: 'metricas'
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
  // {
  //   Header: 'Sub Cliente',
  //   Homologado: 'Sub Cliente',
  //   accessor: 'sdesubcliente',
  //   cabeceraAgrupacion: 'ClienteSI'
  // },

  {
    Header: 'RUC Sub Cliente',
    Homologado: 'RUC Sub Cliente',
    accessor: 'sderucsubcliente',
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
    Header: <>Monto<br/>(S/IGV Softys)</>,
    Homologado: <>Reconocimiento S/(SAC/APP))</>,
    accessor: 'reconocimientosacapp',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Liquidación<br/>(S/IGV Softys)</>,
    Homologado: <>Liquidación S/(APP))</>,
    accessor: 'valorizadosubsidiado',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Liquidación<br/>Pendiente</>,
    Homologado: <>Liquidación Pendiente</>,
    accessor: 'liquidacionpendiente',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Factura<br/>Impactar</>,
    Homologado: <>Factura Impactar</>,
    accessor: 'facturaimpactar',
    cabeceraAgrupacion: 'metricas'
  },
  {
    Header: <>Fecha<br/>Factura</>,
    Homologado: <>Fecha Factura</>,
    accessor: 'fechafactura',
    cabeceraAgrupacion: 'metricas'
  },
  // {
  //   Header: <>Liquidación<br/>(S/IGV Softys)</>,
  //   Homologado: <>Liquidación S/(APP))</>,
  //   accessor: 'valorizadosubsidiado',
  //   cabeceraAgrupacion: 'metricas'
  // },
  {
    Header: <>Opciones</>,
    Homologado: <>Opciones</>,
    accessor: 'estadoSubPendientes',
    cabeceraAgrupacion: 'metricas'
  },
]