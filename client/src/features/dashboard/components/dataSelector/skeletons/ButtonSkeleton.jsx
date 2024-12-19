import { Skeleton } from '../../common/Skeleton';

export const ButtonSkeleton = ({ count = 3 }) => (
  <div className="flex gap-2 overflow-x-auto pb-2">
    {Array(count).fill(0).map((_, i) => (
      <Skeleton 
        key={i} 
        className="h-9 w-24"
      />
    ))}
  </div>
); 