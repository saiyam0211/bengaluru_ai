# Bangalore AI Guide

A specialized AI chatbot that provides information exclusively about Bangalore, India. The chatbot is designed to help users learn about tourist spots, local cuisine, technology parks, transportation options, and other aspects of Bangalore.

## Features

- **Specialized Knowledge**: Focused exclusively on Bangalore-related information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Beautiful UI**: Modern interface with animations and illustrations
- **Chat History**: Saves your conversation history locally
- **Quick Actions**: Suggested prompts for common queries
- **Welcome Tour**: Guided introduction for first-time users

## Tech Stack

- React.js
- Tailwind CSS
- Framer Motion for animations
- Lucide React for icons
- Vite for building and development

## Project Structure

The project is organized into components, pages, and utility files:

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── ChatHeader.jsx
│   │   └── Layout.jsx
│   ├── chat/
│   │   ├── MessageList.jsx
│   │   ├── MessageItem.jsx
│   │   ├── InputArea.jsx
│   │   └── QuickActions.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── SearchInput.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── LoadingIndicator.jsx
│   └── illustrations/
│       ├── BangaloreSkyline.jsx
│       ├── EmptyChatIllustration.jsx
│       └── WelcomeIllustration.jsx
├── pages/
│   ├── ChatPage.jsx
│   ├── WelcomePage.jsx
│   └── NotFoundPage.jsx
├── hooks/
│   ├── useChats.js
│   ├── useWindowSize.js
│   └── useChatApi.js
├── context/
│   └── ChatContext.jsx
├── utils/
│   ├── formatters.js
│   └── constants.js
├── styles/
│   └── globals.css
└── App.jsx
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/devitup/bangalore-ai-guide.git
cd bangalore-ai-guide
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## API Integration

The chatbot connects to a backend API at `https://bengaluru-ai-1.onrender.com/api/chat`. Make sure the API is accessible before running the application.

## Deployment

To deploy the application:

1. Build the project
```bash
npm run build
```

2. The built files will be in the `dist` directory. Deploy these files to your hosting service.

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/devitup/bangalore-ai-guide/issues).

## License

This project is MIT licensed.

## Credits

- Made with 🤍 by [DevItUp](https://devitup.in)
- Illustrations created by the development team
- Icons provided by [Lucide](https://lucide.dev/)
