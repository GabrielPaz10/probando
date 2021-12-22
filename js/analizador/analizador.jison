//importaciones
%{
    //salida y errores
    const {errores,consola,gramatical,instruccionesR} =require('../ts/index.js')
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
    : completo EOF     { gramatical.unshift("init := completo EOF");
                        instruccionesR.unshift("{ init.val = completo.val }");
                        return $1;  }         
    ;

completo
    : completo global    { $1.push($2); $$=$1; 
                            gramatical.unshift("completo := completo global"); 
                            instruccionesR.unshift('{ completo.val.agregar(global) }');
                            }
    | global             { $$ = [$1]; 
                            gramatical.unshift("completo := global");
                            instruccionesR.unshift(" { completo.val = [global] } ");
                            }
    ;

global
    : asignacion PTCOMA         { $$=$1;
                                    gramatical.unshift("global := asginacion ;"); 
                                    instruccionesR.unshift("{ global.val = asignacion.val }");
                                    }
    | declaracion PTCOMA        { $$=$1; 
                                    gramatical.unshift("global := declaracion ;"); 
                                    instruccionesR.unshift("{ global.val = declaracion.val }");
                                    }
    | creacionstruct PTCOMA     {}
    | funcion                   { $$=$1;
                                    gramatical.unshift("global := funcion"); 
                                    instruccionesR.unshift("{ global.val = funcion.val }");
                                    }
    | vector PTCOMA             { $$=$1;
                                    gramatical.unshift("global := vector PTCOMA"); 
                                    instruccionesR.unshift("{ global.val = vector.val }");
                                    }
    | expresion PTCOMA              {$$=$1;
                                        gramatical.unshift("global := expresion PTCOMA"); 
                                        instruccionesR.unshift("{ global.val = expresion.val }");
                                    }
    | error PTCOMA            { consola.actualizar(`Se esperaba ${yytext}, l: ${this._$.first_line}, c: ${this._$.first_column}\n`); 
                                errores.agregar(new Error('Sintactico',`Se esperaba ${yytext}`, this._$.first_line , this._$.first_column,'')); }
    | error LLAVEDER          { consola.actualizar(`Se esperaba ${yytext}, l: ${this._$.first_line}, c: ${this._$.first_column}\n`); 
                                errores.agregar(new Error('Sintactico',`Se esperaba ${yytext}`, this._$.first_line , this._$.first_column,'')); }
;

creacionstruct
    : STRUCT ID LLAVEIZQ parametros LLAVEDER
    ;

cuerpoLocal
    : cuerpoLocal local { $1.push($2); 
                            $$=$1; 
                            gramatical.unshift("cuerpoLocal := cuerpoLocal local"); 
                            instruccionesR.unshift("{ cuerpoLocal.val.push(local.val); cuerpoLocal.val= cuerpoLocal.val; }");
                        }
    | local             { $$ =[$1];
                            gramatical.unshift("cuerpoLocal := local"); 
                            instruccionesR.unshift("{ cuerpoLocal.val = local.val }");
                        }
    ;

local
    : condicionales                 { $$=$1; 
                                        gramatical.unshift("local := condicionales"); 
                                        instruccionesR.unshift("{ local.val = condicionales.val }");
                                    }
    | vector PTCOMA                 { $$=$1; 
                                        gramatical.unshift("local := vector PTCOMA"); 
                                        instruccionesR.unshift("{ local.val = vector.val }");
                                    }
    | ciclos                        { $$=$1; 
                                        gramatical.unshift("local := ciclos"); 
                                        instruccionesR.unshift("{ local.val = ciclos.val }");
                                    }
    //| llamadaFuncion PTCOMA         { $$=$1; }
    | asignacion PTCOMA             { $$=$1; 
                                        gramatical.unshift("local := asignacion PTCOMA"); 
                                        instruccionesR.unshift("{ local.val = asignacion.val }");
                                    }
    | declaracion PTCOMA            { $$=$1; 
                                        gramatical.unshift("local := declaracion PTCOMA"); 
                                        instruccionesR.unshift("{ local.val = declaracion.val }");
                                    }
    | control PTCOMA                { $$=$1; 
                                        gramatical.unshift("local := control PTCOMA"); 
                                        instruccionesR.unshift("{ local.val = control.val }");
                                    }
    | imprimir PTCOMA               { $$=$1; 
                                        gramatical.unshift("local := imprimir PTCOMA"); 
                                        instruccionesR.unshift("{ local.val = imprimir.val }");
                                    }
    | expresion PTCOMA              { $$=$1; 
                                        gramatical.unshift("local := expresion PTCOMA"); 
                                        instruccionesR.unshift("{ local.val = expresion.val }");
                                    }
    ;

vector 
    : declaracionVector                                             { $$=$1; 
                                                                        gramatical.unshift("vector := declaracionVector"); 
                                                                        instruccionesR.unshift("{ vector.val = declaracionVector.val }");
                                                                    }
    | asignacionVector                                              { $$=$1; 
                                                                        gramatical.unshift("vector := asignacionVector"); 
                                                                        instruccionesR.unshift("{ vector.val = asignacionVector.val }");
                                                                    }
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
    : tipo  CORIZQ CORDER ID IGUAL CORIZQ atributos CORDER          { $$= new Arreglo($4,$1,null,$7,@1.first_line, @1.first_column) ; 
                                                                        gramatical.unshift("declaracionVector := tipo CORIZQ CORDER ID IGUAL CORIZQ atributos CORDER"); 
                                                                        instruccionesR.unshift("{ declaraionVector.val = new Arreglo(ID.lexval, tipo.val, null,atributos.val,fila,columna) }");
                                                                    }
    | tipo  CORIZQ CORDER ID                                        { $$= new Arreglo($4,$1,null,null,@1.first_line, @1.first_column) ;
                                                                        gramatical.unshift("declaracionVector := tipo CORIZQ CORDER ID"); 
                                                                        instruccionesR.unshift("{ declaraionVector.val = new Arreglo(ID.lexval, tipo.val, null,null,fila,columna) }");
                                                                    }
    ;

asignacionVector
    : ID CORIZQ expresion CORDER IGUAL expresion                    { $$ = new AsignacionArreglo($1,$3,$6,@1.first_line, @1.first_column); 
                                                                        gramatical.unshift("asignacionVector := tipo CORIZQ expresion CORDER ID IGUAL expresion"); 
                                                                        instruccionesR.unshift("{ asignacionVector.val = new AsignacionArreglo(tipo.val, expresion.val, expresion2.val,fila,columna) }");
                                                                    }
    ;

funcion
    : VOID ID PARIZQ parametros PARDER LLAVEIZQ cuerpoLocal LLAVEDER{ $$ = new Funcion(Tipos.VOID, $2,$4,$7, @1.first_line, @1.first_column); 
                                                                        gramatical.unshift("funcion := VOID ID PARIZQ parametros PARDER LLAVEIZQ cuerpolocal LLAVEDER"); 
                                                                        instruccionesR.unshift("{ funcion.val = new Funcion(VOID.lexval, ID.val, parametros.var,cuerpolocal.val,fila,columna) }");
                                                                    }
    | tipo ID PARIZQ parametros PARDER LLAVEIZQ cuerpoLocal LLAVEDER{ $$ = new Funcion($1, $2,$4,$7, @1.first_line, @1.first_column); 
                                                                        gramatical.unshift("funcion := tipo ID PARIZQ parametros PARDER LLAVEIZQ cuerpolocal LLAVEDER"); 
                                                                        instruccionesR.unshift("{ funcion.val = new Funcion(tipo.val, ID.val, parametros.var,cuerpolocal.val,fila,columna) }");
                                                                    }
    | VOID ID PARIZQ PARDER LLAVEIZQ cuerpoLocal LLAVEDER           { $$ = new Funcion(Tipos.VOID, $2,[],$6, @1.first_line, @1.first_column); 
                                                                        gramatical.unshift("funcion := VOID ID PARIZQ PARDER LLAVEIZQ cuerpolocal LLAVEDER"); 
                                                                        instruccionesR.unshift("{ funcion.val = new Funcion(VOID.lexval, ID.val, [],cuerpolocal.val,fila,columna) }");
                                                                    }
    | tipo ID PARIZQ PARDER LLAVEIZQ cuerpoLocal LLAVEDER           { $$ = new Funcion($1, $2,[],$6, @1.first_line, @1.first_column); 
                                                                        gramatical.unshift("funcion := tipo ID PARIZQ PARDER LLAVEIZQ cuerpolocal LLAVEDER"); 
                                                                        instruccionesR.unshift("{ funcion.val = new Funcion(tipo.val, ID.val, [],cuerpolocal.val,fila,columna) }");
                                                                    }
    ;

llamadaMetodo
    : ID PARIZQ atributos PARDER    { $$ = new LlamadaMetodo($1,$3, @1.first_line, @1.first_column); 
                                        gramatical.unshift("llamadaMetodo := ID PARIZQ atributos PARDER"); 
                                        instruccionesR.unshift("{ llamadaMetodo.val = new LlamadaMetodo(ID.val, atributos.val,fila,columna) }");
                                    }
    | ID PARIZQ PARDER              { $$ = new LlamadaMetodo($1,[], @1.first_line, @1.first_column); 
                                        gramatical.unshift("llamadaMetodo := ID PARIZQ PARDER"); 
                                        instruccionesR.unshift("{ llamadaMetodo.val = new LlamadaMetodo(ID.val, [],fila,columna) }");
                                    }
    ;

llamadaFuncion
    : ID PARIZQ atributos PARDER    { $$ = new LlamarFuncion($1,$3, @1.first_line, @1.first_column); 
                                        gramatical.unshift("llamadaFuncion := ID PARIZQ atributos PARDER"); 
                                        instruccionesR.unshift("{ llamadaFuncion.val = new LlamadaFuncion(ID.val, atributos.val,fila,columna) }");
                                    }
    | ID PARIZQ PARDER              { $$ = new LlamarFuncion($1,[], @1.first_line, @1.first_column); 
                                        gramatical.unshift("llamadaFuncion := ID PARIZQ PARDER"); 
                                        instruccionesR.unshift("{ llamadaFuncion.val = new LlamadaFuncion(ID.val, [],fila,columna) }");
                                    }
    ;

parametros 
    : parametros COMA tipo ID               { $1.push( new Parametros($3,null,$4)); 
                                                $$=$1; 
                                                gramatical.unshift("parametros := parametros COMA tipo ID"); 
                                                instruccionesR.unshift("{ parametros.val = new Parametros(tipo.val, null,ID.val) }");
                                            } 
    | parametros COMA tipo CORIZQ CORDER ID { $1.push( new Parametros(Tipos.ARRAY,$3,$6)); 
                                                $$=$1; 
                                                gramatical.unshift("parametros := parametros COMA tipo CORIZQ CORDER ID"); 
                                                instruccionesR.unshift("{ parametros.val = new Parametros(ARRAY.lexval, tipo.val,ID.val) }");
                                            }
    | tipo ID                               { $$ = [new Parametros($1,null,$2)]; 
                                                gramatical.unshift("parametros :=  tipo ID"); 
                                                instruccionesR.unshift("{ parametros.val = new Parametros(tipo.val, null,ID.val) }");
                                            } 
    | tipo ID CORIZQ CORDER                 { $$ = [new Parametros(Tipos.ARRAY,$1,$2)]; 
                                                gramatical.unshift("parametros := tipo CORIZQ CORDER ID"); 
                                                instruccionesR.unshift("{ parametros.val = new Parametros(ARRAY.lexval, tipo.val,ID.val) }");
                                            }
    ;

atributos
    : atributos COMA expresion      { $1.push($3); 
                                        $$= $1; 
                                        gramatical.unshift("atributos := atributos COMA expresion"); 
                                        instruccionesR.unshift("{ atributps.val.push(expresion.val) }");
                                    }
    | expresion                     { $$ = [$1]; 
                                        gramatical.unshift("atributos := expresion"); 
                                        instruccionesR.unshift("{ atributps.val= [expresion.val] }");
                                    }
    ;

imprimir
    : PRINT PARIZQ atributos PARDER     {$$ = new Print($3,@1.first_line, @1.first_column); 
                                            gramatical.unshift("imprimir := PRINT PARIZQ atributos PARDER"); 
                                            instruccionesR.unshift("{ imprimir.val = new Print(atributos.val, linea, columna) }");
                                        }
    | PRINT PARIZQ  PARDER               {$$ = new Print([],@1.first_line, @1.first_column); 
                                            gramatical.unshift("imprimir := PRINT PARIZQ PARDER"); 
                                            instruccionesR.unshift("{ imprimir.val = new Print([], linea, columna) }");
                                        }
    | PRINTLN PARIZQ atributos PARDER   {$$ = new Print($3,@1.first_line, @1.first_column,true); 
                                            gramatical.unshift("imprimir := PRINTLN PARIZQ atributos PARDER"); 
                                            instruccionesR.unshift("{ imprimir.val = new Print(atributos.val, linea, columna, true) }");
                                        }
    | PRINTLN PARIZQ  PARDER            {$$ = new Print([],@1.first_line, @1.first_column,true); 
                                            gramatical.unshift("imprimir := PRINTLN PARIZQ PARDER"); 
                                            instruccionesR.unshift("{ imprimir.val = new Print([], linea, columna,true) }");
                                        }
    ;

declaracion
    : tipo listaId IGUAL expresion       { $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column) ;
                                            gramatical.unshift("declaracion := tipo listaId IGUAL expresion ");
                                            instruccionesR.unshift("declaracion.val = new Declaracion(tipo.val,listaId.val,expresion.val,linea,columna)");
                                            }
    | tipo listaId                       { $$ = new Declaracion($1, $2, null, @1.first_line, @1.first_column) ;
                                            gramatical.unshift("declaracion := tipo listaId ");
                                            instruccionesR.unshift("declaracion.val = new Declaracion(tipo.val,listaId.val,null,linea,columna)");
                                        }
    ;

