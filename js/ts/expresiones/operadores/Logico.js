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
exports.Logico = exports.TipoLogico = void 0;
var expresion_1 = require("../../abstractas/expresion");
var Tipos_1 = require("../../tiposD/Tipos");
var __1 = require("../..");
var Error_1 = require("../../Reportes/Error");
var TipoLogico;
(function (TipoLogico) {
    TipoLogico[TipoLogico["AND"] = 0] = "AND";
    TipoLogico[TipoLogico["NOT"] = 1] = "NOT";
    TipoLogico[TipoLogico["OR"] = 2] = "OR";
})(TipoLogico = exports.TipoLogico || (exports.TipoLogico = {}));
var Logico = /** @class */ (function (_super) {
    __extends(Logico, _super);
    function Logico(type, left, right, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.tipo = type;
        _this.izquierdo = left;
        _this.derecho = right;
        return _this;
    }
    Logico.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var izq = this.izquierdo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var dere = this.getDer(tsGlobal, tsLocal, metodos, entorno);
        this.setError(izq.tipo, dere.tipo, entorno);
        switch (this.tipo) {
            case TipoLogico.AND:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor && dere.valor) };
            case TipoLogico.NOT:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (!izq.valor) };
            case TipoLogico.OR:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor || dere.valor) };
        }
    };
    Logico.prototype.getDer = function (tsGlobal, tsLocal, metodos, entorno) {
        if (this.derecho !== null && this.tipo !== TipoLogico.NOT) {
            return this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
        return { tipo: Tipos_1.Tipos.NULL, valor: null };
    };
    Logico.prototype.setError = function (izqT, derT, entorno) {
        if (izqT !== Tipos_1.Tipos.BOOLEAN && derT !== Tipos_1.Tipos.BOOLEAN && this.tipo !== TipoLogico.NOT) {
            __1.consola.actualizar("Los tipos no son operables " + izqT + " y " + derT + ", l:" + this.linea + " c:" + this.columna);
            __1.errores.agregar(new Error_1.Error('Semantico', "Los tipos no son operables " + izqT + " y " + derT + ", l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
        }
    };
    Logico.prototype.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    Logico.prototype.ast = function (metodos) {
        // const id = `n${uuidv4().replace(/\-/g, "")}`
        var id = this.generateUUID();
        var izquierda = this.izquierdo.ast(metodos);
        var ast = id + " [label=\"" + this.getOperation() + "\"];\n        " + izquierda.ast + "\n        " + id + " -> " + izquierda.id + ";\n";
        if (this.derecho !== null) {
            var derecha = this.derecho.ast(metodos);
            ast += derecha.ast + "\n            " + id + " -> " + derecha.id + ";\n";
        }
        return { id: id, ast: ast };
    };
    Logico.prototype.getOperation = function () {
        switch (this.tipo) {
            case TipoLogico.AND:
                return "And\\n&&";
            case TipoLogico.OR:
                return "Or\\n||";
            case TipoLogico.NOT:
                return "Not\\n!";
        }
    };
    return Logico;
}(expresion_1.Expresion));
exports.Logico = Logico;
