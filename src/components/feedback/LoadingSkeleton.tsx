import { cn } from "../../utils/cn";

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-white/10", className)} />;
}

export function MovieCardSkeleton() {
  return (
    <div className="space-y-3">
      <LoadingSkeleton className="aspect-[2/3] w-full rounded-lg" />
      <LoadingSkeleton className="h-4 w-4/5" />
      <LoadingSkeleton className="h-3 w-2/5" />
    </div>
  );
}
