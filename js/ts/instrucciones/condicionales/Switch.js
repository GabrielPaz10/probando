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
exports.Switch = void 0;
var __1 = require("../..");
var instruccion_1 = require("../../abstractas/instruccion");
var Error_1 = require("../../Reportes/Error");
var TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
var Tipos_1 = require("../../tiposD/Tipos");
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch(condicion, cuerpo, defa, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.cuerpo = cuerpo;
        _this.defa = defa;
        return _this;
    }
    Switch.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var control = this.ejecutarCase(condicion, tsGlobal, tsLocal, metodos, entorno);
        if (control === null) {
            control = this.ejecutarCuerpo(this.defa, tsGlobal, tsLocal, metodos, entorno);
        }
        if (control !== null) {
            if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                __1.errores.agregar(new Error_1.Error('Sintactico', "Continue Fuera de un ciclo l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
                __1.consola.actualizar("Continue Fuera de un ciclo l:" + this.linea + " c:" + this.columna + "\n");
            }
            else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                return control;
            }
        }
    };
    Switch.prototype.ejecutarCase = function (condicion, tsGlobal, tsLocal, metodos, entorno) {
        var flag = false;
        for (var i in this.cuerpo) {
            var valor = this.cuerpo[i].valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if ((valor.valor === condicion.valor) || flag) {
                flag = true;
                var control = this.ejecutarCuerpo(this.cuerpo[i].cuerpo, tsGlobal, tsLocal, metodos, entorno + 'case');
                if (control !== null) {
                    return control;
                }
            }
        }
        return null;
    };
    Switch.prototype.ejecutarCuerpo = function (cuerpo, tsGlobal, tsLocal, metodos, entorno) {
        var entornoLocal = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        for (var i in cuerpo) {
            var control = cuerpo[i].ejecutar(tsGlobal, entornoLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    };
    Switch.prototype.ast = function (metodos) {
        return null;
    };
    Switch.prototype.obtenerCuerpo = function (metodos) { }; //hola aby
    return Switch;
}(instruccion_1.Instruccion));
exports.Switch = Switch;
