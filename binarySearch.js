/**
 * binarySearch.js
 * Algoritmo de Búsqueda Binaria con validación de Contratos
 */
function binarySearch(arr, target) {
    // Contract Testing: Verificamos que las entradas cumplan el "contrato"
    if (!Array.isArray(arr)) throw new Error("Contract Violation: 'arr' debe ser un arreglo");
    if (typeof target !== 'number') throw new Error("Contract Violation: 'target' debe ser un número");

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        
        // Los límites exactos son cruciales para superar el Mutation Testing
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

module.exports = binarySearch;