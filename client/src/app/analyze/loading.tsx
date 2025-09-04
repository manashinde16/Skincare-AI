import { Skeleton, SkeletonText } from "@/components/ui/skeleton"

export default function AnalyzeLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="border-b border-gray-200/50 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-40" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-7 w-20" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-16 w-16 rounded-2xl" />
                {i < 5 && <Skeleton className="h-1 w-20" />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
              <Skeleton className="h-8 w-48 mx-auto bg-white/30" />
              <Skeleton className="h-4 w-2/3 mx-auto mt-3 bg-white/20" />
            </div>
            <div className="p-8 space-y-6">
              <SkeletonText lines={6} />
              <div className="flex justify-between pt-6 border-t">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-36" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



