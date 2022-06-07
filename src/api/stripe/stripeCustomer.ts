import {STRIPE_BASE_URL} from '../../constants/url';

interface StripeUserProps {
  address?: string;
  description?: string;
  email?: string;
  name?: string;
}

export const createStripeCustomer = async (data: StripeUserProps) => {
  const endpoint = STRIPE_BASE_URL + '/v1/customers';
  const query =
    // '?address=' +
    // data.address +
    '?description=' +
    data.description +
    '&email=' +
    data.email +
    '&name=' +
    data.name;
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
export const getStripeCustomer = async (stripeId: string) => {
  const endpoint = STRIPE_BASE_URL + '/v1/customers/' + stripeId;

  return fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Bearer ' +
        'sk_test_51L2bzJDPoMFOHLWbr12HARtXLyBiuCJzMVKn1Ala2ETrQAZDMPlvaNsCMGayB5Oq5iZegDFSJSZ9PQ1ucFE58ooz00xRF9eRO3',
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error, 'error');
    });
};
