import React, { createContext, useState, useContext, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem('bengaluru-chats');
    return savedChats ? JSON.parse(savedChats) : [
      { id: 'default', name: 'New Chat', messages: [], timestamp: Date.now() }
    ];
  });
  
  const [activeChat, setActiveChat] = useState(() => {
    const savedActiveChat = localStorage.getItem('bengaluru-active-chat');
    return savedActiveChat || 'default';
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    
    CRITICAL FORMATTING INSTRUCTIONS:
    - DO NOT use asterisks (*) anywhere in your responses
    - DO NOT use markdown formatting
    - Use plain text only
    - Use numbered sections (1., 1.1, 1.2, etc.) to organize information
    - Use dash (-) at the beginning of lines for bullet points
    - Highlight important names by placing them at the beginning of bullet points
    - Use blank lines to separate major sections
    - For restaurant listings, use this format:
      1.1 Restaurant Name
      - Description point 1
      - Description point 2
    
    Example of correct format for food listings:
    
    1. Popular Restaurants
    
    1.1 MTR 1924
    - Iconic vegetarian restaurant chain serving traditional South Indian dishes
    - Known for its masala dosas, rava idlis, and filter coffee
    
    1.2 Vidyarthi Bhavan
    - No-frills, old-fashioned eatery serving authentic South Indian dishes
    - Known for its masala dosas, idlis, and vadas
    
    If a question is not specifically about Bangalore or cannot be directly connected to Bangalore, 
    politely inform the user that you can only assist with Bangalore-related queries.
    Always maintain accuracy and provide up-to-date information about Bangalore.`
  };

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bengaluru-chats', JSON.stringify(chats));
  }, [chats]);

  // Save activeChat to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bengaluru-active-chat', activeChat);
  }, [activeChat]);

  const currentChat = chats.find(chat => chat.id === activeChat) || chats[0];

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
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
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

  const deleteChat = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If we're deleting the active chat, set the first available chat as active
    if (activeChat === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setActiveChat(remainingChats[0].id);
      } else {
        // If no chats left, create a new one
        createNewChat();
      }
    }
  };

  const clearAllChats = () => {
    const newChat = {
      id: `chat-${Date.now()}`,
      name: 'New Chat',
      messages: [],
      timestamp: Date.now()
    };
    setChats([newChat]);
    setActiveChat(newChat.id);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
        role: 'user',
        content: message
    };
    
    // Update messages in the current chat
    setChats(prev => prev.map(chat => {
        if (chat.id === activeChat) {
            return {
                ...chat,
                messages: [...chat.messages, userMessage]
            };
        }
        return chat;
    }));

    // Update chat name if this is the first message
    if (currentChat.messages.length === 0) {
        updateChatName(activeChat, message);
    }

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
    setError(null);
    // Close sidebar on mobile after selecting a chat
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const value = {
    chats,
    activeChat,
    currentChat,
    isLoading,
    error,
    sidebarOpen,
    setError,
    createNewChat,
    deleteChat,
    clearAllChats,
    sendMessage,
    handleChatSelect,
    toggleSidebar,
    setSidebarOpen,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};