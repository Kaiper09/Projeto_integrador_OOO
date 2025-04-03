import { Pool } from "pg";
import { Database } from "./Database";
import {Pagamentos} from "../entity/pagamentos";
import {RelatorioPAG} from "../entity/relatotorioPAG"

export class PagamentosRepository{
    private pool: Pool

    constructor(){
        this.pool = Database.iniciarConexao()
    }

    async listarPagamentos():Promise<RelatorioPAG[]>{
        const query = "SELECT p.id_servico, c.nome, v.placa_veiculo, v.nome_veiculo ,s.trabalho_feito ,p.data, p.metodo, p.situacao, p.data_vencimento FROM servicos.pagamentos p JOIN servicos.servicos s ON s.id_servico= p.id_servico JOIN servicos.veiculos v ON v.placa_veiculo = s.placa_veiculo_id JOIN servicos.clientes c ON c.cpf = v.cpf_dono"

        const result = await this.pool.query(query);

        const listaPagamentos: RelatorioPAG[] = []

        for(const row of result.rows){
            const pagamentos= new RelatorioPAG(row.id_servico, row.nome, row.placa_veiculo, row.trabalho_feito, row.data, row.metodo, row.situacao, row.data_vencimento)
            listaPagamentos.push(pagamentos)
        }
        return listaPagamentos
    }

    async procurarPagamento(id_servico: number): Promise<Pagamentos[]>{
        const query = "SELECT * FROM SERVICOS.PAGAMENTOS WHERE id_servico= $1";
        const result = await this.pool.query(query,[id_servico])

        const listaPagamentos: Pagamentos[] = []

        for (const row of result.rows){
            const pagamento= new Pagamentos(row.id_servico, row.data, row.metodo, row.situacao, row.data_vencimento)
            listaPagamentos.push(pagamento)
        }
        return listaPagamentos;
    }

    async adicionarPagamento(id_servico: number, data: Date, metodo: string, situacao:string ,data_vencimento: Date){
        let query="INSERT INTO SERVICOS.PAGAMENTOS (id_servico, data, metodo, situacao, valor) VALUES ($1,$2, $3, $4)";
        await this.pool.query(query,[id_servico, data, metodo, situacao, data_vencimento])
    } 
    
    async atualizarPagamento(id_servico: number, data: Date, metodo: string, situacao: string ,data_vencimento: Date){
        let query ="UPDATE servicos.pagamentos SET data=$!, metodo=$2, situacao=$3, valor=$4 WHERE id_servico=$5"
        await this.pool.query(query, [data, metodo, situacao, data_vencimento, id_servico])
    }

    async deletarPagamento(id_servico){
        const query = "DELETE FROM servicos.pagamentos WHERE id_servico=$1"
        await this.pool.query(query,[id_servico])
    }

    async pagamentosPendentes():Promise<RelatorioPAG[]>{
        const query= "SELECT p.id_servico, c.nome, v.placa_veiculo, v.nome_veiculo, s.trabalho_feito ,p.data, p.metodo, p.situacao, p.data_vencimento FROM servicos.pagamentos p JOIN servicos.servicos s ON s.id_servico= p.id_servico JOIN servicos.veiculos v ON v.placa_veiculo = s.placa_veiculo_id JOIN servicos.clientes c ON c.cpf = v.cpf_dono WHERE situacao='pendente'"
        const result = await this.pool.query(query);

        const listaPagamentos: RelatorioPAG[] = []

        for(const row of result.rows){
            const pagamentos= new RelatorioPAG(row.id_servico, row.nome, row.placa_veiculo, row.trabalho_feito, row.data, row.metodo, row.situacao, row.data_vencimento)
            listaPagamentos.push(pagamentos)
        }
        return listaPagamentos

    }

    async pagamentosPagos():Promise<RelatorioPAG[]>{
        const query= "SELECT p.id_servico, c.nome, v.placa_veiculo, s.trabalho_feito ,p.data, p.metodo, p.situacao, p.data_vencimento FROM servicos.pagamentos p JOIN servicos.servicos s ON s.id_servico= p.id_servico JOIN servicos.veiculos v ON v.placa_veiculo = s.placa_veiculo_id JOIN servicos.clientes c ON c.cpf = v.cpf_dono WHERE situacao='pago'"
        const result = await this.pool.query(query);

        const listaPagamentos: RelatorioPAG[] = []

        for(const row of result.rows){
            const pagamentos= new RelatorioPAG(row.id_servico, row.nome, row.placa_veiculo, row.trabalho_feito, row.data, row.metodo, row.situacao, row.data_vencimento)
            listaPagamentos.push(pagamentos)
        }
        return listaPagamentos
    } 
}

