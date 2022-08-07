/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSOCKET_ADDRESS: string;
  readonly VITE_WEBSOCKET_PORT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
