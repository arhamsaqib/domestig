import {STRIPE_BASE_URL} from '../../constants/url';

interface StripeUserProps {
  amount?: string;
  currency?: string;
  payment_method_types?: string;
  customer: string;
  card: string;
}

export const createStripePaymentIntent = async (data: StripeUserProps) => {
  const endpoint = STRIPE_BASE_URL + '/v1/payment_intents';
  const query =
    '?amount=' +
    data.amount +
    '&currency=' +
    data.currency +
    '&payment_method_types[]=' +
    data.payment_method_types +
    '&payment_method=' +
    data.card +
    '&customer=' +
    data.customer;
  return fetch(endpoint + query, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Bearer ' +
        'sk_test_51L2bzJDPoMFOHLWbr12HARtXLyBiuCJzMVKn1Ala2ETrQAZDMPlvaNsCMGayB5Oq5iZegDFSJSZ9PQ1ucFE58ooz00xRF9eRO3',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error, 'error');
    });
};
export const confirmStripePaymentIntent = async (
  //data: any,
  paymentId: string,
) => {
  const endpoint =
    STRIPE_BASE_URL + '/v1/payment_intents/' + paymentId + '/confirm';
  //   const query = '?payment_method=' + data;
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Bearer ' +
        'sk_test_51L2bzJDPoMFOHLWbr12HARtXLyBiuCJzMVKn1Ala2ETrQAZDMPlvaNsCMGayB5Oq5iZegDFSJSZ9PQ1ucFE58ooz00xRF9eRO3',
    },
    // body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error, 'error');
    });
};
