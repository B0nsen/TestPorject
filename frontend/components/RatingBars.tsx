export default function RatingBars({ ratings }: { ratings: number[] }) {
  const total = ratings.reduce((sum, count) => sum + count, 0);
  return (
    <div className="layout-product-lg:w-[352px] w-full max-w-[352px] hidden layout-product-lg:flex flex-col gap-2">
      {ratings.map((count, index) => {
        const percentage = total ? (count / total) * 100 : 0;
        return (
          <div key={index} className="flex items-start gap-2">
            <span className="w-[51px] text-left text-[13px] leading-[20px]">
              {5 - index} star
            </span>
            <div className="flex-1 bg-surface-accent-muted h-[20px] rounded-[4px] overflow-hidden">
              <div
                className="bg-surface-accent h-[20px]"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}