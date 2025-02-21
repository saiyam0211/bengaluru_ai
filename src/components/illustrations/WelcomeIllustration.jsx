import React from 'react';

const WelcomeIllustration = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="500" height="400" fill="#111827" opacity="0.7" rx="8" />
      
      {/* Stylized Bangalore Map */}
      <path 
        d="M150,200 C180,160 220,190 250,170 C280,150 330,180 350,150 C370,120 400,170 390,200 C380,230 350,240 310,230 C270,220 250,250 220,240 C190,230 120,240 150,200 Z" 
        fill="#1E40AF" 
        opacity="0.2" 
        stroke="#3B82F6" 
        strokeWidth="2" 
      />
      
      {/* Map Points */}
      <circle cx="180" cy="180" r="6" fill="#EC4899" opacity="0.8" />
      <text x="195" y="175" fontFamily="Arial" fontSize="10" fill="white">Cubbon Park</text>
      
      <circle cx="240" cy="210" r="6" fill="#8B5CF6" opacity="0.8" />
      <text x="255" y="205" fontFamily="Arial" fontSize="10" fill="white">MG Road</text>
      
      <circle cx="300" cy="160" r="6" fill="#10B981" opacity="0.8" />
      <text x="315" y="155" fontFamily="Arial" fontSize="10" fill="white">Indiranagar</text>
      
      <circle cx="210" cy="150" r="6" fill="#F59E0B" opacity="0.8" />
      <text x="225" y="145" fontFamily="Arial" fontSize="10" fill="white">Vidhana Soudha</text>
      
      <circle cx="350" cy="195" r="6" fill="#3B82F6" opacity="0.8" />
      <text x="365" y="190" fontFamily="Arial" fontSize="10" fill="white">Whitefield</text>
      
      {/* Central Icon */}
      <circle cx="250" cy="200" r="40" fill="#1E40AF" opacity="0.5" />
      <circle cx="250" cy="200" r="40" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 2" />
      
      {/* Bangalore Palace Icon */}
      <g transform="translate(250, 200) scale(0.7)">
        <rect x="-30" y="-20" width="60" height="40" fill="#1E40AF" />
        <polygon points="-30,-20 0,-40 30,-20" fill="#3B82F6" />
        <rect x="-20" y="0" width="10" height="15" fill="#4F46E5" />
        <rect x="10" y="0" width="10" height="15" fill="#4F46E5" />
        <rect x="-15" y="-30" width="30" height="10" fill="#6366F1" />
      </g>
      
      {/* Decorative Elements */}
      <circle cx="100" cy="100" r="15" fill="#F6E05E" opacity="0.3" />
      <circle cx="400" cy="120" r="12" fill="#EC4899" opacity="0.3" />
      <circle cx="90" cy="300" r="10" fill="#8B5CF6" opacity="0.3" />
      <circle cx="380" cy="320" r="14" fill="#10B981" opacity="0.3" />
      
      {/* Connecting Lines */}
      <path d="M120 120 L160 160" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M380 140 L340 170" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M110 280 L160 240" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M360 300 L320 240" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2" />

      {/* Title */}
      <text x="250" y="70" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="20" fontWeight="bold">Welcome to Bangalore AI Guide</text>
      
      {/* Subtitle */}
      <text x="250" y="340" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="14">Your personal guide to the Garden City</text>
      
      {/* Version */}
      <text x="470" y="390" textAnchor="end" fill="#6B7280" fontFamily="Arial" fontSize="10">v2.0</text>
    </svg>
  );
};

export default WelcomeIllustration;