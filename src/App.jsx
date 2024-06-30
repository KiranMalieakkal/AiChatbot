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
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGpt",
      sender: "ChatGpt",
      direction: "incoming",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; // all the old messages plus the new message

    //update the message list
    setMessages(newMessages);

    //Add the Typing Indicator
    setTyping(true);
  };

  return (
    <>
      <div className="App">
        <div style={{ position: "relative", height: "600px", width: "700px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  typing ? (
                    <TypingIndicator content={"ChatGpt is Typing"} />
                  ) : null
                }
              >
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
