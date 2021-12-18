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
exports.Declaracion = void 0;
var instruccion_1 = require("../../abstractas/instruccion");
var Tipos_1 = require("../../tiposD/Tipos");
var __1 = require("../..");
var Error_1 = require("../../Reportes/Error");
var Simbolo_1 = require("../../Reportes/Simbolo");
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(tipo, id, valor, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = tipo;
        _this.id = id;
        _this.valor = valor;
        return _this;
    }
    Declaracion.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.id) {
            this.declarar(this.id[i], tsGlobal, tsLocal, metodos, entorno);
        }
    };
    Declaracion.prototype.declarar = function (id, tsGlobal, tsLocal, metodos, entorno) {
        var aux = tsLocal.obtenerSimbolo(id);
        if (aux) {
            __1.errores.agregar(new Error_1.Error('Semantico', "La variable " + id + " ya esta definida", this.linea, this.columna, entorno));
            __1.consola.actualizar("La variable " + id + " ya esta definida l:" + this.linea + ", c:" + this.columna + "\n");
        }
        var valor;
        if (this.valor) {
            valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
        else {
            valor = this.valorDefecto(this.tipo);
        }
        valor = this.verificarTipo(this.tipo, valor, this.linea, this.columna, entorno);
        tsLocal.agregar(new Simbolo_1.Simbolo(this.tipo, id, valor.Valor, entorno));
    };
    Declaracion.prototype.ast = function (metodos) {
        return null;
    };
    Declaracion.prototype.verificarTipo = function (tipo, valor, linea, columna, entorno) {
        if (tipo === valor.tipo) {
            return valor;
        }
        else if (tipo === Tipos_1.Tipos.DOUBLE) {
            if (valor.tipo === Tipos_1.Tipos.INT) {
                return { tipo: tipo, valor: valor.valor };
            }
        }
        else if (tipo === Tipos_1.Tipos.INT) {
            if (valor.tipo === Tipos_1.Tipos.BOOLEAN) {
                if (valor.valor === true) {
                    return { tipo: tipo, valor: 1 };
                }
                else if (valor.valor === false) {
                    return { tipo: tipo, valor: 0 };
                }
            }
            else if (valor.tipo === Tipos_1.Tipos.CHAR) {
                return { tipo: tipo, valor: valor.valor.charCodeAt(0) };
            }
            else if (valor.tipo === Tipos_1.Tipos.DOUBLE) {
                return { tipo: tipo, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
            }
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "Tipos incompatibles, " + valor.tipo + " no se puede convertir a " + tipo, this.linea, this.columna, entorno));
        __1.consola.actualizar("Tipos incompatibles, " + valor.tipo + " no se puede convertir a " + tipo + " l:" + this.linea + ", c:" + this.columna + "\n");
    };
    Declaracion.prototype.valorDefecto = function (tipo) {
        if (tipo === Tipos_1.Tipos.INT) {
            return { tipo: Tipos_1.Tipos.INT, valor: 0 };
        }
        else if (tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: 0.0 };
        }
        else if (tipo === Tipos_1.Tipos.BOOLEAN) {
            return { tipo: Tipos_1.Tipos.BOOLEAN, valor: true };
        }
        else if (tipo === Tipos_1.Tipos.CHAR) {
            return { tipo: Tipos_1.Tipos.CHAR, valor: '0' };
        }
        else if (tipo === Tipos_1.Tipos.STRING) {
            return { tipo: Tipos_1.Tipos.STRING, valor: "" };
        }
    };
    return Declaracion;
}(instruccion_1.Instruccion));
exports.Declaracion = Declaracion;
