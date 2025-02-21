import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Copy, CheckCircle } from 'lucide-react';

// Function to format message content with proper styling
const formatMessageContent = (content) => {
  if (!content) return '';
  
  // First, remove all asterisks
  let cleanContent = content.replace(/\*\*/g, '');
  
  // Parse the message into blocks
  const blocks = cleanContent.split('\n\n');
  const processedBlocks = [];
  
  let inNumberedSection = false;
  let currentList = [];
  
  const lines = cleanContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Detect numbering pattern like "1.2" or "2.1" (section numbers)
    if (/^\d+\.\d+/.test(line)) {
      // If we were building a list, finish it
      if (currentList.length > 0) {
        processedBlocks.push(`<ul class="list-disc pl-4 md:pl-5 my-2">${currentList.join('')}</ul>`);
        currentList = [];
      }
      
      inNumberedSection = true;
      processedBlocks.push(`<h3 class="font-semibold text-green-400 mt-3 md:mt-4 mb-1 md:mb-2 text-sm md:text-base">${line}</h3>`);
    }
    // Detect main section headers (e.g., "2. Food Specialties")
    else if (/^\d+\./.test(line)) {
      // If we were building a list, finish it
      if (currentList.length > 0) {
        processedBlocks.push(`<ul class="list-disc pl-4 md:pl-5 my-2">${currentList.join('')}</ul>`);
        currentList = [];
      }
      
      inNumberedSection = false;
      processedBlocks.push(`<h2 class="font-bold text-green-500 mt-4 md:mt-5 mb-2 md:mb-3 text-base md:text-lg">${line}</h2>`);
    }
    // Bullet points starting with "-"
    else if (line.startsWith('- ')) {
      const bulletContent = line.substring(2);
      currentList.push(`<li class="mb-1.5 md:mb-2 text-sm md:text-base">${bulletContent}</li>`);
      
      // If this is the last line or the next line isn't a bullet, close the list
      if (i === lines.length - 1 || !lines[i + 1].trim().startsWith('- ')) {
        processedBlocks.push(`<ul class="list-disc pl-4 md:pl-5 my-2">${currentList.join('')}</ul>`);
        currentList = [];
      }
    }
    // Handle restaurant names and other important items
    else if (inNumberedSection && !line.startsWith('-')) {
      processedBlocks.push(`<h4 class="font-medium text-blue-400 mt-2 md:mt-3 mb-1 text-sm md:text-base">${line}</h4>`);
    }
    // Regular paragraph
    else {
      processedBlocks.push(`<p class="mb-2 md:mb-3 text-sm md:text-base">${line}</p>`);
    }
  }
  
  // If there's any remaining list
  if (currentList.length > 0) {
    processedBlocks.push(`<ul class="list-disc pl-4 md:pl-5 my-2">${currentList.join('')}</ul>`);
  }
  
  return <div dangerouslySetInnerHTML={{ __html: processedBlocks.join('') }} className="message-content text-sm md:text-base" />;
};

const MessageItem = ({ message, index }) => {
  const [copied, setCopied] = React.useState(false);

  const isUser = message.role === 'user';

  const messageVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      x: isUser ? 20 : -20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { 
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 } 
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className={`flex items-start gap-2 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
      variants={messageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <motion.div 
        className={`relative group max-w-[90%] sm:max-w-[85%] md:max-w-[75%] rounded-2xl p-3 md:p-4 ${
          isUser 
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' 
            : 'bg-zinc-800/80 border border-zinc-700/50'
        }`}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className={`p-1 rounded-full ${
            isUser ? 'bg-white/20' : 'bg-blue-500/20'
          }`}>
            {isUser ? (
              <User className="w-3.5 h-3.5" />
            ) : (
              <Bot className="w-3.5 h-3.5 text-blue-400" />
            )}
          </div>
          <span className="font-medium text-sm">
            {isUser ? 'You' : 'Bangalore Guide'}
          </span>
          
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              onClick={copyToClipboard}
              className={`p-1 rounded-md ${
                isUser 
                  ? 'hover:bg-white/20 text-white/70 hover:text-white' 
                  : 'hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {copied ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </motion.button>
          </div>
        </div>
        
        <div className="whitespace-pre-wrap text-sm leading-relaxed message-content">
          {formatMessageContent(message.content)}
        </div>
        
        <div className={`absolute ${isUser ? 'right-0' : 'left-0'} top-0 h-3 w-3 
          transform ${isUser ? 'translate-x-1/3' : '-translate-x-1/3'} -translate-y-1/3 rotate-45
          ${isUser ? 'bg-green-500' : 'bg-zinc-800 border-t border-l border-zinc-700/50'}`} 
        />
      </motion.div>
    </motion.div>
  );
};

export default MessageItem;