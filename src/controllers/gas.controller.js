//const Gas = require("../models/Gas.model");
const Gas = require("../data/gas.json");

// Retrieve all gas
exports.findAll = (req, res) => {

    res.json(Gas);
    
}

exports.findByLocalidad = (req, res) => {

    const localidad = req.params.localidad;
    const gas = Gas.ListaEESSPrecio.filter( g => g.Localidad == localidad).map( g => {
        return {
            "Dirección": g.Dirección,
            "Rótulo": g.Rótulo,
            "Precio Gasolina 95 E5" : g["Precio Gasolina 95 E5"]
            };
    });
    
    res.json(gas);
}

exports.findCheaperInLocalidad = (req, res) => {
    
    const localidad = req.params.localidad;

    const tipoGasolina = "Precio " + req.params.tipoGasolina;

    let gas = Gas.ListaEESSPrecio.filter( g => g.Localidad == localidad);

    let min = gas[0][tipoGasolina];

    gas.forEach(g => {
        if(min > g[tipoGasolina] && g[tipoGasolina] != ""){
            min = g[tipoGasolina];
        }
    });

    gas = gas.filter(g => g[tipoGasolina] == min).map(g => {
        return {
            "Dirección": g.Dirección,
            "Rótulo": g.Rótulo,
            tipoGasolina : g[tipoGasolina]
            };
    });


    res.json(gas);

    /*const localidad = req.params.localidad;

    const tipoGasolina = "Precio " + req.params.tipoGasolina;

    let gas = Gas.ListaEESSPrecio.filter( g => g.Localidad == localidad);
    
    gas = gas.filter(g => g[tipoGasolina] == Math.min(gas[tipoGasolina])).map(g => {
        return {
            "Dirección": g.Dirección,
            "Rótulo": g.Rótulo,
            tipoGasolina : g[tipoGasolina]
            };
    });


    res.json(gas);*/
}

exports.findCoordinates = (req, res) => {

    const latitud = Number(req.params.latitud);
    const longitud = Number(req.params.longitud);
    const gradoAproximacion = Number(req.params.gradoAproximacion);
    console.log(latitud)

    const gas = Gas.ListaEESSPrecio.filter( g => {
            const latitudGas = g["Latitud"].replace(',', '.');
            const longitudGas = g["Longitud (WGS84)"].replace(',', '.');
            return (
                Number(latitudGas) + gradoAproximacion >= latitud &&
                Number(latitudGas) - gradoAproximacion <= latitud &&
                Number(longitudGas) + gradoAproximacion >= longitud && 
                Number(longitudGas) - gradoAproximacion <= longitud)
        }).map(g => {
            return {    
                "Dirección": g.Dirección,
                "Rótulo": g.Rótulo,
                "Precio Gasolina 95 E5" : g["Precio Gasolina 95 E5"],
                "Latitud": g.Latitud,
                "Longitud": g["Longitud (WGS84)"]
                };
        })
    



    res.json(gas);

}

