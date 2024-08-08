import html from './table.html'
import './table.css'

class Table {

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

    #renderRow(agent) {
        return `
             <tr id="dataFormEdit-${agent.id}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${agent.name}
                </th>
                <td class="px-6 py-4 font-bold text-black">
                    ${agent.inn}
                </td>
                <td class="px-6 py-4">
                    ${agent.address}
                </td>
                <td class="px-6 py-4 font-bold text-black">
                    ${agent.kpp}
                </td>
                <td class="py-4">
                        <button type="button"
                            id="dataFormRemove-${agent.id}"
                            class="delete-button text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none
                                focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-red-600
                                dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Удалить
                    </button>
                </td>
            </tr>`;
    }

    update(agents) {

        this.#tbody.innerHTML = agents.map(this.#renderRow);

        agents.forEach(agent => {
            document.getElementById('dataFormRemove-' + agent.id)
                .addEventListener('click', e => this.#deleteHandler(agent));

            document.getElementById('dataFormEdit-' + agent.id)
                .addEventListener('dblclick', e => this.#editHandler(agent))
        })
    }
}

export default Table;
