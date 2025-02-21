import React from 'react';
import Layout from '../components/layout/Layout';
import ChatHeader from '../components/layout/ChatHeader';
import MessageList from '../components/chat/MessageList';
import InputArea from '../components/chat/InputArea';
import QuickActions from '../components/chat/QuickActions';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
  const { currentChat } = useChat();
  
  return (
    <Layout>
      <div className="flex flex-col h-full relative">
        <ChatHeader />
        <ErrorMessage />
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <MessageList />
          {currentChat.messages.length === 0 && <QuickActions />}
        </div>
        
        <InputArea />
      </div>
    </Layout>
  );
};

export default ChatPage;