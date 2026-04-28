import type { ReactNode } from "react";

interface PageIntroHeaderProps {
  title?: string;
  description: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export function PageIntroHeader({
  title,
  description,
  icon,
  actions,
}: PageIntroHeaderProps) {
  return (
    <header className="card-surface flex flex-wrap items-start justify-between gap-4 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        {icon ? (
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 [&>svg]:h-6 [&>svg]:w-6">
            {icon}
          </span>
        ) : null}
        <div>
          {title ? <h1 className="text-2xl font-bold text-slate-900">{title}</h1> : null}
          <p className="sub-title text-sm text-slate-500">{description}</p>
        </div>
      </div>
      {actions ? <div className="inline-flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
