import {URL} from '../constants/url';

export const post = async (endpoint: string, data: object) => {
  return fetch(URL + endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
export const get = async (endpoint: string) => {
  return (
    fetch(URL + endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(data),
    })
      //.then(response => console.log(response.status, 'Status of the request'))
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error, 'error');
      })
  );
};
export const del = async (endpoint: string, data?: any) => {
  return fetch(URL + endpoint, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    //body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error, 'error');
    });
};
export const put = async (endpoint: string, data: any) => {
  return fetch(URL + endpoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
