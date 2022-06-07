import {STRIPE_BASE_URL} from '../../constants/url';

interface TransactionProps {
  amount?: string;
  currency?: string;
  account?: string;
}

// export const stripeTransfer = async (
//   data: TransactionProps,
//   stripeId: string,
// ) => {
//   const endpoint =
//     STRIPE_BASE_URL + '/v1/transfers/' + stripeId + '/balance_transactions';
//   const query = '?amount=' + data.amount + '&currency=' + data.currency;
//   return fetch(endpoint + query, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization:
//         'Bearer ' +
//         'sk_test_51L2bzJDPoMFOHLWbr12HARtXLyBiuCJzMVKn1Ala2ETrQAZDMPlvaNsCMGayB5Oq5iZegDFSJSZ9PQ1ucFE58ooz00xRF9eRO3',
//     },
//   })
//     .then(response => response.json())
//     .then(json => {
//       return json;
//     })
//     .catch(error => {
//       console.error(error, 'error');
//     });
// };
export const stripeTransfer = async (
  data: TransactionProps,
  // stripeId: string,
) => {
  const endpoint = STRIPE_BASE_URL + '/v1/transfers';
  const query =
    '?amount=' +
    data.amount +
    '&currency=' +
    data.currency +
    '&destination=' +
    data.account;
  return fetch(endpoint + query, {
    method: 'POST',
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
export const getCustomerTransaction = async (stripeId: string) => {
  const endpoint =
    STRIPE_BASE_URL + '/v1/customers/' + stripeId + '/balance_transactions';
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

//jwd80
