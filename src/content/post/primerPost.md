---
title: "Aprendiendo TypeScript: Reto 1 - Suma Simple con Tipado Estático"
date: "2025-08-28"
tags: ["typescript", "aprendizaje"]
---

# Aprendiendo TypeScript: Reto 1 - Suma Simple con Tipado Estático

Hola, soy Carlos, y en este blog continúo compartiendo lo que aprendo sobre TypeScript. Aplico la técnica de Feynman explicando conceptos de forma sencilla, como si se los contara a alguien nuevo en el tema. Esto me ayuda a reforzar mi comprensión. Cada entrada se enfocará en un ejercicio específico para profundizar en aspectos clave de TypeScript.

En esta ocasión, abordo el Reto 1: Convertir una función simple de suma en JavaScript a TypeScript, incorporando tipado estático. El objetivo es asegurar que la función solo acepte números y devuelva un número, previniendo errores comunes.

### Contexto del reto
El reto parte de una función básica en JavaScript que suma dos números, pero sin controles de tipos. En TypeScript, agregamos tipos para hacerla más robusta:


```

// 🔹 Reto 1: Convertir Suma Simple
// Tiempo estimado: 5 min
// Prerequisitos: funciones, tipos básicos
/**
 * Convierte una función JS que suma dos números a TS con tipado estático. Asegura que solo acepte números.
 * Ejemplo:
 *   convertirSumaSimple(5, 3) -> 8
 */
function convertirSumaSimple(a: number, b: number): number {
    return a + b;
}

console.assert(convertirSumaSimple(5, 3) === 8, "Error en Reto 1");
console.assert(convertirSumaSimple(10, -2) === 8, "Error en Reto 1");

```

### Explicación paso a paso (a lo Feynman)
Imaginemos que explico esto a alguien que sabe JavaScript básico pero no TypeScript. La idea es desglosar el código para que quede claro cómo el tipado mejora la función.

1. **Declaración de la función con tipos**  
   En JavaScript, podrías escribir `function suma(a, b) { return a + b; }`, pero si pasas cadenas como "5" y "3", obtienes "53" en vez de 8. TypeScript evita esto declarando tipos:  
   - `a: number` y `b: number`: Indica que los parámetros deben ser números. Si intentas pasar algo más (como una cadena), el compilador te avisa antes de ejecutar.  
   - `: number` después de los paréntesis: Especifica que el retorno debe ser un número, asegurando consistencia.

2. **Cuerpo de la función**  
   Simplemente `return a + b;`. Gracias al tipado, TypeScript infiere que la suma será numérica. No hay sorpresas en runtime.

3. **Pruebas con asserts**  
   Usamos `console.assert` para verificar:  
   - `convertirSumaSimple(5, 3) === 8`: Prueba básica positiva.  
   - `convertirSumaSimple(10, -2) === 8`: Incluye negativos para cubrir más casos.  
   Si falla, lanza un mensaje de error, útil para depuración temprana.

Este reto ilustra cómo TypeScript transforma una función simple en algo más seguro, detectando problemas en compilación en lugar de ejecución.

### Ventajas en el contexto académico
En estudios de programación, como estructuras de datos, este tipado estático facilita el manejo de funciones en algoritmos más complejos. Reduce errores y mejora la legibilidad, especialmente en proyectos colaborativos. Un desafío inicial es acostumbrarse a declarar tipos, pero acelera el desarrollo a largo plazo.

### Conclusión
Este reto introductorio muestra el valor del tipado en TypeScript para funciones básicas. En la próxima entrada, exploraré otro ejercicio. Si tienes sugerencias o preguntas sobre este reto, comparte en los comentarios.

- Carlos