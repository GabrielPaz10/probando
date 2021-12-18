"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var Tipos_1 = require("../../tiposD/Tipos");
var Parse = /** @class */ (function (_super) {
    __extends(Parse, _super);
    function Parse(destino, cadena, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.destino = destino;
        _this.cadena = cadena;
        return _this;
    }
    Parse.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        if (this.destino === Tipos_1.Tipos.INT || this.destino === Tipos_1.Tipos.DOUBLE || this.destino === Tipos_1.Tipos.BOOLEAN) {
            var cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (cadena.tipo === Tipos_1.Tipos.STRING) {
                switch (this.destino) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(cadena.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(cadena.valor)) };
                    case Tipos_1.Tipos.BOOLEAN:
                        if (cadena.valor == '1' || cadena.valor == '0') {
                            return { tipo: Tipos_1.Tipos.BOOLEAN, valor: !!(Number(cadena.valor)) };
                        }
                        else if (cadena.valor == 'true' || cadena.valor == 'false') {
                            return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (cadena.valor == 'true') ? true : false };
                        }
                }
            }
            __1.errores.agregar(new Error_1.Error('Semantico', "El tipo " + cadena.tipo + " no puede usarse con PARSE", this.linea, this.columna, entorno));
            __1.consola.actualizar("El tipo " + cadena.tipo + " no puede usarse con PARSE\n");
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "El tipo " + this.destino + " no puede usarse con PARSE", this.linea, this.columna, entorno));
        __1.consola.actualizar("El tipo " + this.destino + " no puede usarse con PARSE\n");
    };
    Parse.prototype.ast = function (metodos) {
        return null;
    };
    return Parse;
}(expresion_1.Expresion));
exports.Parse = Parse;
