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
    //guardar temporales en funciones
    guardartems(tabla) {
        if (this.tempstorage.size > 0) {
            const temp = this.newTem();
            let tamanio = 0;
            this.addComentario('Guardando temporales');
            //this.addExp(temp,'p',tabla.size,'+');
            this.tempstorage.forEach((value) => {
                tamanio++;
                this.setstack(temp, value);
                if (tamanio != this.tempstorage.size) {
                    this.addExp(temp, temp, '1', '+');
                }
            });
            this.addComentario('Fin Guardando temporales');
        }
        let cad = 0; /*tabla.size;*/
        /*tabla.size*/ cad = cad + this.tempstorage.size;
        return cad;
    }
    recoverTemps(tabla, pos) {
        if (this.tempstorage.size > 0) {
            const temp = this.newTem();
            let tamanio = 0;
            this.addComentario('Obteniendo temporales');
            this.addExp(temp, 'p', pos, '+');
            this.tempstorage.forEach((value) => {
                tamanio++;
                this.getstack(value, temp);
                if (tamanio != this.tempstorage.size) {
                    this.addExp(temp, temp, '1', '+');
                }
            });
            this.addComentario('Fin Obteniendo temporales');
            //tabla.size = pos;
        }
    }
}
exports.Traductor = Traductor;
