/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_PATH: string
  readonly VITE_GMAIL_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
