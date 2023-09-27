const ficheros = ["input.csv"]

ficheros.forEach(fichero => {
    fetch(fichero)    
    .then(respuesta => respuesta.text())  
    .then(examenJS)    
})

function examenJS(entrada){

    if (entrada.length === 0) {
        throw new Error("El fichero está vacío")
    }

    // Parseamos el CSV
    const data = entrada.split("\r\n")
    // Creamos el objeto vacio
    const output = {

    }
    // Por cada una de su key value del objeto obtenido del archivo
    for (const [key, value] of Object.entries(data)) {
        // Lo dividimos en un array
        let data = value.split(",")
        let keyRegex = data[0].trim().replace(/^["']|["']$/g, '')
        // Si el nombre del equipo no existe como key, se crea
        if (output[keyRegex] === undefined) {
            output[keyRegex] = []
        }
        // Limpiamos el dato con una regex

        let valueRegex = data[1].trim().replace(/^["']|["']$/g, '')
        
        // Aplicamos Regex para comprobar si la cadena es un numero
        if (/^[0-9]*$/.test(valueRegex) || /^[0-9]*$/.test(keyRegex)) {
            throw new Error("Miguel se te ha colado un numerillo eh");
        }
        console.log()
        output[keyRegex].push(valueRegex)

    }

    const showData = (dataCSV) => {
        // Por cada key del objeto
        for (let key in dataCSV) {
            // Construimos la cadena
            let cadena = `Equipo ${key}: `
            // Por cada valor del subarray del objeto
            for (let value of dataCSV[key]) {
                cadena += `${value}, `
            }
            // Eliminamos los dos ultimos caracteres
            cadena = cadena.slice(0, -2)
            console.log(cadena)
            
        }
    }

    showData(output)

    const equiposJSON = [];

    for (const equipo in output) {
        const equipoJSON = {
            nombre: equipo,
            jugadores: output[equipo]
        };
        equiposJSON.push(equipoJSON);
    }
    
    // Convertimos la cadena en un json
    const jsonString = JSON.stringify(equiposJSON, null, 4);

    console.log(jsonString)

}
