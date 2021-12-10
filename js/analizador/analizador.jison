// analizador lexico

%lex
%options case-insensitive

%%

\s+                                 {}  //Se ingnoran espacio
[ \r\t]+                            {}
\n                                  {}
"//".*                              {}  //Comentario de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {}  //Comentario multilinea

//operadores relacionales
"=="        return 'IGUALDAD'; //igualdad
"!="        return 'DIFERENTE'; //diferente
">"         return 'MAYOR'; //mayor
"<"         return 'MENOR'; //menor
">="        return 'MAYORIGUAL'; //mayor igual
"<="        return 'MENORIGUAL'; //menor igual

//signos raros
";"         return 'PTCOMA';
"("         return 'PARIZQ';
")"         return 'PARDER';
"["         return 'CORIZQ';
"]"         return 'CORDER';
","         return 'COMA';
"="         return 'IGUAL';
"?"         return 'PREGUNTA';
":"         return 'DOSPTS';

//signos lógicos
"&&"        return 'AND';
"||"        return 'OR';
"!"         return 'NOT';

//Operadores Aritméticos
"++"            return '++';        //Incremento
"--"            return '--';        //Decremento
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
//%left '||'
//%left '&&'
//%right '!'
%left 'IGUALDAD' 'DIFERENTE' 'MAYORIGUAL' 'MENORIGUAL' 'MAYOR' 'MENOR'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO' 'MODULO'
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
    : CADENA    { $$ = $1; }
    | expresion IGUALDAD expresion       { $$ = ($1 == $3)? true : false; }
	| expresion DIFERENTE expresion      { $$ = ($1 != $3)? true : false; }
	| expresion MAYOR expresion          { $$ = ($1 > $3)? true : false; }
	| expresion MENOR expresion          { $$ = ($1 < $3)? true : false; }
    | expresion MAYORIGUAL expresion     { $$ = ($1 >= $3)? true : false; }
    | expresion MENORIGUAL expresion     { $$ = ($1 <= $3)? true : false; }
    | PARIZQ expresion PARDER            { $$ = $2; }
    | MENOS expresion %prec UMENOS       { $$ = $2 *-1; }
	| expresion MAS expresion            { $$ = $1 + $3; }
	| expresion MENOS expresion          { $$ = $1 - $3; }
	| expresion POR expresion            { $$ = $1 * $3; }
	| expresion DIVIDIDO expresion       { $$ = $1 / $3; }
    | ENTERO                             { $$ = Number($1);}
    | DECIMAL                            { $$ = Number($1);}
    | TRUE                               { $$ = true; }
    | FALSE                              { $$ = false; }
    ;

aritmetica
    : 
    ;

relacionales
    : 
    | aritmetica                               { $$ = $1; }
    ;

imprimir
    : PRINT PARIZQ expresion PARDER PTCOMA  {contenido = contenido+ $3; }
    | PRINTLN PARIZQ expresion PARDER PTCOMA {contenido = contenido+ $3 + "\n"; }
    ;