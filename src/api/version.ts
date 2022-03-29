import {get} from './requestStructure';

const endpoint = 'version-c';

export async function getLatestVersion() {
  const res = await get(endpoint);
  return res;
}
