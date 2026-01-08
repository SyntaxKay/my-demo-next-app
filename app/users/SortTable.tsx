"use client";
import { useRouter, useSearchParams } from "next/navigation";

const SortTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sortOrder") || 'asc';
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;

    // Create a new URL with the updated sortOrder parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortOrder", selectedSort);

    // Navigate to the updated URL
    router.push(`/users?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <label htmlFor="sort-select" className="block text-sm font-semibold mb-2">
        Sort By Order:
      </label>
      <select
        id="sort-select"
        className="select select-bordered w-full max-w-xs"
        value={currentSort}
        onChange={handleSortChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <p className="text-xs text-gray-500 mt-2">Current: {currentSort}</p>
    </div>
  );
};

export default SortTable;
