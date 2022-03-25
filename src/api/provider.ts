import {del, get, post} from './requestStructure';

const endpoint = 'provider';

export async function showAllProviders() {
  const res = await get(endpoint);
  return res;
}
export async function showProvidersByLocation(data: {
  lat: string;
  lng: string;
}) {
  const endpoint = 'provider-by-location';
  const res = await post(endpoint, data);
  return res;
}
export async function showProviderWithId(id: string) {
  var endpoint = 'get-provider-by-id';
  const res = await get(endpoint + '/' + id);
  return res;
}
