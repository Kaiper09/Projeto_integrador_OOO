import { Trabalho } from "../entity/trabalho";
import { TrabalhoRepository} from "../repository/TrabalhoRepository";

//arquiterura/avaliação:
export class TrabalhoService{
    

    private repo : TrabalhoRepository

    constructor(){
        this.repo = new TrabalhoRepository();
    }
   
    async listarTrabalho():Promise<Trabalho[]>{
        return await this.repo.listarTrabalho()
    }

    async adicionarTrabalho(id_servico: number, trabalho_feito: string, data: Date, placa_veiculo_id:string) {
        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            throw new Error("ID do serviço deve ser um número inteiro positivo");
        }

        if (!trabalho_feito || trabalho_feito.trim() === "") {
            throw new Error("Descrição do trabalho feito não pode ser vazia");
        }
        await this.repo.adicionarTrabalho(id_servico, trabalho_feito, data, placa_veiculo_id)
        
    }
    async procurarTrabalho(placa_veiculo_id: string):Promise<Trabalho[]>{
        let listaTrabalho : Trabalho[] = []
        listaTrabalho = await this.repo.procurarTrabalho(placa_veiculo_id)

        
        if(listaTrabalho.length == 0){
            throw new Error("Trabalho não encontrado!!!")
        }
        return listaTrabalho;
    }

    async atualizarTrabalho(id_servico: number, trabalho_feito: string, data: Date, placa_veiculo_id:string){
        const trabalhos = await this.listarTrabalho()
        const trabalhoexistente = trabalhos.find(trabalho => trabalho.getIdservico() === id_servico)

        if(!trabalhoexistente){
            console.log("Trabalho não encontrado")
            return; 
        }

        if (!trabalho_feito || trabalho_feito.trim() === "") {
            throw new Error("Descrição do trabalho feito não pode ser vazia");
        }

        if (!Number.isInteger(id_servico) || id_servico <= 0) {
            throw new Error("ID do serviço deve ser um número inteiro positivo");
        }

        await this.repo.adicionarTrabalho(id_servico, trabalho_feito, data, placa_veiculo_id)
        console.log("Trabalho atualizado com sucesso")
    }
}