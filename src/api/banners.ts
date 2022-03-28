import {del, get, post, put} from './requestStructure';

const endpoint = 'banners';

export async function viewAllBanners() {
  const res = await get(endpoint);
  return res;
}
export async function getBannerWithCode(code: string) {
  const res = await get(endpoint + '/' + code);
  return res;
}
