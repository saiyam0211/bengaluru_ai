import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const ErrorMessage = () => {
  const { error, setError } = useChat();
  
  if (!error) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="m-4 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center gap-3 relative"
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -10, height: 0 }}
      >
        <AlertCircle className="w-5 h-5 shrink-0" />
        <span className="text-sm">{error}</span>
        <motion.button
          onClick={() => setError(null)}
          className="absolute right-2 top-2 p-1 rounded-full hover:bg-red-800/50 text-red-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;