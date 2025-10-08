import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (onUpdate: (data: any) => void) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");
    socketRef.current.on("boardUpdate", onUpdate);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [onUpdate]);

  const emit = (event: string, data: any) => {
    socketRef.current?.emit(event, data);
  };

  return { socket: socketRef.current, emit };
};
