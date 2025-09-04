import * as React from "react";
import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: DivProps) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-muted", className)}
			{...props}
		/>
	);
}

interface SkeletonAvatarProps extends DivProps {
	size?: number;
}

export function SkeletonAvatar({ size = 40, className, style, ...props }: SkeletonAvatarProps) {
	const dimension = Math.max(8, Math.floor(size));
	return (
		<div
			className={cn("animate-pulse rounded-full bg-muted", className)}
			style={{ width: dimension, height: dimension, ...style }}
			{...props}
		/>
	);
}

interface SkeletonTextProps extends DivProps {
	lines?: number;
}

export function SkeletonText({ lines = 1, className, ...props }: SkeletonTextProps) {
	const safeLines = Math.max(1, Math.floor(lines));
	return (
		<div className={cn("space-y-2", className)} {...props}>
			{Array.from({ length: safeLines }).map((_, index) => (
				<Skeleton key={index} className={cn("h-4 w-full", index === safeLines - 1 && "w-5/6")} />
			))}
		</div>
	);
}


