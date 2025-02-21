import React from 'react';
import { motion } from 'framer-motion';

const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12"
};

const colors = {
  primary: "text-green-500",
  secondary: "text-blue-500",
  white: "text-white"
};

const LoadingIndicator = ({ size = "md", color = "primary", className = "" }) => {
  const sizeClass = sizes[size] || sizes.md;
  const colorClass = colors[color] || colors.primary;
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`inline-block ${sizeClass} ${colorClass} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingIndicator;