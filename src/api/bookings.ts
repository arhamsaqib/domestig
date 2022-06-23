import {del, get, post, put} from './requestStructure';

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
  current?: string;
}
export interface Update {
  provider_id?: string;
  schedule?: string;
  date?: string;
  time?: string;
  payment_type?: string;
  instructions?: string;
  instructions_image?: string;
  latitude?: string;
  longitude?: string;
  location?: string;
  status?: string;
}

const endpoint = 'bookings';

export async function createBookings(data: RegisterBooking) {
  const res = await post(endpoint, data);
  return res;
}
export async function updateBooking(bookingId: string, data: Update) {
  const res = await put(endpoint + '/' + bookingId, data);
  return res;
}
export async function showAllCustomerBookings(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
export async function showpProviderAllBookings(id: string) {
  const endp = 'show-provider-bookings';
  const res = await get(endp + '/' + id);
  return res;
}
export async function getBookingById(id: string) {
  const endp = 'get-booking-by-id';
  const res = await get(endp + '/' + id);
  return res;
}
// export async function deleteCustomer(id: string) {
//   const res = await del(endpoint + '/' + id);
//   return res;
// }
