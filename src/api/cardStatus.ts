import {del, get, post} from './requestStructure';

const endpoint = 'card-status';

interface Card {
  user_type: string;
  user_id: string;
  status: string;
}

export async function updateUserCardStatus(data: Card) {
  const res = await post(endpoint, data);
  return res;
}
export async function getUserCardStatus(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
