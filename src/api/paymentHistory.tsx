import {del, get, post, put} from './requestStructure';

const endpoint = 'payment-history';

interface Payment {
  provider_id?: string;
  customer_id?: string;
  booking_id?: string;
  invoice_id?: string;
  status?: string;
  amount?: string;
}

export async function generatePayment(data: Payment) {
  const res = await post(endpoint, data);
  return res;
}
export async function viewPaymentHistoryByBookingId(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
export async function updatePayment(bookingId: string, data: Payment) {
  const res = await put(endpoint + '/' + bookingId, data);
  return res;
}
