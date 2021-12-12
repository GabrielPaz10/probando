const ejecutar = document.getElementById('ejecutar')
const consola = document.getElementById('consola')
let contenido =""


ejecutar.addEventListener('click',()=>{
    const entrada=document.getElementById("entrada").value
    alert(entrada)
    alert(typeof(entrada))
    analizador.parse(entrada)
    consola.value=contenido
})
var redraw;
window.height = 300;
window.width = 400;
var g = new Graph();

g.addEdge("cherry", "apple");
g.addEdge("strawberry", "kiwi");
g.addEdge("banana", "banana");


/* layout the graph using the Spring layout implementation */
var layouter = new Graph.Layout.Spring(g);
layouter.layout();

/* draw the graph using the RaphaelJS draw implementation */
var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
renderer.draw();

redraw = function() {
  layouter.layout();
  renderer.draw();
};
