import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import './styles/global.css';
import App from './app/App';
import AppErrorBoundary from './app/AppErrorBoundary';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppErrorBoundary>
    </StrictMode>,
);