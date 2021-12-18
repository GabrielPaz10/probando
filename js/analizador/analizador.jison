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
    const { String } = require('../ts/expresiones/funcionesNativas/String.js')
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
"main"          return 'MAIN'


//valores primitivos e identificador
\"((\\\")|[^\"\n])*\"                           { yytext = yytext.substr(1, yyleng-2); return 'CADENA'; }  //Cadena **
\'((\\\\)|(\\n)|(\\t)|(\\\")|(\\\')|[^\'\n])\'  { yytext = yytext.substr(1, yyleng-2); return 'CARACTER'; } //Caracteres **
[0-9]+("."[0-9]+)?\b            return 'DECIMAL';  //Decimal
[0-9]+\b                        return 'ENTERO';   //Entero
"true"                          return 'TRUE';     //Verdadero
"false"                         return 'FALSE';    //Falso
([a-zA-Z])[a-zA-Z0-9_]*         return 'ID';       //Identificadores

<<EOF>>                         return 'EOF';

.   { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }//{ output.setOutput(`-->Léxico, caracter: ${yytext} no pertenece al lenguaje (${yylloc.first_line}:${yylloc.first_column}).`);       errors.add(new Error("Léxico", `Caracter: ${yytext} no pertenece al lenguaje.`, yylloc.first_line, yylloc.first_column)); }

/lex


//  Precedencias
//%left '?' ':'
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
    : completo EOF              
    ;

completo
    : completo global               
    | global                        
    ;

global
    : imprimir
;

expresion
    : CADENA                             { $$ = $1; }
    | expresion EXTE expresion           { $$ = $1 * $2; }
    | expresion IGUALDAD expresion       { $$ = ($1 == $3)? true : false; }
	| expresion DIFERENTE expresion      { $$ = ($1 != $3)? true : false; }
	| expresion MAYOR expresion          { $$ = ($1 > $3)? true : false; }
	| expresion MENOR expresion          { $$ = ($1 < $3)? true : false; }
    | expresion MAYORIGUAL expresion     { $$ = ($1 >= $3)? true : false; }
    | expresion MENORIGUAL expresion     { $$ = ($1 <= $3)? true : false; }
    | PARIZQ expresion PARDER            { $$ = $2; }
    | MENOS expresion %prec UMENOS       { $$ = $2 *-1; }
    | expresion CONCATENACION expresion  { $$ = ($1 + $3); }
	| expresion MAS expresion            { $$ = $1 + $3; }
	| expresion MENOS expresion          { $$ = $1 - $3; }
	| expresion POR expresion            { $$ = $1 * $3; }
	| expresion DIVIDIDO expresion       { $$ = $1 / $3; }
    | expresion MODULO expresion         { $$ = $1 % $3; }
    | expresion AND expresion            { $$ = ($1 && $3)?true:false; }
	| expresion OR expresion             { $$ = ($1 || $3)?true:false; }
    | NOT expresion                      { $$ = ($1)?false:true ; }
    | ENTERO                             { $$ = Number($1);}
    | DECIMAL                            { $$ = Number($1);}
    | TRUE                               { $$ = true; }
    | FALSE                              { $$ = false; }
    ;


imprimir
    : PRINT PARIZQ expresion PARDER PTCOMA  {contenido = contenido+ $3; }
    | PRINTLN PARIZQ expresion PARDER PTCOMA {contenido = contenido+ $3 + "\n"; }
    ;