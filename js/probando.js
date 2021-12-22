const { ejecutar, errores, simbolos } = require("./ts/index")


const bejecutar = document.getElementById('ejecutar')
const consolaa = document.getElementById('consola')
const btnerrores = document.getElementById('errores')
const btntablasimbolos = document.getElementById('tabla')


bejecutar.addEventListener('click',()=>{
    const entrada=document.getElementById("entrada").value
    alert(entrada)
    alert(typeof(entrada))
    
    //analizador.parse(entrada)
    consolaa.value=ejecutar(entrada)
})
btnerrores.addEventListener('click',()=>{
    generarTablaErrores();
})
btntablasimbolos.addEventListener('click',()=>{
    generarTablaSimbolos();
})

function generarTablaErrores() {
    var div = document.getElementById("tablaerrores");
    div.innerHTML = "";

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    var tabla = errores.get();

    // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "TIPO";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "DESCRIPCION";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "LINEA";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "COLUMNA";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "ENTORNO";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    thead.appendChild(row_1);
    // Creating and adding data to second row of the table
    for (var i=0; i<tabla.length; i++) { 
        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = tabla[i].tipo;
        let row_2_data_2 = document.createElement('td');
        row_2_data_2.innerHTML = tabla[i].descripcion;
        let row_2_data_3 = document.createElement('td');
        row_2_data_3.innerHTML = tabla[i].linea;
        let row_2_data_4 = document.createElement('td');
        row_2_data_4.innerHTML = tabla[i].columna;
        let row_2_data_5 = document.createElement('td');
        row_2_data_5.innerHTML = tabla[i].entorno;
        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        row_2.appendChild(row_2_data_5);
        tbody.appendChild(row_2);
         }
    
    // Adding the entire table to the body tag
    document.getElementById('tablaerrores').appendChild(table);
    }

    function generarTablaSimbolos() {
        var div = document.getElementById("tablasimbolo");
        div.innerHTML = "";
    
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        var tablasim = simbolos.getSimbolos();
    
        // Creating and adding data to first row of the table
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "TIPO";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "ID";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "VALOR";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "ENTORNO";
    
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);
        // Creating and adding data to second row of the table
        for (var i=0; i<tablasim.length; i++) { 
            let row_2 = document.createElement('tr');
            let row_2_data_1 = document.createElement('td');
            row_2_data_1.innerHTML = tablasim[i].tipo;
            let row_2_data_2 = document.createElement('td');
            row_2_data_2.innerHTML = tablasim[i].id;
            let row_2_data_3 = document.createElement('td');
            row_2_data_3.innerHTML = tablasim[i].valor;
            let row_2_data_4 = document.createElement('td');
            row_2_data_4.innerHTML = tablasim[i].entorno;
            row_2.appendChild(row_2_data_1);
            row_2.appendChild(row_2_data_2);
            row_2.appendChild(row_2_data_3);
            row_2.appendChild(row_2_data_4);
            tbody.appendChild(row_2);
             }
        
        // Adding the entire table to the body tag
        document.getElementById('tablasimbolo').appendChild(table);
        }
// var redraw;
// window.height = 300;
// window.width = 400;
// var g = new Graph();

// g.addEdge("cherry", "apple");
// g.addEdge("strawberry", "kiwi");
// g.addEdge("banana", "banana");


// /* layout the graph using the Spring layout implementation */
// var layouter = new Graph.Layout.Spring(g);
// layouter.layout();

// /* draw the graph using the RaphaelJS draw implementation */
// var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
// renderer.draw();

// redraw = function() {
//   layouter.layout();
//   renderer.draw();
// };
