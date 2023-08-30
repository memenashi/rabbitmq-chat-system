import { useState, useEffect, useRef } from "react";
import { Client, Stomp } from "@stomp/stompjs";

function Chat() {
  const clientRef = useRef<Client | undefined>(undefined);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const getStompClient = () => {
    if (clientRef.current) return clientRef.current;
    // const ws = new WebSocket("ws://127.0.0.1:15674/ws");
    // clientRef.current = Stomp.over(ws);

    const client = new Client({
      brokerURL: "ws://localhost:15674/ws",
      connectHeaders: {
        login: "guest",
        passcode: "guest",
        host: "/",
      },
      onConnect: () => {
        console.log("onConnect");
        client.subscribe("/topic/messages", (message) => {
          console.log("message", message);
          setMessages((prev) => [...prev, message.body]);
        });
      },
      debug: (str) => {
        console.debug(str);
      },
    });
    clientRef.current = client;
    return clientRef.current;
  };

  useEffect(() => {
    const stompClient = getStompClient();
    console.log("connecting", { stompClient });

    console.log("connecting");
    if (!stompClient.active) stompClient.activate();
    return () => {
      if (stompClient == null) return;
      if (stompClient.connected) stompClient.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (clientRef.current) {
      clientRef.current.publish({
        destination: "/topic/messages",
        body: input,
      });
      setInput("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
