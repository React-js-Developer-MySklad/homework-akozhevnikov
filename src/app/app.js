import html from "./app.html";
import './app.css'
import AgentDataForm from './contragents/table/AgentDataForm'
import AgentEditForm from './contragents/modal/AgentEditForm'

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

let agents = [];

const dataForm = new AgentDataForm('dataForm', agents)
    .onDelete(agent => {
        agents = agents.filter(a => a.id !== agent.id)
        dataForm.update(agents);
    })
    .onEdit(agent => {
        editForm.open(agent);
    });

const editForm = new AgentEditForm('editForm')
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
});