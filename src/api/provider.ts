import {del, get, post} from './requestStructure';

const endpoint = 'provider';

export async function showAllProviders() {
  const res = await get(endpoint);
  return res;
}
export async function showProviderWithId(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
