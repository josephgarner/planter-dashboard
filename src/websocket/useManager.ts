import { Manager } from "socket.io-client";

export const useManager = () => {
  const manager = new Manager(
    `ws://${import.meta.env.VITE_WEBSOCKET_ADDRESS}:${
      import.meta.env.VITE_WEBSOCKET_PORT
    }`,
    {
      reconnectionAttempts: 6,
      reconnectionDelay: 10000,
    }
  );
  return manager.socket(`/dashboard`);
};
