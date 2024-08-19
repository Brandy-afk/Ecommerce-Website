interface PaginationInfoProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export default function PaginationInfo({
  pageIndex,
  pageSize,
  totalCount,
}: PaginationInfoProps) {
  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <p className="text-md text-gray-700">
      Showing <span className="font-medium">{startItem}</span> to{" "}
      <span className="font-medium">{endItem}</span> of{" "}
      <span className="font-medium">{totalCount}</span> results
    </p>
  );
}
