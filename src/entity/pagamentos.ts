export class Pagamentos{
    private id_servico: string
    private data: Date
    private metodo: string
    private valor: string

    constructor(id_servico: string, data: Date, metodo: string, valor: string) {
        this.id_servico = id_servico;
        this.data = data;
        this.metodo = metodo;
        this.valor = valor;
    }
}



    