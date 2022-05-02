import {get, post} from './requestStructure';

const endpoint = 'user-referrals';

interface ReferralGen {
  user_type: string;
  name: string;
  uid: string;
}
interface find {
  user_type: string;
  uid: string;
}

export async function viewAllusers() {
  const res = await get(endpoint);
  return res;
}
export async function viewUserReferralCode(data: find) {
  const endp = 'find-user-referral';
  const res = await post(endp, data);
  return res;
}
export async function generateReferralCode(data: ReferralGen) {
  const res = await post(endpoint, data);
  return res;
}
