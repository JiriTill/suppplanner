import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';


const dataDir = path.join(process.cwd(), 'data');


async function walk(dir) {
const entries = await readdir(dir, { withFileTypes: true });
const files = [];
for (const e of entries) {
const full = path.join(dir, e.name);
if (e.isDirectory()) files.push(...await walk(full));
else if (e.isFile() && e.name.endsWith('.json')) files.push(full);
}
return files;
}


function requireKey(obj, key, file) {
if (!(key in obj)) throw new Error(`Missing key "${key}"`);
}


const errors = [];


const files = await walk(dataDir);
for (const file of files) {
const raw = await readFile(file, 'utf-8');
try {
const json = JSON.parse(raw);
if (file.includes(`${path.sep}ingredients${path.sep}`)) {
requireKey(json, 'slug', file);
requireKey(json, 'title', file);
requireKey(json, 'summary', file);
requireKey(json, 'goals', file);
}
} catch (e) {
errors.push({ file, message: e.message });
}
}


if (errors.length) {
console.error('❌ Data validation failed:');
for (const e of errors) console.error(` - ${e.file}: ${e.message}`);
process.exit(1);
}


console.log(`✅ Data validated (${files.length} JSON files)`);
