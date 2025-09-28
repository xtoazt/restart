# OpenRouter Chat UI

A modern chat interface powered by OpenRouter built with Next.js, Tailwind CSS, and TypeScript. This application provides a ready-to-use UI for interacting with various AI models through the OpenRouter API.

<img src="https://agno-public.s3.us-east-1.amazonaws.com/assets/agent_ui_banner.svg" alt="agent-ui" style="border-radius: 10px; width: 100%; max-width: 800px;" />

## Features

- 🔗 **OpenRouter Integration**: Seamlessly connect to OpenRouter API for access to multiple AI models
- 💬 **Modern Chat Interface**: Clean design with real-time streaming support
- 🤖 **Multiple AI Models**: Support for GPT-4, Claude, Gemini, and many other models
- 🎨 **Customizable UI**: Built with Tailwind CSS for easy styling
- 🧰 **Built with Modern Stack**: Next.js, TypeScript, shadcn/ui, Framer Motion, and more
- 🔄 **Real-time Streaming**: Live chat responses with streaming support
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

Before setting up the OpenRouter Chat UI, you need API keys for the AI providers:

1. **OpenRouter API Key**: Get one by signing up at [OpenRouter](https://openrouter.ai/)
2. **LLM7 API Keys** (optional): Get free keys at [LLM7](https://token.llm7.io/)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# OpenRouter API Key
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-api-key-here

# LLM7 API Keys (comma-separated for rotation)
LLM7_API_KEYS=your-llm7-key-1,your-llm7-key-2,your-llm7-key-3,your-llm7-key-4
```

For production deployment (e.g., Vercel), add these environment variables in your deployment platform's settings.

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd restart
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using the Chat Interface

The OpenRouter Chat UI provides a simple and intuitive interface for chatting with various AI models:

### 1. Select a Model

- Click on the model selector in the left sidebar
- Choose from available models like GPT-4, Claude, Gemini, and more
- The interface will automatically load available models from OpenRouter

### 2. Start Chatting

- Type your message in the input field at the bottom
- Press Enter or click the send button to send your message
- The AI response will stream in real-time

### 3. Features

- **Real-time Streaming**: Responses appear as they're generated
- **Model Switching**: Change models anytime during your conversation
- **Clean Interface**: Focus on the conversation with a minimal, distraction-free design



## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the [MIT License](./LICENSE).
