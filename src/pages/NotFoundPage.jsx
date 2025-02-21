import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import BangaloreSkyline from '../components/illustrations/BangaloreSkyline';

const NotFoundPage = () => {
  const { createNewChat } = useChat();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-6 text-white">
      <motion.div
        className="max-w-md w-full p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl shadow-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h2 className="text-5xl font-bold text-center mb-2">4<span className="text-green-500">0</span>4</h2>
          <div className="relative h-36 overflow-hidden rounded-lg mb-4">
            <BangaloreSkyline className="w-full absolute bottom-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-900/90 flex items-center justify-center">
              <p className="text-xl font-medium gradient-text">Page Not Found</p>
            </div>
          </div>
          <p className="text-zinc-400 text-center mb-6">
            Looks like you've taken a wrong turn in Bangalore. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={() => window.history.back()}
            className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 flex items-center justify-center gap-2 hover:bg-zinc-800"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </motion.button>
          
          <motion.button
            onClick={createNewChat}
            className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </motion.button>
        </div>
      </motion.div>
      
      <p className="mt-8 text-zinc-500 text-sm">
        Made with 🤍 by <a href="https://devitup.in" target="_blank" rel="noopener noreferrer" className="font-bold text-zinc-400 hover:text-green-400 transition-colors">DevItUp</a>
      </p>
    </div>
  );
};

export default NotFoundPage;