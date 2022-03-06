export function arrayOfObjectsSearchWithId(id: string, myArray: any) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].id === id) {
      return true;
    }
  }
  return false;
}
