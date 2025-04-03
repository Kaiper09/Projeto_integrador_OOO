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
    async adicionarPagamento(id_servico: number, data: Date, metodo: string, situacao:string, data_vencimento: Date){
        await this.repo.adicionarPagamento(id_servico, new Date (data), metodo, situacao, new Date(data_vencimento))

        if (typeof id_servico !== 'number' || id_servico <= 0) {
            console.log('O id_servico deve ser um número maior que 0');
            return
        }

        const pagPermitidos = ['pix', 'cartao', 'dinheiro']
        if (!pagPermitidos.includes(metodo)) {
            console.log("Método de pagamento inválido")
            console.log("Métodos permitidos: pix, dinheiro e cartao")
            return
        }

        const situacaoPermitidas = ['pendente', 'paga']
        if(!situacaoPermitidas.includes(situacao)){
            console.log("Situação inválida! Apenas perndente ou paga")
            return
        }

    }

    async atualizarPagamento(id_servico: number, data: Date, metodo: string, situacao:string , data_vencimento: Date) {
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

        const situPermitidas = ['pendente', 'paga']
        if(!situPermitidas.includes(situacao)){
            console.log("Situação inválida! Apenas perndente ou paga")
            return
        }
        await this.repo.atualizarPagamento(id_servico, data, metodo, situacao , new Date(data_vencimento))
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

    async pagamentosPendentes():Promise<Pagamentos[]>{
        return await this.repo.pagamentosPendentes()

    }

    async pagamentosPagos():Promise<Pagamentos[]>{
        return await this.repo.pagamentosPagos()

    }

}