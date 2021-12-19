//importaciones
%{
    //salida y errores
    const {errores,consola} =require('../ts/index.js')
    const {Error} = require('../ts/Reportes/Error.js')
    //tipos de datos
    const {Tipos}= require('../ts/tiposD/Tipos.js')
    //declaracion
    const {Declaracion}= require('../ts/instrucciones/declaracion/declaracion.js')
    //asignacion 
    const {AsignacionDecInc,TipoAsignacion} = require('../ts/instrucciones/asignacion/asignacionDecInc.js')
    const {Asignacion} = require('../ts/instrucciones/asignacion/asignacion.js')
    //funciones
    const { LlamadaMetodo } = require('../ts/instrucciones/funciones/llamadaMetodo.js')
    const { Parametros } = require('../ts/instrucciones/funciones/parametros.js')
    const { Funcion } = require('../ts/instrucciones/funciones/funcion.js')
    const { LlamarFuncion } = require('../ts/expresiones/llamarFunciones.js')
    const { Main } = require('../ts/instrucciones/funciones/main.js')
    //control
    const { Break } = require('../ts/instrucciones/control/break.js')
    const { Continue } = require('../ts/instrucciones/control/continue.js')
    const { Return } = require('../ts/instrucciones/control/return.js')
    //condicionales 
    const { Case } = require('../ts/instrucciones/condicionales/Case.js')
    const { If } = require('../ts/instrucciones/condicionales/If.js')
    const { Switch } = require('../ts/instrucciones/condicionales/Switch.js')
    //ciclos
    const { Dowhile } = require('../ts/instrucciones/ciclos/dowhile.js')
    const { For } = require('../ts/instrucciones/ciclos/for.js')
    const { While } = require('../ts/instrucciones/ciclos/while.js')
    //valores 
    const { ObtenerValor } = require('../ts/expresiones/valores/obtenerValor.js')
    const { SetearValor } = require('../ts/expresiones/valores/setearValor.js')
    //operadores 
    const { TipoOperacion, Aritmetica } = require('../ts/expresiones/operadores/Aritmetica.js')
    const { TipoLogico, Logico } = require('../ts/expresiones/operadores/Logico.js')
    const { TiposRelacional, Relacional } = require('../ts/expresiones/operadores/Relacionales.js')
    const { Ternario } = require('../ts/expresiones/operadores/Ternario.js')
    const { TUnario, Unario } = require('../ts/expresiones/operadores/Unario.js')
    const { Begin } = require('../ts/expresiones/begin.js')
    const { End } = require('../ts/expresiones/end.js')
    //funciones nativas faltan push y pop
    const { Print } = require('../ts/instrucciones/Print.js')
    const { CaracterOfPosition } = require('../ts/expresiones/funcionesNativas/caracterOfPosition.js')
    const { Cos } = require('../ts/expresiones/funcionesNativas/coseno.js')
    const { Length } = require('../ts/expresiones/funcionesNativas/length.js')
    const { Parse } = require('../ts/expresiones/funcionesNativas/parse.js')
    const { Pow } = require('../ts/expresiones/funcionesNativas/pow.js')
    const { Sin } = require('../ts/expresiones/funcionesNativas/seno.js')
    const { Sqrt } = require('../ts/expresiones/funcionesNativas/sqrt.js')
    const { StringM } = require('../ts/expresiones/funcionesNativas/String.js')
    const { Substring } = require('../ts/expresiones/funcionesNativas/substring.js')
    const { Tan } = require('../ts/expresiones/funcionesNativas/tangente.js')
    const { ToDouble } = require('../ts/expresiones/funcionesNativas/toDouble.js')
    const { ToInt } = require('../ts/expresiones/funcionesNativas/toint.ts')
    const { ToLowerCase } = require('../ts/expresiones/funcionesNativas/toLower.js')
    const { ToUpperCase } = require('../ts/expresiones/funcionesNativas/toUpper.js')
    const { Typeof } = require('../ts/expresiones/funcionesNativas/typeof.js')
    
%}


// analizador lexico

%lex
%options case-sensitive

%%

\s+                                 {}  //Se ingnoran espacio
[ \r\t]+                            {}
\n                                  {}
"//".*                              {}  //Comentario de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {}  //Comentario multilinea

//operadores relacionales
"=="        return 'IGUALDAD'; //igualdad
"!="        return 'DIFERENTE'; //diferente
">="        return 'MAYORIGUAL'; //mayor igual
"<="        return 'MENORIGUAL'; //menor igual
">"         return 'MAYOR'; //mayor
"<"         return 'MENOR'; //menor


//signos raros
";"         return 'PTCOMA';
"("         return 'PARIZQ';
")"         return 'PARDER';
"["         return 'CORIZQ';
"]"         return 'CORDER';
"{"         return 'LLAVEIZQ';
"}"         return 'LLAVEDER';
"."         return 'PUNTO';
","         return 'COMA';
"="         return 'IGUAL';
"?"         return 'PREGUNTA';
":"         return 'DOSPTS';

