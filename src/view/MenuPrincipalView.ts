import PromptSync, { Prompt } from "prompt-sync";
import { PagamentoView } from "./PagamentoView";
import { ClienteView } from "./ClienteView";
import { VeiculoView } from "./VeiculoView";
import { ServicosView } from "./ServicosView";
import chalk from 'chalk';


export class MenuPrincipalView {
    private prompt: Prompt

    constructor() {
        this.prompt = PromptSync();
    }


    public async menuCLiente() {
        const clienteView = new ClienteView();
        await clienteView.exibirMenu();
    }

    public async menutVeiculo() {
        const veiculoView = new VeiculoView()
        await veiculoView.exibirMenuVeiculo()
    }

    public async menuServicos() {
        const servicosView = new ServicosView()
        await servicosView.exibirMenuServicos()
    }

    public async menuPagamento() {
        const pagamentosView = new PagamentoView()
        await pagamentosView.exibirMenuPagamento()
    }


    public async menuPrimcipalView() {
        console.log(chalk.cyan.black('-------------- Bem Vindo ao site Mecânica.Admin--------------'));
        console.log(chalk.blue.bold(' 1 - Menu dos Clientes '));
        console.log(chalk.gray.bold(' 2 - Menu dos Veículos '));
        console.log(chalk.yellow.bold(' 3 - Menu dos Servicos '));
        console.log(chalk.green.bold(' 4 - Menu dos Pagamentos '));
        console.log(chalk.red.bold(' 5 - Sair '));
        const perguntaPrincipal = parseInt(this.prompt("Qual menu deseja acesar? "))
        


        switch (perguntaPrincipal) {
            case 1:
                this.menuCLiente()
                break
            case 2:
                this.menutVeiculo()
                break
            case 3:
                this.menuServicos()
                break
            case 4:
                this.menuPagamento()
               break
            case 5:
                console.log("Você saiu do menu")
                break
            default:
                console.log("Insira uma opção valida")
                return this.menuPrimcipalView()
        }
    }
}