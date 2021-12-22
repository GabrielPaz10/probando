## Universidad de San Carlos de Guatemala
## Facultad de Ingeniería
## Escuela de Ciencias y Sistemas
## Organización de Lenguajes y Compiladores 

___
# Manual Técnico
## Quetzal OCL2


## Competencias Generales 
Que el estudiante aplique la fase de síntesis del compilador para realizar un traductor e intérprete utilizando herramientas.

## Competencias Especifica 
-	Que el estudiante utilice un generador de analizadores léxicos y sintácticos para construir un traductor. 
-	Que el estudiante implemente la ejecución de dicha traducción utilizando traducción dirigida por la sintaxis haciendo uso de atributos heredados y sintetizados. 
-	Que el estudiante comprenda los conceptos acerca de traducciones. 
-	Que el estudiante maneje la pila que proporciona el analizador sintáctico para simular el paso de atributos heredados. 
-	Que el estudiante aplique los conocimientos aprendidos en clase para generar código intermedio. 

## Descripción 
Quetzal es un lenguaje de programación inspirado en C, su característica principal es la inclusión de tipos implícitos. El sistema de tipos de Quetzal realiza una formalización de los tipos de C y Java. Esto permite a los desarrolladores definir variables y funciones tipadas sin perder la esencia. Otra inclusión importante de Quetzal es la simplificación de los lenguajes C y Java para poder realizar diferentes instrucciones en menos pasos.

Adicional Quetzal tendrá 2 flujos, se podrá interpretar el código fuente ingresado y efectuar todas sus instrucciones, o bien se puede traducir este lenguaje a un lenguaje intermedio basado en un lenguaje de 3 direcciones, este se podrá ejectuar posteriormente en cualquier compilador de C, tomando en cuenta las reglas especificas de un lenguaje de 3 direcciones.

### Página de inicio
![This is an image](/images/1.png)
Al iniciar se mostrará una página como la anterior donde se cuentan con con un editor de código, su traducción y una consola, y además cuenta con las opciones de "Ejecutar", "Traducir", "AST", "Tabla de Simbolos", "Tabla de Errores" y "Reporte Gramatical".

### Consola
La consola es un área especial dentro del IDE que permite visualizar las notificaciones, errores, y advertencias que se produjeron durante el proceso de análisis de un archivo de entrada. 

## Flujo de la aplicación  <a name="flujo"></a>

A continuación, se explica el flujo de la aplicación. 
La aplicación es sencilla por lo que su funcionalidad se basa en interpretar, generar código intermedio y desplegar reportes. 

-	Interpreta: Esta opción nos va a permitir interpretar una entrada. El programa recibe un archivo de entrada de código de alto nivel y ejecuta las instrucciones.
-	Traducir: Esta opción nos va a permitir traducir una entrada. El programa recibe un archivo de entrada de código de alto nivel y traduce a código intermedio en la sintaxis de tres direcciones.  
-	Reportes: Esta opción nos va a permitir visualizar los reportes generados después de traducir una entrada. 
 
En la ejecución se debe implementar los dos métodos de recuperación: uno para los errores léxicos y sintácticos descartando hasta el “;”; y otro para los errores semánticos, se debe descartar la instrucción con error. 

### Botón Ejecutar
![This is an image](/images/2.png)
Se ejecuta el código que se escribe en el recuardo de "Fuente".
### Botón Traducir
Se traduce el código que se escribe en el recuardo de "Fuente".
### Botón AST
Se muestra una imagen con el AST generado.
### Botón Tabla de Simbolos
Se muestra la tabla con los simbolos obtenidos al momento de ejecutar el código.
### Botón Tabla de Errores
En este se mostrará una tabla con todos los errores generados en la ejecución del código.
### Botón Reporte Gramatical
Se muestra una tabla con la gramatica generada al momento de ejecutar el código.

## Descripción del Lenguajes

### Case Sensitive
El lenguaje es Case Sensitive, lo que quiere decir que distinguirá entre mayúsculas o minúsculas.

## Tipos 

Quetzal aceptará distintos tipos de datos con los que cuenta Java y C. Entre ellos se aceptan:

### **Nulo:**
Se representa con la palabra reservada `null`, la cual indica que no existe ningún valor.

