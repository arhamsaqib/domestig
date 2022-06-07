import {STRIPE_BASE_URL} from '../../constants/url';

export interface NewCard {
  //   id: 'card_1L3oKoDPoMFOHLWbEOBbBz5e';
  object?: 'card';
  address_city?: null;
  address_country?: null;
  address_line1?: null;
  address_line1_check?: null;
  address_line2?: null;
  address_state?: null;
  address_zip?: null;
  address_zip_check?: null;
  brand?: 'Visa';
  country?: 'US';
  customer?: null;
  cvc_check?: 'pass';
  dynamic_last4?: null;
  exp_month?: 8;
  exp_year?: 2023;
  fingerprint?: '2HX0BWHQGdKS1gEe';
  funding?: 'credit';
  last4?: '4242';
  metadata?: {};
  name?: null;
  tokenization_method?: null;
}

interface CardToken {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  name?: string;
}

export const createStriprCustomerCard = async (
  cardToken: string,
  customerId: string,
) => {
  const endpoint = STRIPE_BASE_URL + '/v1/customers/' + customerId + '/sources';
  const query = '?source=' + cardToken;
  return fetch(endpoint + query, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Bearer ' +
        'sk_test_51L2bzJDPoMFOHLWbr12HARtXLyBiuCJzMVKn1Ala2ETrQAZDMPlvaNsCMGayB5Oq5iZegDFSJSZ9PQ1ucFE58ooz00xRF9eRO3',
    },
    body: JSON.stringify({}),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error, 'error');
    });
};
export const createCardToken = async (data: CardToken) => {
  const endpoint = STRIPE_BASE_URL + '/v1/tokens';
  const query =
    '?card[number]=' +
    data.number +
    '&card[exp_month]=' +
    data.expiryMonth +
    '&card[exp_year]=' +
    data.expiryYear +
    '&card[cvc]=' +
    data.cvc +
    '&card[name]=' +
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
