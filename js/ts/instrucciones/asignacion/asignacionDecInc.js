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
exports.AsignacionDecInc = exports.TipoAsignacion = void 0;
var instruccion_1 = require("../../abstractas/instruccion");
var Tipos_1 = require("../../tiposD/Tipos");
var __1 = require("../..");
var Error_1 = require("../../Reportes/Error");
var TipoAsignacion;
(function (TipoAsignacion) {
    TipoAsignacion[TipoAsignacion["DECREMENTO"] = 0] = "DECREMENTO";
    TipoAsignacion[TipoAsignacion["INCREMENTO"] = 1] = "INCREMENTO";
})(TipoAsignacion = exports.TipoAsignacion || (exports.TipoAsignacion = {}));
var AsignacionDecInc = /** @class */ (function (_super) {
    __extends(AsignacionDecInc, _super);
    function AsignacionDecInc(id, tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        _this.tipo = tipo;
        return _this;
    }
    AsignacionDecInc.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var simbolo = tsLocal.obtenerSimbolo(this.id);
        if (simbolo) {
            this.setDI(simbolo, tsLocal, entorno);
        }
        else {
            simbolo = tsGlobal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.setDI(simbolo, tsGlobal, entorno);
            }
            else {
                __1.errores.agregar(new Error_1.Error('Semantico', "No se pudo encontrar la variable " + this.id, this.linea, this.columna, entorno));
                __1.consola.actualizar("No se pudo encontrar la variable " + this.id + " l:" + this.linea + ", c:" + this.columna + "\n");
            }
        }
    };
    AsignacionDecInc.prototype.setDI = function (simbolo, ts, entorno) {
        if (simbolo.tipo === Tipos_1.Tipos.INT || simbolo.tipo === Tipos_1.Tipos.DOUBLE) {
            if (this.tipo === TipoAsignacion.DECREMENTO) {
                ts.actualizar(this.id, simbolo.valor - 1);
            }
            else if (this.tipo === TipoAsignacion.INCREMENTO) {
                ts.actualizar(this.id, simbolo.valor + 1);
            }
            return;
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "El " + this.tipo + " no se pudo realizar correctamente", this.linea, this.columna, entorno));
        __1.consola.actualizar("El " + this.tipo + " no se pudo realizar correctamente l:" + this.linea + ", c:" + this.columna + "\n");
    };
    AsignacionDecInc.prototype.ast = function (metodos) {
        return null;
    };
    return AsignacionDecInc;
}(instruccion_1.Instruccion));
exports.AsignacionDecInc = AsignacionDecInc;
