"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposControl = exports.Intervalo = exports.Tipos = void 0;
var Tipos;
(function (Tipos) {
    Tipos["INT"] = "int";
    Tipos["DOUBLE"] = "double";
    Tipos["BOOLEAN"] = "boolean";
    Tipos["CHAR"] = "char";
    Tipos["STRING"] = "String";
    Tipos["STRUCT"] = "struct";
    Tipos["NULL"] = "null";
    Tipos["VOID"] = "null";
    Tipos["ARRAY"] = "array";
})(Tipos = exports.Tipos || (exports.Tipos = {}));
var Intervalo;
(function (Intervalo) {
    Intervalo[Intervalo["BEGIN"] = 0] = "BEGIN";
    Intervalo[Intervalo["END"] = 1] = "END";
})(Intervalo = exports.Intervalo || (exports.Intervalo = {}));
var TiposControl;
(function (TiposControl) {
    TiposControl[TiposControl["BREAK"] = 0] = "BREAK";
    TiposControl[TiposControl["RETURN"] = 1] = "RETURN";
    TiposControl[TiposControl["CONTINUE"] = 3] = "CONTINUE";
})(TiposControl = exports.TiposControl || (exports.TiposControl = {}));
