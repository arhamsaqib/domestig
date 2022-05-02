import {del, get, post} from './requestStructure';

const endpoint = 'invoices';

interface FindInvoices {
  provider_id?: string;
  customer_id?: string;
  booking_id?: string;
}
interface GenerateInvoice {
  provider_id?: string;
  customer_id?: string;
  booking_id?: string;
  extra_work?: string;
  extra_work_charges?: string;
  amount?: string;
  total_amount?: string;
}

export async function generateInvoice(data: GenerateInvoice) {
  const res = await post(endpoint, data);
  return res;
}
export async function viewInvoiceByBookingId(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
export async function findInvoices(data: FindInvoices) {
  const endp = 'find-invoices';
  const res = await post(endp, data);
  return res;
}
