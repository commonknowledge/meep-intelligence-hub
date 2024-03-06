import { useRequireAuth } from "../../hooks/auth";

export default async function Account() {
  const user = await useRequireAuth();

  return (
    <>
      <h1>Welcome to your Mapped Account, {user.username}</h1>
    </>
  );
}