//signos lógicos
"&&"        return 'AND';
"||"        return 'OR';
"!"         return 'NOT';

//Operadores Aritméticos
"^"             return 'EXTE'
"&"             return 'CONCATENACION'
"++"            return 'INC';        //Incremento
"--"            return 'DEC';        //Decremento
"+"             return 'MAS';         //Suma
"-"             return 'MENOS';         //Resta
"*"             return 'POR';         //Multipliación
"/"             return 'DIVIDIDO';         //División
"%"             return 'MODULO';         //Módulo
"pow"           return 'POW';
"sqrt"          return 'SQRT';
"sin"           return 'SIN';
"cos"           return 'COS';
"tan"           return 'TAN';
// funciones nativas 
"caracterOfPosition"    return 'COPOSITION';
"subString"     return 'SUBSTRING';
"begin"         return 'BEGIN';
"end"           return 'END';
"length"        return 'LENGTH';
"toLowercase"   return 'LOWERCASE';
"toUppercase"   return 'UPPERCASE';
"parse"         return 'PARSE';
"toInt"         return 'TOINT';
"toDouble"      return 'TODOUBLE';
"string"        return 'RSTRING';
"typeof"        return 'TYPEOF';
"pop"           return 'POP';
"push"          return 'PUSH';



//palabras reservadas
"print"         return 'PRINT';
"println"       return 'PRINTLN';
"null"          return 'NULL';
"int"           return 'INT';
"double"        return 'DOUBLE';
"boolean"       return 'BOOLEAN';
"char"          return 'CHAR';
"String"        return 'STRING';
"struct"        return 'STRUCT';
"void"          return 'VOID';
//"main"          return 'MAIN';


//valores primitivos e identificador
\"((\\\")|[^\"\n])*\"                           { yytext = yytext.substr(1, yyleng-2); return 'CADENA'; }  //Cadena **
\'((\\\\)|(\\n)|(\\t)|(\\\")|(\\\')|[^\'\n])\'  { yytext = yytext.substr(1, yyleng-2); return 'CARACTER'; } //Caracteres **
[0-9]+("."[0-9]+)?\b            return 'DECIMAL';  //Decimal
[0-9]+\b                        return 'ENTERO';   //Entero
"true"                          return 'TRUE';     //Verdadero
"false"                         return 'FALSE';    //Falso
([a-zA-Z])[a-zA-Z0-9_]*         return 'ID';       //Identificadores

<<EOF>>                         return 'EOF';

.   { consola.actualizar(`${yytext} caracter no conocido, l: ${yylloc.first_line}, c: ${yylloc.first_column}`); errores.agregar(new Error('Lexico',`Error lexico, ${yytext} caracter no conocido`, yylloc.first_line , yylloc.first_column,'')); }

/lex


//  Precedencias
%left 'PREGUNTA' 'DOSPTS'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALDAD' 'DIFERENTE' 'MAYORIGUAL' 'MENORIGUAL' 'MAYOR' 'MENOR'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO' 'MODULO'
%left 'INC','DEC'
%right UCAST
%left UMENOS



//analizador sintactico
%start init

%% /* Definición de la gramática */

init
    : completo EOF     { return $1; }         
    ;

completo
    : completo global    { $1.push($2); $$=$1 }            
    | global             { $$ = [$1] }           
    ;

global
    : imprimir PTCOMA                   {$$=$1}
    | asignacion PTCOMA
    | declaracion PTCOMA
    | funcion 
    | error 'PTCOMA' { consola.actualizar(`Se esperaba ${yytext}, l: ${this._$.first_line}, c: ${this._$.first_column}`); 
                        errores.agregar(new Error('Sintactico',`Se esperaba ${yytext}`, this._$.first_line , this._$.first_column,'')); }
    | error 'LLAVEDER' { consola.actualizar(`Se esperaba ${yytext}, l: ${this._$.first_line}, c: ${this._$.first_column}`); 
                        errores.agregar(new Error('Sintactico',`Se esperaba ${yytext}`, this._$.first_line , this._$.first_column,'')); }
;

cuerpoLocal
    : cuerpoLocal local { $1.push($2); $$=$1; }
    | local             { $$ =[$1]; }
    ;

local
    : condicionales 
    | ciclos 
    | llamadaMetodo PTCOMA
    | asignacion PTCOMA
    | declaracion PTCOMA
    | control PTCOMA
    | imprimir PTCOMA
    ;

