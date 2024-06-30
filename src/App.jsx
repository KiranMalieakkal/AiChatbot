import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"; // we have imported the @chatscope/chat-ui-kit-react and using the styles.
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    {
      messages: "Hello, I am ChatGpt",
      sender: "ChatGpt",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; // all the old messages plus the new message

    setMessages(newMessages);
  };

  return (
    <>
      <div className="App">
        <div style={{ position: "relative", height: "600px", width: "700px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Enter your message"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
}

export default App;
