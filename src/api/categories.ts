import {del, get, post} from './requestStructure';

const endpoint = 'categories';

export async function getAllServices() {
  const res = await get(endpoint);
  return res;
}
