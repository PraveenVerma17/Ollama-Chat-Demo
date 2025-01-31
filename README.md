# React Application with Ollama LLM Integration

This is a simple React application that integrates with a local Large Language Model (LLM) using Ollama. The goal of this application is to demonstrate how to interact with a local LLM API in a React app for building AI-powered features.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (Recommended version: v16 or higher)
- **npm** (Node Package Manager) or **yarn**
- **Ollama** installed and running on your local machine.

### Installing Ollama

1. Download and install Ollama from [https://ollama.com/](https://ollama.com/).
2. Follow the installation instructions specific to your OS (macOS, Windows, or Linux).
3. Once installed, start Ollama by running:
   ```bash
   ollama start


### Clone Project

```bash
git clone https://github.com/PraveenVerma17/Ollama-Chat-Demo.git
cd Ollama-Chat-Demo

```

### Install Dependencies

```bash
npm ci or npm install
```

## Running the Application

Once the dependencies are installed and the environment variables are set, you can start the application:

```bash
npm run dev

```
Open your browser and go to url given in terminal to see the React application in action.

## How It Works

The React app sends a request to the local Ollama LLM API via HTTP.
The response from Ollama is processed and displayed in the UI.
You can customize the application by modifying the API calls or adding new features.

### Example Interaction

The main feature of this application allows users to enter a prompt, which is then sent to the local LLM. The LLM processes the request and sends back a response, which is then displayed in the React app.

For example, users can input questions like:

"What's the capital of France?"
"Tell me a joke."
"Summarize this text."
The responses are dynamically generated by Ollama’s LLM.


