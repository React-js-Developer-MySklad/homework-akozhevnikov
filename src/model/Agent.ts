export class Agent {

    constructor(id: string, name: string, inn: string, address: string, kpp: string) {
        this.id = id;
        this.name = name;
        this.inn = inn;
        this.address = address;
        this.kpp = kpp;
    }

    id: string;
    name: string;
    inn: string;
    address: string;
    kpp: string;
}