funcion
    : VOID ID PARIZQ parametros PARDER LLAVEIZQ cuerpoLocal LLAVEDER { $$ = new Funcion(Tipos.VOID, $2,$4,$7, @1.first_line, @1.first_column); }
    | tipo ID PARIZQ parametros PARDER LLAVEIZQ cuerpoLocal LLAVEDER { $$ = new Funcion($1, $2,$4,$7, @1.first_line, @1.first_column); }
    | VOID ID PARIZQ PARDER LLAVEIZQ cuerpoLocal LLAVEDER            { $$ = new Funcion(Tipos.VOID, $2,[],$6, @1.first_line, @1.first_column); }
    | tipo ID PARIZQ PARDER LLAVEIZQ cuerpoLocal LLAVEDER            { $$ = new Funcion($1, $2,[],$6, @1.first_line, @1.first_column); }
    ;

llamadaMetodo
    : ID PARIZQ atributos PARDER    { $$ = new LlamadaMetodo($1,$3, @1.first_line, @1.first_column); }
    | ID PARIZQ PARDER              { $$ = new LlamadaMetodo($1,[], @1.first_line, @1.first_column); }
    ;

llamadaFuncion
    : ID PARIZQ atributos PARDER    { $$ = new LlamarFuncion($1,$3, @1.first_line, @1.first_column); }
    | ID PARIZQ PARDER              { $$ = new LlamarFuncion($1,[], @1.first_line, @1.first_column); }
    ;

parametros 
    : parametros COMA tipo ID        { $1.push( new Parametros($3,null,$4)); $$=$1; } //agregar parametros de arreglos parametros COMA tipo ID LLAVEIZQ LLAVEDER
    | tipo ID                        { $$ = [new Parametros($1,null,$2)]; } //agregar parametro de arreglo tipo ID LLAVEIZQ LLAVEDER
    ;

atributos
    : atributos COMA expresion      { $1.push($3); $$= $1; }
    | expresion                     { $$ = [$1]; }
    ;

imprimir
    : PRINT PARIZQ atributos PARDER      {$$ = new Print($3,@1.first_line, @1.first_column); }
    | PRINT PARIZQ  PARDER               {$$ = new Print([],@1.first_line, @1.first_column); }
    | PRINTLN PARIZQ atributos PARDER    {$$ = new Print($3,@1.first_line, @1.first_column,true);; }
    | PRINTLN PARIZQ  PARDER             {$$ = new Print([],@1.first_line, @1.first_column,true);; }
    ;

declaracion
    : tipo listaId IGUAL expresion       { $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column) ; }
    | tipo listaId                       { $$ = new Declaracion($1, $2, null, @1.first_line, @1.first_column) ; }
    ;

listaId
    : listaId COMA ID                   { $1.push($3); $$ = $1; }
    | ID                                { $$ = [$1]; }
    ; 

asignacion
    : ID IGUAL expresion                { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); }
    | ID INC                            { $$ = new AsignacionDecInc($1, TipoAsignacion.INCREMENTO, @1.first_line, @1.first_column); }
    | ID DEC                            { $$ = new AsignacionDecInc($1, TipoAsignacion.DECREMENTO, @1.first_line, @1.first_column); }
    ;

//vector

tipoValor
    : DECIMAL                           { $$ = new setearValor(Tipos.DOUBLE, Number($1), @1.first_line, @1.first_column); }
    | ENTERO                            { $$ = new setearValor(Tipos.INT, Number($1), @1.first_line, @1.first_column); }
    | CADENA                            { $$ = new setearValor(Tipos.STRING, $1 , @1.first_line, @1.first_column); }
    | CARACTER                          { $$ = new setearValor(Tipos.CHAR, $1, @1.first_line, @1.first_column); }
    | TRUE                              { $$ = new setearValor(Tipos.BOOLEAN, true, @1.first_line, @1.first_column); }
    | FALSE                             { $$ = new setearValor(Tipos.BOOLEAN, false, @1.first_line, @1.first_column); }
    ;

tipo
    : BOOLEAN                           { $$ = Tipos.BOOLEAN; }
    | CHAR                              { $$ = Tipos.CHAR; }
    | DOUBLE                            { $$ = Tipos.DOUBLE; }
    | INT                               { $$ = Tipos.INT; }
    | STRING                            { $$ = Tipos.STRING; }
    ;

