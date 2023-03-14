import { remove, create, readJson } from './src/crud/index.js';
import { pathFile } from './src/config/path-file.js';


(async () => {
  // await create(pathFile, {id: new Date(), name: 'Descartes'});
  await remove(pathFile, '2023-03-13T23:30:06.744Z');
  const dataJson = await readJson(pathFile);
  console.log(dataJson);
})();






