
export enum Tipos{
    INT='int',
    DOUBLE='double',
    BOOLEAN='boolean',
    CHAR='char',
    STRING ='String',
    STRUCT='struct',
    NULL ='null',
    VOID='null',
    ARRAY='array'
}
export enum Intervalo{
    BEGIN   =0,
    END     =1
}
export type Valor={
    tipo:Tipos|Intervalo,
    valor:any
}

export enum TiposControl{
    BREAK       =0,
    RETURN      =1,
    CONTINUE    =3
}
export type Nodo ={
    id:string,
    ast:string
}