### **int**

Valores numéricos enteros. Por ejemplo: `3`, `2`, `-1`, `-100`.

### **double**

Valores númericos con punto flotante. Por ejemplo: `3.1415`, `2.7182`, `0.5`.

### **boolean**

Los valores booleanos únicamente pueden ser `true` o `false`.

### **char**

Estos son literales de carateres, se definen con comillas simples. Por ejemplo: `'a'`, `'b'`, `'z'`.

### **String**

Estos representan cadenas de texto, se definen con comillas dobles. Por ejemplo: `"Hola"`, `"Mundo"`, `"!"`.

### **Arreglos**

Estos son un conjunto de valores indexados entre 1 hasta n, que pueden ser de diferentes tipos. Por ejemplo:

```java
[10, 20, 30, 40]
["Hola", "Mundo"]
[1, 2, 5, [1, 2]]
```


### **Struct**

Estos pueden contener cualquier tipo de dato en su interior, incluso otros struct, arreglos o arreglos de structs.:

```c
struct NOMBRE_STRUCT{
    LISTA_ATRIBUTOS
};
```

Y para crear una variable con nuestro Struct, se escribe:

```c
NOMBRE_STRUCT ID = NOMBRE_STRUCT(VALORES);
```

Un ejemplo de creación de struct podría ser:

```C
struct Rectangulo{
    int base,
    int altura
};
```
## Expresiones 

Quetzal acepta operaciones aritmeticas, relacionales y logicas de la siguiente forma:

### Aritméticas
Entre las operaciones aritmeticas disponibles vamos a encontrar las siguientes:
- **Suma:** La suma de dos expresiones se define por el símbolo `+` 
- **Resta:** La resta de dos expresiones y la negación de una expresión aritmetica se define por el símbolo `-` 
- **Multiplicación:** La multiplicación de dos expresiones se define por el símbolo `*` 
- **División:** La división de dos expresiones se define por el símbolo `/`
- **Modulo:** El modulo entre dos expresiones se define por el símbolo `%` 
- **Nativas:** Quetzal posee 6 funciones nativas para la resolución de expresiones, entre ellas se encuentran:
- **pow:** Recibe como primer parametro la base y como segundo parametro la potencia a elevar.  Ejemplo: `pow(2,4)`
- **sqrt:**  Cálcula la raíz cuadrara de un número Ejemplo: `sqrt(4)`
- **sin:** Resuelve la función seno del número que se ingrese
- **cos:** Resuelve la función coseno del numero que se ingrese
- **tan:** Resuelve la función tangente del numero que se ingrese
```java
    //Se expresa de la siguiente manera:
    sin(134)
    log10(100)
    cos(var1)
    tan(12)
    sqrt(16)
```
### Relacionales
Entre las operaciones relacionales disponibles vamos a encontrar las siguientes:
- **Igualdad:** Esta se define por el símbolo `==`
- **Diferenciación:** Esta se define por el símbolo `!=`
- **Mayor que:** Esta se define por el símbolo `>`
- **Menor que:** Esta se define por el símbolo `<`
- **Mayor o igual que:** Esta se define por el símbolo `>=`
- **Menor o igual que:** Esta se define por el símbolo `<=`

### Lógicas
Entre las operaciones lógicas disponibles vamos a encontrar las siguientes:
- **AND:** Esta se define por el símbolo `&&`
- **OR:** Esta se define por el símbolo `||`
- **NOT:** Esta se define por el símbolo `!`

### Cadenas
Entre las operaciones con cadenas (strings) vamos a encontrar las siguientes:
- **Concatenación:** La unión de dos cadenas de texto se define por el símbolo `&`
  ```java
  "para" & "caidismo" = "paracaidismo"
  ```
- **Repetición:** Permite que una cadena de texto se repita cierto número de veces, esta se define por el símbolo `^`
  ```java
  "Cadena"^3 = "CadenaCadenaCadena"
  ```
- **Acceso a una pocisión:** El acceso a un elemento de una cadena se define de la siguiente manera: `string.caracterOfPosition(posición)`, el cual devolvera el caracter correspondiente a esa posición
    ```java
    animal = "Tigre";
    println(animal.caracterOfPosition(2)); //g
    ```
