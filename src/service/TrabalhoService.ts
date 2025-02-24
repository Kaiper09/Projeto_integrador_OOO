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
        await this.repo.adicionarTrabalho(id_servico, trabalho_feito, data, placa_veiculo_id)
        
    }
    async procurarTrabalho(digitarplaca_id: string):Promise<Trabalho[]>{
        let listaTrabalho : Trabalho[] = []
        listaTrabalho = await this.repo.procurarTrabalho(digitarplaca_id)

        
        if(listaTrabalho.length == 0){
            throw new Error("Trabalho não encontrado!!!")
        }
        return listaTrabalho;
    }
}