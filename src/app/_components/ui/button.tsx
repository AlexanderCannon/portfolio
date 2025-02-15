import { type ButtonHTMLAttributes } from 'react';


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`py-2 px-4 rounded-lg font-medium ${variant === 'primary' ? 'bg-accent text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
        }`}
    />
  );
};

export default Button;