expresion
    : expresion EXTE expresion           { $$ = new Aritmetica(TipoOperacion.EXTE, $1, $3, @1.first_line, @1.first_column); }
    | expresion CONCATENACION expresion  { $$ = new Aritmetica(TipoOperacion.CONCATENACION, $1, $3, @1.first_line, @1.first_column); }
	| expresion MAS expresion            { $$ = new Aritmetica(TipoOperacion.SUMA, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENOS expresion          { $$ = new Aritmetica(TipoOperacion.RESTA, $1, $3, @1.first_line, @1.first_column); }
	| expresion POR expresion            { $$ = new Aritmetica(TipoOperacion.MULTIPLICACION, $1, $3, @1.first_line, @1.first_column); }
	| expresion DIVIDIDO expresion       { $$ = new Aritmetica(TipoOperacion.DIVISION, $1, $3, @1.first_line, @1.first_column); }
    | expresion MODULO expresion         { $$ = new Aritmetica(TipoOperacion.MODULO, $1, $3, @1.first_line, @1.first_column); }
    | expresion AND expresion            { $$ = new Logico(TipoLogico.AND, $1, $3, @1.first_line, @1.first_column); }
	| expresion OR expresion             { $$ = new Logico(TipoLogico.OR, $1, $3, @1.first_line, @1.first_column); }
    | NOT expresion                      { $$ = new Logico(TipoLogico.NOT, $1, @1.first_line, @1.first_column); }
    | expresion IGUALDAD expresion       { $$ = new Relacional(TiposRelacional.IGUAL, $1, $3, @1.first_line, @1.first_column); }
	| expresion DIFERENTE expresion      { $$ = new Relacional(TiposRelacional.DIFERENTE, $1, $3, @1.first_line, @1.first_column); }
    | expresion MAYORIGUAL expresion     { $$ = new Relacional(TiposRelacional.MAYORI, $1, $3, @1.first_line, @1.first_column); }
    | expresion MENORIGUAL expresion     { $$ = new Relacional(TiposRelacional.MENORI, $1, $3, @1.first_line, @1.first_column); }
	| expresion MAYOR expresion          { $$ = new Relacional(TiposRelacional.MAYOR, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENOR expresion          { $$ = new Relacional(TiposRelacional.MENOR, $1, $3, @1.first_line, @1.first_column); }
    | MENOS expresion %prec UMENOS       { $$ = new Unario(TUnario.NEGATIVO, $2, @1.first_line, @1.first_column); }
    | expresion INC                      { $$ = new Unario(TUnario.INCREMENTO, $1, @1.first_line, @1.first_column); }
    | expresion DEC                      { $$ = new Unario(TUnario.DECREMENTO, $1, @1.first_line, @1.first_column); }
    | BEGIN                              { $$ = new Begin(); }
    | END                                { $$ = new End(); }
    | NULL                               { $$ = Tipos.NULL; }
    | ternario                           { $$=$1; }
    | nativas                            { $$=$1; }
    | tipoValor                          { $$=$1; }
    | llamadaFuncion                     { $$=$1; }
    | PARIZQ expresion PARDER            { $$ = $2; }
    ;

ternario
    : expresion PREGUNTA expresion DOSPTS expresion { $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column); }
    ;

nativas
    : POW PARIZQ expresion COMA expresion PARDER                        { $$= new Pow($3,$5,@1.first_line, @1.first_column); }
    | SQRT PARIZQ expresion PARDER                                      { $$ = new Sqrt($3,@1.first_line, @1.first_column); }
    | SIN PARIZQ expresion PARDER                                       { $$ = new Sin($3,@1.first_line, @1.first_column); }
    | COS PARIZQ expresion PARDER                                       { $$ = new Cos($3,@1.first_line, @1.first_column); }
    | TAN PARIZQ expresion PARDER                                       { $$ = new Tan($3,@1.first_line, @1.first_column); }
    | expresion PUNTO COPOSITION PARIZQ expresion PARDER                { $$ = new CaracterOfPosition($1,$5,@1.first_line, @1.first_column); }
    | expresion PUNTO SUBSTRING PARIZQ expresion COMA expresion PARDER  { $$ = new Substring($1,$5,$7,@1.first_line, @1.first_column); }
    | expresion PUNTO LENGTH PARIZQ PARDER                              { $$ = new Length($1,@1.first_line, @1.first_column); }
    | expresion PUNTO UPPERCASE PARIZQ PARDER                           { $$ = new toUpperCase($1,@1.first_line, @1.first_column); }
    | expresion PUNTO LOWERCASE PARIZQ PARDER                           { $$ = new toLowerCase($1,@1.first_line, @1.first_column); }
    | tipo PUNTO PARSE PARIZQ expresion PARDER                          { $$ = new Parse($1,$5,@1.first_line, @1.first_column); }
    | TOINT PARIZQ expresion PARDER                                     { $$ = new toInt($3,@1.first_line, @1.first_column); }
    | TODOUBLE PARIZQ expresion PARDER                                  { $$ = new toDouble($3,@1.first_line, @1.first_column); }
    | RSTRING PARIZQ expresion PARDER                                   { $$ = new StringM($3,@1.first_line, @1.first_column); }
    | TYPEOF PARIZQ expresion PARDER                                    { $$ = new Typeof($3,@1.first_line, @1.first_column); }
    | ID PUNTO PUSH PARIZQ expresion PARDER //
    | ID PUNTO POP PARIZQ PARDER //
    ;