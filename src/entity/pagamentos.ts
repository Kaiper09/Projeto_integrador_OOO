export class Pagamentos{
    protected id_servico: number
    protected data: Date
    protected metodo: string
    protected situacao: string
    protected data_vencimento: Date
    

    constructor(id_servico: number, data: Date, metodo: string, situacao: string ,data_vencimento: Date, ) {
        this.id_servico = id_servico;
        this.data = data;
        this.metodo = metodo;
        this.situacao = situacao
        this.data_vencimento = data_vencimento
    }

    public getId(): number{
        return this.id_servico
    }
}



    