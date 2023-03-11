import { update, readJson } from './src/crud/index.js';
import { pathFile } from './src/config/path-file.js';


(async () => {
  // await update(pathFile, {id: new Date(), name: 'Hassan'});
  const dataJson = await readJson(pathFile);
  console.log(dataJson);
})();






