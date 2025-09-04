import { Skeleton, SkeletonText } from "@/components/ui/skeleton"

export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Skeleton className="h-9 w-36 mb-6" />
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-8 text-center space-y-6">
              <div className="flex items-center justify-center">
                <Skeleton className="h-20 w-20 rounded-2xl" />
              </div>
              <div>
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-5 w-56 mx-auto mt-2" />
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-11 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-11 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="pt-4 border-t">
                <Skeleton className="h-10 w-40 mx-auto" />
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <SkeletonText lines={2} className="max-w-sm mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}



