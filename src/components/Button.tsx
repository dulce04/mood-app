import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = ''
}) => {
  const buttonClass = `btn btn-${variant} ${className}`.trim();

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
}; 