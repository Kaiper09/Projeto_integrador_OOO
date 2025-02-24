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
}