listaId
    : listaId COMA ID                   { $1.push($3); 
                                            $$ = $1; 
                                            gramatical.unshift("listaId := listaId COMA ID");
                                            instruccionesR.unshift("listaId.val.push(ID.val)");
                                        }
    | ID                                { $$ = [$1]; 
                                            gramatical.unshift("listaId := ID");
                                            instruccionesR.unshift("listaId.val= [ID.val]");
                                        }
    ; 

asignacion
    : ID IGUAL expresion                { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("asignacion := ID IGUAL expresion");
                                            instruccionesR.unshift("asignacion.val= new Asignacion(ID.val,expresion.val,linea,columna)");
                                        }
    | ID INC                            { $$ = new AsignacionDecInc($1, TipoAsignacion.INCREMENTO, @1.first_line, @1.first_column); 
                                            gramatical.unshift("asignacion := ID INC");
                                            instruccionesR.unshift("asignacion.val= new AsignacionDecInc(ID.val,INCREMENTO.lexval,linea,columna)");
                                        }
    | ID DEC                            { $$ = new AsignacionDecInc($1, TipoAsignacion.DECREMENTO, @1.first_line, @1.first_column); 
                                            gramatical.unshift("asignacion := ID DEC");
                                            instruccionesR.unshift("asignacion.val= new AsignacionDecInc(ID.val,DECREMENTO.lexval,linea,columna)");
                                        }
    | ID IGUAL CORIZQ CORDER            { $$ = new Asignacion($1, [], @1.first_line, @1.first_column); 
                                            gramatical.unshift("asignacion := ID IGUAL CORIZQ CORDER");
                                            instruccionesR.unshift("asignacion.val= new Asignacion(ID.val,[],linea,columna)");
                                        }
    
    ;

