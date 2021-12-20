define("Traductor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Traductor = void 0;
    class Traductor {
        constructor() {
            this.sfunc = "";
            this.traductor = '';
            this.temporal = 0;
            this.etiqueta = 0;
            this.codigo = new Array();
            this.tempstorage = new Set();
        }
        actualizar(cadena) {
            this.traductor += cadena;
        }
        limpiar() {
            this.traductor = '';
        }
        publicar() {
            return this.traductor;
        }
        getImprimircad() {
            const traductor = Traductor.getInstancia();
            const etiq0 = traductor.newEtiq();
            const etiq1 = traductor.newEtiq();
            const etiq2 = traductor.newEtiq();
            const tem0 = traductor.newTem();
            const tem1 = traductor.newTem();
            let retorn = "";
            retorn += 'void native_imprimir() {\n';
            retorn += "  " + etiq0 + ":\n";
            retorn += "  " + tem1 + " =  heap[(int)" + tem0 + "];\n";
            retorn += "  " + tem0 + " = " + tem0 + " + 1;\n";
            retorn += "  if (" + tem1 + " != -1) goto " + etiq1 + ";\n";
            retorn += "  goto " + etiq2 + ';\n';
            retorn += "  " + etiq1 + ":\n";
            retorn += "  printf(\"%c\", (int)" + tem1 + ");\n";
            retorn += "  goto " + etiq0 + ';\n';
            retorn += "  " + etiq2 + ":\n";
            retorn += "  return;\n";
            retorn += '}\n';
            return retorn;
        }
        static getInstancia() {
            return this.traductor || (this.traductor = new this());
        }
        //Genarar temporal
        newTem() {
            const cadtem = 'T' + this.temporal;
            this.temporal++;
            return cadtem;
        }
        //Generar Etiqueta
        newEtiq() {
            const cadtem = 'L' + this.etiqueta;
            this.etiqueta++;
            return cadtem;
        }
        //Cadena agregar goto
        addGoto(etiq) {
            const cadtem = this.sfunc + "goto " + etiq + ";";
            this.codigo.push(cadtem);
        }
        //Cadena agregar expresion
        addExp(etiquet, nizq, nder = "", operador = '') {
            const cadtem = this.sfunc + etiquet + " = " + nizq + " " + operador + " " + nder + ";";
            this.codigo.push(cadtem);
        }
        //Cadena agregar etiqueta
        addEtiq(etiq) {
            const cadtem = this.sfunc + etiq + ":";
            this.codigo.push(cadtem);
        }
        //Cadena agregar if
        addIf(nizq, nder, operador, etiq) {
            const cadtem = this.sfunc + "if (" + nizq + " " + operador + " " + nder + ") goto " + etiq + ";";
            this.codigo.push(cadtem);
        }
        //Cadena imprimir
        addImpr(tipoprint, valor) {
            const cadtem = this.sfunc + "printf(\"%" + tipoprint + "\", " + valor + ");";
            this.codigo.push(cadtem);
        }
        //Guardamos en el stack
        setstack(pos, valor) {
            const cadtem = this.sfunc + "stack[(int)" + pos + "] = " + valor + ";";
            this.codigo.push(cadtem);
        }
        //Obtener de stack
        getstack(etiq, pos) {
            const cadtem = this.sfunc + etiq + " = stack[(int)" + pos + "];";
            this.codigo.push(cadtem);
        }
        //Limpia todo
        limpiartodo() {
            this.codigo = new Array();
            this.temporal = 0;
            this.etiqueta = 0;
        }
        //Asignar a heap
        setHeap(pos, valor) {
            const cadtem = this.sfunc + "heap[(int)" + pos + "] = " + valor + ";";
            this.codigo.push(cadtem);
        }
        //Obtener heap
        getHeap(etiq, pos) {
            const cadtem = this.sfunc + etiq + " = heap[(int)" + pos + "];";
            this.codigo.push(cadtem);
        }
        //Proximo heap
        sigHeap() {
            const cadtem = this.sfunc + 'h = h + 1;';
            this.codigo.push(cadtem);
        }
        //Cambio de entorno
        sigEnt(pos) {
            const cadtem = this.sfunc + "p = p + " + pos + ";";
            this.codigo.push(cadtem);
        }
        //Regreso de Entorno
        regEnt(pos) {
            const cadtem = this.sfunc + "p = p - " + pos + ";";
            this.codigo.push(cadtem);
        }
        //Comentario
        addComentario(cad) {
            const cadtem = this.sfunc + "/**** " + cad + " ****/";
            this.codigo.push(cadtem);
        }
        //Llamar funcion 
        llamarfunc(cad) {
            const cadtem = this.sfunc + cad + "();";
            this.codigo.push(cadtem);
        }
        //Para temporales en funciones
        gettempstorage() {
            return this.tempstorage;
        }
        clearTempStorage() {
            this.tempstorage.clear();
        }
        setTempStorage(tempSt) {
            this.tempstorage = tempSt;
        }
        //funciones
        addinifunc(id) {
            const cadtem = "\nint " + id + "(){";
            this.codigo.push(cadtem);
        }
        addfinfunc() {
            const cadtem = this.sfunc + "return 0;\n}";
            this.codigo.push(cadtem);
        }
        addTemp(temp) {
            if (!this.tempstorage.has(temp)) {
                this.tempstorage.add(temp);
            }
        }
        delTemp(temp) {
            if (this.tempstorage.has(temp)) {
                this.tempstorage.delete(temp);
            }
        }
    }
    exports.Traductor = Traductor;
});
define("Reportes/Consola", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Consola = void 0;
    class Consola {
        constructor() {
            this.consola = '';
        }
        actualizar(cadena) {
            this.consola += cadena;
        }
        limpiar() {
            this.consola = '';
        }
        publicar() {
            return this.consola;
        }
    }
    exports.Consola = Consola;
});
define("Reportes/Error", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Error = void 0;
    class Error {
        constructor(tipo, descripcion, linea, columna, entorno) {
            this.tipo = tipo;
            this.descripcion = descripcion;
            this.linea = linea;
            this.columna = columna;
            this.entorno = entorno;
        }
    }
    exports.Error = Error;
});
define("Reportes/TablaError", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TablaError = void 0;
    class TablaError {
        constructor() {
            this.errores = [];
        }
        vaciar() {
            this.errores = [];
        }
        agregar(error) {
            this.errores.push(error);
        }
        get() {
            return this.errores;
        }
    }
    exports.TablaError = TablaError;
});
define("tiposD/Tipos", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TiposControl = exports.Intervalo = exports.Tipos = void 0;
    var Tipos;
    (function (Tipos) {
        Tipos[Tipos["INT"] = 0] = "INT";
        Tipos[Tipos["DOUBLE"] = 1] = "DOUBLE";
        Tipos[Tipos["BOOLEAN"] = 2] = "BOOLEAN";
        Tipos[Tipos["CHAR"] = 3] = "CHAR";
        Tipos[Tipos["STRING"] = 4] = "STRING";
        Tipos[Tipos["STRUCT"] = 5] = "STRUCT";
        Tipos[Tipos["NULL"] = 6] = "NULL";
        Tipos[Tipos["VOID"] = 7] = "VOID";
        Tipos[Tipos["ARRAY"] = 8] = "ARRAY";
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
});
define("instrucciones/funciones/parametros", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parametros = void 0;
    class Parametros {
        constructor(tipo, tipo2, id) {
            this.tipo = tipo;
            this.tipo2 = tipo2;
            this.id = id;
        }
        ast() {
            //poner lo del ast
            return null;
        }
    }
    exports.Parametros = Parametros;
});
define("Reportes/TablaMetodos", ["require", "exports", "Reportes/Metodo"], function (require, exports, Metodo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TablaMetodos = void 0;
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
});
define("Reportes/Simbolo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Simbolo = void 0;
    class Simbolo {
        constructor(tipo, id, valor, entorno, categoria = 'variable') {
            this.tipo = tipo;
            this.id = id;
            this.valor = valor;
            this.entorno = entorno;
            this.categoria = categoria;
        }
    }
    exports.Simbolo = Simbolo;
});
define("Reportes/TablaSimbolos", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TablaSimbolo = void 0;
    class TablaSimbolo {
        constructor(simbolos) {
            this.simbolos = [];
            this.simbolos = this.simbolos.concat(simbolos);
        }
        agregar(simbolo) {
            this.simbolos.push(simbolo);
        }
        obtenerSimbolo(id) {
            var simbolo = this.simbolos.filter((simb) => simb.id == id)[0];
            if (simbolo)
                return simbolo;
            return null;
        }
        getSimbolos() {
            return this.simbolos;
        }
        actualizar(id, valor) {
            var simbolo = this.simbolos.filter((simb) => simb.id == id)[0];
            if (simbolo) {
                simbolo.valor = valor;
            }
            //ver si se pone mensaje de error
        }
    }
    exports.TablaSimbolo = TablaSimbolo;
});
define("abstractas/instruccion", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Instruccion = void 0;
    class Instruccion {
        /*
        aun faltan cambios, de importacion de cosas del ast y la consola
         */
        constructor(linea, columna) {
            this.linea = linea;
            this.columna = columna;
        }
    }
    exports.Instruccion = Instruccion;
});
define("Reportes/Metodo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Metodo = void 0;
    class Metodo {
        constructor(tipo, id, parametros, cuerpo) {
            this.tipo = tipo;
            this.id = id;
            this.parametros = parametros;
            this.cuerpo = cuerpo;
        }
    }
    exports.Metodo = Metodo;
});
define("index", ["require", "exports", "Reportes/Consola", "Reportes/TablaError", "Reportes/TablaMetodos", "Reportes/TablaSimbolos", "abstractas/instruccion", "Reportes/Error"], function (require, exports, Consola_1, TablaError_1, TablaMetodos_1, TablaSimbolos_1, instruccion_1, Error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.obtenerMain = exports.ejecutar = exports.errores = exports.consola = void 0;
    // const ejecutaar = document.getElementById('ejecutar')
    // ejecutaar.addEventListener('click',()=>{
    //     const entrada=(<HTMLInputElement>document.getElementById("entrada")).value
    //     alert(entrada)
    //     alert(typeof(entrada))
    // })
    exports.consola = new Consola_1.Consola();
    exports.errores = new TablaError_1.TablaError();
    const analizador = require('../analizador/analizador.js');
    let main = [];
    let metodos;
    let ast;
    function limpiarTodo() {
        exports.consola.limpiar();
        exports.errores.vaciar();
    }
    function ejecutar(entrada) {
        limpiarTodo();
        const tsGlobal = new TablaSimbolos_1.TablaSimbolo([]);
        const tsLocal = new TablaSimbolos_1.TablaSimbolo([]);
        metodos = new TablaMetodos_1.TablaMetodos([]);
        main = [];
        try {
            ast = analizador.parse(entrada);
            obtenerAst(ast, tsGlobal, metodos);
            main = obtenerMain(metodos);
            ejecutarMain(main, tsGlobal, tsLocal, metodos);
        }
        catch (error) {
            console.log(error);
        }
        return exports.consola.publicar();
    }
    exports.ejecutar = ejecutar;
    function obtenerAst(ast, tsGlobal, metodos) {
        for (const instruction of ast) {
            try {
                if (instruction instanceof instruccion_1.Instruccion)
                    instruction.ejecutar(tsGlobal, tsGlobal, metodos, "-");
            }
            catch (error) {
                if (error instanceof Error_1.Error)
                    exports.errores.agregar(error);
            }
        }
    }
    function ejecutarMain(main, tsGlobal, tsLocal, metodos) {
        if (main.length === 1) {
            main[0].cuerpo.forEach((instruccion) => {
                instruccion.ejecutar(tsGlobal, tsLocal, metodos, 'Global');
            });
        }
        else if (main.length > 1) {
            exports.consola.actualizar(`Solo puede haber un metodo Main en el programa`);
            exports.errores.agregar(new Error_1.Error('Semantico', `Solo puede haber un metodo Main en el programa`, 0, 0, 'Global'));
        }
        else if (main.length < 1) {
            exports.consola.actualizar(`Debe haber un metodo Main en el programa`);
            exports.errores.agregar(new Error_1.Error('Semantico', `Debe haber un metodo Main en el programa`, 0, 0, 'Global'));
        }
    }
    function obtenerMain(metodos) {
        return metodos.metodoss.filter((main) => main.id === 'main');
    }
    exports.obtenerMain = obtenerMain;
});
define("abstractas/expresion", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Expresion = void 0;
    class Expresion {
        /*
        aun faltan cambios, de importacion de cosas del ast y la consola
         */
        constructor(linea, columna) {
            this.columna = columna;
            this.linea = linea;
        }
    }
    exports.Expresion = Expresion;
});
define("expresiones/begin", ["require", "exports", "abstractas/expresion", "tiposD/Tipos"], function (require, exports, expresion_1, Tipos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Begin = void 0;
    class Begin extends expresion_1.Expresion {
        constructor(linea, columna) {
            super(linea, columna);
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            return { tipo: Tipos_1.Intervalo.BEGIN, valor: Tipos_1.Intervalo.BEGIN };
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Begin = Begin;
});
define("expresiones/end", ["require", "exports", "abstractas/expresion", "tiposD/Tipos"], function (require, exports, expresion_2, Tipos_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.End = void 0;
    class End extends expresion_2.Expresion {
        constructor(linea, columna) {
            super(linea, columna);
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            return { tipo: Tipos_2.Intervalo.END, valor: Tipos_2.Intervalo.END };
        }
        ast(metodos) {
            return null;
        }
    }
    exports.End = End;
});
define("expresiones/llamarFunciones", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "Reportes/TablaSimbolos", "tiposD/Tipos", "Reportes/Simbolo"], function (require, exports, index_1, expresion_3, Error_2, TablaSimbolos_2, Tipos_3, Simbolo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LlamarFuncion = void 0;
    class LlamarFuncion extends expresion_3.Expresion {
        constructor(id, parametros, linea, columna) {
            super(linea, columna);
            this.id = id;
            this.parametros = parametros;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const metodo = metodos.get(this.id);
            if (metodo !== null) {
                if (metodo.tipo !== Tipos_3.Tipos.VOID) {
                    if (metodo.parametros.length === this.parametros.length) {
                        var local2 = this.obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno);
                        const control = this.ejecutarMetodo(metodo.cuerpo, tsGlobal, local2, metodos, entorno);
                        //retornos
                        if (control !== null && control !== undefined) {
                            if (control.tipo == Tipos_3.TiposControl.RETURN) {
                                if (control.valor !== null) {
                                    if (control.valor.tipo === metodo.tipo) {
                                        return control.valor;
                                    }
                                }
                                this.ponerError(`No se pude retornar tipo ${control.valor.tipo}`, this.linea, this.columna, entorno);
                            }
                        }
                    }
                    else if (metodo.parametros.length >= this.parametros.length) {
                        this.ponerError(`Menos atributos de los esperados`, this.linea, this.columna, entorno);
                    }
                    else {
                        this.ponerError(`Mas atributos de los esperados`, this.linea, this.columna, entorno);
                    }
                }
                this.ponerError(`Funcion no asignada de forma correcta`, this.linea, this.columna, entorno);
            }
            this.ponerError(`El metodo ${this.id} no se pudo encontrar`, this.linea, this.columna, entorno);
        }
        obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno) {
            var stLocal2 = new TablaSimbolos_2.TablaSimbolo([]);
            for (var i in this.parametros) {
                var valor = this.parametros[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (valor.tipo === metodo.parametros[i].tipo) {
                    stLocal2.agregar(new Simbolo_1.Simbolo(valor.tipo, metodo.parametros[i].id, valor.valor, entorno));
                }
                else {
                    this.ponerError(`El tipo ${valor.tipo} no coincide con el parametro`, this.linea, this.columna, entorno);
                }
            }
            return stLocal2;
        }
        ejecutarMetodo(cuerpo, tsGlobal, tsLocal, metodos, entorno) {
            for (var i in cuerpo) {
                const control = cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (control !== null && control !== undefined) {
                    return control;
                }
            }
            return null;
        }
        ponerError(mensaje, linea, columna, entorno) {
            index_1.errores.agregar(new Error_2.Error('Semantico', mensaje, linea, columna, entorno));
            index_1.consola.actualizar(mensaje + ` l: ${linea}, c: ${columna}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.LlamarFuncion = LlamarFuncion;
});
define("expresiones/funcionesNativas/String", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_2, expresion_4, Error_3, Tipos_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StringM = void 0;
    class StringM extends expresion_4.Expresion {
        constructor(valor, linea, columna) {
            super(linea, columna);
            this.valor = valor;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (valor.tipo !== Tipos_4.Tipos.NULL) {
                return { tipo: Tipos_4.Tipos.STRING, valor: (valor.valor).toString() };
            }
            index_2.errores.agregar(new Error_3.Error('Semantico', `El tipo ${valor.tipo} no puede convertirse a STRING`, this.linea, this.columna, entorno));
            index_2.consola.actualizar(`El tipo ${valor.tipo} no puede convertirse a STRING\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.StringM = StringM;
});
define("expresiones/funcionesNativas/caracterOfPosition", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_3, expresion_5, Error_4, Tipos_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CaracterOfPosition = void 0;
    class CaracterOfPosition extends expresion_5.Expresion {
        constructor(cadena, posicion, linea, columna) {
            super(linea, columna);
            this.cadena = cadena;
            this.posicion = posicion;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (cadena.tipo === Tipos_5.Tipos.STRING) {
                const posicion = this.posicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (posicion.tipo === Tipos_5.Tipos.INT) {
                    return { tipo: Tipos_5.Tipos.STRING, valor: (cadena.valor.charAt(posicion.valor)) };
                }
                index_3.errores.agregar(new Error_4.Error('Semantico', `El tipo ${posicion.tipo} no puede ser un indice`, this.linea, this.columna, entorno));
                index_3.consola.actualizar(`El tipo ${posicion.tipo} no puede ser un indice\n`);
            }
            index_3.errores.agregar(new Error_4.Error('Semantico', `El tipo ${cadena.tipo} no puede usarse con caracterOfPosition`, this.linea, this.columna, entorno));
            index_3.consola.actualizar(`El tipo ${cadena.tipo} no puede usarse con caracterOfPosition\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.CaracterOfPosition = CaracterOfPosition;
});
define("expresiones/funcionesNativas/coseno", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_4, expresion_6, Error_5, Tipos_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cos = void 0;
    class Cos extends expresion_6.Expresion {
        constructor(angulo, linea, columna) {
            super(linea, columna);
            this.angulo = angulo;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const angulo = this.angulo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (angulo.tipo === Tipos_6.Tipos.INT || angulo.tipo === Tipos_6.Tipos.DOUBLE) {
                return { tipo: Tipos_6.Tipos.DOUBLE, valor: (Math.cos(angulo.valor)) };
            }
            index_4.errores.agregar(new Error_5.Error('Semantico', `No se puede calcular el coseno con el tipo ${angulo.tipo}`, this.linea, this.columna, entorno));
            index_4.consola.actualizar(`No se puede calcular el coseno con el tipo ${angulo.tipo}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Cos = Cos;
});
define("expresiones/funcionesNativas/length", ["require", "exports", "abstractas/expresion", "tiposD/Tipos", "index", "Reportes/Error"], function (require, exports, expresion_7, Tipos_7, index_5, Error_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Length = void 0;
    class Length extends expresion_7.Expresion {
        constructor(valor, linea, columna) {
            super(linea, columna);
            this.valor = valor;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (valor.tipo !== Tipos_7.Tipos.STRING) { //agregar lo de arreglos 
                index_5.errores.agregar(new Error_6.Error('Semantico', `No se puede devolver LENGTH con un tipo ${valor.tipo}`, this.linea, this.columna, entorno));
                index_5.consola.actualizar(`No se puede devolver LENGTH con un tipo ${valor.tipo}\n`);
            }
            return { tipo: Tipos_7.Tipos.INT, valor: ((valor.valor).length) };
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Length = Length;
});
define("expresiones/funcionesNativas/parse", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_6, expresion_8, Error_7, Tipos_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parse = void 0;
    class Parse extends expresion_8.Expresion {
        constructor(destino, cadena, linea, columna) {
            super(linea, columna);
            this.destino = destino;
            this.cadena = cadena;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            if (this.destino === Tipos_8.Tipos.INT || this.destino === Tipos_8.Tipos.DOUBLE || this.destino === Tipos_8.Tipos.BOOLEAN) {
                const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (cadena.tipo === Tipos_8.Tipos.STRING) {
                    switch (this.destino) {
                        case Tipos_8.Tipos.INT:
                            return { tipo: Tipos_8.Tipos.INT, valor: (Number(cadena.valor)) };
                        case Tipos_8.Tipos.DOUBLE:
                            return { tipo: Tipos_8.Tipos.DOUBLE, valor: (Number(cadena.valor)) };
                        case Tipos_8.Tipos.BOOLEAN:
                            if (cadena.valor == '1' || cadena.valor == '0') {
                                return { tipo: Tipos_8.Tipos.BOOLEAN, valor: !!(Number(cadena.valor)) };
                            }
                            else if (cadena.valor == 'true' || cadena.valor == 'false') {
                                return { tipo: Tipos_8.Tipos.BOOLEAN, valor: (cadena.valor == 'true') ? true : false };
                            }
                    }
                }
                index_6.errores.agregar(new Error_7.Error('Semantico', `El tipo ${cadena.tipo} no puede usarse con PARSE`, this.linea, this.columna, entorno));
                index_6.consola.actualizar(`El tipo ${cadena.tipo} no puede usarse con PARSE\n`);
            }
            index_6.errores.agregar(new Error_7.Error('Semantico', `El tipo ${this.destino} no puede usarse con PARSE`, this.linea, this.columna, entorno));
            index_6.consola.actualizar(`El tipo ${this.destino} no puede usarse con PARSE\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Parse = Parse;
});
define("expresiones/funcionesNativas/pow", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_7, expresion_9, Error_8, Tipos_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pow = void 0;
    class Pow extends expresion_9.Expresion {
        constructor(base, exponente, linea, columna) {
            super(linea, columna);
            this.base = base;
            this.exponente = exponente;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const base = this.base.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            const exponente = this.exponente.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if ((base.tipo === Tipos_9.Tipos.INT && exponente.tipo === Tipos_9.Tipos.INT)) {
                return { tipo: Tipos_9.Tipos.INT, valor: (Math.pow(base.valor, exponente.valor)) };
            }
            else if ((base.tipo === Tipos_9.Tipos.DOUBLE && exponente.tipo === Tipos_9.Tipos.INT) ||
                (base.tipo === Tipos_9.Tipos.INT && exponente.tipo === Tipos_9.Tipos.DOUBLE)
                || (base.tipo === Tipos_9.Tipos.DOUBLE && exponente.tipo === Tipos_9.Tipos.DOUBLE)) {
                return { tipo: Tipos_9.Tipos.DOUBLE, valor: (Math.pow(base.valor, exponente.valor)) };
            }
            index_7.errores.agregar(new Error_8.Error('Semantico', `No se puede elevar la base de tipo ${base.tipo} con un exponente de tipo ${exponente.tipo}`, this.linea, this.columna, entorno));
            index_7.consola.actualizar(`No se puede elevar la base de tipo ${base.tipo} con un exponente de tipo ${exponente.tipo} \n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Pow = Pow;
});
define("expresiones/funcionesNativas/seno", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_8, expresion_10, Error_9, Tipos_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sin = void 0;
    class Sin extends expresion_10.Expresion {
        constructor(angulo, linea, columna) {
            super(linea, columna);
            this.angulo = angulo;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const angulo = this.angulo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (angulo.tipo === Tipos_10.Tipos.INT || angulo.tipo === Tipos_10.Tipos.DOUBLE) {
                return { tipo: Tipos_10.Tipos.DOUBLE, valor: (Math.sin(angulo.valor)) };
            }
            index_8.errores.agregar(new Error_9.Error('Semantico', `No se puede calcular el coseno con el tipo ${angulo.tipo}`, this.linea, this.columna, entorno));
            index_8.consola.actualizar(`No se puede calcular el coseno con el tipo ${angulo.tipo}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Sin = Sin;
});
define("expresiones/funcionesNativas/sqrt", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_9, expresion_11, Error_10, Tipos_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sqrt = void 0;
    class Sqrt extends expresion_11.Expresion {
        constructor(raiz, linea, columna) {
            super(linea, columna);
            this.raiz = raiz;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const raiz = this.raiz.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (raiz.tipo === Tipos_11.Tipos.INT || raiz.tipo === Tipos_11.Tipos.DOUBLE) {
                return { tipo: Tipos_11.Tipos.DOUBLE, valor: (Math.sqrt(raiz.valor)) };
            }
            index_9.errores.agregar(new Error_10.Error('Semantico', `No se puede calcular la raiz con el tipo ${raiz.tipo}`, this.linea, this.columna, entorno));
            index_9.consola.actualizar(`No se puede calcular la raiz con el tipo ${raiz.tipo}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Sqrt = Sqrt;
});
define("expresiones/funcionesNativas/substring", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_10, expresion_12, Error_11, Tipos_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Substring = void 0;
    class Substring extends expresion_12.Expresion {
        constructor(cadena, inicio, final, linea, columna) {
            super(linea, columna);
            this.cadena = cadena;
            this.inicio = inicio;
            this.final = final;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (cadena.tipo !== Tipos_12.Tipos.STRING) {
                index_10.errores.agregar(new Error_11.Error('Semantico', `El tipo ${cadena.tipo} no puede generar un substring`, this.linea, this.columna, entorno));
                index_10.consola.actualizar(`El tipo ${cadena.tipo} no puede generar un substring\n`);
            }
            const inicio = this.inicio.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            const final = this.final.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if ((inicio.tipo == Tipos_12.Tipos.INT || inicio.tipo == Tipos_12.Intervalo.BEGIN) && (final.tipo == Tipos_12.Tipos.INT || final.tipo == Tipos_12.Intervalo.END)) {
                switch (inicio.tipo) {
                    case Tipos_12.Tipos.INT:
                        switch (final.tipo) {
                            case Tipos_12.Tipos.INT:
                                return { tipo: Tipos_12.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, final.valor) };
                            case Tipos_12.Intervalo.END:
                                return { tipo: Tipos_12.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, (cadena.valor.length + 1)) };
                        }
                    case Tipos_12.Intervalo.BEGIN:
                        switch (final.tipo) {
                            case Tipos_12.Tipos.INT:
                                return { tipo: Tipos_12.Tipos.STRING, valor: cadena.valor.substring(0, final.valor) };
                            case Tipos_12.Intervalo.END:
                                return { tipo: Tipos_12.Tipos.STRING, valor: cadena.valor.substring(0, (cadena.valor.length + 1)) };
                        }
                }
            }
            index_10.errores.agregar(new Error_11.Error('Semantico', `El tipo ${cadena.tipo} no es valido para un intervalo`, this.linea, this.columna, entorno));
            index_10.consola.actualizar(`El tipo ${cadena.tipo} no es valido para un intervalo\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Substring = Substring;
});
define("expresiones/funcionesNativas/tangente", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_11, expresion_13, Error_12, Tipos_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tan = void 0;
    class Tan extends expresion_13.Expresion {
        constructor(angulo, linea, columna) {
            super(linea, columna);
            this.angulo = angulo;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const angulo = this.angulo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (angulo.tipo === Tipos_13.Tipos.INT || angulo.tipo === Tipos_13.Tipos.DOUBLE) {
                return { tipo: Tipos_13.Tipos.DOUBLE, valor: (Math.tan(angulo.valor) * (180 / (Math.PI))) };
            }
            index_11.errores.agregar(new Error_12.Error('Semantico', `No se puede calcular la tangente con el tipo ${angulo.tipo}`, this.linea, this.columna, entorno));
            index_11.consola.actualizar(`No se puede calcular la tangente con el tipo ${angulo.tipo}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Tan = Tan;
});
define("expresiones/funcionesNativas/toDouble", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_12, expresion_14, Error_13, Tipos_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToDouble = void 0;
    class ToDouble extends expresion_14.Expresion {
        constructor(numero, linea, columna) {
            super(linea, columna);
            this.numero = numero;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const numero = this.numero.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (numero.tipo === Tipos_14.Tipos.INT) {
                return { tipo: Tipos_14.Tipos.DOUBLE, valor: Number(numero.valor) };
            }
            index_12.errores.agregar(new Error_13.Error('Semantico', `No se puede convertir a decimal con un tipo ${numero.tipo}`, this.linea, this.columna, entorno));
            index_12.consola.actualizar(`No se puede convertir a decimal con un tipo ${numero.tipo}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.ToDouble = ToDouble;
});
define("expresiones/funcionesNativas/toLower", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_13, expresion_15, Error_14, Tipos_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToLowerCase = void 0;
    class ToLowerCase extends expresion_15.Expresion {
        constructor(cadena, linea, columna) {
            super(linea, columna);
            this.cadena = cadena;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (cadena.tipo === Tipos_15.Tipos.STRING) {
                return { tipo: Tipos_15.Tipos.STRING, valor: (cadena.valor).toLowerCase() };
            }
            index_13.errores.agregar(new Error_14.Error('Semantico', `No se puede convertir a minusculas con el tipo ${cadena.tipo}`, this.linea, this.columna, entorno));
            index_13.consola.actualizar(`No se puede convertir a minusculas con el tipo ${cadena.tipo}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.ToLowerCase = ToLowerCase;
});
define("expresiones/funcionesNativas/toUpper", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_14, expresion_16, Error_15, Tipos_16) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToUpperCase = void 0;
    class ToUpperCase extends expresion_16.Expresion {
        constructor(cadena, linea, columna) {
            super(linea, columna);
            this.cadena = cadena;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (cadena.tipo === Tipos_16.Tipos.STRING) {
                return { tipo: Tipos_16.Tipos.STRING, valor: (cadena.valor).toLowerCase() };
            }
            index_14.errores.agregar(new Error_15.Error('Semantico', `No se puede convertir a mayusculas con el tipo ${cadena.tipo}`, this.linea, this.columna, entorno));
            index_14.consola.actualizar(`No se puede convertir a mayusculas con el tipo ${cadena.tipo}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.ToUpperCase = ToUpperCase;
});
define("expresiones/funcionesNativas/toint", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_15, expresion_17, Error_16, Tipos_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToInt = void 0;
    class ToInt extends expresion_17.Expresion {
        constructor(expresion, linea, columna) {
            super(linea, columna);
            this.expresion = expresion;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const valor = this.expresion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (valor.tipo === Tipos_17.Tipos.INT || valor.tipo === Tipos_17.Tipos.BOOLEAN) {
                return { tipo: Tipos_17.Tipos.INT, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
            }
            index_15.errores.agregar(new Error_16.Error('Semantico', `No se puede Truncar con un tipo ${valor.tipo}`, this.linea, this.columna, entorno));
            index_15.consola.actualizar(`No se puede Truncar con un tipo ${valor.tipo}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.ToInt = ToInt;
});
define("expresiones/funcionesNativas/typeof", ["require", "exports", "abstractas/expresion", "tiposD/Tipos"], function (require, exports, expresion_18, Tipos_18) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Typeof = void 0;
    class Typeof extends expresion_18.Expresion {
        constructor(expresion, linea, columna) {
            super(linea, columna);
            this.expresion = expresion;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const expresion = this.expresion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            return { tipo: Tipos_18.Tipos.STRING, valor: (expresion.tipo) };
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Typeof = Typeof;
});
define("expresiones/operadores/Aritmetica", ["require", "exports", "abstractas/expresion", "tiposD/Tipos", "index", "Reportes/Error"], function (require, exports, expresion_19, Tipos_19, index_16, Error_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Aritmetica = exports.TipoOperacion = void 0;
    var TipoOperacion;
    (function (TipoOperacion) {
        TipoOperacion[TipoOperacion["SUMA"] = 0] = "SUMA";
        TipoOperacion[TipoOperacion["RESTA"] = 1] = "RESTA";
        TipoOperacion[TipoOperacion["MULTIPLICACION"] = 2] = "MULTIPLICACION";
        TipoOperacion[TipoOperacion["DIVISION"] = 3] = "DIVISION";
        TipoOperacion[TipoOperacion["MODULO"] = 4] = "MODULO";
        TipoOperacion[TipoOperacion["CONCATENACION"] = 5] = "CONCATENACION";
        TipoOperacion[TipoOperacion["EXTE"] = 6] = "EXTE";
    })(TipoOperacion = exports.TipoOperacion || (exports.TipoOperacion = {}));
    class Aritmetica extends expresion_19.Expresion {
        constructor(operacion, izquierdo, derecho, linea, columna) {
            super(linea, columna);
            this.operacion = operacion;
            this.izquierdo = izquierdo;
            this.derecho = derecho;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            let izq = this.izquierdo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            let dere = this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            const dominante = this.tipoDominante(izq.tipo, dere.tipo, this.operacion);
            switch (this.operacion) {
                case TipoOperacion.SUMA:
                    switch (dominante) {
                        case Tipos_19.Tipos.INT:
                            return { tipo: Tipos_19.Tipos.INT, valor: (Number(izq.valor) + Number(dere.valor)) };
                        case Tipos_19.Tipos.DOUBLE:
                            return { tipo: Tipos_19.Tipos.DOUBLE, valor: (Number(izq.valor) + Number(dere.valor)) };
                        default:
                            index_16.errores.agregar(new Error_17.Error('Semantico', `No se puede sumar entre los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                            index_16.consola.actualizar(`No se puede sumar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                            break;
                    }
                    break;
                case TipoOperacion.RESTA:
                    switch (dominante) {
                        case Tipos_19.Tipos.INT:
                            return { tipo: Tipos_19.Tipos.INT, valor: (Number(izq.valor) - Number(dere.valor)) };
                        case Tipos_19.Tipos.DOUBLE:
                            return { tipo: Tipos_19.Tipos.DOUBLE, valor: (Number(izq.valor) - Number(dere.valor)) };
                        default:
                            index_16.errores.agregar(new Error_17.Error('Semantico', `No se puede restar entre los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                            index_16.consola.actualizar(`No se puede restar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                            break;
                    }
                    break;
                case TipoOperacion.MULTIPLICACION:
                    switch (dominante) {
                        case Tipos_19.Tipos.INT:
                            return { tipo: Tipos_19.Tipos.INT, valor: (Number(izq.valor) * Number(dere.valor)) };
                        case Tipos_19.Tipos.DOUBLE:
                            return { tipo: Tipos_19.Tipos.DOUBLE, valor: (Number(izq.valor) * Number(dere.valor)) };
                        default:
                            index_16.errores.agregar(new Error_17.Error('Semantico', `No se puede Multiplicar entre los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                            index_16.consola.actualizar(`No se puede multiplicar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                            break;
                    }
                    break;
                case TipoOperacion.DIVISION:
                    if (dominante === Tipos_19.Tipos.DOUBLE) {
                        if (dere.valor != 0) {
                            return { tipo: Tipos_19.Tipos.DOUBLE, valor: (Number(izq.valor) / Number(dere.valor)) };
                        }
                        else {
                            index_16.errores.agregar(new Error_17.Error('Semantico', `No se puede dividir dentro de 0`, this.linea, this.columna, entorno));
                            index_16.consola.actualizar(`No se puede dividir dentro de 0 l:${this.linea} c:${this.columna} \n`);
                        }
                    }
                    index_16.errores.agregar(new Error_17.Error('Semantico', `No se puede dividir con los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                    index_16.consola.actualizar(`No se puede dividir entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                    break;
                case TipoOperacion.MODULO:
                    if (dominante === Tipos_19.Tipos.DOUBLE) {
                        return { tipo: Tipos_19.Tipos.DOUBLE, valor: (Number(izq.valor) % Number(dere.valor)) };
                    }
                    index_16.errores.agregar(new Error_17.Error('Semantico', `No se puede usar el modulo con los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                    index_16.consola.actualizar(`No se puede usar modulo entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                    break;
                case TipoOperacion.CONCATENACION:
                    if (dominante === Tipos_19.Tipos.STRING) {
                        return { tipo: Tipos_19.Tipos.DOUBLE, valor: (izq.valor + dere.valor) };
                    }
                    index_16.errores.agregar(new Error_17.Error('Semantico', `No se puede concatenar ${izq.tipo} con ${dere.tipo}`, this.linea, this.columna, entorno));
                    index_16.consola.actualizar(`No se puede concatenar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                    break;
                case TipoOperacion.EXTE:
                    if (dominante === Tipos_19.Tipos.STRING) {
                        if (izq.tipo === Tipos_19.Tipos.STRING && dere.tipo === Tipos_19.Tipos.INT) {
                            let concatena = '';
                            for (let index = 0; index < dere.valor; index++) {
                                concatena += izq.valor;
                            }
                            return { tipo: Tipos_19.Tipos.STRING, valor: concatena };
                        }
                    }
                    index_16.errores.agregar(new Error_17.Error('Semantico', `No se puede concatenar ${izq.tipo} con ${dere.tipo}`, this.linea, this.columna, entorno));
                    index_16.consola.actualizar(`No se puede concatenar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                    break;
            }
        }
        ast(metodos) {
            return null;
        }
        tipoDominante(tipoIzquierdo, tipoDerecho, operador) {
            switch (operador) {
                case TipoOperacion.SUMA:
                    if (tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.INT) {
                        return Tipos_19.Tipos.INT;
                    }
                    else if ((tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.DOUBLE)
                        || (tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.INT)
                        || (tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.DOUBLE)) {
                        return Tipos_19.Tipos.DOUBLE;
                    }
                    return null;
                case TipoOperacion.RESTA:
                    if (tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.INT) {
                        return Tipos_19.Tipos.INT;
                    }
                    else if ((tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.DOUBLE)
                        || (tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.INT)
                        || (tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.DOUBLE)) {
                        return Tipos_19.Tipos.DOUBLE;
                    }
                    return null;
                case TipoOperacion.MULTIPLICACION:
                    if (tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.INT) {
                        return Tipos_19.Tipos.INT;
                    }
                    else if ((tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.DOUBLE)
                        || (tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.INT)
                        || (tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.DOUBLE)) {
                        return Tipos_19.Tipos.DOUBLE;
                    }
                    return null;
                case TipoOperacion.EXTE:
                    if (tipoIzquierdo === Tipos_19.Tipos.STRING && tipoDerecho === Tipos_19.Tipos.INT) {
                        return Tipos_19.Tipos.STRING;
                    }
                    return null;
                case TipoOperacion.DIVISION:
                    if ((tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.INT)
                        || (tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.DOUBLE)
                        || (tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.DOUBLE)
                        || (tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.INT)) {
                        return Tipos_19.Tipos.DOUBLE;
                    }
                    return null;
                case TipoOperacion.MODULO:
                    if ((tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.INT)
                        || (tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.DOUBLE)
                        || (tipoIzquierdo === Tipos_19.Tipos.INT && tipoDerecho === Tipos_19.Tipos.DOUBLE)
                        || (tipoIzquierdo === Tipos_19.Tipos.DOUBLE && tipoDerecho === Tipos_19.Tipos.INT)) {
                        return Tipos_19.Tipos.DOUBLE;
                    }
                    return null;
                case TipoOperacion.CONCATENACION:
                    if ((tipoIzquierdo === Tipos_19.Tipos.STRING && tipoDerecho === Tipos_19.Tipos.STRING)
                        || tipoIzquierdo === Tipos_19.Tipos.CHAR && tipoDerecho === Tipos_19.Tipos.CHAR
                        || tipoIzquierdo === Tipos_19.Tipos.STRING && tipoDerecho === Tipos_19.Tipos.CHAR
                        || tipoIzquierdo === Tipos_19.Tipos.CHAR && tipoDerecho === Tipos_19.Tipos.STRING) {
                        return Tipos_19.Tipos.STRING;
                    }
                    return null;
            }
        }
    }
    exports.Aritmetica = Aritmetica;
});
define("expresiones/operadores/Logico", ["require", "exports", "abstractas/expresion", "tiposD/Tipos", "index", "Reportes/Error"], function (require, exports, expresion_20, Tipos_20, index_17, Error_18) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Logico = exports.TipoLogico = void 0;
    var TipoLogico;
    (function (TipoLogico) {
        TipoLogico[TipoLogico["AND"] = 0] = "AND";
        TipoLogico[TipoLogico["NOT"] = 1] = "NOT";
        TipoLogico[TipoLogico["OR"] = 2] = "OR";
    })(TipoLogico = exports.TipoLogico || (exports.TipoLogico = {}));
    class Logico extends expresion_20.Expresion {
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
                    return { tipo: Tipos_20.Tipos.BOOLEAN, valor: (izq.valor && dere.valor) };
                case TipoLogico.NOT:
                    return { tipo: Tipos_20.Tipos.BOOLEAN, valor: (!izq.valor) };
                case TipoLogico.OR:
                    return { tipo: Tipos_20.Tipos.BOOLEAN, valor: (izq.valor || dere.valor) };
            }
        }
        getDer(tsGlobal, tsLocal, metodos, entorno) {
            if (this.derecho !== null && this.tipo !== TipoLogico.NOT) {
                return this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            }
            return { tipo: Tipos_20.Tipos.NULL, valor: null };
        }
        setError(izqT, derT, entorno) {
            if (izqT !== Tipos_20.Tipos.BOOLEAN && derT !== Tipos_20.Tipos.BOOLEAN && this.tipo !== TipoLogico.NOT) {
                index_17.consola.actualizar(`Los tipos no son operables ${izqT} y ${derT}, l:${this.linea} c:${this.columna}`);
                index_17.errores.agregar(new Error_18.Error('Semantico', `Los tipos no son operables ${izqT} y ${derT}, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
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
});
define("expresiones/operadores/Relacionales", ["require", "exports", "abstractas/expresion", "tiposD/Tipos"], function (require, exports, expresion_21, Tipos_21) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Relacional = exports.TiposRelacional = void 0;
    var TiposRelacional;
    (function (TiposRelacional) {
        TiposRelacional[TiposRelacional["MAYORI"] = 0] = "MAYORI";
        TiposRelacional[TiposRelacional["MENORI"] = 1] = "MENORI";
        TiposRelacional[TiposRelacional["DIFERENTE"] = 2] = "DIFERENTE";
        TiposRelacional[TiposRelacional["MAYOR"] = 3] = "MAYOR";
        TiposRelacional[TiposRelacional["IGUAL"] = 4] = "IGUAL";
        TiposRelacional[TiposRelacional["MENOR"] = 5] = "MENOR";
    })(TiposRelacional = exports.TiposRelacional || (exports.TiposRelacional = {}));
    class Relacional extends expresion_21.Expresion {
        constructor(relacion, izquierda, derecho, linea, columna) {
            super(linea, columna);
            this.relacion = relacion;
            this.izquierda = izquierda;
            this.derecho = derecho;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const izq = this.izquierda.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            const dere = this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            switch (this.relacion) {
                case TiposRelacional.IGUAL:
                    return { tipo: Tipos_21.Tipos.BOOLEAN, valor: (izq.valor == dere.valor) };
                case TiposRelacional.DIFERENTE:
                    return { tipo: Tipos_21.Tipos.BOOLEAN, valor: (izq.valor != dere.valor) };
                case TiposRelacional.MAYOR:
                    return { tipo: Tipos_21.Tipos.BOOLEAN, valor: (izq.valor > dere.valor) };
                case TiposRelacional.MENOR:
                    return { tipo: Tipos_21.Tipos.BOOLEAN, valor: (izq.valor < dere.valor) };
                case TiposRelacional.MAYORI:
                    return { tipo: Tipos_21.Tipos.BOOLEAN, valor: (izq.valor >= dere.valor) };
                case TiposRelacional.MENORI:
                    return { tipo: Tipos_21.Tipos.BOOLEAN, valor: (izq.valor <= dere.valor) };
            }
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Relacional = Relacional;
});
define("expresiones/operadores/Ternario", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error", "tiposD/Tipos"], function (require, exports, index_18, expresion_22, Error_19, Tipos_22) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ternario = void 0;
    class Ternario extends expresion_22.Expresion {
        constructor(condicion, verdadero, falso, linea, columna) {
            super(linea, columna);
            this.condicion = condicion;
            this.verdadero = verdadero;
            this.falso = falso;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (condicion.tipo != Tipos_22.Tipos.BOOLEAN) {
                index_18.errores.agregar(new Error_19.Error('Semantico', `La condicion debe ser tipo Bool, no ${condicion.tipo} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                index_18.consola.actualizar(`La condicion debe ser tipo Bool, no ${condicion.tipo} l:${this.linea} c:${this.columna}\n`);
            }
            if (condicion.valor) {
                return this.verdadero.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            }
            else {
                return this.falso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            }
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Ternario = Ternario;
});
define("expresiones/valores/obtenerValor", ["require", "exports", "index", "abstractas/expresion", "Reportes/Error"], function (require, exports, index_19, expresion_23, Error_20) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObtenerValor = void 0;
    class ObtenerValor extends expresion_23.Expresion {
        constructor(id, linea, columna) {
            super(linea, columna);
            this.id = id;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const valor = tsLocal.obtenerSimbolo(this.id);
            if (valor === null) {
                const valo = tsGlobal.obtenerSimbolo(this.id);
                if (valo === null) {
                    index_19.errores.agregar(new Error_20.Error('Semantico', `No se pudo encontrar la variale l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                    index_19.consola.actualizar(`No se pudo encontrar la variale l:${this.linea} c:${this.columna}\n`);
                }
                return { tipo: valo.tipo, valor: valo.valor };
            }
            return { tipo: valor.tipo, valor: valor.valor };
        }
        ast(metodos) {
            return null;
        }
    }
    exports.ObtenerValor = ObtenerValor;
});
define("expresiones/operadores/Unario", ["require", "exports", "abstractas/expresion", "tiposD/Tipos", "index", "expresiones/valores/obtenerValor", "Reportes/Error"], function (require, exports, expresion_24, Tipos_23, index_20, obtenerValor_1, Error_21) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Unario = exports.TUnario = void 0;
    var TUnario;
    (function (TUnario) {
        TUnario[TUnario["NEGATIVO"] = 0] = "NEGATIVO";
        TUnario[TUnario["INCREMENTO"] = 1] = "INCREMENTO";
        TUnario[TUnario["DECREMENTO"] = 2] = "DECREMENTO";
    })(TUnario = exports.TUnario || (exports.TUnario = {}));
    class Unario extends expresion_24.Expresion {
        constructor(tipoUni, valor, linea, columna) {
            super(linea, columna);
            this.tipoUni = tipoUni;
            this.valor = valor;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            if (this.tipoUni !== TUnario.NEGATIVO && !(this.valor instanceof obtenerValor_1.ObtenerValor)) {
                index_20.errores.agregar(new Error_21.Error('Semantico', `Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                index_20.consola.actualizar(`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}\n`);
            }
            const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (valor.tipo == Tipos_23.Tipos.INT || valor.tipo == Tipos_23.Tipos.DOUBLE) {
                switch (this.tipoUni) {
                    case TUnario.NEGATIVO:
                        return { tipo: valor.tipo, valor: (-valor.valor) };
                    case TUnario.DECREMENTO:
                        return { tipo: valor.tipo, valor: (valor.valor - 1) };
                    case TUnario.INCREMENTO:
                        return { tipo: valor.tipo, valor: (-valor.valor + 1) };
                }
            }
            index_20.errores.agregar(new Error_21.Error('Semantico', `Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            index_20.consola.actualizar(`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Unario = Unario;
});
define("expresiones/valores/setearValor", ["require", "exports", "abstractas/expresion", "tiposD/Tipos"], function (require, exports, expresion_25, Tipos_24) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SetearValor = void 0;
    class SetearValor extends expresion_25.Expresion {
        constructor(tipo, valor, linea, columna) {
            super(linea, columna);
            this.tipo = tipo;
            this.valor = valor;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            if (this.tipo === Tipos_24.Tipos.STRING || this.tipo === Tipos_24.Tipos.CHAR) {
                const valor = this.valor.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\'/g, "\'").replace(/\\\\/g, "\\").replace(/\\"/g, "\"");
                return { tipo: this.tipo, valor: valor };
            }
            return { tipo: this.tipo, valor: this.valor };
        }
        ast(metodos) {
            return null;
        }
    }
    exports.SetearValor = SetearValor;
});
define("instrucciones/Print", ["require", "exports", "index", "abstractas/expresion", "abstractas/instruccion"], function (require, exports, index_21, expresion_26, instruccion_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Print = void 0;
    class Print extends instruccion_2.Instruccion {
        constructor(expresiones, linea, columna, banderaS = false) {
            super(linea, columna);
            this.expresiones = expresiones;
            this.banderaS = banderaS;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            if (this.banderaS) { //si la bandera es verdadera, se imprime el salto (println)
                for (let index = 0; index < this.expresiones.length; index++) {
                    if (this.expresiones[index] instanceof expresion_26.Expresion) {
                        const valor = this.expresiones[index].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                        index_21.consola.actualizar(valor.valor);
                    }
                    else {
                        index_21.consola.actualizar('');
                    }
                }
                index_21.consola.actualizar('\n');
            }
            else { //si no hay bandera no se imprime salto (print)
                for (let index = 0; index < this.expresiones.length; index++) {
                    if (this.expresiones[index] instanceof expresion_26.Expresion) {
                        const valor = this.expresiones[index].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                        index_21.consola.actualizar(valor.valor);
                    }
                    else {
                        index_21.consola.actualizar('');
                    }
                }
            }
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Print = Print;
});
define("instrucciones/asignacion/asignacion", ["require", "exports", "abstractas/instruccion", "tiposD/Tipos", "index", "Reportes/Error"], function (require, exports, instruccion_3, Tipos_25, index_22, Error_22) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Asignacion = void 0;
    class Asignacion extends instruccion_3.Instruccion {
        constructor(id, valor, linea, columna) {
            super(linea, columna);
            this.id = id;
            this.valor = valor;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            var simbolo = tsLocal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.actualizarValor(tsLocal, simbolo, valor, entorno);
            }
            else {
                simbolo = tsGlobal.obtenerSimbolo(this.id);
                if (simbolo) {
                    this.actualizarValor(tsGlobal, simbolo, valor, entorno);
                }
                else {
                    index_22.errores.agregar(new Error_22.Error('Semantico', `Variable ${this.id} no declarada`, this.linea, this.columna, entorno));
                    index_22.consola.actualizar(`Variable ${this.id} no declarada l:${this.linea}, c:${this.columna}\n`);
                }
            }
        }
        actualizarValor(ts, simbolo, valor, entorno) {
            const aux = this.verificarTipo(simbolo.tipo, valor, this.linea, this.columna, entorno);
            ts.actualizar(this.id, aux.valor);
        }
        verificarTipo(tipo, valor, linea, columna, entorno) {
            if (tipo === valor.tipo) {
                return valor;
            }
            else if (tipo === Tipos_25.Tipos.DOUBLE) {
                if (valor.tipo === Tipos_25.Tipos.INT) {
                    return { tipo: tipo, valor: valor.valor };
                }
            }
            else if (tipo === Tipos_25.Tipos.INT) {
                if (valor.tipo === Tipos_25.Tipos.BOOLEAN) {
                    if (valor.valor === true) {
                        return { tipo: tipo, valor: 1 };
                    }
                    else if (valor.valor === false) {
                        return { tipo: tipo, valor: 0 };
                    }
                }
                else if (valor.tipo === Tipos_25.Tipos.CHAR) {
                    return { tipo: tipo, valor: valor.valor.charCodeAt(0) };
                }
                else if (valor.tipo === Tipos_25.Tipos.DOUBLE) {
                    return { tipo: tipo, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
                }
            }
            index_22.errores.agregar(new Error_22.Error('Semantico', `Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo}`, this.linea, this.columna, entorno));
            index_22.consola.actualizar(`Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo} l:${this.linea}, c:${this.columna}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Asignacion = Asignacion;
});
define("instrucciones/asignacion/asignacionDecInc", ["require", "exports", "abstractas/instruccion", "tiposD/Tipos", "index", "Reportes/Error"], function (require, exports, instruccion_4, Tipos_26, index_23, Error_23) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsignacionDecInc = exports.TipoAsignacion = void 0;
    var TipoAsignacion;
    (function (TipoAsignacion) {
        TipoAsignacion[TipoAsignacion["DECREMENTO"] = 0] = "DECREMENTO";
        TipoAsignacion[TipoAsignacion["INCREMENTO"] = 1] = "INCREMENTO";
    })(TipoAsignacion = exports.TipoAsignacion || (exports.TipoAsignacion = {}));
    class AsignacionDecInc extends instruccion_4.Instruccion {
        constructor(id, tipo, linea, columna) {
            super(linea, columna);
            this.id = id;
            this.tipo = tipo;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            var simbolo = tsLocal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.setDI(simbolo, tsLocal, entorno);
            }
            else {
                simbolo = tsGlobal.obtenerSimbolo(this.id);
                if (simbolo) {
                    this.setDI(simbolo, tsGlobal, entorno);
                }
                else {
                    index_23.errores.agregar(new Error_23.Error('Semantico', `No se pudo encontrar la variable ${this.id}`, this.linea, this.columna, entorno));
                    index_23.consola.actualizar(`No se pudo encontrar la variable ${this.id} l:${this.linea}, c:${this.columna}\n`);
                }
            }
        }
        setDI(simbolo, ts, entorno) {
            if (simbolo.tipo === Tipos_26.Tipos.INT || simbolo.tipo === Tipos_26.Tipos.DOUBLE) {
                if (this.tipo === TipoAsignacion.DECREMENTO) {
                    ts.actualizar(this.id, simbolo.valor - 1);
                }
                else if (this.tipo === TipoAsignacion.INCREMENTO) {
                    ts.actualizar(this.id, simbolo.valor + 1);
                }
                return;
            }
            index_23.errores.agregar(new Error_23.Error('Semantico', `El ${this.tipo} no se pudo realizar correctamente`, this.linea, this.columna, entorno));
            index_23.consola.actualizar(`El ${this.tipo} no se pudo realizar correctamente l:${this.linea}, c:${this.columna}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.AsignacionDecInc = AsignacionDecInc;
});
define("instrucciones/ciclos/dowhile", ["require", "exports", "index", "abstractas/instruccion", "Reportes/Error", "Reportes/TablaSimbolos", "tiposD/Tipos"], function (require, exports, index_24, instruccion_5, Error_24, TablaSimbolos_3, Tipos_27) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dowhile = void 0;
    class Dowhile extends instruccion_5.Instruccion {
        constructor(condicion, cuerpo, linea, columna) {
            super(linea, columna);
            this.condicion = condicion;
            this.cuerpo = cuerpo;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'DoWhile');
            this.verError(condicion, entorno);
            do {
                var entornoLocal = new TablaSimbolos_3.TablaSimbolo(tsLocal.getSimbolos());
                const control = this.correrInstrucciones(tsGlobal, entornoLocal, metodos, entorno + "DoWhile");
                if (control !== null) {
                    if (control.tipo === Tipos_27.TiposControl.BREAK) {
                        break;
                    }
                    else if (control.tipo === Tipos_27.TiposControl.CONTINUE) {
                        condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                        continue;
                    }
                    else if (control.tipo === Tipos_27.TiposControl.RETURN) {
                        return control;
                    }
                }
                condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                this.verError(condicion, entorno);
            } while (condicion.valor);
        }
        correrInstrucciones(tsGlobal, tsLocal, metodos, entorno) {
            for (var i in this.cuerpo) {
                const control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (control !== null && control !== undefined) {
                    return control;
                }
            }
            return null;
        }
        verError(condicion, entorno) {
            if (condicion.tipo != Tipos_27.Tipos.BOOLEAN) {
                index_24.consola.actualizar(`La condicion de DOWHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
                index_24.errores.agregar(new Error_24.Error('Semantico', `La condicion de DOWHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            }
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Dowhile = Dowhile;
});
define("instrucciones/ciclos/for", ["require", "exports", "index", "abstractas/instruccion", "Reportes/Error", "Reportes/TablaSimbolos", "tiposD/Tipos"], function (require, exports, index_25, instruccion_6, Error_25, TablaSimbolos_4, Tipos_28) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.For = void 0;
    class For extends instruccion_6.Instruccion {
        constructor(declaracion, condicion, paso, cuerpo, linea, columna) {
            super(linea, columna);
            this.declaracion = declaracion;
            this.condicion = condicion;
            this.paso = paso;
            this.cuerpo = cuerpo;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            var local = new TablaSimbolos_4.TablaSimbolo(tsLocal.getSimbolos());
            this.declaracion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'For');
            var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            this.verError(condicion, entorno);
            while (condicion.valor) {
                var localFor = new TablaSimbolos_4.TablaSimbolo(local.getSimbolos());
                const control = this.correrInstrucciones(tsGlobal, localFor, metodos, entorno + 'For');
                if (control !== null) {
                    if (control.tipo === Tipos_28.TiposControl.BREAK) {
                        break;
                    }
                    else if (control.tipo === Tipos_28.TiposControl.CONTINUE) {
                        this.paso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                        condicion = this.condicion.ejecutar(tsGlobal, localFor, metodos, entorno);
                        continue;
                    }
                    else if (control.tipo === Tipos_28.TiposControl.RETURN) {
                        return control;
                    }
                }
                this.paso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                condicion = this.condicion.ejecutar(tsGlobal, localFor, metodos, entorno);
                this.verError(condicion, entorno);
            }
        }
        correrInstrucciones(tsGlobal, tsLocal, metodos, entorno) {
            for (var i in this.cuerpo) {
                const control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (control !== null && control !== undefined) {
                    return control;
                }
            }
            return null;
        }
        verError(condicion, entorno) {
            if (condicion.tipo != Tipos_28.Tipos.BOOLEAN) {
                index_25.consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
                index_25.errores.agregar(new Error_25.Error('Semantico', `La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            }
        }
        ast(metodos) {
            return null;
        }
    }
    exports.For = For;
});
define("instrucciones/ciclos/forin", ["require", "exports", "abstractas/instruccion"], function (require, exports, instruccion_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ForIn = void 0;
    class ForIn extends instruccion_7.Instruccion {
        constructor(iterador, iterando, cuerpo, linea, columna) {
            super(linea, columna);
            this.iterador = iterador;
            this.iterando = iterando;
            this.cuerpo = cuerpo;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            throw new Error('Method not implemented.');
        }
        correrInstrucciones(tsGlobal, tsLocal, metodos, entorno) {
            for (var i in this.cuerpo) {
                const control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (control !== null && control !== undefined) {
                    return control;
                }
            }
            return null;
        }
        ast(metodos) {
            return null;
        }
    }
    exports.ForIn = ForIn;
});
define("instrucciones/ciclos/while", ["require", "exports", "index", "abstractas/instruccion", "Reportes/Error", "Reportes/TablaSimbolos", "tiposD/Tipos"], function (require, exports, index_26, instruccion_8, Error_26, TablaSimbolos_5, Tipos_29) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.While = void 0;
    class While extends instruccion_8.Instruccion {
        constructor(condicion, cuerpo, linea, columna) {
            super(linea, columna);
            this.condicion = condicion;
            this.cuerpo = cuerpo;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'While');
            if (condicion.tipo != Tipos_29.Tipos.BOOLEAN) {
                index_26.consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
                index_26.errores.agregar(new Error_26.Error('Semantico', `La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            }
            while (condicion.valor) {
                var entornoLocal = new TablaSimbolos_5.TablaSimbolo(tsLocal.getSimbolos());
                const control = this.correrInstrucciones(tsGlobal, entornoLocal, metodos, entorno + "While");
                if (control !== null) {
                    if (control.tipo === Tipos_29.TiposControl.BREAK) {
                        break;
                    }
                    else if (control.tipo === Tipos_29.TiposControl.CONTINUE) {
                        condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                        continue;
                    }
                    else if (control.tipo === Tipos_29.TiposControl.RETURN) {
                        return control;
                    }
                }
                condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (condicion.tipo != Tipos_29.Tipos.BOOLEAN) {
                    index_26.consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
                    index_26.errores.agregar(new Error_26.Error('Semantico', `La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                }
            }
        }
        correrInstrucciones(tsGlobal, tsLocal, metodos, entorno) {
            for (var i in this.cuerpo) {
                const control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (control !== null && control !== undefined) {
                    return control;
                }
            }
            return null;
        }
        ast(metodos) {
            return null;
        }
    }
    exports.While = While;
});
define("instrucciones/condicionales/Case", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Case = void 0;
    class Case {
        constructor(valor, cuerpo) {
            this.valor = valor;
            this.cuerpo = cuerpo;
        }
        ast(metodos) {
            return null;
        }
        obtenerCuerpo(metodos) {
            return null;
        }
    }
    exports.Case = Case;
});
define("instrucciones/condicionales/If", ["require", "exports", "abstractas/instruccion", "Reportes/TablaSimbolos", "tiposD/Tipos", "index", "Reportes/Error"], function (require, exports, instruccion_9, TablaSimbolos_6, Tipos_30, index_27, Error_27) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.If = void 0;
    class If extends instruccion_9.Instruccion {
        constructor(condicion, cuerpo, elseC, linea, columna) {
            super(linea, columna);
            this.condicion = condicion;
            this.cuerpo = cuerpo;
            this.elseC = elseC;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const condi = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (condi.tipo != Tipos_30.Tipos.BOOLEAN) {
                index_27.errores.agregar(new Error_27.Error('Semantico', `La condicion debe ser tipo Bool, no ${condi.tipo} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                index_27.consola.actualizar(`La condicion debe ser tipo Bool, no ${condi.tipo} l:${this.linea} c:${this.columna}\n`);
            }
            var control;
            if (condi.valor) {
                control = this.ejecutarIns(tsGlobal, tsLocal, metodos, entorno + 'If', this.cuerpo);
            }
            else if (this.elseC) {
                if (this.elseC instanceof instruccion_9.Instruccion) {
                    control = this.elseC.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'Else');
                }
                else {
                    control = this.ejecutarIns(tsGlobal, tsLocal, metodos, entorno + 'Else', this.elseC);
                }
            }
            if (control !== null && control !== undefined) {
                if (control.tipo === Tipos_30.TiposControl.RETURN) {
                    return control;
                }
            }
        }
        ejecutarIns(tsGlobal, tsLocal, metodos, entorno, cuerpo) {
            var tslocal2 = new TablaSimbolos_6.TablaSimbolo(tsLocal.getSimbolos());
            for (var i in cuerpo) {
                const control = cuerpo[i].ejecutar(tsGlobal, tslocal2, metodos, entorno);
                if (control !== null && control !== undefined) {
                    return control;
                }
            }
            return null;
        }
        ast(metodos) {
            return null; //aun no implementado
        }
    }
    exports.If = If;
});
define("instrucciones/condicionales/Switch", ["require", "exports", "index", "abstractas/instruccion", "Reportes/Error", "Reportes/TablaSimbolos", "tiposD/Tipos"], function (require, exports, index_28, instruccion_10, Error_28, TablaSimbolos_7, Tipos_31) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Switch = void 0;
    class Switch extends instruccion_10.Instruccion {
        constructor(condicion, cuerpo, defa, linea, columna) {
            super(linea, columna);
            this.condicion = condicion;
            this.cuerpo = cuerpo;
            this.defa = defa;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            var control = this.ejecutarCase(condicion, tsGlobal, tsLocal, metodos, entorno);
            if (control === null) {
                control = this.ejecutarCuerpo(this.defa, tsGlobal, tsLocal, metodos, entorno);
            }
            if (control !== null) {
                if (control.tipo === Tipos_31.TiposControl.CONTINUE) {
                    index_28.errores.agregar(new Error_28.Error('Sintactico', `Continue Fuera de un ciclo l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                    index_28.consola.actualizar(`Continue Fuera de un ciclo l:${this.linea} c:${this.columna}\n`);
                }
                else if (control.tipo === Tipos_31.TiposControl.RETURN) {
                    return control;
                }
            }
        }
        ejecutarCase(condicion, tsGlobal, tsLocal, metodos, entorno) {
            let flag = false;
            for (var i in this.cuerpo) {
                const valor = this.cuerpo[i].valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if ((valor.valor === condicion.valor) || flag) {
                    flag = true;
                    const control = this.ejecutarCuerpo(this.cuerpo[i].cuerpo, tsGlobal, tsLocal, metodos, entorno + 'case');
                    if (control !== null) {
                        return control;
                    }
                }
            }
            return null;
        }
        ejecutarCuerpo(cuerpo, tsGlobal, tsLocal, metodos, entorno) {
            var entornoLocal = new TablaSimbolos_7.TablaSimbolo(tsLocal.getSimbolos());
            for (var i in cuerpo) {
                const control = cuerpo[i].ejecutar(tsGlobal, entornoLocal, metodos, entorno);
                if (control !== null && control !== undefined) {
                    return control;
                }
            }
            return null;
        }
        ast(metodos) {
            return null;
        }
        obtenerCuerpo(metodos) { } //hola aby
    }
    exports.Switch = Switch;
});
define("instrucciones/control/break", ["require", "exports", "abstractas/instruccion", "tiposD/Tipos"], function (require, exports, instruccion_11, Tipos_32) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Break = void 0;
    class Break extends instruccion_11.Instruccion {
        constructor(linea, columna) {
            super(linea, columna);
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            return { tipo: Tipos_32.TiposControl.BREAK, linea: this.linea, columna: this.columna };
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Break = Break;
});
define("instrucciones/control/continue", ["require", "exports", "abstractas/instruccion", "tiposD/Tipos"], function (require, exports, instruccion_12, Tipos_33) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Continue = void 0;
    class Continue extends instruccion_12.Instruccion {
        constructor(linea, columna) {
            super(linea, columna);
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            return { tipo: Tipos_33.TiposControl.CONTINUE, linea: this.linea, columna: this.columna };
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Continue = Continue;
});
define("instrucciones/control/return", ["require", "exports", "abstractas/instruccion", "tiposD/Tipos"], function (require, exports, instruccion_13, Tipos_34) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Return = void 0;
    class Return extends instruccion_13.Instruccion {
        constructor(valor, linea, columna) {
            super(linea, columna);
            this.valor = valor;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            if (this.valor === null) {
                return { tipo: Tipos_34.TiposControl.RETURN, valor: null, linea: this.linea, columna: this.columna };
            }
            const val = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            return { tipo: Tipos_34.TiposControl.RETURN, valor: val, linea: this.linea, columna: this.columna };
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Return = Return;
});
define("instrucciones/declaracion/declaracion", ["require", "exports", "abstractas/instruccion", "tiposD/Tipos", "index", "Reportes/Error", "Reportes/Simbolo"], function (require, exports, instruccion_14, Tipos_35, index_29, Error_29, Simbolo_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Declaracion = void 0;
    class Declaracion extends instruccion_14.Instruccion {
        constructor(tipo, id, valor, fila, columna) {
            super(fila, columna);
            this.tipo = tipo;
            this.id = id;
            this.valor = valor;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            for (var i in this.id) {
                this.declarar(this.id[i], tsGlobal, tsLocal, metodos, entorno);
            }
        }
        declarar(id, tsGlobal, tsLocal, metodos, entorno) {
            const aux = tsLocal.obtenerSimbolo(id);
            if (aux) {
                index_29.errores.agregar(new Error_29.Error('Semantico', `La variable ${id} ya esta definida`, this.linea, this.columna, entorno));
                index_29.consola.actualizar(`La variable ${id} ya esta definida l:${this.linea}, c:${this.columna}\n`);
            }
            var valor;
            if (this.valor) {
                valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            }
            else {
                valor = this.valorDefecto(this.tipo);
            }
            valor = this.verificarTipo(this.tipo, valor, this.linea, this.columna, entorno);
            tsLocal.agregar(new Simbolo_2.Simbolo(this.tipo, id, valor.Valor, entorno));
        }
        ast(metodos) {
            return null;
        }
        verificarTipo(tipo, valor, linea, columna, entorno) {
            if (tipo === valor.tipo) {
                return valor;
            }
            else if (tipo === Tipos_35.Tipos.DOUBLE) {
                if (valor.tipo === Tipos_35.Tipos.INT) {
                    return { tipo: tipo, valor: valor.valor };
                }
            }
            else if (tipo === Tipos_35.Tipos.INT) {
                if (valor.tipo === Tipos_35.Tipos.BOOLEAN) {
                    if (valor.valor === true) {
                        return { tipo: tipo, valor: 1 };
                    }
                    else if (valor.valor === false) {
                        return { tipo: tipo, valor: 0 };
                    }
                }
                else if (valor.tipo === Tipos_35.Tipos.CHAR) {
                    return { tipo: tipo, valor: valor.valor.charCodeAt(0) };
                }
                else if (valor.tipo === Tipos_35.Tipos.DOUBLE) {
                    return { tipo: tipo, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
                }
            }
            index_29.errores.agregar(new Error_29.Error('Semantico', `Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo}`, this.linea, this.columna, entorno));
            index_29.consola.actualizar(`Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo} l:${this.linea}, c:${this.columna}\n`);
        }
        valorDefecto(tipo) {
            if (tipo === Tipos_35.Tipos.INT) {
                return { tipo: Tipos_35.Tipos.INT, valor: 0 };
            }
            else if (tipo === Tipos_35.Tipos.DOUBLE) {
                return { tipo: Tipos_35.Tipos.DOUBLE, valor: 0.0 };
            }
            else if (tipo === Tipos_35.Tipos.BOOLEAN) {
                return { tipo: Tipos_35.Tipos.BOOLEAN, valor: true };
            }
            else if (tipo === Tipos_35.Tipos.CHAR) {
                return { tipo: Tipos_35.Tipos.CHAR, valor: '0' };
            }
            else if (tipo === Tipos_35.Tipos.STRING) {
                return { tipo: Tipos_35.Tipos.STRING, valor: "" };
            }
        }
    }
    exports.Declaracion = Declaracion;
});
define("instrucciones/funciones/funcion", ["require", "exports", "abstractas/instruccion"], function (require, exports, instruccion_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Funcion = void 0;
    class Funcion extends instruccion_15.Instruccion {
        constructor(tipo, id, parametros, cuerpo, linea, columna) {
            super(linea, columna);
            this.tipo = tipo;
            this.id = id;
            this.parametros = parametros;
            this.cuerpo = cuerpo;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            metodos.agregar(this.tipo, this.id, this.parametros, this.cuerpo);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.Funcion = Funcion;
});
define("instrucciones/funciones/llamadaMetodo", ["require", "exports", "abstractas/instruccion", "Reportes/TablaSimbolos", "tiposD/Tipos", "index", "Reportes/Error", "Reportes/Simbolo"], function (require, exports, instruccion_16, TablaSimbolos_8, Tipos_36, index_30, Error_30, Simbolo_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LlamadaMetodo = void 0;
    class LlamadaMetodo extends instruccion_16.Instruccion {
        constructor(id, parametros, linea, columna) {
            super(linea, columna);
            this.id = id;
            this.parametros = parametros;
        }
        ejecutar(tsGlobal, tsLocal, metodos, entorno) {
            const metodo = metodos.get(this.id);
            if (metodo) {
                if (metodo.tipo === Tipos_36.Tipos.VOID) {
                    if (metodo.parametros.length === this.parametros.length) {
                        var tsLocal2 = this.obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno);
                        const control = this.ejecutarMetodo(metodo.cuerpo, tsGlobal, tsLocal2, metodos, entorno);
                        //para los retornos
                        if (control !== null && control !== undefined) {
                            if (control === Tipos_36.TiposControl.RETURN) {
                                if (control.valor === null) {
                                    return;
                                }
                                this.ponerError(`No se puede retornar tipo: ${control.valor.tipo} en metodo VOID`, this.linea, this.columna, entorno);
                            }
                        }
                        return;
                    }
                    else if (metodo.parametros.length >= this.parametros.length) {
                        this.ponerError(`Hay menos parametros de los esperados`, this.linea, this.columna, entorno);
                    }
                    else {
                        this.ponerError(`Hay mas parametros de los esperados`, this.linea, this.columna, entorno);
                    }
                }
                this.ponerError(`El metodo VOID no asignado de forma correcta`, this.linea, this.columna, entorno);
            }
            this.ponerError(`El metodo ${this.id} no se pudo encontrar`, this.linea, this.columna, entorno);
        }
        obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno) {
            var stLocal2 = new TablaSimbolos_8.TablaSimbolo([]);
            for (var i in this.parametros) {
                var valor = this.parametros[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (valor.tipo === metodo.parametros[i].tipo) {
                    stLocal2.agregar(new Simbolo_3.Simbolo(valor.tipo, metodo.parametros[i].id, valor.valor, entorno));
                }
                else {
                    this.ponerError(`El tipo ${valor.tipo} no coincide con el parametro`, this.linea, this.columna, entorno);
                }
            }
            return stLocal2;
        }
        ejecutarMetodo(cuerpo, tsGlobal, tsLocal, metodos, entorno) {
            for (var i in cuerpo) {
                const control = cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                if (control !== null && control !== undefined) {
                    return control;
                }
            }
            return null;
        }
        ponerError(mensaje, linea, columna, entorno) {
            index_30.errores.agregar(new Error_30.Error('Semantico', mensaje, linea, columna, entorno));
            index_30.consola.actualizar(mensaje + ` l: ${linea}, c: ${columna}\n`);
        }
        ast(metodos) {
            return null;
        }
    }
    exports.LlamadaMetodo = LlamadaMetodo;
});
define("instrucciones/funciones/main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Main = void 0;
    class Main {
        constructor(metodo) {
            this.metodo = metodo;
        }
        ejectuar(metodos) {
            metodos.push(this.metodo);
        }
    }
    exports.Main = Main;
});
