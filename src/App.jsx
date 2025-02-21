import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChatProvider } from './context/ChatContext';
import ChatPage from './pages/ChatPage';
import WelcomePage from './pages/WelcomePage';
import './styles/globals.css';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisitedBefore = localStorage.getItem('bengaluru-visited');
    if (!hasVisitedBefore) {
      setShowWelcome(true);
      localStorage.setItem('bengaluru-visited', 'true');
    }
    setIsLoading(false);
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-zinc-400">Loading Bangalore AI Guide...</p>
        </div>
      </div>
    );
  }

  return (
    <ChatProvider>
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomePage key="welcome" onComplete={handleWelcomeComplete} />
        ) : (
          <ChatPage key="chat" />
        )}
      </AnimatePresence>
    </ChatProvider>
  );
};

export default App;