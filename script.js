function generarCuadruplos() {
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";  // Limpiar resultados anteriores

    // Obtener expresión ingresada por el usuario
    const expresion = document.getElementById("expresion").value;

    // Validar expresión
    if (!expresion) {
        resultadoDiv.innerHTML = "<p>Por favor, ingresa una expresión válida.</p>";
        return;
    }

    try {
        const cuadruplos = [];
        let tempCounter = 1; // Para variables temporales
        let pilaOperadores = []; // Pila de operadores
        let pilaOperandos = []; // Pila de operandos

        // Función para procesar operación y generar cuádruplo
        function procesarOperacion(operador) {
            const arg2 = pilaOperandos.pop();
            const arg1 = pilaOperandos.pop();
            const tempResultado = `T${tempCounter++}`;
            const resultado = realizarOperacion(arg1, arg2, operador);
            cuadruplos.push({ operacion: operador, arg1: arg1, arg2: arg2, resultado: tempResultado, valorResultado: resultado });
            pilaOperandos.push(resultado); // Añadir resultado temporal a pila de operandos
        }

        // Evaluar cada carácter de la expresión
        for (let i = 0; i < expresion.length; i++) {
            const char = expresion[i];

            if (!isNaN(char)) { // Si es un número
                pilaOperandos.push(parseInt(char));
            } else if (['+', '-', '*', '/'].includes(char)) { // Si es un operador
                while (pilaOperadores.length && precedencia(pilaOperadores[pilaOperadores.length - 1]) >= precedencia(char)) {
                    procesarOperacion(pilaOperadores.pop());
                }
                pilaOperadores.push(char);
            }
        }

        // Procesar operadores restantes en la pila
        while (pilaOperadores.length) {
            procesarOperacion(pilaOperadores.pop());
        }

        // Mostrar los cuádruplos y sus resultados intermedios en pantalla
        cuadruplos.forEach((cuadruplo, index) => {
            resultadoDiv.innerHTML += `<p><strong>Cuádruplo ${index + 1}:</strong> 
                                       Operación: ${cuadruplo.operacion}, 
                                       Arg1: ${cuadruplo.arg1}, 
                                       Arg2: ${cuadruplo.arg2}, 
                                       Resultado Temporal (${cuadruplo.resultado}): ${cuadruplo.valorResultado}</p>`;
        });

        // Mostrar resultado final
        resultadoDiv.innerHTML += `<p><strong>Resultado Final:</strong> ${pilaOperandos[0]}</p>`;

    } catch (error) {
        resultadoDiv.innerHTML = "<p>Error en la expresión. Verifica que sea correcta.</p>";
    }
}

// Función auxiliar para realizar operaciones
function realizarOperacion(arg1, arg2, operacion) {
    switch (operacion) {
        case '+': return arg1 + arg2;
        case '-': return arg1 - arg2;
        case '*': return arg1 * arg2;
        case '/': return arg2 !== 0 ? arg1 / arg2 : 'Error (División por cero)';
        default: return 'Operación no válida';
    }
}

// Función para definir precedencia de operadores
function precedencia(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}
