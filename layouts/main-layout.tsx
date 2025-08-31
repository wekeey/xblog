import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  aside?: ReactNode;
}

export function MainLayout({ children, aside }: Props) {
  return (
    <div className="relative mx-auto flex w-full flex-col lg:flex-row">
      <div className="w-full flex-1 lg:w-3/4">{children}</div>
      <aside className="hidden w-1/4 min-w-72 flex-none pl-6 lg:block">
        <div className="sticky top-[calc(var(--header-height)+1px+1.5rem)] space-y-6">
          {aside}
        </div>
      </aside>
    </div>
  );
}
