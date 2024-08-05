import {Modal} from "flowbite";
import Agent from "../Agent";
import html from "./component.html";
import './style.css'

class AgentEditForm {

    static #INN_REGEX = /^\d{11}$/;
    static #KPP_REGEX = /^\d{9}$/;

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
        this.#nameElement = document.getElementById("modal-field-name");
        this.#innElement = document.getElementById("modal-field-inn");
        this.#addressElement = document.getElementById("modal-field-address");
        this.#kppElement = document.getElementById("modal-field-kpp");

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

        this.#markAsSuccess(this.#nameElement);
        this.#markAsSuccess(this.#innElement);
        this.#markAsSuccess(this.#addressElement);
        this.#markAsSuccess(this.#kppElement);

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

        if (!this.#validate(newAgent)) {
            return;
        }

        if (this.#saveHandler) {
            this.#saveHandler(newAgent);
        } else {
            console.error("save handler is not defined");
        }

        this.#modal.hide();
    }

    #validate(agent) {
        const validationMap = new Map();

        validationMap.set(this.#nameElement, [this.#validateRequired(agent.name)]);
        validationMap.set(this.#innElement, [this.#validateRequired(agent.inn), this.#validateInn(agent.inn)]);
        validationMap.set(this.#addressElement, [this.#validateRequired(agent.address)]);
        validationMap.set(this.#kppElement, [this.#validateRequired(agent.kpp), this.#validateKpp(agent.kpp)]);

        let result = true;
        validationMap.forEach((errors, element) => {
            if (errors.every(error => !error)) {
                this.#markAsSuccess(element);
            } else {
                this.#markAsError(element, errors.find(er => er));
                result = false;
            }
        })

        return result;
    }

    #validateInn(val) {
        if (val && !AgentEditForm.#INN_REGEX.test(val)) {
            this.#markAsError(this.#innElement, );
            return 'ИНН должен состоять из 11 цифр';
        }
    }

    #validateKpp(val) {
        if (val && !AgentEditForm.#KPP_REGEX.test(val)) {
            this.#markAsError(this.#kppElement);
            return 'КПП должен состоять из 9 цифр';
        }
    }

    #validateRequired(val) {
        if (!val || val.match(/^ *$/) !== null) {
            return 'Обязательное поле';
        }
    }

    #markAsError(elem, errorText) {
        if (!elem.classList.contains('validation-error')) {
            elem.classList.add('validation-error');
        }

        elem.nextElementSibling.innerHTML = errorText;
    }

    #markAsSuccess(elem) {
        if (elem.classList.contains('validation-error')) {
            elem.classList.remove('validation-error');
        }
    }

    #close() {
        this.#modal.hide();
    }
}

export default AgentEditForm;
