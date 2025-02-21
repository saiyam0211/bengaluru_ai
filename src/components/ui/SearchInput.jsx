import React from 'react';
import { Search, X } from 'lucide-react';

const SearchInput = ({ 
  value, 
  onChange, 
  onClear,
  placeholder = "Search...", 
  className = ""
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-zinc-400" />
      </div>
      
      <input 
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-zinc-800 pl-10 pr-10 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 text-zinc-200 placeholder-zinc-500"
      />
      
      {value && (
        <button 
          onClick={onClear}
          type="button" 
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-300"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;