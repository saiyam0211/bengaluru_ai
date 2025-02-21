import React from 'react';

const EmptyChatIllustration = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="400" height="300" fill="#111827" opacity="0.7" rx="8" />
      
      {/* Chat Bubbles */}
      <g opacity="0.9">
        {/* Bot Chat Bubble */}
        <rect x="60" y="80" width="200" height="60" rx="12" fill="#3B82F6" opacity="0.3" />
        <rect x="60" y="80" width="200" height="60" rx="12" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="80" cy="100" r="10" fill="#3B82F6" opacity="0.5" />
        <rect x="100" y="95" width="140" height="5" rx="2" fill="#3B82F6" opacity="0.5" />
        <rect x="100" y="110" width="120" height="5" rx="2" fill="#3B82F6" opacity="0.5" />
        <rect x="100" y="125" width="90" height="5" rx="2" fill="#3B82F6" opacity="0.5" />
        
        {/* User Chat Bubble */}
        <rect x="140" y="160" width="200" height="50" rx="12" fill="#10B981" opacity="0.3" />
        <rect x="140" y="160" width="200" height="50" rx="12" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="320" cy="175" r="10" fill="#10B981" opacity="0.5" />
        <rect x="160" y="170" width="140" height="5" rx="2" fill="#10B981" opacity="0.5" />
        <rect x="160" y="185" width="120" height="5" rx="2" fill="#10B981" opacity="0.5" />
      </g>

      {/* Bot */}
      <g transform="translate(180, 235)">
        <circle cx="0" cy="0" r="25" fill="#3B82F6" opacity="0.8" />
        <rect x="-10" y="-10" width="20" height="20" rx="2" fill="#111827" />
        <rect x="-7" y="-7" width="5" height="5" rx="1" fill="#3B82F6" />
        <rect x="2" y="-7" width="5" height="5" rx="1" fill="#3B82F6" />
        <rect x="-7" y="2" width="14" height="5" rx="1" fill="#3B82F6" />
      </g>
      
      {/* Decorative Elements */}
      <circle cx="50" cy="50" r="10" fill="#F6E05E" opacity="0.5" />
      <circle cx="350" cy="90" r="8" fill="#EC4899" opacity="0.5" />
      <circle cx="70" cy="250" r="6" fill="#8B5CF6" opacity="0.5" />
      <circle cx="330" cy="240" r="7" fill="#10B981" opacity="0.5" />
      
      {/* Connecting Lines */}
      <path d="M100 50 L120 70" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M320 100 L300 120" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M80 220 L100 200" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M310 220 L290 200" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2" />

      {/* Text Label */}
      <text x="200" y="50" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="14" fontWeight="bold">Start Your Bangalore Adventure</text>
      <text x="200" y="280" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="12">Ask any question about Bangalore</text>
    </svg>
  );
};

export default EmptyChatIllustration;