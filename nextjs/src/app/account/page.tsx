import { useRequireAuth } from '../../hooks/auth';

export default function Account() {
  useRequireAuth();

  return (
    <>
      <h1>Welcome to your Mapped Account</h1>
    </>
  );
}