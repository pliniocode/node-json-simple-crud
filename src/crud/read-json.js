import { open } from 'node:fs/promises';

/**
 * 
 * @param {URL} path 
 * @returns 
 */
export async function readJson(path) {
  let file;
  try {
    // Open the file
    file = await open(path, 'r');
    // Get Length file to create buffer where will
    // store file data in memory
    const { size } = await file.stat()
    // Buffer of the file data
    const buff = Buffer.alloc(size);
    // Read data from file e save on buffer
    await file.read(buff, 0, buff.byteLength, 0);
    // Convert data from buffer in JSON format
    const dataJson = JSON.parse(buff);
    return dataJson;
  } catch (error) {
    return error;
  } 
  finally { // study more about finally on JS
    await file?.close();
  }
}