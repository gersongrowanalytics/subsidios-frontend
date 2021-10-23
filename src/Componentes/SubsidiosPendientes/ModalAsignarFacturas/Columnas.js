import { format } from 'date-fns'

export const COLUMNAS_FACTURAS_ASIGNAR_SUBSIDIOS_PENDIENTES = [
  {
    Header: 'Elegir',
    Homologado: 'Elegir',
    accessor: 'elegir'
  },
  {
    Header: <>Fecha<br/>Factura</>,
    Homologado: 'Fecha Factura',
    accessor: 'fecfecha'
  },
  {
    Header: 'Factura SI',
    Homologado: 'Factura SI',
    accessor: 'fsifactura'
  },
  {
    Header: 'Cod Producto',
    Homologado: 'Cod Producto',
    accessor: 'fdsmaterial',
  },
  {
    Header: 'Descripción',
    Homologado: 'Descripcion',
    accessor: 'pronombre'
  },

  {
    Header: 'Valor Neto',
    Homologado: 'Valor Neto',
    accessor: 'fdsvalorneto'
  },

  {
    Header: 'Notas Credito',
    Homologado: 'Notas Credito',
    accessor: 'fdsnotacredito'
  },
  {
    Header: <>Liquidación<br/>(S/IGV Softys)</>,
    Homologado: 'Liquidación (S/IGV Softys)',
    accessor: 'fdsreconocer'
  },
  {
    Header: <>Saldo<br/>Disponible</>,
    Homologado: 'Saldo Disponible',
    accessor: 'fdssaldo'
  },
  {
    Header: <>Impacto</>,
    Homologado: <>Impacto</>,
    accessor: 'impacto'
  },
  {
    Header: <>Nuevo Saldo</>,
    Homologado: <>Nuevo Saldo</>,
    accessor: 'nuevosaldo'
  }
]