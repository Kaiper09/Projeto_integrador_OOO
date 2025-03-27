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

        if (typeof id_servico !== 'number' || id_servico <= 0) {
            console.log('O id_servico deve ser um número maior que 0');
            return
        }

        const pagPermitidos = ['pix', 'cartao', 'dinheiro']
        if (!pagPermitidos) {
            console.log("Método de pagamento inválido")
            return
        }

    }

    async atualizarPagamento(id_servico: number, data: Date, metodo: string, valor: string) {
        let pagamento = await this.listarPagamentos()
        const pagametnoExistente = pagamento.find(pagamento => pagamento.getId() === id_servico)

        if (!pagametnoExistente) {
            console.log("Pagamento não encontrado")
            return
        }

        if (typeof id_servico !== 'number' || id_servico <= 0) {
            console.log('O id_servico deve ser um número maior que 0');
            return
        }

        const pagPermitidos = ['pix', 'cartao', 'dinheiro']
        if (!pagPermitidos) {
            console.log("Método de pagamento inválido")
            return
        }
        await this.repo.atualizarPagamento(id_servico, data, metodo, valor)
        console.log("Pagametno atualizado com sucesso")
    }

    async deletarPagamento(id_servico:number){
        let pagamento = await this.listarPagamentos()
        const pagametnoExistente = pagamento.find(pagamento => pagamento.getId() === id_servico)

        if (!pagametnoExistente) {
            console.log("Pagamento não encontrado")
            return
        }

        await this.repo.deletarPagamento(id_servico)
        console.log("Pagamento deletado com sucesso")
    }

}