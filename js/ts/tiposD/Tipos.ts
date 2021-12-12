
export enum Tipos{
    INT=0,
    DOUBLE=1,
    BOOLEAN=2,
    CHAR=3,
    STRING =4,
    STRUCT=5,
    NULL =6,
    VOID=7,
    ARRAY=8
}

export type Valor={
    tipo:Tipos,
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