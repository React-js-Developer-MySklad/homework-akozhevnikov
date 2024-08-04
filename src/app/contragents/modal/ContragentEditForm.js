import {Modal} from "flowbite";
import Agent from "../Agent";
import html from "./modal.html";

class ContragentEditForm {

    #modal;

    #nameElement;
    #innElement;
    #addressElement;
    #kppElement;

    #agent;
    #saveHandler;

    constructor(elementId) {
        document.getElementById(elementId).innerHTML = html;

        this.#modal = new Modal(document.getElementById("modalBody"));
        this.#nameElement = document.getElementById("name");
        this.#innElement = document.getElementById("inn");
        this.#addressElement = document.getElementById("address");
        this.#kppElement = document.getElementById("kpp");

        document.getElementById('editFormClose').addEventListener('click', e => this.#close())
        document.getElementById('editFormCancel').addEventListener('click', e => this.#close())
        document.getElementById('editFormSave').addEventListener('click', e => this.#save())
    }

    onSave(handler) {
        this.#saveHandler = handler;
        return this;
    }

    open(agent) {
        this.#agent = agent ? agent : new Agent();

        this.#nameElement.value = this.#agent?.name ? this.#agent.name : '';
        this.#innElement.value = this.#agent?.inn ? this.#agent.inn : '';
        this.#addressElement.value = this.#agent?.address ? this.#agent.address : '';
        this.#kppElement.value = this.#agent?.kpp ? this.#agent.kpp : '';

        this.#modal.show();
    }

    #save() {
        const newAgent = new Agent(
            this.#agent.id,
            this.#nameElement.value,
            this.#innElement.value,
            this.#addressElement.value,
            this.#kppElement.value,
        )

        if (!newAgent.name) {
            alert('Не заполнено наименование контрагента');
            return;
        }

        if (this.#saveHandler) {
            this.#saveHandler(newAgent);
        } else {
            console.error("save handler is not defined");
        }

        this.#modal.hide();
    }

    #close() {
        this.#modal.hide();
    }
}

export default ContragentEditForm;
