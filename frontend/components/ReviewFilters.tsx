export default function ReviewFilters() {
  const filters = Array.from({ length: 10 }, (_, idx) => ({
    label: `Functionality`,
    count: 361,
  }));

  return (
    <div className="w-full flex flex-col">
      <p className="font-bold text-body">Select to learn more</p>
      <div className="flex flex-wrap">
        {filters.map((filter, idx) => (
          <div
            key={idx}
            className="flex items-center border-r border-gray-500 h-[20px] my-[9px] mr-[4px] gap-[4px] pr-[10px]"
          >
            <div className="w-[20px] h-[20px] bg-gray-300"></div>
            <span className="text-body">{filter.label}</span>
            <span className="text-body text-gray-500">({filter.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
