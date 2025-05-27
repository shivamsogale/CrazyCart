export function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 