import React, {useCallback, useEffect, useState} from "react";
import {Agent} from "../../model/Agent";
import {TextInput} from "../input/textField";

interface AgentDialogProps {
    data: Agent,
    onClose: () => void,
    onSave: (agent: Agent) => void,
}

interface AgentState {
    agent: Agent,
    errors: Map<string, string>
}

const INN_REGEX: RegExp = /^\d{11}$/;
const KPP_REGEX: RegExp = /^\d{9}$/;

export const AgentEditForm: React.FC<AgentDialogProps> = ({
                                                              data,
                                                              onClose,
                                                              onSave
                                                          }) => {

    const [agentState, setAgent] = useState<AgentState>({agent: data, errors: new Map()});

    useEffect(() => {
        setAgent({agent: data, errors: new Map()});
    }, [data]);

    const validate = (agent: Agent): Map<string, string> => {
        const validationErrors: Map<string, string> = new Map();

        if (isEmpty(agent.name)) {
            validationErrors.set('name', 'Обязательное поле');
        }
        if (isEmpty(agent.inn)) {
            validationErrors.set('inn', 'Обязательное поле');
        }
        if (isEmpty(agent.address)) {
            validationErrors.set('address', 'Обязательное поле');
        }
        if (isEmpty(agent.kpp)) {
            validationErrors.set('kpp', 'Обязательное поле');
        }

        if (agent.kpp && !KPP_REGEX.test(agent.kpp)) {
            validationErrors.set('kpp', 'КПП должен состоять из 9 цифр');
        }
        if (agent.inn && !INN_REGEX.test(agent.inn)) {
            validationErrors.set('inn', 'ИНН должен состоять из 11 цифр');
        }

        return validationErrors;
    };

    const isEmpty = (val: string): boolean => {
        return !val || val.match(/^ *$/) !== null;
    }

    const save = useCallback(() => {
        const validationError: Map<string, string> = validate(agentState.agent);

        if (!validationError.size) {
            onSave(agentState.agent);
        } else {
            setAgent({...agentState, errors: validationError})
        }

    }, [agentState.agent])

    const onChangeName = useCallback((value: string) =>
        setAgent(prevState => {
            return {agent: {...prevState.agent, name: value}, errors: prevState.errors}
        }), [agentState]);
    const onChangeInn = useCallback((value: string) =>
        setAgent(prevState => {
            return {agent: {...prevState.agent, inn: value}, errors: prevState.errors}
        }), [agentState]);
    const onChangeAddress = useCallback((value: string) =>
        setAgent(prevState => {
            return {agent: {...prevState.agent, address: value}, errors: prevState.errors}
        }), [agentState]);
    const onChangeKpp = useCallback((value: string) =>
        setAgent(prevState => {
            return {agent: {...prevState.agent, kpp: value}, errors: prevState.errors}
        }), [agentState]);

    return <div className="fixed inset-0 flex items-center justify-center z-50">

        <div className="fixed inset-0 bg-black bg-opacity-50"/>

        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 w-full max-w-md max-h-full">

            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{agentState.agent.id ? 'Редактирование контрагента' : 'Новый контрагент'}</h3>

                <button type="button"
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                       text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
                                       dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            <div className="relative p-4 w-full max-w-md max-h-full">

                <div className="grid gap-4 mb-4">
                    <TextInput title="Наименование"
                               value={agentState.agent.name}
                               error={agentState.errors.get('name')}
                               onChange={onChangeName}/>
                    <TextInput title="ИНН"
                               value={agentState.agent.inn}
                               error={agentState.errors.get('inn')}
                               onChange={onChangeInn}/>
                    <TextInput title="Адрес"
                               value={agentState.agent.address}
                               error={agentState.errors.get('address')}
                               onChange={onChangeAddress}/>
                    <TextInput title="КПП"
                               value={agentState.agent.kpp}
                               error={agentState.errors.get('kpp')}
                               onChange={onChangeKpp}/>
                </div>

                <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse justify-end">
                    <button type="button"
                            onClick={save}
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800
                                           focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                                           text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                           dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                        </svg>
                        Сохранить
                    </button>

                    <button type="button"
                            onClick={onClose}
                            className="py-2.5 px-5 ms-3 text-sm items-center font-medium text-gray-900
                                           focus:outline-none bg-white rounded-lg border border-gray-200
                                           hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4
                                           focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800
                                           dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
                                           dark:hover:bg-gray-700">
                        Отменить
                    </button>
                </div>

            </div>

        </div>
    </div>
}