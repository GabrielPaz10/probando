"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerMain = exports.ejecutar = exports.errores = exports.consola = void 0;
const Consola_1 = require("./Reportes/Consola");
const TablaError_1 = require("./Reportes/TablaError");
const TablaMetodos_1 = require("./Reportes/TablaMetodos");
const TablaSimbolos_1 = require("./Reportes/TablaSimbolos");
const instruccion_1 = require("./abstractas/instruccion");
const Error_1 = require("./Reportes/Error");
// const ejecutaar = document.getElementById('ejecutar')
// ejecutaar.addEventListener('click',()=>{
//     const entrada=(<HTMLInputElement>document.getElementById("entrada")).value
//     alert(entrada)
//     alert(typeof(entrada))
// })
exports.consola = new Consola_1.Consola();
exports.errores = new TablaError_1.TablaError();
const analizador = require('../analizador/analizador.js');
let main = [];
let metodos;
let ast;
function limpiarTodo() {
    exports.consola.limpiar();
    exports.errores.vaciar();
}
function ejecutar(entrada) {
    limpiarTodo();
    const tsGlobal = new TablaSimbolos_1.TablaSimbolo([]);
    const tsLocal = new TablaSimbolos_1.TablaSimbolo([]);
    metodos = new TablaMetodos_1.TablaMetodos([]);
    main = [];
    try {
        ast = analizador.parse(entrada);
        obtenerAst(ast, tsGlobal, metodos);
        main = obtenerMain(metodos);
        ejecutarMain(main, tsGlobal, tsLocal, metodos);
    }
    catch (error) {
        console.log(error);
    }
    return exports.consola.publicar();
}
exports.ejecutar = ejecutar;
function obtenerAst(ast, tsGlobal, metodos) {
    for (const instruction of ast) {
        try {
            if (instruction instanceof instruccion_1.Instruccion)
                instruction.ejecutar(tsGlobal, tsGlobal, metodos, "-");
        }
        catch (error) {
            if (error instanceof Error_1.Error)
                exports.errores.agregar(error);
        }
    }
}
function ejecutarMain(main, tsGlobal, tsLocal, metodos) {
    if (main.length === 1) {
        main[0].cuerpo.forEach((instruccion) => {
            instruccion.ejecutar(tsGlobal, tsLocal, metodos, 'Global');
        });
    }
    else if (main.length > 1) {
        exports.consola.actualizar(`Solo puede haber un metodo Main en el programa`);
        exports.errores.agregar(new Error_1.Error('Semantico', `Solo puede haber un metodo Main en el programa`, 0, 0, 'Global'));
    }
    else if (main.length < 1) {
        exports.consola.actualizar(`Debe haber un metodo Main en el programa`);
        exports.errores.agregar(new Error_1.Error('Semantico', `Debe haber un metodo Main en el programa`, 0, 0, 'Global'));
    }
}
function obtenerMain(metodos) {
    return metodos.metodoss.filter((main) => main.id === 'main');
}
exports.obtenerMain = obtenerMain;
