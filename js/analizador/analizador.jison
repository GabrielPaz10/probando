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

"=="        return '=='; //igualdad
"!="        return '!='; //diferente
">"         return '>'; //mayor
"<"         return '<'; //menor
">="        return '>='; //mayor igual
"<="        return '<='; //menor igual



//Operadores Aritméticos
"++"            return '++';        //Incremento
"--"            return '--';        //Decremento
"+"             return '+';         //Suma
"-"             return '-';         //Resta
"*"             return '*';         //Multipliación
"/"             return '/';         //División
"%"             return '%';         //Módulo

//valores primitivos e identificador
\"((\\\")|[^\"\n])*\"                           { yytext = yytext.substr(1, yyleng-2); return 'CADENA'; }  //Cadena **
\'((\\\\)|(\\n)|(\\t)|(\\\")|(\\\')|[^\'\n])\'  { yytext = yytext.substr(1, yyleng-2); return 'CARACTER'; } //Caracteres **
[0-9]+"."[0-9]+\b               return 'DOUBLE';  //Decimal
[0-9]+\b                        return 'INT';   //Entero
"true"                          return 'TRUE';     //Verdadero
"false"                         return 'FALSE';    //Falso
"null"                          return 'NULL'
([a-zA-Z])[a-zA-Z0-9_]*         return 'ID';       //Identificadores

<<EOF>>                         return 'EOF';

.   {}//{ output.setOutput(`-->Léxico, caracter: ${yytext} no pertenece al lenguaje (${yylloc.first_line}:${yylloc.first_column}).`);       errors.add(new Error("Léxico", `Caracter: ${yytext} no pertenece al lenguaje.`, yylloc.first_line, yylloc.first_column)); }

/lex


//  Precedencias
//%left '?' ':'
//%left '||'
//%left '&&'
//%right '!'
%left '==' '!=' '>=' '<=' '>' '<'
%left '+' '-'
%left '*' '/' '%'
//%left '++' '--'
%right UCAST
%left UMINUS



//analizador sintactico
%start init

init
    : completo EOF                {return $1;}
    ;

completo
    : completo global               {$1.push($2);$$=$1}
    | global                        {$$=[$1];}
    ;

global
    expresion