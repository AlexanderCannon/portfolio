import React, { forwardRef } from 'react';

// Base props that both button and anchor will share
interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

// Props specific to anchor elements
interface AnchorProps extends BaseProps {
  link: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

// Props specific to button elements
interface ButtonProps extends BaseProps {
  link?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

// Union type for all possible props
type PolymorphicButtonProps = AnchorProps | ButtonProps;

const baseClasses =
  'group relative inline-flex items-center justify-center px-6 py-2 font-medium text-white transition-all duration-200 ease-in-out';

const gradientLayerOne =
  'absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-primary to-purple-600 dark:from-blue-500 dark:to-purple-500 ' +
  'group-hover:translate-x-1 group-hover:translate-y-1';

const gradientLayerTwo =
  'absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-primary to-purple-600 dark:from-blue-500 dark:to-purple-500 ' +
  'group-hover:bg-opacity-0';

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, PolymorphicButtonProps>(
  ({ children, link, className = '', ...rest }, ref) => {
    const Content = (
      <>
        <span className={gradientLayerOne} />
        <span className={gradientLayerTwo} />
        <span className="relative">{children}</span>
      </>
    );

    // If link is provided, render an anchor
    if (link) {
      return (
        <a 
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={link}
          className={`${baseClasses} ${className}`}
          {...(rest as Omit<AnchorProps, 'link' | 'children' | 'className'>)}
        >
          {Content}
        </a>
      );
    }

    // Otherwise, render a button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`${baseClasses} ${className}`}
        {...(rest as Omit<ButtonProps, 'children' | 'className'>)}
      >
        {Content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
