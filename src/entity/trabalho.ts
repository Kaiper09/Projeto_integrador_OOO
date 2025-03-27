export class Trabalho{
    private id_servico: number
    private trabalho_feito: string
    private data: Date
    private placa_veiculo_id: string

    
    constructor(id_servico: number, trabalho_feito: string, data: Date, placa_veiculo_id: string){
        this.id_servico = id_servico;
        this.trabalho_feito = trabalho_feito;
        this.data = data;
        this.placa_veiculo_id = placa_veiculo_id;
    }

    public getIdservico(): number{
        return this.id_servico
    }

    public getplaca(){
        return this.placa_veiculo_id
    }
}