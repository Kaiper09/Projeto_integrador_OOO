import PromptSync, { Prompt } from "prompt-sync";
import { TrabalhoService } from "../service/TrabalhoService"
import { MenuPrincipalView } from "./MenuPrincipalView";


async function manuPrincipal(){
    const menuDosMenus = new MenuPrincipalView()
    await menuDosMenus.menuPrimcipalView()
  } 


export class TrabalhoView {
    private prompt: Prompt;
    private trabalho: TrabalhoService;

    constructor() {
        this.trabalho = new TrabalhoService()
        this.prompt = PromptSync();
    }

    public async exibirMenuTrabalho() {
        console.log("----------- Seja bem vindo ao menu de Trabalhos ----------")
        console.log("1- Listar trabalhos")
        console.log("2- Procurar trabalho")
        console.log("3- Adicionar trabalho")
        console.log("4- Atualizar trabalho")
        console.log("5- Deletar trabalho")
        console.log("6- Sair do menu Trabalhos")
        const pergunta = this.prompt("O que deseja fazer? (apenas núemeros!!!): ")

        switch (pergunta) {
            case "1":
                console.table(await this.trabalho.listarTrabalho());
                return this.exibirMenuTrabalho()


            case "2":
                let digitarplaca_id = this.prompt("Digite a placa do veiculo que deseja ver o serviço: ")
                console.table(await this.trabalho.procurarTrabalho(digitarplaca_id))
                return this.exibirMenuTrabalho()

            case "3":
                let addid_servico = this.prompt("Digite o ID do novo serviço: ")
                let addtrabalho_feito = this.prompt("Digite o trabalho feito: ")
                let adddata = this.prompt("Digite a data (yyyy-mm-dd): ")
                let addplacavei = this.prompt("Digite a placa do veiculo: ")
                await this.trabalho.adicionarTrabalho(parseInt(addid_servico), addtrabalho_feito, new Date(adddata), addplacavei)
                console.log("Trabalho adicionado com sucesso!!!")
                return this.exibirMenuTrabalho()

            case "4":
                console.table(await this.trabalho.listarTrabalho())
                let id_ver = parseInt(this.prompt("Digite o id do serviço que deseja atualizar: "))
                let servico_new = this.prompt("Digite o servico feito: ")
                let data_new = this.prompt("Digite a data do serviço (yyyy-mm-dd): ")
                let placa_new = this.prompt("Digite a placa do veículo: ")
                await this.trabalho.atualizarTrabalho(id_ver, servico_new, new Date(data_new), placa_new)
                return this.exibirMenuTrabalho()


            case "5":
                console.table(await this.trabalho.listarTrabalho())
                let deletarID = parseInt(this.prompt("Digite o ID do serviço que deseja deletar: "))
                await this.trabalho.deletarTrabalho(deletarID)
                return this.exibirMenuTrabalho()


            case "6":
                console.log("Você saiu do menu Trabalho")
                return manuPrincipal()
            default:
                console.log("Insira uma opção valida")
                return this.exibirMenuTrabalho()
        }
    }
}