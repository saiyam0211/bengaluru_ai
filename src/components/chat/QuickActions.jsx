import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Coffee, Building2, Bus, Landmark, Calendar, School } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const QuickActions = () => {
  const { currentChat, isLoading, sendMessage } = useChat();

  // Only show quick actions for empty chats
  if (currentChat.messages.length > 0 || isLoading) {
    return null;
  }

  const quickActions = [
    {
      title: "Tourist Places",
      prompt: "What are the must-visit tourist attractions in Bangalore?",
      description: "Explore popular destinations",
      icon: <Landmark className="w-5 h-5 text-purple-400" />,
      color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30"
    },
    {
      title: "Local Food",
      prompt: "What are some famous local restaurants and food specialties in Bangalore?",
      description: "Discover Bangalore's cuisine",
      icon: <Coffee className="w-5 h-5 text-red-400" />,
      color: "from-red-500/20 to-orange-500/20 border-red-500/30"
    },
    {
      title: "Tech Parks",
      prompt: "Tell me about the major technology parks in Bangalore",
      description: "Learn about IT hubs",
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
      color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30"
    },
    {
      title: "Transportation",
      prompt: "How is public transportation in Bangalore? Tell me about metro, buses and cabs.",
      description: "Navigate the city",
      icon: <Bus className="w-5 h-5 text-green-400" />,
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30"
    },
    {
      title: "Neighborhoods",
      prompt: "Which are the best neighborhoods to stay in Bangalore?",
      description: "Find the best areas",
      icon: <MapPin className="w-5 h-5 text-yellow-400" />,
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30"
    },
    {
      title: "Education",
      prompt: "What are the top educational institutions in Bangalore?",
      description: "Explore colleges & universities",
      icon: <School className="w-5 h-5 text-cyan-400" />,
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30"
    },
    {
      title: "Events & Festivals",
      prompt: "What are some popular annual events and festivals in Bangalore?",
      description: "Discover cultural celebrations",
      icon: <Calendar className="w-5 h-5 text-pink-400" />,
      color: "from-pink-500/20 to-rose-500/20 border-pink-500/30"
    }
  ];

  const handleQuickAction = (prompt) => {
    sendMessage(prompt);
  };
  
  return (
    <motion.div 
      className="p-3 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
    >
      {quickActions.map((action, index) => (
        <motion.button 
          key={index}
          onClick={() => handleQuickAction(action.prompt)}
          className={`p-4 bg-gradient-to-br ${action.color} border border-opacity-30 rounded-xl shadow-sm hover:shadow-md transition-all text-left`}
          whileHover={{ 
            scale: 1.02, 
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)" 
          }}
          whileTap={{ scale: 0.98 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-black/20 backdrop-blur-sm">
              {action.icon}
            </div>
            <span className="font-medium text-zinc-200">{action.title}</span>
          </div>
          <p className="text-xs text-zinc-400">{action.description}</p>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuickActions;