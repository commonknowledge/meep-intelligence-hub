import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt');
  }
  const store = cookies();
  const jwtCookie = store.get('jwt');
  return jwtCookie?.value || null;
}

const getPathname = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  const headersList = headers();
  return headersList.get('x-pathname') || '/';
}

export const useRequireAuth = () => {
  const token = getAuthToken();

  const path = getPathname();

  // If the token exists and the current path is "/login", redirect to the account page.
  if (token && path === '/login') {
    redirect('/account');
  }

  // If there's no token and the current path is not "/login", redirect to the login page.
  if (!token && path !== '/login') {
    redirect('/login');
  }
};