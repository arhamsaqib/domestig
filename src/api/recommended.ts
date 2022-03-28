import {del, get, post, put} from './requestStructure';

const endpoint = 'recommended';

interface Rec {
  lat: string;
  lng: string;
}

export async function getRecommended(data: Rec) {
  const res = await post(endpoint, data);
  return res;
}
