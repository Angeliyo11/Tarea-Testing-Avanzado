/**
 * MainPipeline.js
 * Pipeline de Testing Integral que conecta todas las herramientas
 */
const MetricsDashboard = require('./MetricsDashboard');
const CombinatorialOrchestrator = require('./CombinatorialOrchestrator');
const binarySearch = require('./binarySearch');

class TestingPipeline {
    constructor() {
        this.dashboard = new MetricsDashboard();
        this.orchestrator = new CombinatorialOrchestrator();
    }

    async runPipeline() {
        console.log("🚀 Iniciando Pipeline de Testing Integral...\n");

        // FASE 1: Análisis Estático y Generación de Casos
        console.log("[1/4] Generando casos combinatorios...");
        const targetValues = [2, 10, -1, null, "error"];
        const arraysToSearch = [[2, 4, 6, 8, 10], [], [1, 2, 3]];
        const allCases = this.orchestrator.generateCombinations([arraysToSearch, targetValues]);
        
        console.log(`Se generaron ${allCases.length} casos de prueba.`);

        // FASE 2: Priorización por Riesgo (Modelo Predictivo)
        console.log("[2/4] Priorizando ejecución según riesgo (SMERFS/Frestimate approach)...");
        const prioritizedCases = this.orchestrator.prioritizeByRisk(allCases);

        // FASE 3: Ejecución de Pruebas Unitarias y Métricas
        console.log("[3/4] Ejecutando pruebas unitarias y capturando métricas...");
        let defectsFound = 0;

        for (const test of prioritizedCases) {
            const [arr, target] = test.case;
            
            // Función envoltorio para medir el tiempo y la estabilidad
            const testExecution = async () => {
                try {
                    binarySearch(arr, target);
                    this.orchestrator.predictiveLearningUpdate(true, test.riskLevel);
                } catch (error) {
                    defectsFound++;
                    this.orchestrator.predictiveLearningUpdate(false, test.riskLevel);
                    throw error;
                }
            };

            // Medimos tiempo de ejecución real
            await this.dashboard.measureExecutionTime(`Search for ${target}`, testExecution);
            
            // Simulamos detección de Flaky Tests en casos de alto riesgo
            if (test.riskLevel === 'high') {
                await this.dashboard.detectFlakyTest(testExecution, 3);
            }
        }

        // FASE 4: Consolidación de Resultados (Estadística)
        console.log("[4/4] Consolidando resultados y generando Dashboard...\n");
        
        // Calculamos complejidad ciclomática aproximada del binarySearch (Nodos y Aristas)
        this.dashboard.calculateCyclomaticComplexity(7, 9);
        
        // Asumimos 100% de cobertura de código para el cálculo
        this.dashboard.calculateCoverageRatio(100, defectsFound);
        
        // Imprimir el Dashboard final
        this.dashboard.generateReport();
        console.log("✅ Pipeline finalizado con éxito.");
    }
}

// Ejecutar el Pipeline
const pipeline = new TestingPipeline();
pipeline.runPipeline();