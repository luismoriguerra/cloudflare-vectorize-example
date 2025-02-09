# RAG AI Tutorial

A Cloudflare Workers project implementing a Retrieval-Augmented Generation (RAG) system with AI capabilities. This application provides a notes management system with vector search capabilities, built on top of Cloudflare's infrastructure.

## Features

- Notes Management API
- Vector Database Integration
- LLM Service Integration
- RESTful API Endpoints
- Built with Cloudflare Workers

## Prerequisites

- Node.js (Latest LTS version recommended)
- Cloudflare Account
- Wrangler CLI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rag-ai-tutorial
```

2. Install dependencies:
```bash
npm install
```

3. Configure your environment:
   - Create necessary API keys in your Cloudflare dashboard
   - Set up required environment variables

## Development

To start the development server:

```bash
npm run dev
```

This will start the application at `http://localhost:8787`

## API Endpoints

### Notes API
- `GET /notes` - Retrieve all notes
- `POST /notes` - Create a new note
- Additional notes endpoints

### Vectors API
- Vector-related operations for RAG functionality
- Embedding and similarity search endpoints

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## Project Structure

```
├── src/
│   ├── index.js           # Main application entry point
│   ├── routes/            # API route handlers
│   └── services/          # Core services (Notes, Vector DB, LLM)
├── test/                  # Test files
├── .secrets/              # Secret configurations
└── wrangler.json         # Cloudflare Workers configuration
```

## Testing

Run the test suite:

```bash
npm test
```

## Built With

- [Hono](https://hono.dev/) - Fast, Lightweight, Web-standards Web Framework
- Cloudflare Workers - Edge computing platform
- Vector Database - For similarity search capabilities
- LLM Integration - For AI-powered features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
