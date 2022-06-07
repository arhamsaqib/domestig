import {del, get, post, put} from './requestStructure';

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
  stripeId?: string;
}

export interface UpdateProvider {
  phone?: string;
  location?: string;
  avatar?: string;
  longitude?: string;
  latitude?: string;
  country?: string;
  working_status?: string;
}

const endpoint = 'customer';

export async function updateCustomer(customerId: string, data: UpdateProvider) {
  const res = await put(endpoint + '/' + customerId, data);
  return res;
}

export async function createCustomer(data: RegisterCustomer) {
  const res = await post(endpoint, data);
  return res;
}
export async function showCustomerByFUID(fuid: string) {
  const res = await get(endpoint + '/' + fuid);
  return res;
}

export async function getCustomerById(id: string) {
  var endpoint = 'get-customer-by-id';
  const res = await get(endpoint + '/' + id);
  return res;
}

export async function deleteCustomer(id: string) {
  const res = await del(endpoint + '/' + id);
  return res;
}
