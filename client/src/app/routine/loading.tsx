import { Skeleton } from "@/components/ui/skeleton"

export default function RoutineLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 w-full">
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-96 mx-auto" />
          <Skeleton className="h-4 w-80 mx-auto mt-3" />
        </div>
        <div className="flex justify-center mb-12">
          <Skeleton className="h-12 w-64 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-3/4 mt-3" />
              <Skeleton className="h-4 w-2/3 mt-2" />
              <Skeleton className="h-9 w-24 mt-4 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


