import PromptSync, { Prompt } from "prompt-sync";
import {TrabalhoService} from "../service/TrabalhoService"


export class TrabalhoView {
    private prompt: Prompt;
    private trabalho: TrabalhoService ;

    constructor() {
        this.trabalho = new TrabalhoService()
        this.prompt = PromptSync();
    }

    public async exibirMenu() {
        console.log("----------- Seja bem vindo ao menu de Trabalhos ----------")
        console.log("1- Listar trabalhos")
        console.log("2- Procurar trabalho")
        console.log("3- Adicionar trabalho")
        console.log("4- Sair")
        const pergunta = this.prompt("O que deseja fazer? (apenas núemeros!!!)")

        switch (pergunta) {
            case "1":
                console.table(await this.trabalho.listarTrabalho());
                return this.exibirMenu()


            case "2":
                let digitarplaca_id = this.prompt("Digite a placa do veiculo que deseja ver o serviço: ")
                console.table(await this.trabalho.procurarTrabalho(digitarplaca_id))
                return this.exibirMenu()

            case "3":
                let addid_servico = this.prompt("Digite o ID do novo serviço: ")
                let addtrabalho_feito= this.prompt("Digite o trabalho feito: ")
                let adddata = this.prompt("Digite a data: ")
                let addplacavei = this.prompt("Digite a placa do veiculo:: ")
                await this.trabalho.adicionarTrabalho(parseInt(addid_servico), addtrabalho_feito, new Date (adddata), addplacavei)
                return this.exibirMenu()

            case "4":
                console.log("Você saiu")
                break
            default:
                console.log("Insira uma opção valida")
                return this.exibirMenu()
        }
    }
}