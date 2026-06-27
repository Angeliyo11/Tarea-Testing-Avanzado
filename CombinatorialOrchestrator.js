/**
 * CombinatorialOrchestrator.js
 * Sistema de Generación, Priorización y Aprendizaje Predictivo
 */
class CombinatorialOrchestrator {
    constructor() {
        this.executionHistory = [];
        // Pesos iniciales para el modelo de predicción
        this.riskModels = { high: 3, medium: 2, low: 1 };
    }

    // 1. Genera casos de prueba combinatorios automáticamente (Producto Cartesiano)
    generateCombinations(paramArrays) {
        // Combina múltiples arrays de entrada en todas las variaciones posibles
        return paramArrays.reduce((a, b) => 
            a.flatMap(d => b.map(e => [d, e].flat()))
        );
    }

    // 2. Prioriza los casos según nivel de riesgo
    prioritizeByRisk(testCases) {
        return testCases.map(testCase => {
            let riskLevel = 'low';
            
            // Lógica de análisis estático: valores nulos, ceros o negativos disparan el riesgo
            if (testCase.includes(null) || testCase.includes(0) || testCase.some(v => v < 0)) {
                riskLevel = 'high';
            } else if (testCase.some(val => typeof val === 'string')) {
                riskLevel = 'medium';
            }
            
            return { 
                case: testCase, 
                riskScore: this.riskModels[riskLevel], 
                riskLevel 
            };
        }).sort((a, b) => b.riskScore - a.riskScore); // Ordena de mayor a menor riesgo
    }

    // 3. Aprende de ejecuciones previas utilizando modelos de predicción
    predictiveLearningUpdate(testResult, riskLevel) {
        this.executionHistory.push({ passed: testResult, risk: riskLevel });
        
        // Simulación de ML: Si una prueba de alto riesgo falla, 
        // el modelo aumenta su peso para probarla con más prioridad en el futuro
        if (!testResult && riskLevel === 'high') {
            this.riskModels.high += 0.5; 
            console.log(">> Modelo Predictivo Ajustado: Aumentando peso para casos de alto riesgo.");
        }
    }
}

module.exports = CombinatorialOrchestrator;