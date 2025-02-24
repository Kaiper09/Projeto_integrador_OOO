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
}