import PromptSync, { Prompt } from "prompt-sync";
import { ClienteService } from "../service/ClienteService";
import { MenuPrincipalView } from "./MenuPrincipalView";

async function manuPrincipal(){
    const menuDosMenus = new MenuPrincipalView()
    await menuDosMenus.menuPrimcipalView()
  }

export class ClienteView {
    private prompt: Prompt;
    private cliente: ClienteService;

    constructor() {
        this.cliente = new ClienteService()
        this.prompt = PromptSync();
    }

    public async exibirMenu() {
        console.log("----------- Seja bem vindo ao menu de Cliente ----------")
        console.log("1- Listar clientes")
        console.log("2- Procurar cliente")
        console.log("3- Adicionar cliente")
        console.log("4- Atualizar dados de cliente")
        console.log("5- Deletar Cliente")
        console.log("6- Sair do Menu Cliente")
        const pergunta = this.prompt("O que deseja fazer? (apenas núemeros!!!): ")

        switch (pergunta) {
            case "1":
                console.table(await this.cliente.listarClientes());
                return this.exibirMenu()


            case "2":
                let digitarcpf = this.prompt("Digite o CPF que deseja buscar: ")
                console.table(await this.cliente.procurarClientes(digitarcpf))
                return this.exibirMenu()

            case "3":
                let addcpf = this.prompt("Digite o seu CPF (formato xxx.xxx.xxx-xx): ")
                let addnome = this.prompt("Digite o seu nome: ")
                let addnascimento = this.prompt("Digite o seu nascimento (yyyy-mm-dd): ")
                let addnumero = parseInt(this.prompt("Digite o seu numero: "))
                let addcidade = this.prompt("Digite o sua cidade: ")
                await this.cliente.adicionarCliente(addcpf, addnome, new Date(addnascimento), BigInt(addnumero), addcidade)
                return this.exibirMenu()


            case "4":
                let perguntaCpf = this.prompt("Digite o CPF do cliente que deseja atualizar as informações: ")
                let nomenew = this.prompt("Digite o novo seu nome: ")
                let nascimentonew = this.prompt("Digite o seu nascimento (yyyy-mm-dd): ")
                let numeronew = parseInt(this.prompt("Digite o numero: "))
                let cidadenew = this.prompt("Digite a cidade: ")
                await this.cliente.atualizarCliente(perguntaCpf, nomenew, new Date (nascimentonew), BigInt(numeronew), cidadenew);
                return this.exibirMenu();

            case "5":
                console.table(await this.cliente.listarClientes());
                let deletarCpf= this.prompt("Digite o CPF do cliente que deseja deletar: ")
                await this.cliente.deletarCliente(deletarCpf)
                return this.exibirMenu()

            case "6":
                console.log("Você saiu do menu Cliente")
                return manuPrincipal()
            default:
                console.log("Insira uma opção valida")
                return this.exibirMenu()
        }
    }
}