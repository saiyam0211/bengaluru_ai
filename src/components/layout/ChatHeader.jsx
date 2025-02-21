import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Info } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import useWindowSize from '../../hooks/useWindowSize';

const ChatHeader = () => {
  const { toggleSidebar } = useChat();
  const { isMobile } = useWindowSize();

  return (
    <motion.div 
      className="border-b border-zinc-800 p-3 md:p-4 flex items-center gap-3 md:gap-4 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {isMobile && (
        <motion.button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      )}
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Bangalore City Guide
          </h1>
          <motion.button
            className="p-1 rounded-full hover:bg-zinc-800 text-zinc-500"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Info className="w-4 h-4" />
          </motion.button>
        </div>
        <p className="text-sm text-zinc-400">Ask me anything about Bangalore - from tourist spots to tech parks!</p>
      </div>
      
      <div className="hidden md:flex items-center gap-1.5">
        <motion.div 
          className="h-2 w-2 rounded-full bg-green-500"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <span className="text-xs font-medium text-zinc-400">Online</span>
      </div>
    </motion.div>
  );
};

export default ChatHeader;