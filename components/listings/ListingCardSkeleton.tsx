const shimmerClass =
  'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer';

export default function ListingCardSkeleton({ delay = 0 }: { delay?: number }) {
  const delayStyle = { animationDelay: `${delay * 100}ms` };

  return (
    <div className="rounded-[28px] bg-white border border-gray-100 overflow-hidden shadow-sm h-full flex flex-col animate-pulse">
      <div className={`aspect-[4/3] ${shimmerClass}`} style={delayStyle} />
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <div className={`h-5 rounded-md ${shimmerClass} w-3/4`} style={delayStyle} />
        <div className={`h-4 rounded-md ${shimmerClass} w-1/2`} style={delayStyle} />
        <div className="flex gap-2">
          <div className={`h-7 rounded-lg ${shimmerClass} w-24`} style={delayStyle} />
          <div className={`h-7 rounded-lg ${shimmerClass} w-20`} style={delayStyle} />
        </div>
        <div className="flex-1" />
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className={`h-5 rounded-md ${shimmerClass} w-1/3`} style={delayStyle} />
          <div className={`h-5 rounded-md ${shimmerClass} w-16`} style={delayStyle} />
        </div>
      </div>
    </div>
  );
}
