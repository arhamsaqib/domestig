import {del, get, post, put} from './requestStructure';

// export interface bookingSubmission {
//   booking_id: string;
//   provider_id: string;
//   before_work_image?: string;
//   after_work_image?: string;
//   time_taken?: string;
// }

const endpoint = 'booking-submission';

// export async function createBookingSubmission(data: bookingSubmission) {
//   const res = await post(endpoint, data);
//   return res;
// }
// export async function updateBookingSubmission(
//   bookingId: string,
//   data: bookingSubmission,
// ) {
//   const res = await put(endpoint + '/' + bookingId, data);
//   return res;
// }

export async function showBookingSubmission(booking_id: string) {
  const res = await get(`${endpoint}/${booking_id}`);
  return res;
}
