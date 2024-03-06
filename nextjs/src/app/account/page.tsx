import { useRequireAuth } from "../../hooks/auth";
import DataTable from "./data-table";

export default async function Account() {
  const user = await useRequireAuth();

  return (
    <>
      <h1 className="mb-4">Welcome to your Mapped Account, {user.username}</h1>
      <DataTable />
    </>
  );
}
