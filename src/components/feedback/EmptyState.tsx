import { Film } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="grid min-h-64 place-items-center rounded-lg border border-dashed border-line bg-white/[0.03] p-8 text-center">
      <div>
        <Film className="mx-auto mb-4 h-10 w-10 text-white/40" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-white/60">{description}</p>
      </div>
    </section>
  );
}
