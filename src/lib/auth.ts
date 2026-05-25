import Cookies from 'js-cookie';
import type { User, AuthTokens } from '@/types';

const ACCESS_TTL = 1 / 96;
const REFRESH_TTL = 7;

export function saveTokens(tokens: AuthTokens) {
  Cookies.set('access_token', tokens.accessToken, { expires: ACCESS_TTL, sameSite: 'strict' });
  Cookies.set('refresh_token', tokens.refreshToken, { expires: REFRESH_TTL, sameSite: 'strict' });
}

export function clearTokens() {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  localStorage.removeItem('hv_user');
}

export function saveUser(user: User) {
  localStorage.setItem('hv_user', JSON.stringify(user));
}

export function loadUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('hv_user');
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!Cookies.get('access_token');
}
