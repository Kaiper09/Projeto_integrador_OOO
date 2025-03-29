export class Servicos{
    private id_servico: number
    private servicoo_feito: string
    private data: Date
    private placa_veiculo_id: string
    private valor_servico: number

    
    constructor(id_servico: number, servico_feito: string, data: Date, placa_veiculo_id: string, valor_servico: number){
        this.id_servico = id_servico;
        this.servicoo_feito = servico_feito;
        this.data = data;
        this.placa_veiculo_id = placa_veiculo_id;
        this.valor_servico = valor_servico
    }

    public getIdservico(): number{
        return this.id_servico
    }

    public getplaca(){
        return this.placa_veiculo_id
    }
}