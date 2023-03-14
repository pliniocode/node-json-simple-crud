import { writeFile } from 'node:fs/promises';
import { readJson } from './read-json.js';

/**
 * 
 * @param {URL} path 
 * @param {int | string} id 
 * @returns {void | undefined}
 */
export async function remove(path, id) {
  try {
    let data = await readJson(path) ?? [];
    const index = data.findIndex((row) => row.id === id);

    if (index > -1 ) {
      const dataChanged = data.filter((row) => row.id !== id );
      const changedData = JSON.stringify(dataChanged);
      return await writeFile(path, changedData);
    }
    return undefined;
  } catch (error) {
    return error;
  }
}