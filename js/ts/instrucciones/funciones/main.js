"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var Main = /** @class */ (function () {
    function Main(metodo) {
        this.metodo = metodo;
    }
    Main.prototype.ejectuar = function (metodos) {
        metodos.push(this.metodo);
    };
    return Main;
}());
exports.Main = Main;
