/**
 * HybridFramework.js
 * Extensión de Jasmine para Testing Avanzado
 */

class HybridFramework {
  
  // 1. Mocking avanzado con espías personalizados
  // Crea un mock que simula tiempos de espera o errores de red para pruebas de integración
  static createAdvancedSpy(spyName, mockData, simulateDelay = false, delayMs = 100) {
    const spy = jasmine.createSpy(spyName);
    
    if (simulateDelay) {
      spy.and.callFake(() => {
        return new Promise(resolve => setTimeout(() => resolve(mockData), delayMs));
      });
    } else {
      spy.and.returnValue(mockData);
    }
    
    // Añadimos una propiedad personalizada para medir uso
    spy.customMetadata = { createdAt: new Date(), callsExpected: true };
    return spy;
  }

  // 2. Generación automática de pruebas basada en tipos
  // Recibe una función y genera casos de prueba inyectando datos aleatorios según el tipo
  static autoGenerateTests(targetFunction, expectedInputType, iterations = 3) {
    describe(`Auto-Generated Tests for ${targetFunction.name}`, () => {
      for (let i = 0; i < iterations; i++) {
        let testValue;
        
        // Generador de tipos básicos
        switch (expectedInputType) {
          case 'number':
            testValue = Math.floor(Math.random() * 100);
            break;
          case 'string':
            testValue = Math.random().toString(36).substring(7);
            break;
          case 'boolean':
            testValue = Math.random() < 0.5;
            break;
          default:
            testValue = null;
        }

        it(`debería ejecutar sin fallos críticos con el tipo ${expectedInputType} (Valor: ${testValue})`, () => {
          expect(() => targetFunction(testValue)).not.toThrow();
        });
      }
    });
  }

  // 3. Orquestador de Pruebas de Integración
  // Ejecuta una secuencia de funciones verificando que el flujo de datos no se rompa
  static runIntegrationFlow(flowName, stepsArray, initialInput) {
    describe(`Prueba de Integración Automática: ${flowName}`, () => {
      it('debería completar el flujo de integración de inicio a fin', async () => {
        let currentData = initialInput;
        for (let i = 0; i < stepsArray.length; i++) {
          currentData = await stepsArray[i](currentData);
          expect(currentData).toBeDefined();
        }
      });
    });
  }
}

module.exports = HybridFramework;