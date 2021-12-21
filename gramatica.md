# Definición dirigida por la sintaxis con la gramática seleccionada
## Expresiones Regulares
```
CADENAS                     \"((\\\")|[^\"\n])*\"
CARACTERES                  \'((\\\\)|(\\n)|(\\t)|(\\\")|(\\\')|[^\'\n])\'[^'])\'
DECIMAL                     [0-9]+("."[0-9]+)?\b 
ENTERO                      [0-9]+\b
ID                          ([a-zA-Z])[a-zA-Z0-9_]*
COMENTARIO DE UNA LÍNEA     "//".* 
COMENTARIO MULTILÍNEA       [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

```
## Terminales
- init
- completo
- global
- cuerpoLocal
- local
- funcion
- llamadaFuncion
- parametros
- atributos
- imprimir
- declaracion
- listaId
- asignacion
- tipoValor
- tipo
- expresion
- ternario
- nativas
- condicionales
- ifcondicion
- elsecondicion
- switchcondicion
- casecondicion
- defaultcondicion
- ciclos
- ciclowhile
- ciclofor
- asignacionfor
- declaracionfor
- control

## No Terminales
- IGUALDAD
- DIFERENTE
- MAYORIGUAL
- MENORIGUAL
- MAYOR
- MENOR
- PTCOMA
- PARIZQ
- PARDER
- CORIZQ
- CORDER
- LLAVEIZQ
- LLAVEDER
- PUNTO
- COMA
- IGUAL
- PREGUNTA
- DOSPTS
- AND
- OR
- NOT
- EXTE
- CONCATENACION
- INC
- DEC
- MAS
- MENOS
- POR
- DIVIDIDO
- MODULO
- POW
- SQRT
- SIN
- COS
- TAN
- COPOSITION
- SUBSTRING
- BEGIN
- END
- LENGTH
- LOWERCASE
- UPPERCASE
- PARSE
- TOINT
- TODOUBLE
- RSTRING
- TYPEOF
- POP
- PUSH
- PRINT
- PRINTLN
- NULL
- INT
- DOUBLE
- BOOLEAN
- CHAR
- STRING
- STRUCT
- VOID
- IF
- ELSE
- SWITCH
- CASE
- DEFAULT
- WHILE
- DO
- FOR
- IN
- BREAK
- CONTINUE
- RETURN
- CADENA
- CARACTER
- DECIMAL
- ENTERO
- TRUE
- FALSE
- ID
- EOF

## PRECEDENCIA
```
Izquierda       'PREGUNTA' 'DOSPTS'
Izquierda       'OR'
Izquierda       'AND'
Derecha         'NOT'
Izquierda       'IGUALDAD' 'DIFERENTE' 'MAYORIGUAL' 'MENORIGUAL' 'MAYOR' 'MENOR'
Izquierda       'MAS' 'MENOS'
Izquierda       'POR' 'DIVIDIDO' 'MODULO'
Izquierda       'INC','DEC'
Derecha         UCAST (Casteos)
Izquierda       UMENOS (Negativos)
```