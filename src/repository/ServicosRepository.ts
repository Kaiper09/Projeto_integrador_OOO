import { Pool } from "pg";
import { Database } from "./Database";
import { Servicos } from "../entity/servicos";

export class ServicoRepository {

    private pool: Pool;

    constructor() {
        this.pool = Database.iniciarConexao();
    }

    async listarServicos(): Promise<Servicos[]> {
        const query = "SELECT * FROM SERVICOS.SERVICOS"
        const result = await this.pool.query(query);

        const listaServicos: Servicos[] = []


        for (const row of result.rows) {
            const trabalho1 = new Servicos(row.id_servico, row.trabalho_feito, row.data, row.placa_veiculo_id, row.valor_servico)
            listaServicos.push(trabalho1)
        }
        return listaServicos
    }

    async procurarServicos(placa_veiculo_id: string): Promise<Servicos[]> {
        const query = "SELECT * FROM SERVICOS.SERVICOS WHERE placa_veiculo_id= $1";
        const result = await this.pool.query(query, [placa_veiculo_id])

        const listaServicos: Servicos[] = []

        for (const row of result.rows) {
            const trabalho = new Servicos(row.id_servico, row.trabalho_feito, row.data, row.placa_veiculo_id, row.valor_servico)
            listaServicos.push(trabalho)
        }
        return listaServicos;

    }

    async adicionarServicos(id_servico: number, trabalho_feito: string, data: Date, placa_veiculo_id: string, valor_servico: number ){
        let query= "INSERT INTO SERVICOS.TRABALHOS (id_servico, trabalho_feito, data, placa_veiculo_id, valor_servico) VALUES ($1, $2, $3, $4)"
        await this.pool.query(query,[id_servico, trabalho_feito, data, placa_veiculo_id, valor_servico])
    }

    async atualizarServicos(id_servico: number, trabalho_feito: string, data: Date, placa_veiculo_id: string, valor_servico: number ){
        let query ="UPDATE servicos.servicos SET trabalho_feito=$1, data=$2, placa_veiculo_id=$3, valor_servico=$4 WHERE id_servico=$5;"
        await this.pool.query(query, [trabalho_feito, data, placa_veiculo_id, id_servico, valor_servico])
    }

    async deletarServicos(id_servico: number){
        const query ="DELETE FROM servicos.servico WHERE id_servico= $1"
        await this.pool.query(query,[id_servico])
    }
}
