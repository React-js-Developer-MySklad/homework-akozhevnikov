import React from 'react';
import './style.css'
import {createRoot} from 'react-dom/client';
import {App} from './components/app/app'
import {StrictMode} from "react";
import {AgentProvider} from "./components/context/AgentContext";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AgentProvider>
            <App/>
        </AgentProvider>
    </StrictMode>
);