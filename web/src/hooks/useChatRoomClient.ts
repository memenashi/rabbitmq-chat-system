import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";

interface MessageBase {
  type: "message" | "direct" | "join" | "leave";
  publishDateTime: Date;
  from: string;
  body: string;
}

export interface Message extends MessageBase {
  type: "message" | "join" | "leave";
  to?: never;
}

export interface DirectMessage extends MessageBase {
  type: "direct";
  to: string;
}

export type EntireMessage = Message | DirectMessage;

interface UseChatRoomClientProps {
  username: string;
  hostname: string;
}

export const useChatRoomClient = ({
  username,
  hostname,
}: UseChatRoomClientProps) => {
  const clientRef = useRef<Client | undefined>(undefined);
  const [messages, setMessages] = useState<(Message | DirectMessage)[]>([]);
  const loginRef = useRef<boolean>(false);

  const addMessage = useCallback((message: Message | DirectMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const getStompClient = () => {
    if (clientRef.current) return clientRef.current;
    // const ws = new WebSocket("ws://127.0.0.1:15674/ws");
    // clientRef.current = Stomp.over(ws);

    const client = new Client({
      brokerURL: `ws://${hostname}:15674/ws`,
      connectHeaders: {
        login: "guest",
        passcode: "guest",
        host: "/",
      },
      onConnect: () => {
        console.log("onConnect");
        client.subscribe("/topic/messages", (message) => {
          console.log("message", message);
          addMessage(JSON.parse(message.body) as Message);
        });
        client.subscribe(`/queue/${username}`, (message) => {
          console.log("directMessage", message);
          addMessage(JSON.parse(message.body) as DirectMessage);
        });
        if(loginRef.current)return;
        const joinMessage: Message = {
          type: "join",
          publishDateTime: new Date(),
          from: username,
          body: `${username} joined the room`,
        };
        client.publish({
          destination: "/topic/messages",
          body: JSON.stringify(joinMessage),
        });
        loginRef.current = true;
      },
      debug: (str) => {
        console.debug(str);
      },
    });
    clientRef.current = client;
    return clientRef.current;
  };

  const sendMessage = useCallback((input: EntireMessage) => {
    if (!clientRef.current) return;
    if (input.type !== "direct") {
      clientRef.current.publish({
        destination: "/topic/messages",
        body: JSON.stringify(input),
      });
    } else {
      addMessage(input);
      clientRef.current.publish({
        destination: `/queue/${input.to}`,
        body: JSON.stringify(input),
      });
    }
  }, []);

  useEffect(() => {
    const stompClient = getStompClient();
    if (!stompClient.active) stompClient.activate();
    return () => {
      if (stompClient == null) return;
      const leaveMessage: Message = {
        type: "leave",
        publishDateTime: new Date(),
        from: username,
        body: `${username} left the room`,
      };
      stompClient.publish({
        destination: "/topic/messages",
        body: JSON.stringify(leaveMessage),
      });
      if (stompClient.connected) stompClient.deactivate();
    };
  }, []);

  const close = useCallback(() => {
    if (clientRef.current != null) {
    clientRef.current.deactivate();}
    loginRef.current = false;
  }, []);

  return { sendMessage, messages, close };
};