- **Acceso a una porción:** El acceso a una porción de una cadena se define de la siguiente manera: `string.subString(inicial,final)`, el cual devolvera la cadena correspondiente al intervalo definido.
    ```java
    animal = "Tigre";
    println(animal.subString(2,4)); //gre
    ```
- **Tamaño de una cadena:** La obtención del número de elementos de una cadena se define por la función `cadena.length()`
    ```java
    animal = "Tigre";
    println(animal.length()); //5
    ```
- **Cadena en mayusculas:** Una cadena puede ser convertida a mayusculas con la utilización de la función `cadena.toUppercase())`
    ```java
    animal = "Tigre";
    println(animal.toUppercase()); //TIGRE
    ```
- **Cadena en minusculas:** Una cadena puede ser convertida a mayusculas con la utilización de la función `cadena.toLowercase())`
    ```java
    animal = "Tigre";
    println(animal.toLowercase()); //tigre
    ```

### Operador ternario
El operador ternario es utilizado cuando se necesita entre diferentes expresiones a travez de una condición
```java
(EXPRESIÓN RELACIONAL O LOGICA) ? RESULTADO SI ES VERDADERO : RESULTADO SI ES FALSO
```
Ejemplo:
```java
respuesta = edad >= 50 ? "Puede vacunarse" : "No puede vacunarse";
println(animal == "Perro" ? 15 : 10);
```
  
## Instrucciones <a name="instrucciones"></a>

Quetzal contará con varias instrucciones para su ejecución, cada instrucción deber terminar con un punto y coma (`;`) siempre. Las instrucciones que Quetzal acepta son:

### Impresión <a name="impresion"></a>

Quetzal cuenta con 2 distintas instrucciones de imprimir.

```java
print(expresión);        // Esta imprime sin realizar un salto de línea
println(expresión);      // Esta imprime realizando un salto de línea
```

Para imprimir más de un valor por línea, se puede imprimir una secuencia de valores separados por comas. También dentro de las cadenas se pueden colocar cualquier expresión utilizando el operador `$`. Por ejemplo:

```java
println("+", "-");       // Imprime + -
print("El resultado de 2 + 2 es $(2 + 2)");  // Imprime El resultado de 2 + 2 es 4
println("$a $(b[1])"); // Imprime el valor de a y el valor de b[1]
```

Quetzal también tiene la opción de imprimir arreglos y struct. Por ejemplo:

```java
    a = [0, 1, 2];
    println(a);          // Imprime [0, 1, 2]
    s = Hora(10, 30);
    print(s);           // Imprime Hora(10, 30)
```

### Declaraciones y Asignaciones <a name="decyasi"></a>

Quetzal permite la declaración y asignación de variables, las NO variables pueden cambiar su tipo de dato en cualquier momento

- **Declaración:** Quetzal permite declarar variables de dos maneras:
```java
    tipo ID = Expresión;
    // ó
    tipo LISTA_ID;
```
Ejemplo:
```java
    int x = (3*5);
    double y = (10/4);
    String str = "Saludo";
    int var1, var2, var3;  // se inicializan con los valores por defecto de java
```

- **Asignación:** Quetzal permite asignar valores a variables existentes de la siguiente manera:
```java
    ID = Expresión;
```
Ejemplo:
```java
    var1 = "Adios";
    v = 89 - 9;
```

### Llamada a funciones <a name="llamadas"></a>

Una llamada a función es como un desvío en el flujo de la ejecución. En lugar de pasar a la siguiente sentencia, el flujo salta al cuerpo de la función, ejecuta esta y regresa para continuar después de la llamada a la función.

Para llamar a una función se realiza de la siguiente manera:

```java
NOMBRE_FUNCION(LISTA_PARAMETROS);
```
Ejemplo:
```java
ordenamiento(arr1,arr2);
imprimirLista(lista);
nuevaLinea();
```

Si la función cuenta con más de un parámetro estos se separan por medio de `,`. Además es importante tener en cuenta que cuando se pasa un arreglo o struct como argumento de una función, en realidad se pasa una referencia de este. Por lo que cualquier cambio que se realice al parámetro, se podrá observar después de salir de la función.

Las llamadas a funciones también se pueden utilizar en expresiones, debido a que existen funciones que retornan un valor.

