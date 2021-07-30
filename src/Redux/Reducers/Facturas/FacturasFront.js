import {
    OBTENER_DATA_COLUMNAS_FACTURAS_SELECCIONADAS,
    OBTENER_FILTRO_DATA_COLUMNAS_FACTURAS
} from "../../../Constantes/Facturas/FacturasFront";

const INIT_STATE = {

    data_columnas_facturas_seleccionadas : [
        {
            columna : "fsisolicitante",
            nombre  : "SOLICITANTE",
            filtro  : [],
            filtrando : false
        },
        {
            columna : "fsidestinatario",
            nombre : "DESTINATARIO",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsiclase",
            nombre : "CLASE",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsifecha",
            nombre : "FECHA",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsifactura",
            nombre : "FACTURA",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsivalorneto",
            nombre : "VALOR NETO",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsipedido",
            nombre : "PEDIDO",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsipedidooriginal",
            nombre : "PEDIDO ORIGINAL",
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
            nombre  : "SOLICITANTE",
            filtro  : [],
            filtrando : false
        },
        {
            columna : "fsidestinatario",
            nombre : "DESTINATARIO",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsiclase",
            nombre : "CLASE",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsifecha",
            nombre : "FECHA",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsifactura",
            nombre : "FACTURA",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsivalorneto",
            nombre : "VALOR NETO",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsipedido",
            nombre : "PEDIDO",
            filtro : [],
            filtrando : false
        },
        {
            columna : "fsipedidooriginal",
            nombre : "PEDIDO ORIGINAL",
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
