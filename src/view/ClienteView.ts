import PromptSync, { Prompt } from "prompt-sync";
import { ClienteService } from "../service/ClienteService";

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
        console.log("4- Sair")
        const pergunta = this.prompt("O que deseja fazer? (apenas núemeros!!!)")

        switch (pergunta) {
            case "1":
                console.table(await this.cliente.listarClientes());
                return this.exibirMenu()


            case "2":
                let digitarcpf = this.prompt("Digite o CPF que deseja buscar: ")
                console.table(await this.cliente.procurarClientes(digitarcpf))
                return this.exibirMenu()

            case "3":
                let addcpf = this.prompt("Digite o seu CPF: ")
                let addnome = this.prompt("Digite o seu nome: ")
                let addnascimento = this.prompt("Digite o seu nascimento: ")
                let addnumero = parseInt(this.prompt("Digite o seu numero: "))
                let addcidade = this.prompt("Digite o sua cidade: ")
                await this.cliente.adicionarCliente(addcpf, addnome, new Date(addnascimento), BigInt(addnumero), addcidade)
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