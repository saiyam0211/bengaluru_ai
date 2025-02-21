import React from 'react';

const BangaloreSkyline = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 800 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sky Gradient */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a365d" />
          <stop offset="100%" stopColor="#3182ce" />
        </linearGradient>
      </defs>
      <rect width="800" height="200" fill="url(#skyGradient)" />

      {/* Stars */}
      <circle cx="50" cy="30" r="1" fill="white" opacity="0.8" />
      <circle cx="120" cy="40" r="1" fill="white" opacity="0.7" />
      <circle cx="200" cy="20" r="1" fill="white" opacity="0.9" />
      <circle cx="300" cy="35" r="1" fill="white" opacity="0.8" />
      <circle cx="400" cy="15" r="1" fill="white" opacity="0.7" />
      <circle cx="500" cy="25" r="1" fill="white" opacity="0.9" />
      <circle cx="600" cy="40" r="1" fill="white" opacity="0.7" />
      <circle cx="700" cy="30" r="1" fill="white" opacity="0.8" />
      <circle cx="750" cy="20" r="1" fill="white" opacity="0.9" />

      {/* Moon */}
      <circle cx="700" cy="50" r="30" fill="#F6E05E" opacity="0.9" />
      <circle cx="685" cy="40" r="10" fill="#718096" opacity="0.4" />
      <circle cx="710" cy="60" r="8" fill="#718096" opacity="0.3" />

      {/* Vidhana Soudha Building */}
      <rect x="300" y="70" width="200" height="130" fill="#2D3748" />
      <rect x="320" y="40" width="160" height="30" fill="#4A5568" />
      <rect x="350" y="20" width="100" height="20" fill="#718096" />
      <rect x="380" y="10" width="40" height="10" fill="#A0AEC0" />
      
      {/* Windows */}
      <rect x="320" y="80" width="15" height="20" fill="#F6E05E" opacity="0.8" />
      <rect x="345" y="80" width="15" height="20" fill="#F6E05E" opacity="0.7" />
      <rect x="370" y="80" width="15" height="20" fill="#F6E05E" opacity="0.8" />
      <rect x="395" y="80" width="15" height="20" fill="#F6E05E" opacity="0.6" />
      <rect x="420" y="80" width="15" height="20" fill="#F6E05E" opacity="0.8" />
      <rect x="445" y="80" width="15" height="20" fill="#F6E05E" opacity="0.7" />
      <rect x="470" y="80" width="15" height="20" fill="#F6E05E" opacity="0.9" />
      
      <rect x="320" y="110" width="15" height="20" fill="#F6E05E" opacity="0.7" />
      <rect x="345" y="110" width="15" height="20" fill="#F6E05E" opacity="0.8" />
      <rect x="370" y="110" width="15" height="20" fill="#F6E05E" opacity="0.6" />
      <rect x="395" y="110" width="15" height="20" fill="#F6E05E" opacity="0.8" />
      <rect x="420" y="110" width="15" height="20" fill="#F6E05E" opacity="0.7" />
      <rect x="445" y="110" width="15" height="20" fill="#F6E05E" opacity="0.9" />
      <rect x="470" y="110" width="15" height="20" fill="#F6E05E" opacity="0.7" />
      
      <rect x="320" y="140" width="15" height="20" fill="#F6E05E" opacity="0.8" />
      <rect x="345" y="140" width="15" height="20" fill="#F6E05E" opacity="0.7" />
      <rect x="370" y="140" width="15" height="20" fill="#F6E05E" opacity="0.9" />
      <rect x="395" y="140" width="15" height="20" fill="#F6E05E" opacity="0.7" />
      <rect x="420" y="140" width="15" height="20" fill="#F6E05E" opacity="0.8" />
      <rect x="445" y="140" width="15" height="20" fill="#F6E05E" opacity="0.6" />
      <rect x="470" y="140" width="15" height="20" fill="#F6E05E" opacity="0.8" />

      {/* UB City */}
      <rect x="150" y="120" width="60" height="80" fill="#2C5282" />
      <rect x="160" y="100" width="40" height="20" fill="#3182CE" />
      <rect x="170" y="80" width="20" height="20" fill="#4299E1" />
      
      {/* Windows */}
      <rect x="160" y="130" width="10" height="10" fill="#F6E05E" opacity="0.7" />
      <rect x="180" y="130" width="10" height="10" fill="#F6E05E" opacity="0.8" />
      <rect x="160" y="150" width="10" height="10" fill="#F6E05E" opacity="0.8" />
      <rect x="180" y="150" width="10" height="10" fill="#F6E05E" opacity="0.7" />
      <rect x="160" y="170" width="10" height="10" fill="#F6E05E" opacity="0.9" />
      <rect x="180" y="170" width="10" height="10" fill="#F6E05E" opacity="0.6" />

      {/* World Trade Center */}
      <rect x="550" y="110" width="70" height="90" fill="#1A365D" />
      <rect x="560" y="90" width="50" height="20" fill="#2C5282" />
      
      {/* Windows */}
      <rect x="560" y="120" width="10" height="10" fill="#F6E05E" opacity="0.8" />
      <rect x="580" y="120" width="10" height="10" fill="#F6E05E" opacity="0.7" />
      <rect x="600" y="120" width="10" height="10" fill="#F6E05E" opacity="0.9" />
      <rect x="560" y="140" width="10" height="10" fill="#F6E05E" opacity="0.7" />
      <rect x="580" y="140" width="10" height="10" fill="#F6E05E" opacity="0.8" />
      <rect x="600" y="140" width="10" height="10" fill="#F6E05E" opacity="0.6" />
      <rect x="560" y="160" width="10" height="10" fill="#F6E05E" opacity="0.9" />
      <rect x="580" y="160" width="10" height="10" fill="#F6E05E" opacity="0.7" />
      <rect x="600" y="160" width="10" height="10" fill="#F6E05E" opacity="0.8" />
      
      {/* Bangalore Palace */}
      <rect x="50" y="140" width="80" height="60" fill="#4A5568" />
      <polygon points="50,140 90,100 130,140" fill="#2D3748" />
      <rect x="70" y="160" width="15" height="25" fill="#90CDF4" />
      <rect x="95" y="160" width="15" height="25" fill="#90CDF4" />

      {/* Other Buildings */}
      <rect x="220" y="150" width="30" height="50" fill="#2C5282" />
      <rect x="260" y="120" width="25" height="80" fill="#2D3748" />
      <rect x="510" y="130" width="30" height="70" fill="#4A5568" />
      <rect x="640" y="140" width="40" height="60" fill="#2D3748" />
      <rect x="690" y="120" width="35" height="80" fill="#2C5282" />
      <rect x="735" y="150" width="25" height="50" fill="#4A5568" />

      {/* Ground */}
      <rect x="0" y="199" width="800" height="1" fill="#4A5568" />
    </svg>
  );
};

export default BangaloreSkyline;