export class Consola{
    private consola:string
    constructor(){
        this.consola=''
    }
    public actualizar(cadena:string){
        this.consola+=cadena
    }
    public limpiar(){
        this.consola=''
    }
    public publicar(){
        return this.consola
    }
}