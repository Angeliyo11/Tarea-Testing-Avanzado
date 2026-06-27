/**
 * spec/binarySearch.spec.js
 * Conjunto de pruebas avanzadas para Búsqueda Binaria
 */
const binarySearch = require('../binarySearch');

describe('Binary Search - Testing Avanzado', () => {

    // 1. CONTRACT TESTING
    describe('Contract Testing', () => {
        it('debe rechazar entradas que rompan el contrato (ej. strings en vez de arrays)', () => {
            expect(() => binarySearch("no soy un array", 5)).toThrowError(/Contract Violation/);
        });

        it('debe rechazar un objetivo que no sea número', () => {
            expect(() => binarySearch([1, 2, 3], "5")).toThrowError(/Contract Violation/);
        });
    });

    // 2. MUTATION TESTING (Pruebas mata-mutantes)
    // Diseñadas para fallar si alguien cambia un "<" por un "<=" en el código original
    describe('Mutation Testing Readiness', () => {
        it('debe encontrar el elemento en los límites exactos (Boundary Values)', () => {
            const arr = [2, 4, 6, 8, 10];
            expect(binarySearch(arr, 2)).toBe(0); // Límite inferior
            expect(binarySearch(arr, 10)).toBe(4); // Límite superior
        });

        it('debe retornar -1 si el número no está, sin caer en bucles infinitos', () => {
            expect(binarySearch([1, 3, 5], 4)).toBe(-1);
        });
    });

    // 3. PROPERTY-BASED TESTING
    // En lugar de probar valores fijos, probamos las "propiedades" matemáticas del algoritmo
    describe('Property-Based Testing', () => {
        it('Propiedad: Siempre que busque un número en un array aleatorio generado, si existe, devuelve su índice real', () => {
            for (let i = 0; i < 10; i++) {
                // Generamos un array aleatorio ordenado
                const randomLength = Math.floor(Math.random() * 20) + 1;
                const arr = Array.from({ length: randomLength }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
                
                // Elegimos un elemento al azar del array para buscarlo
                const randomIndex = Math.floor(Math.random() * randomLength);
                const target = arr[randomIndex];
                
                const result = binarySearch(arr, target);
                
                // La propiedad matemática: arr[resultado] siempre debe ser igual al target
                expect(result).toBeGreaterThanOrEqual(0);
                expect(arr[result]).toBe(target);
            }
        });
    });
});