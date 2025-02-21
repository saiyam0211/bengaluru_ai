import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Bot, Trash2, X, Settings, LogOut } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import BangaloreSkyline from '../illustrations/BangaloreSkyline';
import useWindowSize from '../../hooks/useWindowSize';

const Sidebar = () => {
  const { 
    chats, 
    activeChat, 
    sidebarOpen, 
    toggleSidebar, 
    createNewChat, 
    handleChatSelect,
    deleteChat,
    clearAllChats
  } = useChat();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Animation variants
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { 
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
  
  // Use our custom hook to get window size
  const { isMobile, isDesktop } = useWindowSize();

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className="w-80 md:w-72 bg-zinc-900 flex flex-col z-30 fixed md:relative h-full border-r border-zinc-800 shadow-lg"
        variants={sidebarVariants}
        initial={isDesktop ? "open" : "closed"}
        animate={sidebarOpen ? "open" : "closed"}
        style={{ display: 'flex' }} // Always display flex to prevent disappearing
      >
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Bangalore AI
            </h1>
            {isMobile && (
              <motion.button 
                onClick={toggleSidebar} 
                className="p-1 rounded-full hover:bg-zinc-800"
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-zinc-400" />
              </motion.button>
            )}
          </div>
          <p className="text-xs text-zinc-400 mb-4">Your personal guide to the Garden City</p>
          
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats"
              className="w-full bg-zinc-800 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 text-zinc-200"
            />
          </div>

          <motion.button 
            onClick={createNewChat}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg py-2.5 px-4 flex items-center justify-center gap-2 font-medium shadow-md transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4" />
            New Chat
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          <AnimatePresence>
            {filteredChats.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-32 text-zinc-500 text-sm"
              >
                <span>No chats found</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className="space-y-1"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            {filteredChats.map((chat) => (
              <motion.div 
                key={chat.id}
                className={`relative group rounded-lg overflow-hidden ${
                  activeChat === chat.id 
                    ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30' 
                    : 'border border-transparent hover:border-zinc-700 hover:bg-zinc-800/50'
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <button 
                  onClick={() => handleChatSelect(chat.id)}
                  className="w-full text-left px-3 py-2.5 text-sm flex items-center gap-2"
                >
                  <span className={`p-1.5 rounded-md ${
                    activeChat === chat.id 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    <Bot className="w-4 h-4" />
                  </span>
                  <span className={`truncate ${
                    activeChat === chat.id ? 'text-zinc-100' : 'text-zinc-400'
                  }`}>
                    {chat.name}
                  </span>
                </button>
                <motion.button
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-zinc-800 p-4">
          <div className="relative overflow-hidden rounded-lg mb-3">
            <BangaloreSkyline className="w-full h-16" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/90 flex items-end justify-center pb-1">
              <span className="text-xs text-zinc-400">Bengaluru Skyline</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              className="flex items-center justify-center gap-1.5 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-400 hover:text-zinc-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowConfirmDelete(true)}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Chats</span>
            </motion.button>
            
            <motion.button
              className="flex items-center justify-center gap-1.5 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-400 hover:text-zinc-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </motion.button>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xs text-zinc-500">
              Made with 🤍 by <a href="https://devitup.in" target="_blank" rel="noopener noreferrer" className="font-bold text-zinc-400 hover:text-green-400 transition-colors">DevItUp</a>
            </p>
            <motion.button
              className="text-zinc-500 hover:text-zinc-300"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showConfirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 rounded-lg p-6 max-w-sm w-full border border-zinc-800 shadow-xl"
            >
              <h3 className="text-lg font-medium mb-2">Clear all chats?</h3>
              <p className="text-zinc-400 text-sm mb-4">This action cannot be undone. All your conversation history will be permanently deleted.</p>
              
              <div className="flex gap-3 justify-end">
                <motion.button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-4 py-2 rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    clearAllChats();
                    setShowConfirmDelete(false);
                  }}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Delete All
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;