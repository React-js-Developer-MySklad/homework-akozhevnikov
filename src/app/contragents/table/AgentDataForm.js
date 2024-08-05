import html from './component.html'
import './style.css'

class AgentDataForm {

    #rowTemplate = `
            <tr id="dataFormEdit-%5$s" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    %1$s
                </th>
                <td class="px-6 py-4 font-bold text-black">
                    %2$s
                </td>
                <td class="px-6 py-4">
                    %3$s
                </td>
                <td class="px-6 py-4 font-bold text-black">
                    %4$s
                </td>
                <td class="py-4">
                        <button type="button"
                            id="dataFormRemove-%5$s"
                            class="delete-button text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none
                                focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-red-600
                                dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Удалить
                    </button>
                </td>
            </tr>
    `;

    #tbody;

    #deleteHandler;
    #editHandler;

    constructor(elementId) {
        const rootElement = document.getElementById(elementId);
        rootElement.innerHTML = html;

        this.#tbody = rootElement.getElementsByTagName("tbody")[0]
    }

    onDelete(handler) {
        this.#deleteHandler = handler;
        return this;
    }

    onEdit(handler) {
        this.#editHandler = handler;
        return this;
    }

    update(agents) {

        let content = '';

        agents.forEach(agent => {
            content += this.#rowTemplate
                .replaceAll('%1$s', agent.name)
                .replaceAll('%2$s', agent.inn)
                .replaceAll('%3$s', agent.address)
                .replaceAll('%4$s', agent.kpp)
                .replaceAll('%5$s', agent.id);
        });

        this.#tbody.innerHTML = content;

        agents.forEach(agent => {
            document.getElementById('dataFormRemove-' + agent.id)
                .addEventListener('click', e => {
                    if (this.#deleteHandler) {
                        this.#deleteHandler(agent);
                    } else {
                        console.log("delete handler is not defined");
                    }
                });

            document.getElementById('dataFormEdit-' + agent.id)
                .addEventListener('dblclick', e => {
                    if (this.#editHandler) {
                        this.#editHandler(agent);
                    } else {
                        console.log("edit handler is not defined");
                    }
                })
        })
    }
}

export default AgentDataForm;
