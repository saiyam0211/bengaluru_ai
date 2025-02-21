import React, { useState, useEffect } from 'react';
import { Send, User, Bot, Search, Plus, AlertCircle, Menu, X, MapPin, Coffee, Sunrise, Briefcase } from 'lucide-react';
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
  const [theme, setTheme] = useState('dark');

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

  // Sample quick action prompts specific to Bangalore with icons
  const quickActions = [
    {
      title: "Tourist Places",
      prompt: "What are the must-visit tourist attractions in Bangalore?",
      description: "Explore popular destinations",
      icon: <MapPin className="w-5 h-5 text-pink-400" />
    },
    {
      title: "Local Food",
      prompt: "What are some famous local restaurants and food specialties in Bangalore?",
      description: "Discover Bangalore's cuisine",
      icon: <Coffee className="w-5 h-5 text-yellow-400" />
    },
    {
      title: "Weather",
      prompt: "How is the weather in Bangalore throughout the year?",
      description: "Learn about climate patterns",
      icon: <Sunrise className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Tech Parks",
      prompt: "Tell me about the major technology parks in Bangalore",
      description: "Learn about IT hubs",
      icon: <Briefcase className="w-5 h-5 text-green-400" />
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

  // Bangalore skyline SVG for desktop and tablet version
  const BangaloreSkylineSVG = () => (
    <svg className="absolute bottom-0 left-0 right-0 w-full h-32 opacity-10" viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,250 L50,250 L60,230 L75,230 L80,210 L100,210 L100,250 L150,250 L150,200 L170,180 L170,250 L200,250 L220,220 L220,250 L250,250 L250,150 L260,150 L260,250 L300,250 L300,220 L310,220 L310,200 L320,200 L320,250 L350,250 L350,180 L360,180 L360,170 L370,170 L370,250 L400,250 L400,200 L410,200 L410,190 L420,190 L420,250 L450,250 L450,230 L460,230 L460,250 L500,250 L500,180 L510,180 L510,160 L520,160 L520,250 L550,250 L550,200 L560,200 L560,250 L580,250 L580,100 L590,100 L590,250 L600,250 L600,220 L610,220 L610,240 L620,240 L620,250 L650,250 L650,150 L660,150 L660,250 L680,250 L680,200 L685,200 L685,180 L690,180 L690,250 L720,250 L720,220 L725,220 L725,250 L750,250 L750,150 L760,150 L760,250 L800,250 L800,200 L810,200 L810,230 L820,230 L820,250 L850,250 L850,180 L860,180 L860,250 L900,250 L900,170 L910,170 L910,150 L920,150 L920,250 L950,250 L950,210 L960,210 L960,250 L980,250 L980,100 L990,100 L990,80 L1000,80 L1000,250 L1050,250 L1050,150 L1060,150 L1060,250 L1100,250 L1100,200 L1110,200 L1110,180 L1120,180 L1120,250 L1150,250 L1150,220 L1160,220 L1160,250 L1200,250 L1200,300 L0,300 Z" fill="#4B5563"/>
    </svg>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-zinc-900 text-white overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 768 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className="w-64 bg-zinc-900/80 backdrop-blur-sm p-4 flex flex-col z-20 fixed md:static h-full border-r border-zinc-700/30"
        variants={sidebarVariants}
        initial={window.innerWidth >= 768 ? "open" : "closed"}
        animate={sidebarOpen ? "open" : "closed"}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <Bot className="w-6 h-6 text-green-400" />
            </motion.div>
            <span className="font-bold text-lg bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Bangalore AI</span>
          </div>
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
            className="w-full bg-zinc-800/70 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 border border-zinc-700/30"
          />
        </div>

        <motion.button 
          onClick={createNewChat}
          className="mb-6 bg-gradient-to-r from-green-500 to-teal-500 text-black rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:opacity-90 font-medium shadow-lg shadow-green-500/20"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus className="w-4 h-4" />
          New Chat
        </motion.button>

        <div className="flex-1 overflow-y-auto">
          <motion.div 
            className="space-y-1.5"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            {chats.map((chat) => (
              <motion.button 
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all duration-200
                  ${activeChat === chat.id 
                    ? 'bg-green-500/10 text-white border border-green-500/30' 
                    : 'text-gray-300 hover:bg-zinc-800/50 border border-transparent'
                  }`}
                whileHover={{ backgroundColor: activeChat === chat.id ? "rgba(16, 185, 129, 0.15)" : "rgba(39, 39, 42, 0.5)", x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Bot className={`w-4 h-4 shrink-0 ${activeChat === chat.id ? 'text-green-400' : 'text-gray-400'}`} />
                <span className="truncate">{chat.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Bangalore skyline SVG illustration in sidebar */}
        <div className="relative mt-6 pt-6 border-t border-zinc-800">
          <div className="text-xs text-gray-400 mb-1 text-center">Made with 🤍 by</div>
          <div className="text-center">
            <a href="https://devitup.in" target='_blank' className='font-bold text-sm bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent'>DevItUp</a>
          </div>
          <div className="h-16 mt-2 relative overflow-hidden rounded-lg opacity-70">
            <BangaloreSkylineSVG />
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-zinc-900/30 backdrop-blur-sm w-full relative">
        {/* Decorative element for desktop/tablet */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl -z-10"></div>

        {/* Chat Header */}
        <div className="border-b border-zinc-800/50 backdrop-blur-sm bg-black/30 p-4 flex items-center sticky top-0 z-10">
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
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Bangalore City Guide</h1>
            <p className="text-sm text-gray-400">Ask me anything about the Silicon Valley of India</p>
          </div>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="mx-4 mt-4 bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 backdrop-blur-sm"
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
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
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 shadow-lg ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-black rounded-br-none' 
                      : 'bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/30 rounded-bl-none'
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`rounded-full p-1 ${message.role === 'user' ? 'bg-black/10' : 'bg-green-500/10'}`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <span className="font-bold">
                      {message.role === 'user' ? 'You' : 'Bangalore Guide'}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div 
              className="flex items-center gap-3 text-gray-300 bg-zinc-800/80 backdrop-blur-sm p-4 rounded-2xl max-w-[85%] sm:max-w-[80%] border border-zinc-700/30 rounded-bl-none shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-full p-1 bg-green-500/10">
                <Bot className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex gap-1.5">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Welcome element with Bangalore illustration for empty chat */}
        <AnimatePresence>
          {currentChat.messages.length === 0 && !isLoading && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className="relative w-40 h-40 mb-6"
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" fill="#0f766e" fillOpacity="0.1" />
                  <path d="M60,140 L140,140 L140,70 L100,40 L60,70 Z" fill="#1f2937" />
                  <path d="M80,140 L100,140 L100,110 L80,110 Z" fill="#4ade80" />
                  <path d="M75,100 L85,100 L85,90 L75,90 Z" fill="#34d399" />
                  <path d="M95,100 L105,100 L105,90 L95,90 Z" fill="#34d399" />
                  <path d="M115,100 L125,100 L125,90 L115,90 Z" fill="#34d399" />
                  <path d="M75,80 L85,80 L85,70 L75,70 Z" fill="#34d399" />
                  <path d="M95,80 L105,80 L105,70 L95,70 Z" fill="#34d399" />
                  <path d="M115,80 L125,80 L125,70 L115,70 Z" fill="#34d399" />
                  <circle cx="170" cy="60" r="15" fill="#fcd34d" fillOpacity="0.7" />
                  <path d="M70,30 A30,10 0 0,1 130,30" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeDasharray="2" />
                  <path d="M60,45 A40,10 0 0,1 140,45" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeDasharray="2" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Welcome to Bangalore AI Guide</h3>
              <p className="text-center text-gray-400 max-w-md mb-6">Ask me anything about Bangalore - from tourist spots and local cuisine to tech parks and weather!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions - Only shown for new chats and not when loading */}
        <AnimatePresence>
          {currentChat.messages.length === 0 && !isLoading && (
            <motion.div 
              className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {quickActions.map((action, index) => (
                <motion.button 
                  key={index}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="p-4 bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/30 hover:border-green-500/30 transition-all text-left shadow-lg"
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(39, 39, 42, 0.6)" }}
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
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: index * 0.5 }}
                    >
                      {action.icon}
                    </motion.div>
                    <span className="font-semibold">{action.title}</span>
                  </div>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800/50 backdrop-blur-sm bg-black/30 sticky bottom-0 z-10">
          <motion.div 
            className="flex items-center gap-2 relative"
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
              className="flex-1 bg-zinc-800/70 backdrop-blur-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-green-500 border border-zinc-700/30 shadow-lg text-sm sm:text-base"
              disabled={isLoading}
            />
            <motion.button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="p-3 bg-gradient-to-r from-green-500 to-teal-500 text-black rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
              whileHover={{ scale: 1.05 }}
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