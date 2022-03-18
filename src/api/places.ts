import {get} from './requestStructure';
import {GOOGLE_MAPS_API_KEY} from '../constants/url';

export const placeAutocomplete = async (place: string) => {
  const endp =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
    place +
    '&key=' +
    GOOGLE_MAPS_API_KEY;
  return (
    fetch(endp, {
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
export const findPlaceByText = async (place: string) => {
  const end =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?' +
    'input=' +
    place +
    '&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=' +
    GOOGLE_MAPS_API_KEY;
  const endp = end.replace(/\s/g, '');

  return (
    fetch(endp, {
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
