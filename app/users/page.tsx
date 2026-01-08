import UserTable from "./UserTable";
import SortTable from "./SortTable";
import Link from "next/link";
interface Props {
  searchParams: Promise<{
    sortOrder: "asc" | "desc";
    search?: string;
  }>;
}

const UserPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const sortOrder = resolvedSearchParams?.sortOrder;
  const search = resolvedSearchParams?.search;

  //console.log("SearchParams - sortOrder:", sortOrder, "search:", search);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <Link href={"/users/new"} className="btn btn-primary">
        New User
      </Link>
      
      <SortTable />
      <UserTable sortOrder={sortOrder || "asc"} />
    </div>
  );
};

export default UserPage;
