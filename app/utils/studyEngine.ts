import { Fact, TriviaRound } from '../types/game';
import { shuffleArray } from './infiniteEngine';

// Antónimos y parejas de conceptos polares para crear mentiras convincentes
const POLAR_SWAPS: [RegExp, string][] = [
  [/\baumenta\b/gi, 'disminuye'],
  [/\bdisminuye\b/gi, 'aumenta'],
  [/\bmayor\b/gi, 'menor'],
  [/\bmenor\b/gi, 'mayor'],
  [/\bprimero\b/gi, 'último'],
  [/\bprimera\b/gi, 'última'],
  [/\bantes\b/gi, 'después'],
  [/\bdespués\b/gi, 'antes'],
  [/\banterior\b/gi, 'posterior'],
  [/\bposterior\b/gi, 'anterior'],
  [/\bestimula\b/gi, 'inhibe'],
  [/\binhibe\b/gi, 'estimula'],
  [/\bpositiva\b/gi, 'negativa'],
  [/\bnegativa\b/gi, 'positiva'],
  [/\bpositivo\b/gi, 'negativo'],
  [/\bnegativo\b/gi, 'positivo'],
  [/\bactivo\b/gi, 'pasivo'],
  [/\bpasivo\b/gi, 'activo'],
  [/\bdirectamente\b/gi, 'inversamente'],
  [/\binversamente\b/gi, 'directamente'],
  [/\binterior\b/gi, 'exterior'],
  [/\bexterior\b/gi, 'interior'],
  [/\bsiempre\b/gi, 'rara vez'],
  [/\bnunca\b/gi, 'frecuentemente'],
  [/\bexclusivamente\b/gi, 'ocasionalmente'],
  [/\bdepende\b/gi, 'es totalmente independiente'],
];

// Limpia y extrae proposiciones/oraciones con contenido factual del texto
export function extractPropositionsFromText(rawText: string): string[] {
  if (!rawText || rawText.trim().length === 0) return [];

  // Dividir por saltos de línea, viñetas o puntos
  const cleanLines = rawText
    .replace(/\r\n/g, '\n')
    .split(/\n+|\. |\; /)
    .map((line) => line.replace(/^[\s\-*•\d\.\)]+/, '').trim())
    .filter((line) => {
      // Filtrar oraciones con longitud adecuada para contener un hecho
      return line.length >= 25 && line.length <= 250 && !line.startsWith('#');
    });

  // Eliminar duplicados
  return Array.from(new Set(cleanLines));
}

// Modifica sutilmente una oración real para convertirla en una mentira muy verosímil
function generateConvincingLie(originalSentence: string): { lieText: string; explanation: string } {
  // 1. Intentar alterar números o años (ej: 1945 -> 1954, 50% -> 15%)
  const numberMatch = originalSentence.match(/\b(\d+)\b/);
  if (numberMatch && numberMatch.index !== undefined) {
    const num = parseInt(numberMatch[1], 10);
    let alteredNum = num;
    if (num > 1500 && num < 2100) {
      // Es probable que sea un año histórico: alterar ligeramente la década
      alteredNum = num % 2 === 0 ? num + 7 : num - 9;
    } else if (num > 10) {
      alteredNum = Math.round(num * 1.5);
    } else if (num > 1) {
      alteredNum = num + 3;
    } else {
      alteredNum = 5;
    }

    const lieText =
      originalSentence.slice(0, numberMatch.index) +
      alteredNum.toString() +
      originalSentence.slice(numberMatch.index + numberMatch[1].length);

    return {
      lieText,
      explanation: `¡Es mentira! En tus apuntes dice: "${originalSentence}". El valor original era ${num} y no ${alteredNum}.`,
    };
  }

  // 2. Intentar invertir un concepto polar o relación clave
  for (const [regex, replacement] of POLAR_SWAPS) {
    if (regex.test(originalSentence)) {
      const lieText = originalSentence.replace(regex, replacement);
      return {
        lieText,
        explanation: `¡Es mentira! El texto real indica: "${originalSentence}". Se alteró la relación clave (${replacement}).`,
      };
    }
  }

  // 3. Negación o inversión sutil de cualidad
  if (/\b es \b/i.test(originalSentence)) {
    const lieText = originalSentence.replace(/\b es \b/i, ' no es considerado ');
    return {
      lieText,
      explanation: `¡Es mentira! En tus apuntes se afirma: "${originalSentence}".`,
    };
  }

  if (/\b fue \b/i.test(originalSentence)) {
    const lieText = originalSentence.replace(/\b fue \b/i, ' jamás fue ');
    return {
      lieText,
      explanation: `¡Es mentira! Según tus apuntes: "${originalSentence}".`,
    };
  }

  // Fallback: prefijo deceptivo
  const lieText = `Contrario a la creencia común, ${originalSentence.charAt(0).toLowerCase()}${originalSentence.slice(1)}`;
  return {
    lieText,
    explanation: `¡Es mentira! El material de estudio indica directamente: "${originalSentence}".`,
  };
}

