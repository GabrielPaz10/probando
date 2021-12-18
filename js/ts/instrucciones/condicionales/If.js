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
exports.If = void 0;
var instruccion_1 = require("../../abstractas/instruccion");
var TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
var Tipos_1 = require("../../tiposD/Tipos");
var __1 = require("../..");
var Error_1 = require("../../Reportes/Error");
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(condicion, cuerpo, elseC, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.cuerpo = cuerpo;
        _this.elseC = elseC;
        return _this;
    }
    If.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var condi = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (condi.tipo != Tipos_1.Tipos.BOOLEAN) {
            __1.errores.agregar(new Error_1.Error('Semantico', "La condicion debe ser tipo Bool, no " + condi.tipo + " l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
            __1.consola.actualizar("La condicion debe ser tipo Bool, no " + condi.tipo + " l:" + this.linea + " c:" + this.columna + "\n");
        }
        var control;
        if (condi.valor) {
            control = this.ejecutarIns(tsGlobal, tsLocal, metodos, entorno + 'If', this.cuerpo);
        }
        else if (this.elseC) {
            if (this.elseC instanceof instruccion_1.Instruccion) {
                control = this.elseC.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'Else');
            }
            else {
                control = this.ejecutarIns(tsGlobal, tsLocal, metodos, entorno + 'Else', this.elseC);
            }
        }
        if (control !== null && control !== undefined) {
            if (control.tipo === Tipos_1.TiposControl.RETURN) {
                return control;
            }
        }
    };
    If.prototype.ejecutarIns = function (tsGlobal, tsLocal, metodos, entorno, cuerpo) {
        var tslocal2 = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        for (var i in cuerpo) {
            var control = cuerpo[i].ejecutar(tsGlobal, tslocal2, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    };
    If.prototype.ast = function (metodos) {
        return null; //aun no implementado
    };
    return If;
}(instruccion_1.Instruccion));
exports.If = If;
