# NETRUNNER // ARCHIVE - Cyberpunk Tech Archive

NETRUNNER is a futuristic cyberpunk-themed technical archive showcasing articles on computer science topics with a high-tech aesthetic.

## Features

- 🎨 Stunning cyberpunk design with neon colors and glitch effects
- 🌐 Animated background grid and circuit traces
- 💻 CRT-style terminal overlay for detailed article views
- 🤖 AI-powered features using Google's Gemini API
- 📱 Fully responsive design

## Setup

### 1. Run the Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000/netrunner`

### 2. Configure Gemini API (Optional - for AI features)

To use the AI summarization and Q&A features:

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

3. Restart the development server

**Note:** The application works without the API key, but AI features will show an error message.

## Usage

- Click any card to open the terminal overlay
- View detailed article information in the sidebar
- Use the **EXEC_SUMMARY** button to get an AI summary
- Type questions in the input field and click **SEND** for AI-powered answers
- Click **X CLOSE** to return to the main grid
