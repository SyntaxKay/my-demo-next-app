import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: number;
  }>;
}

const UserDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  
  if(id > 10 ) notFound();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">User Detail Page</h1>
      <p className="mt-4">User slug: <span className="font-mono">{id}</span></p>
    </div>
  );
};

export default UserDetailPage;
