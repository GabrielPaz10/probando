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
exports.While = void 0;
var __1 = require("../..");
var instruccion_1 = require("../../abstractas/instruccion");
var Error_1 = require("../../Reportes/Error");
var TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
var Tipos_1 = require("../../tiposD/Tipos");
var While = /** @class */ (function (_super) {
    __extends(While, _super);
    function While(condicion, cuerpo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.cuerpo = cuerpo;
        return _this;
    }
    While.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'While');
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            __1.consola.actualizar("La condicion de WHILE debe ser de tipo boolean, l:" + this.linea + " c:" + this.columna);
            __1.errores.agregar(new Error_1.Error('Semantico', "La condicion de WHILE debe ser de tipo boolean, l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
        }
        while (condicion.valor) {
            var entornoLocal = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
            var control = this.correrInstrucciones(tsGlobal, entornoLocal, metodos, entorno + "While");
            if (control !== null) {
                if (control.tipo === Tipos_1.TiposControl.BREAK) {
                    break;
                }
                else if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                    condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    continue;
                }
                else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                    return control;
                }
            }
            condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
                __1.consola.actualizar("La condicion de WHILE debe ser de tipo boolean, l:" + this.linea + " c:" + this.columna);
                __1.errores.agregar(new Error_1.Error('Semantico', "La condicion de WHILE debe ser de tipo boolean, l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
            }
        }
    };
    While.prototype.correrInstrucciones = function (tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.cuerpo) {
            var control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    };
    While.prototype.ast = function (metodos) {
        return null;
    };
    return While;
}(instruccion_1.Instruccion));
exports.While = While;
