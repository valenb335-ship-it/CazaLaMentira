import fs from 'fs';
import path from 'path';

const triviaFile = path.resolve(process.cwd(), 'app/data/triviaData.ts');
let fileContent = fs.readFileSync(triviaFile, 'utf8');

// Dividimos el archivo en secciones para saber si son mentiras o verdades
const curatedPart = fileContent.split('export const INFINITE_POOL')[0];
const infinitePart = fileContent.split('export const INFINITE_POOL')[1] || '';

const truePoolPart = infinitePart.split('convincingLies: [')[0];
const liesPoolPart = infinitePart.split('convincingLies: [')[1] || '';

function parseFacts(textChunk, defaultIsLie) {
  const itemRegex = /{\s*id:\s*['"]([^'"]+)['"][\s\S]*?text:\s*['"]([^'"]+)['"][\s\S]*?explanation:\s*['"]([^'"]+)['"][\s\S]*?category:\s*['"]?([a-z]+)['"]?[\s\S]*?difficulty:\s*([1-5])/g;
  const items = [];
  let m;
  while ((m = itemRegex.exec(textChunk)) !== null) {
    let isLie = defaultIsLie;
    const isLieMatch = /isLie:\s*(true|false)/.exec(m[0]);
    if (isLieMatch) {
      isLie = isLieMatch[1] === 'true';
    }
    items.push({
      id: m[1],
      statement: m[2],
      is_lie: isLie,
      explanation: m[3],
      category_id: m[4],
      difficulty_level: parseInt(m[5], 10),
    });
  }
  return items;
}

const curatedFacts = parseFacts(curatedPart, false);
const truePoolFacts = parseFacts(truePoolPart, false);
const liesPoolFacts = parseFacts(liesPoolPart, true);

const allFacts = [...curatedFacts, ...truePoolFacts, ...liesPoolFacts];

// Eliminar duplicados por texto
const uniqueMap = new Map();
allFacts.forEach(f => uniqueMap.set(f.statement, f));
const uniqueFacts = Array.from(uniqueMap.values());

console.log(`Curadas: ${curatedFacts.length}`);
console.log(`True Pool: ${truePoolFacts.length}`);
console.log(`Lies Pool: ${liesPoolFacts.length}`);
console.log(`Total únicos: ${uniqueFacts.length}`);

function escapeSql(str) {
  return str.replace(/'/g, "''");
}

let sqlInserts = `-- ==========================================================\n`;
sqlInserts += `-- DATOS CURIOSOS Y MENTIRAS (CATÁLOGO COMPLETO)\n`;
sqlInserts += `-- Total de datos curiosos: ${uniqueFacts.length}\n`;
sqlInserts += `-- ==========================================================\n\n`;

for (const f of uniqueFacts) {
  const statement = escapeSql(f.statement);
  const explanation = escapeSql(f.explanation);
  sqlInserts += `INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)\n`;
  sqlInserts += `VALUES ('${f.category_id}', '${statement}', ${f.is_lie}, '${explanation}', ${f.difficulty_level}, true)\n`;
  sqlInserts += `ON CONFLICT DO NOTHING;\n\n`;
}

fs.writeFileSync(path.resolve(process.cwd(), 'seed_facts.sql'), sqlInserts, 'utf8');
console.log('Archivo seed_facts.sql generado con éxito.');
