import {del, get, post, put} from './requestStructure';

export interface RegisterCustomerAdress {
  name: string;
  location?: string;
  longitude?: string;
  latitude?: string;
  customer_id?: string;
}

export interface UpdateCustomerAddress {
  name: string;
  location?: string;
  longitude?: string;
  latitude?: string;
}

const endpoint = 'customer-addresses';
export async function updateCustomerAddress(
  addressId: string,
  data: UpdateCustomerAddress,
) {
  const res = await put(endpoint + '/' + addressId, data);
  return res;
}

export async function createCustomerAddress(data: RegisterCustomerAdress) {
  const res = await post(endpoint, data);
  return res;
}
export async function showCustomerAllAddresses(customerId: string) {
  const res = await get(endpoint + '/' + customerId);
  return res;
}

export async function deleteCustomerAddresss(id: string) {
  const res = await del(endpoint + '/' + id);
  return res;
}