//vector

tipoValor
    : DECIMAL                           { $$ = (Number.isInteger(Number($1)))?new SetearValor(Tipos.INT, Number($1), @1.first_line, @1.first_column):new SetearValor(Tipos.DOUBLE, Number($1), @1.first_line, @1.first_column); 
                                            gramatical.unshift("tipoValor := DECIMAL");
                                            instruccionesR.unshift("tipo.val= (DECIMAL.val esEntero)? new SetearValor(INT.lexval, DECIMAL.val,linea,columna):new SetearValor(DOUBLE.lexval,DECIMAL.val,linea,columna)");
                                        }
    | ENTERO                            { $$ = new SetearValor(Tipos.INT, Number($1), @1.first_line, @1.first_column); 
                                            gramatical.unshift("tipoValor := ENTERO");
                                            instruccionesR.unshift("tipoValor.val= new SetearValor(INT.lexval, ENTERO.val, linea,columna)");
                                        }
    | CADENA                            { $$ = new SetearValor(Tipos.STRING, $1 , @1.first_line, @1.first_column); 
                                            gramatical.unshift("tipoValor := CADENA");
                                            instruccionesR.unshift("tipoValor.val= new SetearValor(STRING.lexval, CADENA.val, linea,columna)");
                                        }
    | CARACTER                          { $$ = new SetearValor(Tipos.CHAR, $1, @1.first_line, @1.first_column); 
                                            gramatical.unshift("tipoValor := CARACTER");
                                            instruccionesR.unshift("tipoValor.val= new SetearValor(CHAR.lexval, CARACTER.val, linea,columna)");
                                        }
    | TRUE                              { $$ = new SetearValor(Tipos.BOOLEAN, true, @1.first_line, @1.first_column); 
                                            gramatical.unshift("tipoValor := TRUE");
                                            instruccionesR.unshift("tipoValor.val= new SetearValor(BOOLEAN.lexval, true, linea,columna)");
                                        }
    | FALSE                             { $$ = new SetearValor(Tipos.BOOLEAN, false, @1.first_line, @1.first_column); 
                                            gramatical.unshift("tipoValor := false");
                                            instruccionesR.unshift("tipoValor.val= new SetearValor(BOOLEAN.lexval, false, linea,columna)");
                                        }
    | ID                                { $$= new ObtenerValor($1,@1.first_line, @1.first_column);
                                            gramatical.unshift("tipoValor := ID");
                                            instruccionesR.unshift("tipoValor.val= new ObtenerValor(ID.lexval, linea,columna)");
                                        }
    ;

