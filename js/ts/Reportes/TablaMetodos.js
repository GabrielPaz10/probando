"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaMetodos = void 0;
const Metodo_1 = require("./Metodo");
class TablaMetodos {
    constructor(metodos) {
        this.metodos = [];
        this.metodos = this.metodos.concat(metodos);
    }
    agregar(tipo, id, parametros, cuerpo) {
        this.metodos.push(new Metodo_1.Metodo(tipo, id, parametros, cuerpo));
    }
    get(id) {
        var metodo = this.metodos.filter((metod) => metod.id == id)[0];
        if (metodo) {
            return metodo;
        }
        return null;
    }
    limpiarC(id) {
        var metodo = this.metodos.filter((metod) => metod.id == id)[0];
        if (metodo) {
            metodo.cuerpo = [];
        }
    }
    get metodoss() {
        return this.metodos;
    }
}
exports.TablaMetodos = TablaMetodos;
