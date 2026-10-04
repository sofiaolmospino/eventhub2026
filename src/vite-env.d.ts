interface ImportMetaEnv {
    readonly VITE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error('Falta configurar VITE_API_URL');
}
