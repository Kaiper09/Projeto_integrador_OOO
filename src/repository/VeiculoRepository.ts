import { Pool } from "pg";
import { Database } from "./Database";
import { Veiculo } from "../entity/veiculo";


export class VeiculoRepository {
    private pool: Pool;

    constructor() {
        this.pool = Database.iniciarConexao()
    }
    async listarVeiculos(): Promise<Veiculo[]> {
        const query = "SELECT * FROM SERVICOS.VEICULOS"
        const result = await this.pool.query(query);

        const listaVeiculos: Veiculo[] = []

        for (const row of result.rows) {
            const veiculo = new Veiculo(row.cpf_dono, row.placa_veiculo, row.ano, row.nome_veiculo, row.km_veiculo)
            listaVeiculos.push(veiculo)
        }
        return listaVeiculos;
    }

    async procurarVeiculo(placa_veiculo: string): Promise<Veiculo[]> {
        const query = "SELECT * FROM SERVICOS.VEICULOS WHERE placa_veiculo=$1 ";
        const result = await this.pool.query(query, [placa_veiculo]);

        const listaVeiculos: Veiculo[] = []

        for (const row of result.rows) {
            const veiculo = new Veiculo(row.cpf_dono, row.placa_veiculo, row.ano, row.nome_veiculo, row.km_veiculo)
            listaVeiculos.push(veiculo)
        }
        return listaVeiculos
    }

    async adicionarVeiculo(cpf_dono: string, placa_veiculo: string, ano: string, nome_veiculo: string, km_veiculo: string) {
        let query = "INSERT INTO SERVICOS.VEICULOS (cpf_dono, placa_veiculo, ano, nome_veiculo, km_veiculo) VALUES ($1, $2, $3, $4, $5)"
        await this.pool.query(query, [cpf_dono, placa_veiculo, ano, nome_veiculo, km_veiculo])
    }

    async atualizarVeiculo(cpf_dono: string, placa_veiculo: string, ano: string, nome_veiculo: string, km_veiculo: string ){
        let query = 'UPDATE servicos.veiculos SET cpf_dono=$1 ano=$2, nome_veiculo=$3, km_veiculo=$4 WHERE placa_veiculo=$5'
        await this.pool.query(query, [cpf_dono, ano, nome_veiculo, km_veiculo, placa_veiculo])
    }
}