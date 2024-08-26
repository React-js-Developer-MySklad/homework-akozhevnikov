import React, {StrictMode, useCallback, useState} from "react";
import {AgentDataForm} from "../dataForm/agentDataForm"
import {AgentEditForm} from "../editform/agentEditForm"
import {Agent} from "../../model/Agent";
import {v4} from "uuid";
import "./app.css"
import LogoSvg from '../images/LogoSvg'
import AddSvg from '../images/AddSvg'

interface DialogState {
    data: Agent
    visible: boolean
}

const emptyNewAgent = (): Agent => {
    return new Agent(null, "", "", "", "")
}

const dialogClosed: DialogState = {
    data: {...emptyNewAgent()},
    visible: false
}

export const App: React.FC = () => {

    const [agents, setAgents] = useState<Agent[]>([
        new Agent(
            '933998d0-04d3-4706-bb8f-f622838cd1cd',
            "ИП Иванов иван Иванович",
            "53219874521",
            "г Москва, ул Арбат, д 12, кв 34",
            "504672913"
        ),
        new Agent(
            '500ad1a8-6e2c-4e4e-8931-6e7b2c4098da',
            "ООО \"ТехноСфера\"",
            "60438729105",
            "г Санкт-Петербург, пр-кт Невский, д 25, кв 56",
            "236748105"
        ),
        new Agent(
            '6749be47-345d-4fec-ae15-3abf0c49f24e ',
            "ЗАО \"РосАгро\"",
            "78051234092",
            "г Новосибирск, ул Красный проспект, д 78, кв 90",
            "193846527"
        ),
        new Agent(
            'db6bc2fd-19cc-4573-bb52-8d9062ba5c48',
            "ООО \"ГлобалТрейд\"",
            "29106452837",
            "г Екатеринбург, ул Ленина, д 15, кв 120",
            "485720193"
        ),
        new Agent(
            'f14430a1-c154-4457-a82d-602efbbe5186',
            "ООО \"ЭкоТех\"",
            "29106452837",
            "г Казань, ул Кремлевская, д 3, кв 7",
            "672891054"
        ),
    ]);

    const [dialogState, setDialogState] = useState<DialogState>(dialogClosed);

    const closeDialog = useCallback(() => setDialogState(dialogClosed), []);

    const deleteAgent = useCallback((id: string) => {
        const index = agents.findIndex(agent => agent.id === id);
        if (index !== -1) {
            setAgents(agents.toSpliced(index, 1));
        }
    }, [agents]);

    const saveDialog = useCallback((agent: Agent) => {
        if (agent.id) {
            setAgents(agents.map(element => element.id === agent.id
                ? {...agent}
                : element));
            closeDialog();
        } else {
            agent.id = v4();
            setAgents([...agents, agent]);
            closeDialog();
        }
    }, [agents]);

    const editAgent = useCallback((id: string) => {
        let agent = agents.find(value => value.id === id);
        setDialogState({
            data: {...agent},
            visible: true
        });
    }, [agents]);

    const addAgent = useCallback(() => {
        setDialogState({
            data: {...emptyNewAgent()},
            visible: true
        });
    }, [agents]);

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
                           onSave={saveDialog}
                           onClose={closeDialog}/>

            <main>
                <AgentDataForm tableData={agents} onDelete={deleteAgent} onEdit={editAgent}/>
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