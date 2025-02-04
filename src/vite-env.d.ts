/// <reference types="vite/client" />

// NOTE - Use it if you want to define more types than the default
interface ImportMetaEnv {
	readonly VITE_BASE_API_URL: string
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
