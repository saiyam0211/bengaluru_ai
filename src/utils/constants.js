// BANGALORE FACTS
export const BANGALORE_FACTS = [
    "Bangalore is known as the 'Garden City' of India due to its many parks and green spaces.",
    "The city's name was officially changed from Bangalore to Bengaluru in 2014.",
    "Bangalore is often called the 'Silicon Valley of India' due to its thriving IT industry.",
    "The city has a pleasant climate throughout the year with temperatures ranging from 15°C to 35°C.",
    "Bangalore is home to the Indian Institute of Science, one of India's premier research institutions.",
    "The Vidhana Soudha, housing the state legislature, is one of the largest legislative buildings in India.",
    "Bangalore has a vibrant startup ecosystem and is a major tech hub in Asia.",
    "The city was founded by Kempe Gowda I in 1537 with four towers marking its boundaries.",
    "Bangalore is one of India's most cosmopolitan cities with people from across India and the world.",
    "Lalbagh Botanical Garden houses India's largest collection of rare tropical plants."
  ];
  
  // CATEGORIES
  export const CHAT_CATEGORIES = [
    { 
      id: "tourism", 
      name: "Tourism", 
      description: "Tourist spots, historical places, and attractions"
    },
    { 
      id: "food", 
      name: "Food & Dining", 
      description: "Restaurants, cafes, street food, and local cuisine"
    },
    { 
      id: "tech", 
      name: "Tech & Business", 
      description: "Tech parks, startups, and companies"
    },
    { 
      id: "transport", 
      name: "Transportation", 
      description: "Metro, buses, traffic, and getting around"
    },
    { 
      id: "lifestyle", 
      name: "Lifestyle", 
      description: "Shopping, entertainment, and recreation"
    },
    { 
      id: "education", 
      name: "Education", 
      description: "Schools, colleges, and universities"
    },
    { 
      id: "real-estate", 
      name: "Real Estate", 
      description: "Housing, localities, and property"
    },
    { 
      id: "events", 
      name: "Events", 
      description: "Festivals, concerts, and local events"
    }
  ];
  
  // API ENDPOINTS
  export const API_ENDPOINTS = {
    CHAT: "https://bengaluru-ai-1.onrender.com/api/chat"
  };
  
  // TIME FORMATTERS
  export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  export const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    
    return formatDate(timestamp);
  };
  
  // LOCAL STORAGE KEYS
  export const LOCAL_STORAGE_KEYS = {
    CHATS: 'bengaluru-chats',
    ACTIVE_CHAT: 'bengaluru-active-chat',
    VISITED: 'bengaluru-visited',
    THEME: 'bengaluru-theme',
    USER_SETTINGS: 'bengaluru-user-settings'
  };
  
  // SYSTEM MESSAGES
  export const SYSTEM_MESSAGE = {
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
    
    IMPORTANT FORMATTING INSTRUCTIONS:
    1. Format your responses with clear headings, bullet points, and numbered lists
    2. DO NOT use asterisks (**) for formatting - use proper structure instead
    3. Use descriptive headings to introduce sections
    4. Use bullet points (-) for listing items
    5. Use numbered lists for sequential information
    6. Highlight important information with concise phrasing
    7. Structure responses in a clean, easy-to-read format with proper spacing
    
    If a question is not specifically about Bangalore or cannot be directly connected to Bangalore, 
    politely inform the user that you can only assist with Bangalore-related queries. 
    Always maintain accuracy and provide up-to-date information about Bangalore.`
  };