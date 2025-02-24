import PromptSync, { Prompt } from "prompt-sync";
import { VeiculoService } from "../service/VeiculoService"

export class VeiculoView {
    private prompt: Prompt;
    private veiculo: VeiculoService;

    constructor() {
        this.veiculo = new VeiculoService()
        this.prompt = PromptSync()
    }

    public async exibirMenuVeiculo() {
        console.log("-----Bem vindo ao menu de Veiculos!------")
        console.log("1- Listar veiculos")
        console.log("2- Procurar veiculo")
        console.log("3- Adicionar veiculo")
        console.log("4- Sair")
        const pergunta = this.prompt("O que deseja fazer? (apenas núemeros!!!)")


        switch (pergunta) {
            case "1":
                console.table(await this.veiculo.listarVeiculo())
                return this.exibirMenuVeiculo()

            case "2":
                let digitarplaca = this.prompt("Digite a placa do Veículo: ")
                console.table(await this.veiculo.procurarVeiculo(digitarplaca))
                return this.exibirMenuVeiculo()

            case "3":
                let addcpf_dono = this.prompt("Digite o CPF do dono do veiculo: ")
                let addplaca_veiculo = this.prompt("Digite a placa do veiculo: ")
                let addano_veiculo = this.prompt("Digite o ano do veiculo: ")
                let addnome_veiculo = this.prompt("Digite o nome do veiculo: ")
                let addkm_veiculo = this.prompt("Quantos quilometros o veiculo já rodou? (apenas números)")
                await this.veiculo.adiocionarVeiculo(addcpf_dono, addplaca_veiculo, addano_veiculo, addnome_veiculo, addkm_veiculo)
                console.log("Veiculo adicionado com Sucesso!!!")
                return this.exibirMenuVeiculo()

            case "4":
                console.log("Você saiu")
                break
            default:
                console.log("Insira uma opção valida")
                return this.exibirMenuVeiculo()
        }
    }

}