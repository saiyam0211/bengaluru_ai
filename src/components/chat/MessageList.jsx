import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import MessageItem from './MessageItem';
import EmptyChatIllustration from '../illustrations/EmptyChatIllustration';

const MessageList = () => {
  const { currentChat, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat.messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {currentChat.messages.length === 0 ? (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full text-center p-4 space-y-6"
          >
            <EmptyChatIllustration className="w-64 h-64 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-300">Start Your Bangalore Journey</h3>
              <p className="text-sm text-zinc-400 max-w-md">
                Ask me about popular tourist spots, local cuisine, tech parks, weather, or anything else related to Bangalore!
              </p>
            </div>
          </motion.div>
        ) : (
          currentChat.messages.map((message, index) => (
            <MessageItem 
              key={`${message.role}-${index}`} 
              message={message} 
              index={index} 
            />
          ))
        )}
        
        {isLoading && (
          <motion.div 
            key="loading"
            className="flex items-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="max-w-[75%] rounded-2xl p-4 bg-zinc-800/80 border border-zinc-700/50"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded-full bg-blue-500/20">
                  <Bot className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="font-medium text-sm">Bangalore Guide</span>
              </div>
              
              <div className="flex items-center gap-2 text-zinc-400">
                <div className="flex space-x-1.5">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={{ 
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: 0
                    }}
                  />
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={{ 
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: 0.4
                    }}
                  />
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={{ 
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: 0.8
                    }}
                  />
                </div>
                <span className="text-sm">Thinking about Bangalore...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;