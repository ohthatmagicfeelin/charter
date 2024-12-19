import { Skeleton } from '../common/Skeleton';

export const DateRangeSkeleton = () => (
  <div className="flex gap-2 justify-center">
    {Array(4).fill(0).map((_, i) => (
      <Skeleton key={i} className="h-10 w-24" />
    ))}
  </div>
); 