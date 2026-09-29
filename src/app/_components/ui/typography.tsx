import React, { type ReactNode, type HTMLAttributes } from "react";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

const cx = (...parts: Array<string | undefined>) =>
  parts.filter(Boolean).join(" ");

export const Typography = {
  h1: ({ children, className, ...props }: TypographyProps) => (
    <h1
      className={cx(
        "font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }: TypographyProps) => (
    <h2
      className={cx(
        "font-display text-3xl leading-snug tracking-tight text-ink sm:text-4xl",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }: TypographyProps) => (
    <h3
      className={cx(
        "font-display text-2xl leading-snug text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, className, ...props }: TypographyProps) => (
    <p
      className={cx("text-base leading-relaxed text-ink-muted sm:text-lg", className)}
      {...props}
    >
      {children}
    </p>
  ),
  lead: ({ children, className, ...props }: TypographyProps) => (
    <p
      className={cx(
        "max-w-measure text-lg leading-relaxed text-ink-muted sm:text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  ),
  label: ({ children, className, ...props }: TypographyProps) => (
    <p
      className={cx(
        "text-xs font-medium uppercase tracking-[0.16em] text-accent",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  ),
};
