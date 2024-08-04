
class Agent {
    constructor(id, name, inn, address, kpp, status) {
        this.id = id;
        this.name = name;
        this.inn = inn;
        this.address = address;
        this.kpp = kpp;
        this.status = status;
    }

    update(newState) {
        this.name = newState.name;
        this.inn = newState.inn;
        this.address = newState.address;
        this.kpp = newState.kpp;
        this.status = newState.status;
    }
}

export default Agent;
