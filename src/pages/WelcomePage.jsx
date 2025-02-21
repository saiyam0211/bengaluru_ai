import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, MapPin, Coffee, Star, Info } from 'lucide-react';
import WelcomeIllustration from '../components/illustrations/WelcomeIllustration';
import BangaloreSkyline from '../components/illustrations/BangaloreSkyline';
import { useChat } from '../context/ChatContext';

const WelcomePage = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const { createNewChat } = useChat();
  
  const features = [
    {
      title: "Local Knowledge",
      description: "Get insider tips about Bangalore's best places to visit, eat, and explore",
      icon: <MapPin className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Personalized Recommendations",
      description: "Discover food, attractions, and experiences tailored to your interests",
      icon: <Star className="w-6 h-6 text-yellow-400" />
    },
    {
      title: "Comprehensive Information",
      description: "From tech parks to traditional markets, get details on all aspects of the city",
      icon: <Info className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Local Cuisine Guide",
      description: "Explore Bangalore's diverse food scene from street food to fine dining",
      icon: <Coffee className="w-6 h-6 text-red-400" />
    }
  ];

  const steps = [
    {
      title: "Welcome to Bangalore AI Guide",
      subtitle: "Your personal assistant for everything Bangalore",
      content: (
        <div className="flex flex-col items-center justify-center space-y-8">
          <WelcomeIllustration className="w-full max-w-md" />
          <div className="text-center space-y-2">
            <p className="text-zinc-300">
              I'm your specialized AI assistant focused exclusively on Bangalore, India. I can help you discover the best of the Garden City!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "What I Can Help With",
      subtitle: "Discover Bangalore like a local",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-zinc-900 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-zinc-200 mb-1">{feature.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "Let's Start Exploring Bangalore",
      subtitle: "I'm here to make your Bangalore experience amazing",
      content: (
        <div className="flex flex-col items-center justify-center space-y-6 my-6">
          <div className="relative w-full max-w-xl">
            <BangaloreSkyline className="w-full h-48" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 flex items-end justify-center"></div>
          </div>
          <div className="text-center space-y-3 max-w-md">
            <p className="text-zinc-300">
              Ask me about tourist spots, local cuisine, tech parks, weather, transportation, or anything else related to Bangalore!
            </p>
            <div className="flex items-center justify-center">
              <Bot className="w-5 h-5 text-green-400 mr-2" />
              <p className="text-sm text-zinc-400">I'm specialized in Bangalore-related information only</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleStart = () => {
    createNewChat();
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
        <motion.div 
          className="w-full max-w-xl md:max-w-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress Bar */}
          <div className="w-full bg-zinc-800 h-1">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <div className="p-6 md:p-8">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  {steps[step].title}
                </h1>
                <p className="text-zinc-400">{steps[step].subtitle}</p>
              </div>
              
              {steps[step].content}
              
              <div className="flex justify-between pt-4">
                <motion.button
                  onClick={() => setStep(prev => Math.max(0, prev - 1))}
                  className={`px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 ${
                    step === 0 ? 'invisible' : ''
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Back
                </motion.button>
                
                {step < steps.length - 1 ? (
                  <motion.button
                    onClick={() => setStep(prev => prev + 1)}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleStart}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <footer className="text-center p-4 text-zinc-500 text-xs">
        <p>Made with 🤍 by <a href="https://devitup.in" target="_blank" rel="noopener noreferrer" className="font-bold text-zinc-400 hover:text-green-400 transition-colors">DevItUp</a></p>
      </footer>
    </div>
  );
};

export default WelcomePage;