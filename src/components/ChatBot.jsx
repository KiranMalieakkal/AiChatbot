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

function ChatBot() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I am an AI ChatBot. Please feel free to ask me anything :)",
      sender: "ChatGPT",
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
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    //ChatMessages structure : { sender : "user" or "assitant" , message: "The message content"}
    //Api Message structutr : { role: "user" or "assistant" , content: "The message content"}

    let apimessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // role: "user" -> a message form the user,  role: "assistant" -> a response form Chatgpt
    // role : "System" -> generally one message from chatgpt defining how we want chat got to respond

    const systemMessage = {
      role: "system",
      content: "Explain to a 10 year old",
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apimessages], // {mesasge1, message2,message3...}
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <>
      <div className="App">
        <div style={{ position: "relative", height: "600px", width: "700px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  typing ? (
                    <TypingIndicator content={"AI ChatBot is Typing"} />
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

export default ChatBot;
