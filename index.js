import { update, create, readJson } from './src/crud/index.js';
import { pathFile } from './src/config/path-file.js';


(async () => {
  // await create(pathFile, {id: new Date(), name: 'Hassan'});
  await update(pathFile, '2023-03-11T11:47:33.097Z', {name: 'Hssana Osink'});
  const dataJson = await readJson(pathFile);
  console.log(dataJson);
})();






