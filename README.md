# Tarea-Testing-Avanzado
Framework Híbrido de Testing Avanzado y Orquestador Predictivo
Autor: Angel Once

Descripción del Proyecto
Este repositorio contiene el código fuente de un ecosistema integral de pruebas de software desarrollado en Node.js y Jasmine. El proyecto trasciende la validación estática tradicional, implementando técnicas de aseguramiento de calidad de alto nivel, orquestación combinatoria y modelado matemático para predecir la fiabilidad del código.

El sistema fue diseñado para evaluar la robustez de un algoritmo de Búsqueda Binaria bajo condiciones de estrés, inyección de mutantes y fluctuaciones de tipos de datos.

Arquitectura y Módulos Principales
El proyecto se divide en cuatro componentes centrales que simulan un Pipeline de Integración Continua (CI):

HybridFramework.js (Capa de Abstracción):
Extiende las capacidades de Jasmine integrando mocking asíncrono avanzado (simulación de latencia de red mediante promesas) y generación estocástica de casos de prueba basada en tipos de datos dinámicos (Fuzz Testing básico).

binarySearch.spec.js (Testing Avanzado):
Implementa un enfoque defensivo sobre el algoritmo aplicando:

Contract Testing: Validación estricta de precondiciones de entrada.

Mutation Testing: Casos de frontera exactos diseñados para eliminar mutantes lógicos (ej. variaciones en operadores < y <=).

Property-Based Testing: Evaluación masiva de la propiedad matemática del algoritmo utilizando arreglos generados pseudoaleatoriamente.

CombinatorialOrchestrator.js (Motor Predictivo):
Genera combinaciones exhaustivas (producto cartesiano) de los parámetros de prueba y aplica un analizador estático para categorizarlos por nivel de riesgo (Alto, Medio, Bajo). Integra un modelo de Machine Learning estocástico básico que ajusta dinámicamente los "pesos" de riesgo basándose en el historial de fallos.

MetricsDashboard.js (Telemetría de Calidad):
Captura métricas en tiempo de ejecución, calculando:

Tiempos de ejecución por módulo.

Detección activa de pruebas inestables (Flaky Tests).

Complejidad Ciclomática mediante la relación de nodos y aristas.

Ratio de cobertura frente a defectos detectados.

Cómo Ejecutar el Pipeline
Para iniciar el orquestador y observar la generación del Dashboard Interactivo en la terminal, el flujo principal se concentra en el script maestro.

Comando de ejecución:

Bash
node MainPipeline.js
Este comando lanzará las 4 fases del pipeline: generación de casos, priorización predictiva, ejecución de pruebas unitarias capturando telemetría, y la impresión final del consolidado estadístico.

Este proyecto demuestra la viabilidad de transformar el QA tradicional en un departamento proactivo de ingeniería mediante métricas y automatización inteligente.
