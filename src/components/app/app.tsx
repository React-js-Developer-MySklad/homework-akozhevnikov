import React, {StrictMode, useCallback, useContext, useState} from "react";
import {AgentDataForm} from "../dataForm/agentDataForm"
import {AgentDataCommit, AgentEditForm} from "../editform/agentEditForm"
import {Agent} from "../../model/Agent";
import "./app.css"
import LogoSvg from '../images/LogoSvg'
import AddSvg from '../images/AddSvg'
import {AgentContext} from "../context/AgentContext";

interface DialogState {
    data: Agent
    visible: boolean
    commit: AgentDataCommit
}

const emptyNewAgent = (): Agent => {
    return new Agent(null, "", "", "", "")
}

const dialogClosed: DialogState = {
    data: {...emptyNewAgent()},
    visible: false,
    commit: undefined
}

export const App: React.FC = () => {

    const context = useContext(AgentContext);

    const [dialogState, setDialogState] = useState<DialogState>(dialogClosed);

    const closeDialog = useCallback(() => setDialogState(dialogClosed), []);

    const deleteAgent = useCallback((id: string) => {
        context.remove(id);
    }, [context]);

    const editAgent = useCallback((id: string) => {
        context.get(id).then(agent => {
            setDialogState({
                data: {...agent},
                visible: true,
                commit: (agent: Agent) => {
                    context.update(agent);
                    closeDialog();
                }
            });
        });
    }, [context]);

    const addAgent = useCallback(() => {
        setDialogState({
            data: {...emptyNewAgent()},
            visible: true,
            commit: (agent: Agent) => {
                context.create(agent);
                closeDialog();
            }
        });
    }, [context]);

    return (
        <StrictMode>

            <header className="grid py-[12px] grid-cols-[1fr_auto] mb-2 mt-2 pl-2 pr-2">
                <LogoSvg></LogoSvg>

                <button id="agent-add"
                        type="button"
                        onClick={addAgent}
                        className="h-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                   focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                   inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700
                                   dark:focus:ring-blue-800">

                    <AddSvg></AddSvg>
                    <span className="ml-2">Добавить</span>
                </button>
            </header>

            <AgentEditForm data={dialogState.data}
                           visible={dialogState.visible}
                           onCommit={dialogState.commit}
                           onClose={closeDialog}/>

            <main>
                <AgentDataForm tableData={context.agents} onDelete={deleteAgent} onEdit={editAgent}/>
            </main>

            <footer
                className="fixed grid grid-cols-1 bottom-0 left-0 z-20 w-full p-4 bg-white md:grid md:items-center md:justify-between md:p-6">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2007–2024 ООО «Логнекс».
                </span>
            </footer>

        </StrictMode>
    );
}