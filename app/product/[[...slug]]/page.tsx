interface Props {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: {
    sortOrder: string;
  };
}

const ProductPage = async ({ params, searchParams }: Props) => {
  const RP = (await params).slug;
  const RSP =  searchParams.sortOrder;
  console.log("Search Params:", RSP);
  // Handle empty/no product ID case
  if (!RSP)  return null;

  /* if (!RP || RP.length === 0 && !RSP) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Products Catalog</h1>
        <p className="mt-4 text-gray-600">No specific product selected.</p>
      </div>
    );
  } */
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Product Detail</h1>
      <p className="mt-4">
        <span className="text-gray-600">Product ID: </span>
        <span className="font-mono font-bold text-lg">{RP?.join("/")}</span>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Full path: /product/{RP?.join("/")}
      </p>
      <p className="mt-2 text-sm text-gray-600">{RSP}</p>
    </div>
  );
};

export default ProductPage;
