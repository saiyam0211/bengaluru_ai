import React, { useState, useEffect } from 'react';
import { Send, User, Bot, Search, Plus, AlertCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BangaloreChatBot = () => {
  const [chats, setChats] = useState([
    { id: 'default', name: 'New Chat', messages: [], timestamp: Date.now() }
  ]);
  const [activeChat, setActiveChat] = useState('default');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // System message to enforce Bangalore-specific responses
  const systemMessage = {
    role: "system",
    content: `You are a specialized AI assistant focused exclusively on Bangalore, India. 
    Only answer questions related to Bangalore's:
    - History and culture
    - Places to visit and tourism
    - Local food and restaurants
    - Transportation and traffic
    - Weather and climate
    - Education institutions
    - Technology parks and companies
    - Shopping areas and markets
    - Real estate and housing
    - Local events and festivals
    - Infrastructure and development
    
    If a question is not specifically about Bangalore or cannot be directly connected to Bangalore, 
    politely inform the user that you can only assist with Bangalore-related queries. 
    Always maintain accuracy and provide up-to-date information about Bangalore.`
  };

  // Sample quick action prompts specific to Bangalore
  const quickActions = [
    {
      title: "Tourist Places",
      prompt: "What are the must-visit tourist attractions in Bangalore?",
      description: "Explore popular destinations"
    },
    {
      title: "Local Food",
      prompt: "What are some famous local restaurants and food specialties in Bangalore?",
      description: "Discover Bangalore's cuisine"
    },
    {
      title: "Tech Parks",
      prompt: "Tell me about the major technology parks in Bangalore",
      description: "Learn about IT hubs"
    }
  ];

  const currentChat = chats.find(chat => chat.id === activeChat);

  const createNewChat = () => {
    const newChat = {
      id: `chat-${Date.now()}`,
      name: 'New Chat',
      messages: [],
      timestamp: Date.now()
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    setError(null);
    
    // Close sidebar on mobile after creating a new chat
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const updateChatName = (chatId, message) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const newName = message.length > 30 
          ? message.substring(0, 30) + '...'
          : message;
        return { ...chat, name: newName };
      }
      return chat;
    }));
  };

  const handleQuickAction = (prompt) => {
    setInputMessage(prompt);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
        role: 'user',
        content: inputMessage
    };
    
    setChats(prev => prev.map(chat => {
        if (chat.id === activeChat) {
            return {
                ...chat,
                messages: [...chat.messages, userMessage]
            };
        }
        return chat;
    }));

    if (currentChat.messages.length === 0) {
        updateChatName(activeChat, inputMessage);
    }

    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
        // Include the system message in the conversation history
        const messages = [systemMessage, ...currentChat.messages, userMessage];
        
        const response = await fetch('https://bengaluru-ai-1.onrender.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            setChats(prev => prev.map(chat => {
                if (chat.id === activeChat) {
                    return {
                        ...chat,
                        messages: [...chat.messages, data.choices[0].message]
                    };
                }
                return chat;
            }));
        } else {
            throw new Error('Invalid response format from API');
        }
    } catch (error) {
        console.error('Error:', error);
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    // Close sidebar on mobile after selecting a chat
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 768 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className="w-64 bg-zinc-900 p-4 flex flex-col z-20 fixed md:static h-full"
        variants={sidebarVariants}
        initial={window.innerWidth >= 768 ? "open" : "closed"}
        animate={sidebarOpen ? "open" : "closed"}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold">Bangalore AI Guide</span>
          {window.innerWidth < 768 && (
            <button onClick={toggleSidebar} className="md:hidden">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search chats"
            className="w-full bg-zinc-800 pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <motion.button 
          onClick={createNewChat}
          className="mb-4 bg-green-500 text-black rounded-md py-2 px-4 flex items-center justify-center gap-2 hover:bg-green-400"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus className="w-4 h-4" />
          New Chat
        </motion.button>

        <div className="flex-1 overflow-y-auto">
          <motion.div 
            className="space-y-1"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            {chats.map((chat) => (
              <motion.button 
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2
                  ${activeChat === chat.id 
                    ? 'bg-zinc-800 text-white' 
                    : 'text-gray-300 hover:bg-zinc-800/50'
                  }`}
                whileHover={{ backgroundColor: activeChat === chat.id ? "#222" : "#333", x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Bot className="w-4 h-4 shrink-0" />
                <span className="truncate">{chat.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
        <div className="footer-text text-xs text-center justify-center">
          Made with 🤍 by <a href="https://devitup.in" target='_blank' className='font-black'>DevItUp</a>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-zinc-900 w-full">
        {/* Chat Header */}
        <div className="border-b border-zinc-800 p-4 flex items-center">
          {window.innerWidth < 768 && (
            <motion.button 
              onClick={toggleSidebar}
              className="mr-3"
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          )}
          <div>
            <h1 className="text-xl font-semibold">Bangalore City Guide</h1>
            <p className="text-sm text-gray-400">Ask me anything about Bangalore - from tourist spots to tech parks!</p>
          </div>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="m-4 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {currentChat.messages.map((message, index) => (
              <motion.div
                key={index}
                className={`flex items-start gap-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
              >
                <motion.div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-green-500 text-black' 
                      : 'bg-zinc-800'
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="font-semibold">
                      {message.role === 'user' ? 'You' : 'Bangalore Guide'}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div 
              className="flex items-center gap-2 text-gray-400 bg-zinc-800 p-3 rounded-lg max-w-[80%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Bot className="w-4 h-4" />
              <motion.span
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Thinking about Bangalore...
              </motion.span>
            </motion.div>
          )}
        </div>

        {/* Quick Actions - Only shown for new chats */}
        <AnimatePresence>
          {currentChat.messages.length === 0 && (
            <motion.div 
              className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {quickActions.map((action, index) => (
                <motion.button 
                  key={index}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-left"
                  whileHover={{ scale: 1.03, backgroundColor: "#333" }}
                  whileTap={{ scale: 0.97 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-5 h-5 text-green-500" />
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Ask anything about Bangalore..."
              className="flex-1 bg-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              disabled={isLoading}
            />
            <motion.button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="p-2 bg-green-500 text-black rounded-lg hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BangaloreChatBot;