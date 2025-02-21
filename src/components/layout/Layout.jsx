import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useChat } from '../../context/ChatContext';
import useWindowSize from '../../hooks/useWindowSize';

const Layout = ({ children }) => {
  const { sidebarOpen, setSidebarOpen } = useChat();
  const { width } = useWindowSize();
  const isDesktop = width >= 768;
  
  // Set sidebar to open by default on desktop, closed on mobile
  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [isDesktop, setSidebarOpen]);
  
  return (
    <div className="flex h-screen w-full bg-zinc-950 text-white overflow-hidden">
      {/* The sidebar component - will handle its own responsive behavior */}
      <Sidebar />
      
      {/* Main content area - should take full width on mobile */}
      <div className={`flex-1 flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-950 transition-all duration-300 w-full`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;