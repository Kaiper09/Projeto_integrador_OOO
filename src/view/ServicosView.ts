import PromptSync, { Prompt } from "prompt-sync";
import { ServicosService } from "../service/ServicosService"
import { MenuPrincipalView } from "./MenuPrincipalView";


async function manuPrincipal(){
    const menuDosMenus = new MenuPrincipalView()
    await menuDosMenus.menuPrimcipalView()
  } 


export class ServicosView {
    private prompt: Prompt;
    private servicos: ServicosService;

    constructor() {
        this.servicos = new ServicosService()
        this.prompt = PromptSync();
    }

    public async exibirMenuServicos() {
        console.log("----------- Seja bem vindo ao menu de Servicos ----------")
        console.log("1- Listar servicos")
        console.log("2- Procurar servico")
        console.log("3- Adicionar servico")
        console.log("4- Atualizar servico")
        console.log("5- Deletar servico")
        console.log("6- Sair do menu Servicos")
        const pergunta = this.prompt("O que deseja fazer? (apenas núemeros!!!): ")

        switch (pergunta) {
            case "1":
                console.table(await this.servicos.listarServicos());
                return this.exibirMenuServicos()


            case "2":
                let digitarplaca_id = this.prompt("Digite a placa do veiculo que deseja ver o serviço: ")
                console.table(await this.servicos.procurarServicos(digitarplaca_id))
                return this.exibirMenuServicos()

            case "3":
                let addid_servico = this.prompt("Digite o ID do novo serviço: ")
                let addservicos_feito = this.prompt("Digite o servicos feito: ")
                let adddata = this.prompt("Digite a data (yyyy-mm-dd): ")
                let addplacavei = this.prompt("Digite a placa do veiculo: ")
                let addvalor= parseInt(this.prompt("Digite o valor do serviço, apenas números: "))
                await this.servicos.adicionarServicos(parseInt(addid_servico), addservicos_feito, new Date(adddata), addplacavei, addvalor)
                console.log("Servicos adicionado com sucesso!!!")
                return this.exibirMenuServicos()

            case "4":
                console.table(await this.servicos.listarServicos())
                let id_ver = parseInt(this.prompt("Digite o id do serviço que deseja atualizar: "))
                let servico_new = this.prompt("Digite o servico feito: ")
                let data_new = this.prompt("Digite a data do serviço (yyyy-mm-dd): ")
                let placa_new = this.prompt("Digite a placa do veículo: ")
                let valor_new = parseInt(this.prompt("Digite o novo valor do servico: "))
                await this.servicos.atualizarServicos(id_ver, servico_new, new Date(data_new), placa_new, valor_new)
                return this.exibirMenuServicos()


            case "5":
                console.table(await this.servicos.listarServicos())
                let deletarID = parseInt(this.prompt("Digite o ID do serviço que deseja deletar: "))
                await this.servicos.deletarServicos(deletarID)
                return this.exibirMenuServicos()


            case "6":
                console.log("Você saiu do menu Servicos")
                return manuPrincipal()
            default:
                console.log("Insira uma opção valida")
                return this.exibirMenuServicos()
        }
    }
}