### Distintas Funciones Nativas <a name="nativas"></a>

Quetzal utiliza diversas funciones nativas para sus expresiones, estas son:
- **tipo.Parse(string):** Toma una cadena y la convierte al tipo de numero que se le indice si es posible.
```java
    int.parse("8200")
    ó
    double.parse("3.13159")
    ó
    boolean.parse("1")
```
- **toInt:** Convierte un número flotante a un número entero sin redondearlo
```java
    toInt(3.99999)  // retorna 3
```
- **toDouble:** Convierte un número entero a un número flotante
```java
    toDouble(34)  // retorna 34.0
```
- **String:** Convierte el argumento en una cadena, puede usarse en cualquier tipo de dato excepto null
```java
    string(45.87)  // retorna "45.87"
    string([1,2,3])  // retorna "[1,2,3]"
```
- **typeof:** Muestra el tipo del argumento
```java
    typeof(5 * 5) // int
```

### Funciones <a name="funciones"></a>

Las funcioens son secuencias de sentencias que ejecuta una operación que nosotros deseamos. Cuando se crea una función se especifica su nombre y secuencia de sentencias. Luego, ya se puede llamar a estas usando su nombre y los parámetros solicitados. Se definen las funciones en Quetzal así:

```java
TIPO NOMBRE_FUNCION(LISTA_PARAMETROS){
    LISTA_INSTRUCCIONES
}
```

Por ejemplo:

```java
TIPO imprimirHola(){
    print("Hola")
    println(" Mundo");
}
```
### Condicionales <a name="condicionales"></a>

Quetzal cuenta con sentencias condicionales, lo que permite que un bloque de codigo pueda ser o no ejecutado. Estas se definen por `if`,`if...else` y `if...else if` y adicional con la sentencia switch case. Su estructura es la siguiente:
```java
if (CONDICION){
    LISTA_INTRUCCIONES
}
if (CONDICION)
    INSTRUCCION
if(CONDICION1){
  LISTA_INTRUCCIONES
}
else if(CONDICION1){
  LISTA_INTRUCCIONES
}
else{
    LISTA_INTRUCCIONES
}
switch(expression) {
  case x:
    LISTA_INTRUCCIONES
    break;
  case y:
    LISTA_INTRUCCIONES
    break;
  default:
    LISTA_INTRUCCIONES
}
// el break puede ser opcional, se manejará igual que un switch de java
```
### Loops 

Quetzal cuenta con sentencias iterativas, lo que permite ejecutar repetidamente un bloque de sentencias. Existen 2 de estas, el ciclo `while`, el ciclo `do while` y el ciclo `for`.

#### While<a name="while"></a>

La sentencia `while` sigue la siguiente estructura:

```java
while (CONDITION) {
  LISTA_INTRUCCIONES
}
```
#### Do While
La sentencia `do while` sigue la siguiente estructura:

```java
do {
  LISTA_INSTRUCCIONES
}
while (CONDICION);
```
#### For <a name="for"></a>

La sentencia `for` en Quetzal tiene la siguiente estructura:

```java
for (declaracion ó asignacion; condicion; instruccion) {
  LISTA_INSTRUCCIONES
}
```

### Arreglos 

Como se a mencionado Quetzal cuenta con arreglos, los cuales pueden ser definidos mediante una sintaxis. Los valores de los arreglos solo pueden ser del tipo definido en la variable o arreglos del mismo tipo.

```java
[8,2,3,[1,2,3]]
``` 
Para acceder a una posición en específico del arreglo, se debe definir una expresión que de como resultado un numero entero dentro de corchetes. los indices en Quetzal inician desde el numero 0 en adelante.
```java
String[] arr = ["H","O","L","A"];
print(arr[1]) //O
```
Se debe de validar que el valor minimo sea 0 y el máximo no debe de exceder del tamaño del arreglo, caso contrario se deberá de reportar un error.

Quetzal tambien permite que se acceda a una porción de un arreglo, esto se define mediante la sintaxis `begin:end`, el cual debe ir dentro de corchetes y devolvera un arreglo con los limites establecidos. Se debe tomar en cuenta que las palabras `begin` y `end` pueden ser utilizadas para indicar el inicio y el final del arreglo respectivamente

