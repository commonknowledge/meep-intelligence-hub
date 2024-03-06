/**
 * Client-side actions for user login and logout.
 */

export const login = (jwt: string, expiresISODate: string) => {
  localStorage.setItem("jwt", jwt);
  const cookieExpires = new Date(expiresISODate).toUTCString();
  document.cookie = `jwt=${jwt}; path=/; expires=${cookieExpires}`;
  window.location.href = "/account";
};

export const logout = () => {
  localStorage.removeItem("jwt");
  document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"; // overwrite the cookie with an empty string
  window.location.href = "/";
};
