"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = exports.TipoLogico = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
var TipoLogico;
(function (TipoLogico) {
    TipoLogico[TipoLogico["AND"] = 0] = "AND";
    TipoLogico[TipoLogico["NOT"] = 1] = "NOT";
    TipoLogico[TipoLogico["OR"] = 2] = "OR";
})(TipoLogico = exports.TipoLogico || (exports.TipoLogico = {}));
class Logico extends expresion_1.Expresion {
    constructor(type, left, right, line, column) {
        super(line, column);
        this.tipo = type;
        this.izquierdo = left;
        this.derecho = right;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const izq = this.izquierdo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const dere = this.getDer(tsGlobal, tsLocal, metodos, entorno);
        this.setError(izq.tipo, dere.tipo, entorno);
        switch (this.tipo) {
            case TipoLogico.AND:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor && dere.valor) };
            case TipoLogico.NOT:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (!izq.valor) };
            case TipoLogico.OR:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor || dere.valor) };
        }
    }
    getDer(tsGlobal, tsLocal, metodos, entorno) {
        if (this.derecho !== null && this.tipo !== TipoLogico.NOT) {
            return this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
        return { tipo: Tipos_1.Tipos.NULL, valor: null };
    }
    setError(izqT, derT, entorno) {
        if (izqT !== Tipos_1.Tipos.BOOLEAN && derT !== Tipos_1.Tipos.BOOLEAN && this.tipo !== TipoLogico.NOT) {
            index_1.consola.actualizar(`Los tipos no son operables ${izqT} y ${derT}, l:${this.linea} c:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `Los tipos no son operables ${izqT} y ${derT}, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        }
    }
    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    ast(metodos) {
        // const id = `n${uuidv4().replace(/\-/g, "")}`
        const id = this.generateUUID();
        const izquierda = this.izquierdo.ast(metodos);
        let ast = `${id} [label="${this.getOperation()}"];
        ${izquierda.ast}
        ${id} -> ${izquierda.id};\n`;
        if (this.derecho !== null) {
            const derecha = this.derecho.ast(metodos);
            ast += `${derecha.ast}
            ${id} -> ${derecha.id};\n`;
        }
        return { id: id, ast: ast };
    }
    getOperation() {
        switch (this.tipo) {
            case TipoLogico.AND:
                return `And\\n&&`;
            case TipoLogico.OR:
                return `Or\\n||`;
            case TipoLogico.NOT:
                return `Not\\n!`;
        }
    }
}
exports.Logico = Logico;
