import { writeFile } from 'node:fs/promises';
import { readJson } from './read-json.js';

export async function create(path, newData) {
  try {
    let dataJson = await readJson(path) ?? []; 
    dataJson = JSON.stringify([...dataJson, newData]);
    // The return is necessary 
    return writeFile(path, dataJson);
  } catch (error) {
    return error;
  } 
}