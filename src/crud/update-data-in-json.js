import { readJson } from "./read-json";


export function update(path, id, dataToUpdate) {
  try {
    let data = readJson(path) ?? [];
    data.forEach((item) => {
      if (data[id]) {
        data[id] = {
          ...data, dataToUpdate
        }
      }
    })
  
    const dataUpdated = JSON.stringify(data)
    console.log(dataUpdated);
  } catch (error) {
    return error;
  }
}