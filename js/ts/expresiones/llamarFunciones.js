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
exports.LlamarFuncion = void 0;
var __1 = require("..");
var expresion_1 = require("../abstractas/expresion");
var Error_1 = require("../Reportes/Error");
var TablaSimbolos_1 = require("../Reportes/TablaSimbolos");
var Tipos_1 = require("../tiposD/Tipos");
var Simbolo_1 = require("../Reportes/Simbolo");
var LlamarFuncion = /** @class */ (function (_super) {
    __extends(LlamarFuncion, _super);
    function LlamarFuncion(id, parametros, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        _this.parametros = parametros;
        return _this;
    }
    LlamarFuncion.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var metodo = metodos.get(this.id);
        if (metodo !== null) {
            if (metodo.tipo !== Tipos_1.Tipos.VOID) {
                if (metodo.parametros.length === this.parametros.length) {
                    var local2 = this.obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno);
                    var control = this.ejecutarMetodo(metodo.cuerpo, tsGlobal, local2, metodos, entorno);
                    //retornos
                    if (control !== null && control !== undefined) {
                        if (control.tipo == Tipos_1.TiposControl.RETURN) {
                            if (control.valor !== null) {
                                if (control.valor.tipo === metodo.tipo) {
                                    return control.valor;
                                }
                            }
                            this.ponerError("No se pude retornar tipo " + control.valor.tipo, this.linea, this.columna, entorno);
                        }
                    }
                }
                else if (metodo.parametros.length >= this.parametros.length) {
                    this.ponerError("Menos atributos de los esperados", this.linea, this.columna, entorno);
                }
                else {
                    this.ponerError("Mas atributos de los esperados", this.linea, this.columna, entorno);
                }
            }
            this.ponerError("Funcion no asignada de forma correcta", this.linea, this.columna, entorno);
        }
        this.ponerError("El metodo " + this.id + " no se pudo encontrar", this.linea, this.columna, entorno);
    };
    LlamarFuncion.prototype.obtenerEntorno = function (metodo, tsGlobal, tsLocal, metodos, entorno) {
        var stLocal2 = new TablaSimbolos_1.TablaSimbolo([]);
        for (var i in this.parametros) {
            var valor = this.parametros[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (valor.tipo === metodo.parametros[i].tipo) {
                stLocal2.agregar(new Simbolo_1.Simbolo(valor.tipo, metodo.parametros[i].id, valor.valor, entorno));
            }
            else {
                this.ponerError("El tipo " + valor.tipo + " no coincide con el parametro", this.linea, this.columna, entorno);
            }
        }
        return stLocal2;
    };
    LlamarFuncion.prototype.ejecutarMetodo = function (cuerpo, tsGlobal, tsLocal, metodos, entorno) {
        for (var i in cuerpo) {
            var control = cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    };
    LlamarFuncion.prototype.ponerError = function (mensaje, linea, columna, entorno) {
        __1.errores.agregar(new Error_1.Error('Semantico', mensaje, linea, columna, entorno));
        __1.consola.actualizar(mensaje + (" l: " + linea + ", c: " + columna + "\n"));
    };
    LlamarFuncion.prototype.ast = function (metodos) {
        return null;
    };
    return LlamarFuncion;
}(expresion_1.Expresion));
exports.LlamarFuncion = LlamarFuncion;
