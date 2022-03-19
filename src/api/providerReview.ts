import {del, get, post, put} from './requestStructure';

export interface Review {
  provider_id?: string;
  booking_id?: string;
  customer_id?: string;
  rating?: string;
  stars?: string;
}

const endpoint = 'provider-reviews';

export async function saveProviderReview(data: Review) {
  const res = await post(endpoint, data);
  return res;
}
export async function getProviderReviews(customerId: any) {
  const res = await get(endpoint + '/' + customerId);
  return res;
}
