export class Pagamentos{
    private id_servico: number
    private data: Date
    private metodo: string
    private situacao: string
    private valor: string

    constructor(id_servico: number, data: Date, metodo: string, situacao: string ,valor: string) {
        this.id_servico = id_servico;
        this.data = data;
        this.metodo = metodo;
        this.situacao = situacao
        this.valor = valor;
    }

    public getId(): number{
        return this.id_servico
    }
}



    