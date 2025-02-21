import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Image, MapPin } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const InputArea = () => {
  const { isLoading, sendMessage } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    await sendMessage(inputMessage);
    setInputMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt) => {
    setInputMessage(prompt);
    // Focus the textarea
    textareaRef.current?.focus();
  };

  const suggestedPrompts = [
    "What are the best places to visit in Bangalore?",
    "Tell me about Bangalore's weather throughout the year",
    "Recommend some local Bangalore street food",
    "Which tech parks are famous in Bangalore?"
  ];

  return (
    <div className="p-3 md:p-4 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
      {/* Suggested Prompts - Only show when input is empty and not loading */}
      {!isLoading && inputMessage.length === 0 && (
        <motion.div 
          className="mb-3 flex flex-wrap gap-2 overflow-x-auto pb-2 custom-scrollbar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {suggestedPrompts.map((prompt, index) => (
            <motion.button
              key={index}
              onClick={() => handleSuggestedPrompt(prompt)}
              className="text-xs py-1.5 px-3 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 whitespace-nowrap"
              whileHover={{ scale: 1.05, backgroundColor: "#3f3f46" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.1 + index * 0.1 }
              }}
            >
              {prompt}
            </motion.button>
          ))}
        </motion.div>
      )}
      
      {/* Input Area */}
      <motion.div 
        className={`relative flex items-end rounded-xl border ${
          isFocused 
            ? 'border-green-500 shadow-sm shadow-green-500/20' 
            : 'border-zinc-700'
        } bg-zinc-800/80 backdrop-blur-sm overflow-hidden`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <textarea
          ref={textareaRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask anything about Bangalore..."
          className="flex-1 bg-transparent p-3 text-sm resize-none max-h-32 focus:outline-none text-zinc-200 placeholder-zinc-500"
          disabled={isLoading}
          rows={1}
        />
        
        <div className="flex items-center gap-1 p-2">
          <motion.button
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isLoading}
          >
            <MapPin className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isLoading}
          >
            <Image className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isLoading}
          >
            <Mic className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className={`p-2 rounded-lg ${
              inputMessage.trim() && !isLoading
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                : 'bg-zinc-700 text-zinc-500'
            } disabled:cursor-not-allowed`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
      
      <div className="mt-2 text-center">
        <p className="text-[10px] text-zinc-500">
          I'm a specialized AI that only answers questions about Bangalore. For other topics, please use a general AI assistant.
        </p>
      </div>
    </div>
  );
};

export default InputArea;