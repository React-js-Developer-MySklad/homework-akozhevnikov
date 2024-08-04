import html from "./app.html";
import './app.css'
import ContragentDataForm from './contragents/table/ContragentDataForm'
import ContragentEditForm from './contragents/modal/ContragentEditForm'

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

let agents = [];

const dataForm = new ContragentDataForm('dataForm', agents)
    .onDelete(agent => {
        agents = agents.filter(a => a.id !== agent.id)
        dataForm.update(agents);
    })
    .onEdit(agent => {
        editForm.open(agent);
    });

const editForm = new ContragentEditForm('editForm')
    .onSave(newState => {
        if (newState.id) {
            const oldState = agents.find(a => a.id === newState.id);
            oldState.update(newState)
        } else {
            newState.id = Math.random();
            agents.push(newState)
        }
        dataForm.update(agents);
    });

document.getElementById('addButton').addEventListener('click', e => {
    editForm.open(null);
})