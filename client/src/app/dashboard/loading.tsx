import { Skeleton, SkeletonAvatar, SkeletonText } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex">
        <aside className="w-64 sm:w-72 lg:w-80 sticky top-0 h-screen shrink-0 border-r border-gray-200/60 px-4 py-6 bg-white/80 backdrop-blur flex flex-col">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-xl" />
            <Skeleton className="h-6 w-28" />
          </div>
          <div className="mt-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full mt-3" />
          </div>
          <div className="mt-8 space-y-3">
            <Skeleton className="h-4 w-28" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center gap-3">
              <SkeletonAvatar />
              <div className="flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40 mt-2" />
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <Skeleton className="h-10 w-80 mx-auto" />
              <Skeleton className="h-4 w-96 mx-auto mt-3" />
            </div>
            <div className="mb-10 flex justify-center">
              <div className="w-full max-w-md p-6 bg-white rounded-2xl border shadow">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}



