import {del, get, post} from './requestStructure';

export interface RegisterBooking {
  customer_id: string;
  provider_id?: string;
  schedule: string;
  date?: string;
  time?: string;
  payment_type?: string;
  instructions?: string;
  instructions_image?: string;
  latitude?: string;
  longitude?: string;
  location?: string;
}

const endpoint = 'bookings';

export async function createBookings(data: RegisterBooking) {
  const res = await post(endpoint, data);
  return res;
}
export async function showAllCustomerBookings(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
// export async function deleteCustomer(id: string) {
//   const res = await del(endpoint + '/' + id);
//   return res;
// }
