"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaMetodos = void 0;
var Metodo_1 = require("./Metodo");
var TablaMetodos = /** @class */ (function () {
    function TablaMetodos(metodos) {
        this.metodos = [];
        this.metodos = this.metodos.concat(metodos);
    }
    TablaMetodos.prototype.agregar = function (tipo, id, parametros, cuerpo) {
        this.metodos.push(new Metodo_1.Metodo(tipo, id, parametros, cuerpo));
    };
    TablaMetodos.prototype.get = function (id) {
        var metodo = this.metodos.filter(function (metod) { return metod.id == id; })[0];
        if (metodo) {
            return metodo;
        }
        return null;
    };
    TablaMetodos.prototype.limpiarC = function (id) {
        var metodo = this.metodos.filter(function (metod) { return metod.id == id; })[0];
        if (metodo) {
            metodo.cuerpo = [];
        }
    };
    Object.defineProperty(TablaMetodos.prototype, "metodoss", {
        get: function () {
            return this.metodos;
        },
        enumerable: false,
        configurable: true
    });
    return TablaMetodos;
}());
exports.TablaMetodos = TablaMetodos;
