//importaciones
%{
    //salida y errores
    const {errores,consola} =require('../ts/index.js')
    var {gramatical}=require('../ts/index.js')
    const {Error} = require('../ts/Reportes/Error.js')
    //tipos de datos
    const {Tipos}= require('../ts/tiposD/Tipos.js')
    //declaracion
    const {Declaracion}= require('../ts/instrucciones/declaracion/declaracion.js')
    const {Arreglo} = require('../ts/instrucciones/declaracion/Arreglo.js')
    //asignacion 
    const {AsignacionDecInc,TipoAsignacion} = require('../ts/instrucciones/asignacion/asignacionDecInc.js')
    const {Asignacion} = require('../ts/instrucciones/asignacion/asignacion.js')
    const {AsignacionArreglo} = require('../ts/instrucciones/asignacion/AsignacionArreglo.js')
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
    const { ForIn } = require('../ts/instrucciones/ciclos/forin.js')
    const { While } = require('../ts/instrucciones/ciclos/while.js')
    //valores 
    const { ObtenerValor } = require('../ts/expresiones/valores/obtenerValor.js')
    const { SetearValor } = require('../ts/expresiones/valores/setearValor.js')
    const {ObtenerVector} = require('../ts/expresiones/valores/obtenerVector.js')
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
    const { ToInt } = require('../ts/expresiones/funcionesNativas/toint.js')
    const { ToLowerCase } = require('../ts/expresiones/funcionesNativas/toLower.js')
    const { ToUpperCase } = require('../ts/expresiones/funcionesNativas/toUpper.js')
    const { Typeof } = require('../ts/expresiones/funcionesNativas/typeof.js')
    const { Pop } = require('../ts/expresiones/funcionesNativas/Pop.js')
    const { Push } = require('../ts/expresiones/funcionesNativas/Push.js')
    
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
".caracterOfPosition"    return 'COPOSITION';
".subString"     return 'SUBSTRING';
"begin"         return 'BEGIN';
"end"           return 'END';
".length"        return 'LENGTH';
".toLowercase"   return 'LOWERCASE';
".toUppercase"   return 'UPPERCASE';
".parse"         return 'PARSE';
"toInt"         return 'TOINT';
"toDouble"      return 'TODOUBLE';
"string"        return 'RSTRING';
"typeof"        return 'TYPEOF';
".pop"           return 'POP';
".push"          return 'PUSH';



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
"if"            return 'IF';
"else"          return 'ELSE';
"switch"        return 'SWITCH';
"case"          return 'CASE';
"default"       return 'DEFAULT';
"while"         return 'WHILE';
"do"            return 'DO';
"for"           return 'FOR';
"in"            return 'IN';
"break"         return 'BREAK';
"continue"      return 'CONTINUE';
"return"        return 'RETURN';

//"main"          return 'MAIN';


//valores primitivos e identificador
\"((\\\")|[^\"\n])*\"                           { yytext = yytext.substr(1, yyleng-2); return 'CADENA'; }  //Cadena **
\'((\\\\)|(\\n)|(\\t)|(\\\")|(\\\')|[^\'\n])\'  { yytext = yytext.substr(1, yyleng-2); return 'CARACTER'; } //Caracteres **
[0-9]+("."[0-9]+)?\b            return 'DECIMAL';  //Decimal
[0-9]+\b                        return 'ENTERO';   //Entero
"true"                          return 'TRUE';     //Verdadero
"false"                         return 'FALSE';    //Falso
([a-zA-Z])[a-zA-Z0-9_]*         return 'ID';       //Identificadores
"."         return 'PUNTO';

<<EOF>>                         return 'EOF';

.   { consola.actualizar(`${yytext} caracter no conocido, l: ${yylloc.first_line}, c: ${yylloc.first_column}\n`); 
    errores.agregar(new Error('Lexico',`Error lexico, ${yytext} caracter no conocido`, yylloc.first_line , yylloc.first_column,'')); }

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
    : completo EOF     { gramatical+= "init := completo EOF"; return $1;  }         
    ;

completo
    : completo global    { $1.push($2); $$=$1; gramatical+="completo := completo global"; }            
    | global             { $$ = [$1]; gramatical+= "completo := global";}           
    ;

global
    : asignacion PTCOMA         { $$=$1;gramatical+= "global := asginacion ;"; }
    | declaracion PTCOMA        { $$=$1;gramatical+= "global := declaracion ;"; }
    | creacionstruct PTCOMA     {}
    | funcion                   { $$=$1;gramatical+= "global := funcion"; }
    | vector PTCOMA             { $$=$1; }
    | expresion PTCOMA              {$$=$1;}
    | error PTCOMA            { consola.actualizar(`Se esperaba ${yytext}, l: ${this._$.first_line}, c: ${this._$.first_column}\n`); 
                                errores.agregar(new Error('Sintactico',`Se esperaba ${yytext}`, this._$.first_line , this._$.first_column,'')); }
    | error LLAVEDER          { consola.actualizar(`Se esperaba ${yytext}, l: ${this._$.first_line}, c: ${this._$.first_column}\n`); 
                                errores.agregar(new Error('Sintactico',`Se esperaba ${yytext}`, this._$.first_line , this._$.first_column,'')); }
;

creacionstruct
    : STRUCT ID LLAVEIZQ parametros LLAVEDER
    ;

cuerpoLocal
    : cuerpoLocal local { $1.push($2); $$=$1; }
    | local             { $$ =[$1]; }
    ;

local
    : condicionales                 { $$=$1; }
    | vector PTCOMA                 { $$=$1; }
    | ciclos                        { $$=$1; }
    //| llamadaFuncion PTCOMA         { $$=$1; }
    | asignacion PTCOMA             { $$=$1; }
    | declaracion PTCOMA            { $$=$1; }
    | control PTCOMA                { $$=$1; }
    | imprimir PTCOMA               { $$=$1; }
    | expresion PTCOMA              { $$=$1; }
    ;

vector 
    : declaracionVector                                             { $$=$1; }
    | asignacionVector                                              { $$=$1; }
    ;

structs
    : decStruct                     {} 
    | asigStruct                    {}
    ;

decStruct
    :ID ID IGUAL ID PARIZQ atributos PARDER         {}
    ;

asigStruct
    : ID PUNTO ID
    ;

declaracionVector
    : tipo  CORIZQ CORDER ID IGUAL CORIZQ atributos CORDER           { $$= new Arreglo($4,$1,null,$7,@1.first_line, @1.first_column) ; }
    | tipo  CORIZQ CORDER ID                                         { $$= new Arreglo($4,$1,null,null,@1.first_line, @1.first_column) ;}
    ;

asignacionVector
    : ID CORIZQ expresion CORDER IGUAL expresion                    { $$ = new AsignacionArreglo($1,$3,$6,@1.first_line, @1.first_column); }
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
    : parametros COMA tipo ID               { $1.push( new Parametros($3,null,$4)); $$=$1; } //agregar parametros de arreglos parametros COMA tipo ID LLAVEIZQ LLAVEDER
    | parametros COMA tipo ID CORIZQ CORDER { $1.push( new Parametros(Tipos.ARRAY,$3,$4)); $$=$1; }
    | tipo ID                               { $$ = [new Parametros($1,null,$2)]; } //agregar parametro de arreglo tipo ID LLAVEIZQ LLAVEDER
    | tipo ID CORIZQ CORDER                 { $$ = [new Parametros(Tipos.ARRAY,$1,$2)]; }
    ;

atributos
    : atributos COMA expresion      { $1.push($3); $$= $1; }
    | expresion                     { $$ = [$1]; }
    ;

imprimir
    : PRINT PARIZQ atributos PARDER      {$$ = new Print($3,@1.first_line, @1.first_column); }
    | PRINT PARIZQ  PARDER               {$$ = new Print([],@1.first_line, @1.first_column); }
    | PRINTLN PARIZQ atributos PARDER    {$$ = new Print($3,@1.first_line, @1.first_column,true); }
    | PRINTLN PARIZQ  PARDER             {$$ = new Print([],@1.first_line, @1.first_column,true); }
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
    | ID IGUAL CORIZQ CORDER            { $$ = new Asignacion($1, [], @1.first_line, @1.first_column); }
    
    ;

//vector

tipoValor
    : DECIMAL                           { $$ = (Number.isInteger(Number($1)))?new SetearValor(Tipos.INT, Number($1), @1.first_line, @1.first_column):new SetearValor(Tipos.DOUBLE, Number($1), @1.first_line, @1.first_column); }
    | ENTERO                            { $$ = new SetearValor(Tipos.INT, Number($1), @1.first_line, @1.first_column); }
    | CADENA                            { $$ = new SetearValor(Tipos.STRING, $1 , @1.first_line, @1.first_column); }
    | CARACTER                          { $$ = new SetearValor(Tipos.CHAR, $1, @1.first_line, @1.first_column); }
    | TRUE                              { $$ = new SetearValor(Tipos.BOOLEAN, true, @1.first_line, @1.first_column); }
    | FALSE                             { $$ = new SetearValor(Tipos.BOOLEAN, false, @1.first_line, @1.first_column); }
    | ID                                { $$= new ObtenerValor($1,@1.first_line, @1.first_column);}
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
    | NOT expresion                      { $$ = new Logico(TipoLogico.NOT, $2, null,@1.first_line, @1.first_column); }
    | expresion IGUALDAD expresion       { $$ = new Relacional(TiposRelacional.IGUAL, $1, $3, @1.first_line, @1.first_column); }
	| expresion DIFERENTE expresion      { $$ = new Relacional(TiposRelacional.DIFERENTE, $1, $3, @1.first_line, @1.first_column); }
    | expresion MAYORIGUAL expresion     { $$ = new Relacional(TiposRelacional.MAYORI, $1, $3, @1.first_line, @1.first_column); }
    | expresion MENORIGUAL expresion     { $$ = new Relacional(TiposRelacional.MENORI, $1, $3, @1.first_line, @1.first_column); }
	| expresion MAYOR expresion          { $$ = new Relacional(TiposRelacional.MAYOR, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENOR expresion          { $$ = new Relacional(TiposRelacional.MENOR, $1, $3, @1.first_line, @1.first_column); }
    | MENOS expresion %prec UMENOS       { $$ = new Unario(TUnario.NEGATIVO, $2, @1.first_line, @1.first_column); }
    | expresion INC                      { $$ = new Unario(TUnario.INCREMENTO, $1, @1.first_line, @1.first_column); }
    | expresion DEC                      { $$ = new Unario(TUnario.DECREMENTO, $1, @1.first_line, @1.first_column); }
    | BEGIN                              { $$ = new Begin(@1.first_line, @1.first_column); }
    | END                                { $$ = new End(@1.first_line, @1.first_column); }
    | NULL                               { $$ = Tipos.NULL; }
    | ternario                           { $$=$1; }
    | nativas                            { $$=$1; }
    | tipoValor                          { $$=$1; }
    | llamadaFuncion                     { $$=$1; }
    | estructuras                        { $$=$1; }
    
    | PARIZQ expresion PARDER            { $$ = $2; }
    ;

estructuras
    : ID CORIZQ expresion CORDER          { $$ = new ObtenerVector($1,$3,@1.first_line, @1.first_column); }
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
    | cop                                                               { $$=$1;}
    | expresion  SUBSTRING PARIZQ expresion COMA expresion PARDER  { $$ = new Substring($1,$4,$6,@1.first_line, @1.first_column); }
    | expresion  LENGTH PARIZQ PARDER                              { $$ = new Length($1,@1.first_line, @1.first_column); }
    | expresion  UPPERCASE PARIZQ PARDER                           { $$ = new ToUpperCase($1,@1.first_line, @1.first_column); }
    | expresion  LOWERCASE PARIZQ PARDER                           { $$ = new ToLowerCase($1,@1.first_line, @1.first_column); }
    | tipo  PARSE PARIZQ expresion PARDER                          { $$ = new Parse($1,$5,@1.first_line, @1.first_column); }
    | TOINT PARIZQ expresion PARDER                                     { $$ = new ToInt($3,@1.first_line, @1.first_column); }
    | TODOUBLE PARIZQ expresion PARDER                                  { $$ = new ToDouble($3,@1.first_line, @1.first_column); }
    | RSTRING PARIZQ expresion PARDER                                   { $$ = new StringM($3,@1.first_line, @1.first_column); }
    | TYPEOF PARIZQ expresion PARDER                                    { $$ = new Typeof($3,@1.first_line, @1.first_column); }
    | ID  PUSH PARIZQ expresion PARDER                             { $$= new Push($1,$4,@1.first_line, @1.first_column); }
    | ID  POP PARIZQ PARDER                                        { $$= new Pop($1,@1.first_line, @1.first_column); }
    ;

cop
    : expresion  COPOSITION PARIZQ expresion PARDER                { $$ = new CaracterOfPosition($1,$4,@1.first_line, @1.first_column); }
    ;
condicionales
    : ifcondicion               { $$ = $1; }
    | switchcondicion           { $$ = $1; }
    ;

ifcondicion
    : IF PARIZQ expresion PARDER LLAVEIZQ cuerpoLocal LLAVEDER elsecondicion    { $$= new If($3,$6,$8,@1.first_line, @1.first_column); }
    | IF PARIZQ expresion PARDER LLAVEIZQ cuerpoLocal LLAVEDER                  { $$= new If($3,$6,null,@1.first_line, @1.first_column); }
    | IF PARIZQ expresion PARDER LLAVEIZQ LLAVEDER elsecondicion                { $$= new If($3,[],$7,@1.first_line, @1.first_column); }
    | IF PARIZQ expresion PARDER LLAVEIZQ LLAVEDER                              { $$= new If($3,[],null,@1.first_line, @1.first_column); }
    ;

elsecondicion
    : ELSE ifcondicion                      { $$=$2; }
    | ELSE LLAVEIZQ cuerpoLocal LLAVEDER    { $$=$3; }
    | ELSE LLAVEIZQ LLAVEDER                { $$=[]; }
    ;

switchcondicion
    : SWITCH PARIZQ expresion PARDER LLAVEIZQ casecondicion defaultcondicion LLAVEDER   { $$=new Switch($3,$6,$7,@1.first_line, @1.first_column);}
    | SWITCH PARIZQ expresion PARDER LLAVEIZQ casecondicion LLAVEDER                    { $$=new Switch($3,$6,[],@1.first_line, @1.first_column);}
    | SWITCH PARIZQ expresion PARDER LLAVEIZQ defaultcondicion LLAVEDER                 { $$=new Switch($3,[],$6,@1.first_line, @1.first_column);}
    | SWITCH PARIZQ expresion PARDER LLAVEIZQ LLAVEDER                                  { $$=new Switch($3,[],[],@1.first_line, @1.first_column);}
    ;

casecondicion
    : casecondicion CASE expresion DOSPTS cuerpoLocal       { $1.push(new Case($3,$5,@1.first_line, @1.first_column)); $$=$1; }
    | casecondicion CASE expresion DOSPTS                   { $1.push(new Case($3,[],@1.first_line, @1.first_column)); $$=$1; }
    | CASE expresion DOSPTS cuerpoLocal                     { $$=[new Case($2,$4,@1.first_line, @1.first_column)]; }
    | CASE expresion DOSPTS                                 { $$=[new Case($2,[],@1.first_line, @1.first_column)]; }
    ;

defaultcondicion
    : DEFAULT DOSPTS cuerpoLocal                            { $$=$3; }
    | DEFAULT DOSPTS                                        { $$=[]; }
    ;

ciclos
    : ciclowhile                {$$=$1;}
    | ciclofor                  {$$=$1;}
    ;

ciclowhile
    : DO LLAVEIZQ cuerpoLocal LLAVEDER WHILE PARIZQ expresion PARDER PTCOMA     { $$= new Dowhile($7,$3,@1.first_line, @1.first_column);}
    | WHILE PARIZQ expresion PARDER LLAVEIZQ cuerpoLocal LLAVEDER               { $$= new While($3,$6,@1.first_line, @1.first_column);}
    | DO LLAVEIZQ LLAVEDER WHILE PARIZQ expresion PARDER PTCOMA                 { $$= new Dowhile($6,[],@1.first_line, @1.first_column);}
    | WHILE PARIZQ expresion PARDER LLAVEIZQ  LLAVEDER                          { $$= new While($3,[],@1.first_line, @1.first_column);}
    ;

ciclofor
    : FOR PARIZQ asignacionfor PTCOMA expresion PTCOMA asignacion PARDER LLAVEIZQ cuerpoLocal LLAVEDER  { $$= new For($3,$5,$7,$10,@1.first_line, @1.first_column); }
    | FOR PARIZQ declaracionfor PTCOMA expresion PTCOMA asignacion PARDER LLAVEIZQ cuerpoLocal LLAVEDER { $$= new For($3,$5,$7,$10,@1.first_line, @1.first_column); }
    | FOR ID IN CORIZQ atributos CORDER LLAVEIZQ cuerpoLocal LLAVEDER                                   { $$= new ForIn($2,$5,new Arreglo('iterador',Tipos.ARRAY,null,$8,@1.first_line, @1.first_column),@1.first_line, @1.first_column); }
    | FOR ID IN expresion LLAVEIZQ cuerpoLocal LLAVEDER                                                 { $$= new ForIn($2,$4,$6,@1.first_line, @1.first_column); }
    ;       

asignacionfor
    : ID IGUAL expresion                 {$$ = new Asignacion($1,$3,@1.first_line, @1.first_column);}
    ;

declaracionfor
    : tipo ID IGUAL expresion            {$$ = new Declaracion($1,$2,$4,@1.first_line, @1.first_column);}
    ;

control
    : RETURN expresion                  {$$= new Return($2,@1.first_line, @1.first_column);}
    | RETURN                            {$$= new Return(null,@1.first_line, @1.first_column);}
    | CONTINUE                          {$$= new Continue(@1.first_line, @1.first_column);}
    | BREAK                             {$$= new Break(@1.first_line, @1.first_column);}
    ;