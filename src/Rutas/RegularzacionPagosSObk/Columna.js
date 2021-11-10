import { format } from 'date-fns'
// import { SelectColumnFilter} from './SelectColumnFilter'

export const COLUMNAS = [
  {
    Header: 'Item',
    accessor: '',
    disableFilters: true,
  },
  {
    Header: 'Zona',
    accessor: 'clizona',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Zona`,
  },
  {
    Header: 'Año',
    accessor: 'fecanionumero',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique tcanombre`,
  },
  {
    Header: 'Mes',
    accessor: 'fecmesabreviacion',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique usuusuario`,
  },
  {
    Header: 'Territorio',
    accessor: 'clitv',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Territorio`,
  },
  {
    Header: 'Cliente',
    accessor: 'clihml',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Cliente`,
  },
  {
    Header: 'Sucursal',
    accessor: 'clisuchml',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Sucursal`,
  },
  {
    Header: 'RUC Sub Cliente',
    accessor: 'sderucsubcliente',
    aggregate: 'average',
    Aggregated: ({ value }) => `${value} Unique RUC Sub Cliente`,
  },

  {
    Header: 'Sector',
    accessor: 'cosnombre',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Sector`,
  },

  {
    Header: 'Cod Producto',
    accessor: 'prosku',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Cod Producto`,
  },

  {
    Header: 'Nombre Producto',
    accessor: 'pronombre',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Nombre Producto`,
  },
  {
    Header: 'Monto (S/IGV Softys)',
    accessor: 'sdemontoacido',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Cod Producto`,
  },

  {
    Header: 'Liquidación (S/IGV Softys)',
    accessor: 'sumsfsvalorizado',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Cod Producto`,
  },

  {
    Header: 'Liquidación Pendiente',
    accessor: '',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Cod Producto`,
  },

  {
    Header: 'Opciones',
    accessor: '',
    aggregate: 'uniqueCount',
    Aggregated: ({ value }) => `${value} Unique Cod Producto`,
  },
]

