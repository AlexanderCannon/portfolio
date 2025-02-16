import React, { type ReactNode, type HTMLAttributes } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
}

export const Typography = {
    h1: ({ children, ...props }: TypographyProps) => (
        <h1 className="text-4xl font-bold m-4" {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: TypographyProps) => (
        <h2 className="text-3xl font-bold m-4" {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: TypographyProps) => (
        <h3 className="text-2xl font-bold m-4" {...props}>{children}</h3>
    ),
    p: ({ children, ...props }: TypographyProps) => (
        <p className="text-lg text-gray-700 m-4" {...props}>{children}</p>
    ),
    // Add more custom components as needed
};