import { type ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  /** Narrower reading measure for prose-heavy pages */
  narrow?: boolean;
};

export default function PageShell({
  children,
  className = "",
  narrow = false,
}: PageShellProps) {
  return (
    <div
      className={`mx-auto w-full px-5 py-14 sm:px-8 sm:py-20 ${
        narrow ? "max-w-measure" : "max-w-shell"
      } ${className}`}
    >
      {children}
    </div>
  );
}
