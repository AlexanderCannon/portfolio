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
    "bg-ink text-paper hover:bg-accent dark:bg-ink dark:text-paper dark:hover:bg-accent",
  ghost:
    "bg-transparent text-ink border border-line hover:border-ink hover:bg-secondary",
  link: "bg-transparent text-accent underline-offset-4 hover:underline px-0 py-0",
};

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PolymorphicButtonProps
>(({ children, link, className = "", variant = "solid", ...rest }, ref) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 disabled:opacity-50 ${variants[variant]} ${className}`;

  if (link) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={link}
        className={classes}
        {...(rest as Omit<AnchorProps, "link" | "children" | "className" | "variant">)}
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
