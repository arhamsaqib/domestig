import {del, get, post} from './requestStructure';

export interface Message {
  booking_id: string;
  provider_id: string;
  customer_id?: string;
  message: string;
  sent_by: string;
}

const endpoint = 'messages';

export async function sendMessage(data: Message) {
  const res = await post(endpoint, data);
  return res;
}

export async function receiveMessages(data: {
  provider_id: string;
  booking_id: string;
  customer_id: string;
}) {
  var endpoint = 'fetch-messages';
  const res = await post(endpoint, data);
  return res;
}
