import {del, get, post} from './requestStructure';

export interface CustomerBooking {
  customer_id: string;
  status?: string;
}

const endpoint = 'customer-active-booking';

export async function getCustomerActiveBookings(data: CustomerBooking) {
  const res = await post(endpoint, data);
  return res;
}
export async function updateCustomerBooking(
  bookingId: string,
  data: {status: string},
) {
  const res = await get(endpoint + '/' + bookingId);
  return res;
}
// export async function showpProviderAllBookings(id: string) {
//   const endp = 'show-provider-bookings';
//   const res = await get(endp + '/' + id);
//   return res;
// }
// export async function deleteCustomer(id: string) {
//   const res = await del(endpoint + '/' + id);
//   return res;
// }
