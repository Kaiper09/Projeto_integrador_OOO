import { Pool } from "pg";
import { Database } from "./Database";
import {Pagamentos} from "../entity/pagamentos";

export class PagamentosRepository{
    private pool: Pool

    constructor(){
        this.pool = Database.iniciarConexao()
    }

    async listarPagamentos():Promise<Pagamentos[]>{
        const query = "SELECT * FROM SERVICOS.PAGAMENTOS"
        const result = await this.pool.query(query);

        const listaPagamentos: Pagamentos[] = []

        for(const row of result.rows){
            const pagamentos= new Pagamentos(row.id_servico, row.data, row.metodo, row.valor)
            listaPagamentos.push(pagamentos)
        }
        return listaPagamentos
    }

    async procurarPagamento(id_servico: number): Promise<Pagamentos[]>{
        const query = "SELECT * FROM SERVICOS.PAGAMENTOS WHERE id_servico= $1";
        const result = await this.pool.query(query,[id_servico])

        const listaPagamentos: Pagamentos[] = []

        for (const row of result.rows){
            const pagamento= new Pagamentos(row.id_servico, row.data, row.metodo, row.valor)
            listaPagamentos.push(pagamento)
        }
        return listaPagamentos;
    }

    async adicionarPagamento(id_servico: number, data: string, metodo: string, valor:string){
        let query="INSERT INTO SERVICOS.PAGAMENTOS (id_servico, data, metodo, valor) VALUES ($1,$2, $3, $4)";
        await this.pool.query(query,[id_servico, data, metodo, valor])
    } 
    
    async atualizarPagamento(id_servico: number, data: Date, metodo: string, valor: string ){
        let query ="UPDATE servicos.pagamentos SET data=$!, metodo=$2, valor=$3 WHERE id_servico=$4"
        await this.pool.query(query, [data, metodo, valor, id_servico])
    }

    async deletarPagamento(id_servico){
        const query = "DELETE FROM servicos.pagamentos WHERE id_servico=$1"
        await this.pool.query(query,[id_servico])
    }
}
