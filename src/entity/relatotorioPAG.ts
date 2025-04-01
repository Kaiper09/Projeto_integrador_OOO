import { Pagamentos } from "./pagamentos";
  
export class RelatorioPAG extends Pagamentos {
    protected nome: string;
    protected placa_veiculo: string
    protected trabalho_feito: string

    constructor(id_servico: number, nome: string, placa_veiculo: string, trabalho_feito: string ,data: Date, metodo: string, situacao: string, data_vencimento: Date) {
        super(id_servico ,data, metodo, situacao, data_vencimento,);
        this.nome = nome
        this.placa_veiculo = placa_veiculo 
        this.trabalho_feito = trabalho_feito
        
    }
}
 