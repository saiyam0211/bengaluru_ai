import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md",
  secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300",
  outline: "bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
};

const sizes = {
  sm: "py-1 px-3 text-xs rounded-md",
  md: "py-2 px-4 text-sm rounded-lg",
  lg: "py-2.5 px-5 text-base rounded-lg"
};

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon,
  className = "",
  isLoading = false,
  disabled = false,
  ...props 
}) => {
  const baseClasses = "font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-green-500 flex items-center justify-center gap-2";
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${
    (disabled || isLoading) ? "opacity-60 cursor-not-allowed" : ""
  } ${className}`;

  return (
    <motion.button
      className={buttonClasses}
      whileHover={!disabled && !isLoading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.97 } : {}}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;