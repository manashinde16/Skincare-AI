import { Skeleton } from "@/components/ui/skeleton"

export default function ReportLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 relative w-full">
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-80 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-3" />
          <div className="flex justify-center gap-3 mt-4">
            <Skeleton className="h-12 w-44" />
          </div>
        </div>
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



