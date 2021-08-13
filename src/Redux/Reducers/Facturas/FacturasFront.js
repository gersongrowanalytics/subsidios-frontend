import {
    OBTENER_DATA_COLUMNAS_FACTURAS_SELECCIONADAS,
    OBTENER_FILTRO_DATA_COLUMNAS_FACTURAS
} from "../../../Constantes/Facturas/FacturasFront";

const INIT_STATE = {

    data_columnas_facturas_seleccionadas : [
        {
            columna : "fsisolicitante",
            nombre  : "Solicitante",
            filtro  : [],
            filtrando : false
        },
        {
            columna : "fsidestinatario",
            nombre : "Destinatario",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsiclase",
            nombre : "Clase",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsifecha",
            nombre : "Fecha",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsifactura",
            nombre : "Factura",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsivalorneto",
            nombre : "Valor Neto",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsipedido",
            nombre : "Pedido",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsipedidooriginal",
            nombre : "Pedido Original",
            filtro : [],
            filtrando : false
        },
    ],

    data_columnas_facturas : [
        {
            columna : "numeroFIla",
            nombre  : "N° Fila",
            filtro  : [],
            filtrando : false
        },
        {
            columna : "fsisolicitante",
            nombre  : "Solicitante",
            filtro  : [],
            filtrando : false
        },
        {
            columna : "fsidestinatario",
            nombre : "Destinatario",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsiclase",
            nombre : "Clase",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsifecha",
            nombre : "Fecha",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsifactura",
            nombre : "Factura",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsivalorneto",
            nombre : "Valor Neto",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsipedido",
            nombre : "Pedido",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsipedidooriginal",
            nombre : "Pedido Original",
            filtro : [],
            filtrando : false
        },
    ]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_FILTRO_DATA_COLUMNAS_FACTURAS: {
        return {
            ...state,
            data_columnas_facturas : action.payload
        }
    }
    default:
      return state;
  }
}