// Genera rondas de 2 verdades y 1 mentira a partir del texto de estudio
export function generateStudyRoundsFromText(title: string, rawText: string): TriviaRound[] {
  const sentences = extractPropositionsFromText(rawText);

  if (sentences.length < 3) {
    throw new Error('El texto debe contener al menos 3 oraciones o afirmaciones para generar la trivia.');
  }

  const shuffledSentences = shuffleArray(sentences);
  const rounds: TriviaRound[] = [];
  const totalRounds = Math.floor(shuffledSentences.length / 3);

  for (let i = 0; i < totalRounds; i++) {
    const chunk = shuffledSentences.slice(i * 3, i * 3 + 3);
    const truthSentence1 = chunk[0];
    const truthSentence2 = chunk[1];
    const lieBaseSentence = chunk[2];

    // Generar la mentira a partir de la 3ra oración
    const { lieText, explanation: lieExplanation } = generateConvincingLie(lieBaseSentence);

    const factTruth1: Fact = {
      id: `study-truth-1-${i}-${Date.now()}`,
      text: truthSentence1,
      isLie: false,
      explanation: `¡Dato Verídico! Extraído de tus notas: "${truthSentence1}".`,
      category: 'estudio',
      difficulty: 3,
    };

    const factTruth2: Fact = {
      id: `study-truth-2-${i}-${Date.now()}`,
      text: truthSentence2,
      isLie: false,
      explanation: `¡Dato Verídico! Extraído de tus notas: "${truthSentence2}".`,
      category: 'estudio',
      difficulty: 3,
    };

    const factLie: Fact = {
      id: `study-lie-${i}-${Date.now()}`,
      text: lieText,
      isLie: true,
      explanation: lieExplanation,
      category: 'estudio',
      difficulty: 4,
    };

    const roundFacts = shuffleArray([factTruth1, factTruth2, factLie]);

    rounds.push({
      id: `study-round-${i + 1}`,
      level: i + 1,
      category: 'estudio',
      themeTitle: `${title} • Nivel ${i + 1} de ${totalRounds}`,
      facts: roundFacts,
    });
  }

  return rounds;
}

// Ejemplos precargados para probar con 1 solo clic
export const SAMPLE_STUDY_MATERIALS = [
  {
    title: 'Biología Celular y Genética',
    text: `El ADN contiene las instrucciones genéticas usadas en el desarrollo de todos los organismos vivos.
Las mitocondrias son consideradas las centrales energéticas de la célula encargadas de sintetizar ATP.
El ARN mensajero transporta la información desde el núcleo celular hasta los ribosomas en el citoplasma.
La membrana plasmática está formada por una bicapa lipídica que regula el paso de sustancias hacia el interior celular.
Los ribosomas son los complejos supramoleculares encargados de ensamblar las proteínas según el código genético.
El retículo endoplasmático rugoso presenta ribosomas adheridos a su superficie exterior encargados de síntesis proteica.
La mitosis es el proceso de división celular que produce dos células hijas genéticamente idénticas.
Los cloroplastos en las células vegetales contienen clorofila y son responsables de la fotosíntesis.
El núcleo celular protege el material genético y coordina las actividades principales de la célula.`,
  },
  {
    title: 'Historia: La Revolución Industrial',
    text: `La Primera Revolución Industrial comenzó en Gran Bretaña hacia la segunda mitad del siglo XVIII.
La máquina de vapor perfeccionada por James Watt en 1769 impulsó el transporte marítimo y ferroviario.
La industria textil del algodón fue el primer sector en mecanizar su producción a gran escala.
El carbón mineral sustituyó a la leña como la principal fuente de energía térmica para la fundición de hierro.
La invención del ferrocarril redujo drásticamente el tiempo de transporte de mercancías entre ciudades industriales.
El crecimiento de las fábricas provocó un éxodo rural masivo hacia las grandes ciudades británicas.
El telégrafo eléctrico inventado por Samuel Morse en 1837 revolucionó la velocidad de las comunicaciones a distancia.
Las jornadas laborales en las primeras factorías textiles superaban con frecuencia las 14 horas diarias.
La burguesía industrial emergió como una clase social dominante propietaria de los medios de producción.`,
  },
];
