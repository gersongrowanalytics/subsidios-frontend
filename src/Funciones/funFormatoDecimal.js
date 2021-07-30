export default function(numero, cantidadDecimales)
{
    if(cantidadDecimales){
        cantidadDecimales = cantidadDecimales;
    }else if(cantidadDecimales == 0){ // Esto lo hacemos porque en la primera condicion no toma como existente el número "0"
        cantidadDecimales = 0;
    }else{
        cantidadDecimales = 4;
    }
    return (parseFloat(numero)).toFixed(cantidadDecimales);
}
