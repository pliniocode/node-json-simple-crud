import { writeFile } from 'node:fs/promises';
import { readJson } from './read-json.js';

/**
 * 
 * @param {URL} path 
 * @param {int | string} id 
 * @param {object} dataToUpdate 
 * @returns {void}
 */
export async function update(path, id, dataToUpdate) {
  try {
    let data = await readJson(path) ?? [];
    const index = data.findIndex((row) => row.id === id);

    if (index > -1 ) {
      data[index] = {id, ...dataToUpdate};
    }

    const dataUpdated = JSON.stringify(data);
    return await writeFile(path, dataUpdated);
  } catch (error) {
    return error;
  }
}