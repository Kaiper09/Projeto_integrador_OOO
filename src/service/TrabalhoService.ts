import { Trabalho } from "../entity/trabalho";
import { TrabalhoRepository } from "../repository/TrabalhoRepository";

//arquiterura/avaliação:
export class TrabalhoService {


    private repo: TrabalhoRepository

    constructor() {
        this.repo = new TrabalhoRepository();
    }

    async listarTrabalho(): Promise<Trabalho[]> {
        return await this.repo.listarTrabalho()
    }

    async adicionarTrabalho(id_servico: number, trabalho_feito: string, data: Date, placa_veiculo_id: string) {
        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            throw new Error("ID do serviço deve ser um número inteiro positivo");
        }

        if (!trabalho_feito || trabalho_feito.trim() === "") {
            throw new Error("Descrição do trabalho feito não pode ser vazia");
        }
        await this.repo.adicionarTrabalho(id_servico, trabalho_feito, data, placa_veiculo_id)

    }
    async procurarTrabalho(id_servico: string): Promise<Trabalho[]> {
        let listaTrabalho: Trabalho[] = []
        listaTrabalho = await this.repo.procurarTrabalho(id_servico)


        if (listaTrabalho.length == 0) {
            throw new Error("Trabalho não encontrado!!!")
        }
        return listaTrabalho;
    }

    async atualizarTrabalho(id_servico: number, trabalho_feito: string, data: Date, placa_veiculo_id: string) {
        const trabalhos = await this.listarTrabalho()
        const trabalhoexistente = trabalhos.find(trabalho => trabalho.getIdservico() === id_servico)

        if (!trabalhoexistente) {
            console.log("Trabalho não encontrado")
            return;
        }

        if (!trabalho_feito || trabalho_feito.trim() === "") {
           console.log("Descrição do trabalho feito não pode ser vazia");
           return
        }

        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            console.log("ID do serviço deve ser um número inteiro positivo");
            return
        }

        await this.repo.atualizarTrabalho(id_servico, trabalho_feito, data, placa_veiculo_id)
        console.log("Trabalho atualizado com sucesso")
    }

    async deletarTrabalho(id_servico: number){
        const trabalho = await this.listarTrabalho()

        const trabalhoexistente = trabalho.find(trabalho => trabalho.getIdservico() ===id_servico)

        if(!trabalhoexistente){
            console.log("ID serviço não encontrado");
            return
        }

        await this.repo.deletarTrabalho(id_servico)
        console.log("Trabalho deletado com sucesso")
        
    }
}