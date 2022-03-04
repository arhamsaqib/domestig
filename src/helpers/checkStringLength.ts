export function CheckStringLength(str: string, length: number) {
  if (str.length >= length) {
    return true;
  }
  return false;
}
