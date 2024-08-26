import React, {createContext, ReactNode, useEffect, useState} from 'react';
import axios from 'axios';
import {Agent} from '../../model/Agent';
import {v4} from "uuid";

interface IAgentContext {
    agents: Agent[];
    getAll: () => Promise<Agent[]>
    get: (id: string) => Promise<Agent>
    create: (agent: Agent) => void;
    update: (agent: Agent) => void;
    remove: (id: string) => void;
}

const api = axios.create({
    baseURL: 'http://localhost:3000/'
});

const AgentContext = createContext<IAgentContext | undefined>(undefined);

const AgentProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    const [agents, setAgents] = useState<Agent[]>([]);

    useEffect(() => {
        getAll().then(value => setAgents(value));
    }, []);

    const getAll = async () => {
        return api.get<Agent[]>('agents')
            .then(response => response.data);
    };

    const get = async (id: string) => {
        return api.get<Agent>(`agents/${id}`)
            .then(response => response.data);
    };

    const create = async (agent: Agent) => {
        agent.id = v4();
        api.post<Agent>(`agents`, agent)
            .then(response => setAgents([...agents, response.data]));
    };

    const update = async (agent: Agent) => {
        await api.put(`agents/${agent.id}`, agent);
        setAgents(agents.map(element => element.id === agent.id
            ? {...agent}
            : element));
    };

    const remove = async (id: string) => {
        await api.delete(`agents/${id}`);
        setAgents(agents.filter(agent => agent.id !== id));
    };

    return (
        <AgentContext.Provider value={{
            agents,
            getAll: getAll,
            get: get,
            create: create,
            update: update,
            remove: remove
        }}>
            {children}
        </AgentContext.Provider>
    );
};

export {AgentContext, AgentProvider};