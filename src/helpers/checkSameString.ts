export function CheckSameString(str1: string, str2: string) {
  if (str1.length !== str2.length) {
    return false;
  } else {
    if (str1 !== str2) {
      return false;
    } else {
      return true;
    }
  }
}
