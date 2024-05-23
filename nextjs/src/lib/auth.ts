export function authenticationHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  return {
    authorization: token ? `JWT ${token}` : "",
  };
}
