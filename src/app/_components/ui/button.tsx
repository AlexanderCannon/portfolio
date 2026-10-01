import React, { forwardRef } from "react";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "ghost" | "link";
}

interface AnchorProps extends BaseProps {
  link: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
}

interface ButtonProps extends BaseProps {
  link?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

type PolymorphicButtonProps = AnchorProps | ButtonProps;

const variants = {
  solid:
    "bg-ink text-paper border border-ink shadow-[inset_0_0_0_1px_hsl(var(--paper)/0.2)] hover:bg-accent hover:border-accent hover:text-paper active:translate-y-px",
  ghost:
    "bg-transparent text-ink border border-ink/70 hover:bg-ink hover:text-paper",
  link: "bg-transparent text-accent underline underline-offset-4 hover:text-ink px-0 py-0 border-0 shadow-none",
};

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PolymorphicButtonProps
>(({ children, link, className = "", variant = "solid", ...rest }, ref) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 font-display text-sm font-semibold tracking-[0.08em] uppercase transition-colors duration-150 disabled:opacity-50 ${variants[variant]} ${className}`;

  if (link) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={link}
        className={classes}
        {...(rest as Omit<
          AnchorProps,
          "link" | "children" | "className" | "variant"
        >)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(rest as Omit<ButtonProps, "children" | "className" | "variant">)}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
