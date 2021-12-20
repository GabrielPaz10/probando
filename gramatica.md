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

