import {del, get, post} from './requestStructure';

export interface RegisterCustomer {
  booking_id: string;
  providers: [];
}

const endpoint = 'booking-requests';

export async function createBookingRequest(data: RegisterCustomer) {
  const res = await post(endpoint, data);
  return res;
}
// export async function showCustomerByFUID(fuid: string) {
//   const res = await get(endpoint + '/' + fuid);
//   return res;
// }
// export async function deleteCustomer(id: string) {
//   const res = await del(endpoint + '/' + id);
//   return res;
// }
