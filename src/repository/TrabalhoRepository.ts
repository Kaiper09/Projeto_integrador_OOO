import { Pool } from "pg";
import { Database } from "./Database";
import { Trabalho } from "../entity/trabalho";

export class TrabalhoRepository {

    private pool: Pool;

    constructor() {
        this.pool = Database.iniciarConexao();
    }

    async listarTrabalho(): Promise<Trabalho[]> {
        const query = "SELECT * FROM SERVICOS.TRABALHOS"
        const result = await this.pool.query(query);

        const listaTrabalho: Trabalho[] = []


        for (const row of result.rows) {
            const trabalho1 = new Trabalho(row.id_servico, row.trabalho_feito, row.data, row.placa_veiculo_id)
            listaTrabalho.push(trabalho1)
        }
        return listaTrabalho
    }

    async procurarTrabalho(placa_veiculo_id: string): Promise<Trabalho[]> {
        const query = "SELECT * FROM SERVICOS.TRABALHOS WHERE placa_veiculo_id= $1";
        const result = await this.pool.query(query, [placa_veiculo_id])

        const listaTrabalho: Trabalho[] = []

        for (const row of result.rows) {
            const trabalho = new Trabalho(row.id_servico, row.trabalho_feito, row.data, row.placa_veiculo_id)
            listaTrabalho.push(trabalho)
        }
        return listaTrabalho;

    }

    async adicionarTrabalho(id_servico: number, trabalho_feito: string, data: Date, placa_veiculo_id: string ){
        let query= "INSERT INTO SERVICOS.TRABALHOS (id_servico, trabalho_feito, data, placa_veiculo_id) VALUES ($1, $2, $3, $4)"
        await this.pool.query(query,[id_servico, trabalho_feito, data, placa_veiculo_id ])
    }

    async atualizarTrabalho(id_servico: number, trabalho_feito: string, data: Date, placa_veiculo_id: string ){
        let query ="UPDATE servicos.trabalhos SET trabalho_feito=$1, data=$2, placa_veiculo_id=$3 WHERE id_servico=$4;"
        await this.pool.query(query, [trabalho_feito, data, placa_veiculo_id, id_servico])
    }

    async deletarTrabalho(id_servico: number){
        const query ="DELETE FROM servicos.trabalhos WHERE id_servico= $1"
        await this.pool.query(query,[id_servico])
    }
}
