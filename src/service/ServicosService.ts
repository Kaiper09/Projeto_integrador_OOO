import { Servicos } from "../entity/servicos";
import { ServicoRepository } from "../repository/ServicosRepository";

//arquiterura/avaliação:
export class ServicosService {


    private repo: ServicoRepository

    constructor() {
        this.repo = new ServicoRepository();
    }

    async listarServicos(): Promise<Servicos[]> {
        return await this.repo.listarServicos()
    }

    async adicionarServicos(id_servico: number, servicos_feito: string, data: Date, placa_veiculo_id: string, valor_servico: number) {
        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            throw new Error("ID do serviço deve ser um número inteiro positivo");
        }

        if (!servicos_feito || servicos_feito.trim() === "") {
            throw new Error("Descrição do servicos feito não pode ser vazia");
        }

        const placa =  await this.listarServicos()
        const placa_existente = placa.find(placa => placa.getplaca() === placa_veiculo_id)
        if(!placa_existente){
            throw new Error ("Placa não encontrada na tabela de veículos")
        }

        const hoje = new Date();
        if (data > hoje) {
        throw new Error ("A data do serviço não pode ser no futuro");
        }

        if(valor_servico < 0){
           throw new Error ("O serviço não pode ter uma valor negativo")
        }
        
        await this.repo.adicionarServicos(id_servico, servicos_feito, data, placa_veiculo_id, valor_servico)

    }
    async procurarServicos(id_servico: string): Promise<Servicos[]> {
        let listaServicos: Servicos[] = []
        listaServicos = await this.repo.procurarServicos(id_servico)


        if (listaServicos.length == 0) {
            throw new Error("Servicos não encontrado!!!")
        }
        return listaServicos;
    }

    async atualizarServicos(id_servico: number, servicos_feito: string, data: Date, placa_veiculo_id: string, valor_servico: number) {
        const servicoss = await this.listarServicos()
        const servicosexistente = servicoss.find(servicos => servicos.getIdservico() === id_servico)

        if (!servicosexistente) {
            throw new Error ("Servicos não encontrado")   
        }

        if (!servicos_feito || servicos_feito.trim() === "") {
            throw new Error ("Descrição do servicos feito não pode ser vazia");
        }

        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            throw new Error ("ID do serviço deve ser um número inteiro positivo"); 
        }

        await this.repo.atualizarServicos(id_servico, servicos_feito, data, placa_veiculo_id, valor_servico)
        console.log("Servicos atualizado com sucesso")
    }

    async deletarServicos(id_servico: number){
        const servicos = await this.listarServicos()

        const servicosexistente = servicos.find(servicos => servicos.getIdservico() ===id_servico)

        if(!servicosexistente){
            throw new Error ("ID serviço não encontrado");
             
        }

        await this.repo.deletarServicos(id_servico)
        console.log("Servicos deletado com sucesso")
        
    }
}