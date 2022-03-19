import {del, get, post} from './requestStructure';

const endpoint = 'booking-reviews';

export async function getBookingReviews(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
