"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errores = exports.consola = void 0;
var Consola_1 = require("./Reportes/Consola");
var TablaError_1 = require("./Reportes/TablaError");
// const ejecutaar = document.getElementById('ejecutar')
// ejecutaar.addEventListener('click',()=>{
//     const entrada=(<HTMLInputElement>document.getElementById("entrada")).value
//     alert(entrada)
//     alert(typeof(entrada))
// })
exports.consola = new Consola_1.Consola();
exports.errores = new TablaError_1.TablaError();
