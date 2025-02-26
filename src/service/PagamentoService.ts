import { Pagamentos } from "../entity/pagamentos";
import { PagamentosRepository } from "../repository/PagamentoRepository";

export class PagamentosService{
    private repo: PagamentosRepository

    constructor(){
        this.repo = new PagamentosRepository();
    }

    async listarPagamentos():Promise<Pagamentos[]>{
        return await this.repo.listarPagamentos()
    }

    async procurarPagamento(id_servico: number):Promise<Pagamentos[]>{
        let listaPagamentos : Pagamentos[]= []
        listaPagamentos= await this.repo.procurarPagamento(id_servico)

        if(listaPagamentos.length ==0){
            throw new Error("Pagamento não encontrado")
        }
        return listaPagamentos
    }
    async adicionarPagamento(id_servico: number, data: string, metodo: string, valor: string ){
        await this.repo.adicionarPagamento(id_servico, data, metodo, valor)

    }
    
}