export const ChartSkeleton = () => (
  <div className="w-full h-[400px] flex items-center justify-center">
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-8">
        <div className="h-[300px] bg-gray-200 dark:bg-gray-700/50 rounded-lg animate-pulse" />
        <div className="flex justify-between">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="w-16 h-4 bg-gray-200 dark:bg-gray-700/50 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  </div>
); 