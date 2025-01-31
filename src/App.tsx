import { useState, useRef, useEffect } from 'react';
import './App.css';
import ReactMarkdown, { Components } from 'react-markdown';
import Ollama, { Message, ListResponse } from 'ollama/browser'
import rehypeRaw from 'rehype-raw';
import Prism from 'prismjs'
import 'prismjs/themes/prism.css';
import ScrollableDiv from './ScrollableDiv';

function App() {
  const [models, setModels] = useState<ListResponse>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '' && selectedModel) {
        setMessages([...messages, { role: 'user', content: newMessage }]);
        setNewMessage('');
        setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: '' }]);

      try {
        const response = await Ollama.chat({
          model: selectedModel,
          messages: [{ role: 'user', content: newMessage }],
          stream: true,
        });

        let fullResponse = ''; 
        for await (const part of response) {
          fullResponse += part.message.content;
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            if (newMessages.length > 0) {
                newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    content: fullResponse
                }
            }
            return newMessages;
          });
        }
      } catch (error) {
        console.error("Error during streaming:", error);
        // Handle the error here
        setMessages(prevMessages => [...prevMessages.slice(0, prevMessages.length - 1)]);
        setMessages(prevMessages => [...prevMessages, {role: 'assistant', content: "Error occured"}]);
      }
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  // Custom code block renderer
  const renderers:Components = {
    code({ className, children }) {
      const language = className?.replace('language-', '') || 'plaintext';
      return (
        <pre className={`language-${language}`}>
          <code className={`language-${language}`}>{children}</code>
        </pre>
      );
    },
  };

  useEffect(() => {
    const loadModels = async () => {
      const list = await Ollama.list();
      setModels(list);
    };
    loadModels();
  }, [])

  // Highlight the code blocks after the component mounts
  useEffect(() => {
      Prism.highlightAll();
  }, []);


  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>OLLAMA CHAT MODULE</h1>
      </header>
      <ScrollableDiv className="message-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]} 
              components={renderers}
             >
              {message.content}
            </ReactMarkdown>
          </div>
        ))}
      </ScrollableDiv>
      <div className="model-selector">
        <select id="model-select" value={selectedModel} onChange={handleModelChange}>
          <option value="">-- Select a model --</option>
          {models?.models?.map((model: any) => (
            <option key={model.model} value={model.model}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <div className="text-area">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          ref={inputRef}
          rows={3}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
