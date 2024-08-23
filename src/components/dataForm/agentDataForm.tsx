import React, {memo} from "react";
import {Agent} from "../../model/Agent";
import "./agentDataForm.css"

interface AgentTableProps {
    tableData: Agent[],
    onDelete: (id: string) => void,
    onEdit: (id: string) => void
}

export const AgentDataForm: React.FC<AgentTableProps> = memo(
    ({tableData, onDelete, onEdit}) => {

        const listItems = tableData.map(agent =>
            <tr key={agent.id}
                onDoubleClick={() => onEdit(agent.id)}
                className="table-row border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-amber-100">

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {agent.name}
                </th>
                <td className="px-6 py-4">
                    {agent.inn}
                </td>
                <td className="px-6 py-4">
                    {agent.address}
                </td>
                <td className="px-6 py-4">
                    {agent.kpp}
                </td>
                <td className="px-6 py-4">
                    <button className="delete-button bg-red-500 px-3 py-1 text-white rounded"
                            onClick={() => onDelete(agent.id)}>
                        Удалить
                    </button>
                </td>
            </tr>
        );

        return (
            <div id="agent-table" className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 data-form">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Наименование</th>
                        <th scope="col" className="px-6 py-3">ИНН</th>
                        <th scope="col" className="px-6 py-3">Адрес</th>
                        <th scope="col" className="px-6 py-3">КПП</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                    {listItems}
                    </tbody>
                </table>
            </div>
        );
    });