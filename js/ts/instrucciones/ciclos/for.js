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
exports.For = void 0;
var __1 = require("../..");
var instruccion_1 = require("../../abstractas/instruccion");
var Error_1 = require("../../Reportes/Error");
var TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
var Tipos_1 = require("../../tiposD/Tipos");
var For = /** @class */ (function (_super) {
    __extends(For, _super);
    function For(declaracion, condicion, paso, cuerpo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.declaracion = declaracion;
        _this.condicion = condicion;
        _this.paso = paso;
        _this.cuerpo = cuerpo;
        return _this;
    }
    For.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var local = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        this.declaracion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'For');
        var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        this.verError(condicion, entorno);
        while (condicion.valor) {
            var localFor = new TablaSimbolos_1.TablaSimbolo(local.getSimbolos());
            var control = this.correrInstrucciones(tsGlobal, localFor, metodos, entorno + 'For');
            if (control !== null) {
                if (control.tipo === Tipos_1.TiposControl.BREAK) {
                    break;
                }
                else if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                    this.paso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    condicion = this.condicion.ejecutar(tsGlobal, localFor, metodos, entorno);
                    continue;
                }
                else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                    return control;
                }
            }
            this.paso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            condicion = this.condicion.ejecutar(tsGlobal, localFor, metodos, entorno);
            this.verError(condicion, entorno);
        }
    };
    For.prototype.correrInstrucciones = function (tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.cuerpo) {
            var control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    };
    For.prototype.verError = function (condicion, entorno) {
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            __1.consola.actualizar("La condicion de WHILE debe ser de tipo boolean, l:" + this.linea + " c:" + this.columna);
            __1.errores.agregar(new Error_1.Error('Semantico', "La condicion de WHILE debe ser de tipo boolean, l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
        }
    };
    For.prototype.ast = function (metodos) {
        return null;
    };
    return For;
}(instruccion_1.Instruccion));
exports.For = For;
