import { UserInfo } from '../models/UserInfo';

export async function getUserInfo(origin: string): Promise<UserInfo> {
  try {
    const resp = await fetch(`${origin}/api/getuserinfo?type=4`);
    return await resp.json();
  } catch (err) {
    console.error('[Rewards Summary]', err.message);
  }
}