```java
int[] arr = [1,2,3,4,5,6];
print(arr[2:4]); //[2,3,4]
print(arr[begin:4]) //[1,2,3,4]
print(arr[4:end]) //[4,5,6]
``` 
Se debe de validar que el valor minimo sea 0 y el máximo no debe de exceder del tamaño del arreglo, caso contrario se deberá de reportar un error.


#### **Copiar un arreglo:**
Quetzal permite crear una copia de un arreglo utilizando el símbolo `#`, es útil hacer una copia antes de realizar operaciones que las modifiquen.
```java
int[] arr = [1,2,3,4,5,6];
int[] arr2 = #arr;
arr[2] = 0;
print(arr) //[1,0,3,4,5,6]
print(arr2) //[1,2,3,4,5,6]
``` 
#### **Funciones nativas con arreglos:**
Quetzal cuenta con 2 funciones nativas con arreglos, en los que podemos encontrar:
- **Push:** inserta un nuevo valor al final del arreglo, se define como:
```java
    nombre_arreglo.push(expresion);
```
Ejemplo:
```java
int[] arr = [1,2,3,4,5,6];
arr.push(7); // arr = [1,2,3,4,5,6,7]
```
- **Pop:** elimina y devuelve el ultimo valor de un arreglo, se define como:
```java
nombre_arreglo.pop();
```
Ejemplo:
```java
int[] arr = [1,2,3,4,5,6];
arr.pop(); // retorna 6, arr = [1,2,3,4,5]
```
**Length:** La obtención del tamaño de un arreglo, se define como:
```java
arreglo.length();
```
Ejemplo:
```java
int[] arr = [1,2,3,4,5,6];
arr.length(); // 6
```

#### **Operador punto con arreglos:**
Quetzal permite la utilización del operador numeral (`#`) para realizar diferentes operaciones aritmeticas, trigonometricas, relaciones o cualquier otro tipo de función sobre cada valor en un arreglo.
```java
int[] arr = [1,2,3];
print(arr#*2) //[2,4,6]
double[] arr2 = sin#(arr) //[0.8415, 0.9093, 0.1411]
```

### Structs <a name="structs"></a>

Como se menciono en secciones anteriores, Quetzal cuenta con tipos compuestos que los desarrolladores podrán definir mediante una sintaxis. Para la declaración de estos se utiliza la siguiente sintaxis:

```java
// Struct
struct NOMBRE_STRUCT
{
    LISTA_ATRIBUTOS
};
```

Y para la creación de variables con nuestro Struct, ya sea mutable e inmutable:

```java
NOMBRE_STRUCT ID = NOMBRE_STRUCT(LISTA_VALORES);
```

Siendo los valores los correspondientes a sus atributos en la lista de atributos.

Los atributos de los Struct pueden ser utilizados como parte de cualquier expresión. Para acceder a los atributos de los Struct, se utiliza la notación `.`.

```java
ID.ID
```

También si nosotros deseamos modificar únicamente uno de los atributos de nuestro Struct, ahí es donde entra la importancia de los dos tipos de Struct en Quetzal.

```java
X.atributo = expresión
```

Otros aspectos importantes de los Structs es que estos pueden ser llamados como parámetros en las funciones y, al igual que los arreglos, se pasan por referencia. Por lo que el valor de los atributos de los Structs también cambia. Por ejemplo:

```java
struct Estructura{
    int x
};
function cambiarAtributo(Estructura s){
    s.x = 10;
}
Estructura a = Estructura(0);
println(a);             // Imprime 'Estructura(0)'
println(a.x);           // Imprime 0
cambiarAtributo(a);
println(a);             // Imprime 'Estructura(10)'
println(a.x);           // Imprime 10
```

Se debe de tomar en cuenta que los Struct se pueden utilizar como retorno de una función.

Otros aspectos importantes de los Structs es que si estos tienen internamente otro struct dentro de el, se puede inicializar de 2 formas.

```java
struct Estructura{
    int x,
    Estructura e
};
Estructura a = Estructura(0, null);
println(a);             // Imprime 'Estructura(0, null)'
// o tambien se puede declarar 
Estructura b = Estructura(1, a);
println(b);             // Imprime 'Estructura(1, Estructura(0, null))'
```