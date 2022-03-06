import {firebase} from '@react-native-firebase/auth';

export function extractKeys(arr: []) {
  let result = arr.map((a: any) => a.name);
  return result;
}

export function joinArrayKeys(arr: any) {
  var newArr = '';
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    newArr = newArr + ' ' + element + ',';
  }
  return newArr;
}
