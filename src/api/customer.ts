import {del, get, post} from './requestStructure';

export interface RegisterCustomer {
  fuid: string;
  name: string;
  email: string;
  status: string;
  phone: string;
  location?: string;
  avatar?: string;
  longitude?: string;
  latitude?: string;
  country?: string;
}

const endpoint = 'customer';

export async function createCustomer(data: RegisterCustomer) {
  const res = await post(endpoint, data);
  return res;
}
export async function showUser(fuid: string) {
  const res = await get(endpoint + '/' + fuid);
  return res;
}
export async function deleteCustomer(id: string) {
  const res = await del(endpoint + '/' + id);
  return res;
}
