import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: "sm" | "md" | "lg" | "xl" | "full"
}

export function Skeleton({ className, rounded = "md", ...props }: SkeletonProps) {
  const roundedClass =
    rounded === "sm"
      ? "rounded"
      : rounded === "md"
      ? "rounded-md"
      : rounded === "lg"
      ? "rounded-lg"
      : rounded === "xl"
      ? "rounded-xl"
      : "rounded-full"

  return (
    <div
      className={cn(
        "skeleton bg-muted/60 dark:bg-muted/30", // shimmer skeleton loader
        roundedClass,
        className
      )}
      {...props}
    />
  )
}

export function SkeletonText({ lines = 3, className = "", rounded = "md" }: { lines?: number; className?: string; rounded?: SkeletonProps["rounded"] }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton key={idx} className={cn("h-4 w-full", idx === lines - 1 ? "w-2/3" : "w-full")} rounded={rounded} />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return <Skeleton className={cn("inline-block", className)} style={{ width: size, height: size }} rounded="full" />
}

export default Skeleton