tipo
    : BOOLEAN                           { $$ = Tipos.BOOLEAN; 
                                            gramatical.unshift("tipo := BOOLEAN");
                                            instruccionesR.unshift("tipo.val= BOOLEAN.lexval");
                                        }
    | CHAR                              { $$ = Tipos.CHAR; 
                                            gramatical.unshift("tipo := CHAR");
                                            instruccionesR.unshift("tipo.val= CHAR.lexval");
                                        }
    | DOUBLE                            { $$ = Tipos.DOUBLE; 
                                            gramatical.unshift("tipo := DOUBLE");
                                            instruccionesR.unshift("tipo.val= DOUBLE.lexval");
                                        }
    | INT                               { $$ = Tipos.INT; 
                                            gramatical.unshift("tipo := INT");
                                            instruccionesR.unshift("tipo.val= INT.lexval");
                                        }
    | STRING                            { $$ = Tipos.STRING; 
                                            gramatical.unshift("tipo := STRING");
                                            instruccionesR.unshift("tipo.val= STRING.lexval");
                                        }
    ;

expresion
    : expresion EXTE expresion           { $$ = new Aritmetica(TipoOperacion.EXTE, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion EXTE expresion");
                                            instruccionesR.unshift("expresion.val= new Aritmetica(^,expresion.val,expresion2.val,linea.columna)");
                                        }
    | expresion CONCATENACION expresion  { $$ = new Aritmetica(TipoOperacion.CONCATENACION, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion CONCATENACION expresion");
                                            instruccionesR.unshift("expresion.val= new Aritmetica(&,expresion.val,expresion2.val,linea.columna)");
                                        }
	| expresion MAS expresion            { $$ = new Aritmetica(TipoOperacion.SUMA, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion MAS expresion");
                                            instruccionesR.unshift("expresion.val= new Aritmetica(+,expresion.val,expresion2.val,linea.columna)");
                                        }
	| expresion MENOS expresion          { $$ = new Aritmetica(TipoOperacion.RESTA, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion MENOS expresion");
                                            instruccionesR.unshift("expresion.val= new Aritmetica(-,expresion.val,expresion2.val,linea.columna)");
                                        }
	| expresion POR expresion            { $$ = new Aritmetica(TipoOperacion.MULTIPLICACION, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion POR expresion");
                                            instruccionesR.unshift("expresion.val= new Aritmetica(*,expresion.val,expresion2.val,linea.columna)");
                                        }
	| expresion DIVIDIDO expresion       { $$ = new Aritmetica(TipoOperacion.DIVISION, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion DIVIDIDO expresion");
                                            instruccionesR.unshift("expresion.val= new Aritmetica(/,expresion.val,expresion2.val,linea.columna)");
                                        }
    | expresion MODULO expresion         { $$ = new Aritmetica(TipoOperacion.MODULO, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion MODULO expresion");
                                            instruccionesR.unshift("expresion.val= new Aritmetica(%,expresion.val,expresion2.val,linea.columna)");
                                        }
    | expresion AND expresion            { $$ = new Logico(TipoLogico.AND, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion AND expresion");
                                            instruccionesR.unshift("expresion.val= new Logico(&&,expresion.val,expresion2.val,linea.columna)");
                                        }
	| expresion OR expresion             { $$ = new Logico(TipoLogico.OR, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion OR expresion");
                                            instruccionesR.unshift("expresion.val= new Logico(||,expresion.val,expresion2.val,linea.columna)");
                                        }
    | NOT expresion                      { $$ = new Logico(TipoLogico.NOT, $2, null,@1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion :=  NOT expresion");
                                            instruccionesR.unshift("expresion.val= new Logico(!,expresion.val,null,linea.columna)");
                                        }
    | expresion IGUALDAD expresion       { $$ = new Relacional(TiposRelacional.IGUAL, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion IGUALDAD expresion");
                                            instruccionesR.unshift("expresion.val= new Relacional(==,expresion.val,expresion2.val,linea.columna)");
                                        }
	| expresion DIFERENTE expresion      { $$ = new Relacional(TiposRelacional.DIFERENTE, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion DIFERENTE expresion");
                                            instruccionesR.unshift("expresion.val= new Relacional(!=,expresion.val,expresion2.val,linea.columna)");
                                        }
    | expresion MAYORIGUAL expresion     { $$ = new Relacional(TiposRelacional.MAYORI, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion MAYORI expresion");
                                            instruccionesR.unshift("expresion.val= new Relacional(>=,expresion.val,expresion2.val,linea.columna)");
                                        }
    | expresion MENORIGUAL expresion     { $$ = new Relacional(TiposRelacional.MENORI, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion MENORI expresion");
                                            instruccionesR.unshift("expresion.val= new Relacional(<=,expresion.val,expresion2.val,linea.columna)");
                                        }
	| expresion MAYOR expresion          { $$ = new Relacional(TiposRelacional.MAYOR, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion MAYOR expresion");
                                            instruccionesR.unshift("expresion.val= new Relacional(>,expresion.val,expresion2.val,linea.columna)");
                                        }
	| expresion MENOR expresion          { $$ = new Relacional(TiposRelacional.MENOR, $1, $3, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := expresion MENOR expresion");
                                            instruccionesR.unshift("expresion.val= new Relacional(<,expresion.val,expresion2.val,linea.columna)");
                                        }
    | MENOS expresion %prec UMENOS       { $$ = new Unario(TUnario.NEGATIVO, $2, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := MENOS expresion");
                                            instruccionesR.unshift("expresion.val= new Unario(NEGATIVOlexval,expresion.val,linea.columna)");
                                        }
    | expresion INC                      { $$ = new Unario(TUnario.INCREMENTO, $1, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := INC expresion");
                                            instruccionesR.unshift("expresion.val= new Unario(INC.lexval,expresion.val,linea.columna)");
                                        }
    | expresion DEC                      { $$ = new Unario(TUnario.DECREMENTO, $1, @1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := DEC expresion");
                                            instruccionesR.unshift("expresion.val= new Unario(DEC.lexval,expresion.val,linea.columna)");
                                        }
    | BEGIN                              { $$ = new Begin(@1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := BEGIN");
                                            instruccionesR.unshift("expresion.val= new Begin(BEGIN.lexval,linea.columna)");
                                        }
    | END                                { $$ = new End(@1.first_line, @1.first_column); 
                                            gramatical.unshift("expresion := END");
                                            instruccionesR.unshift("expresion.val= new End(END.lexval,linea.columna)");
                                        }
    | NULL                               { $$ = Tipos.NULL; 
                                            gramatical.unshift("expresion := NULL");
                                            instruccionesR.unshift("expresion.val= NULL.lexval");
                                        }
    | ternario                           { $$=$1; 
                                            gramatical.unshift("expresion := ternario");
                                            instruccionesR.unshift("expresion.val= ternario.val");
                                        }
    | nativas                            { $$=$1; 
                                            gramatical.unshift("expresion := nativas");
                                            instruccionesR.unshift("expresion.val= nativas.val");
                                        }
    | tipoValor                          { $$=$1; 
                                            gramatical.unshift("expresion := tipoValor");
                                            instruccionesR.unshift("expresion.val= tipoValor.val");
                                        }
    | llamadaFuncion                     { $$=$1; 
                                            gramatical.unshift("expresion := llamadaFuncion");
                                            instruccionesR.unshift("expresion.val= llamadaFuncion.val");
                                        }
    | estructuras                        { $$=$1; 
                                            gramatical.unshift("expresion := estructuras");
                                            instruccionesR.unshift("expresion.val= estructuras.val");
                                        }
    
    | PARIZQ expresion PARDER            { $$ = $2;
                                            gramatical.unshift("expresion := PARIZQ expresion PARDER");
                                            instruccionesR.unshift("expresion.val= expresion.val");
                                        }
    ;

estructuras
    : ID CORIZQ expresion CORDER          { $$ = new ObtenerVector($1,$3,@1.first_line, @1.first_column); 
                                                
                                            }
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