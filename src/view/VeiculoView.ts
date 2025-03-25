import PromptSync, { Prompt } from "prompt-sync";
import { VeiculoService } from "../service/VeiculoService"
import { MenuPrincipalView } from "./MenuPrincipalView";

async function manuPrincipal(){
    const menuDosMenus = new MenuPrincipalView()
    await menuDosMenus.menuPrimcipalView()
  }

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
        console.log("4- Atualizar dados do veículo")
        console.log("5- Deletar Veículo")
        console.log("6- Sair do menu Veículos")
        const pergunta = this.prompt("O que deseja fazer? (apenas núemeros!!!): ")


        switch (pergunta) {
            case "1":
                console.table(await this.veiculo.listarVeiculo())
                return this.exibirMenuVeiculo()

            case "2":
                let digitarplaca = this.prompt("Digite a placa do Veículo: ")
                console.table(await this.veiculo.procurarVeiculo(digitarplaca))
                return this.exibirMenuVeiculo()

            case "3":
                let addcpf_dono = this.prompt("Digite o CPF do dono do veiculo  (formato xxx.xxx.xxx-xx): ")
                let addplaca_veiculo = this.prompt("Digite a placa do veiculo (xxxx-1234)): ")
                let addano_veiculo = this.prompt("Digite o ano do veiculo: ")
                let addnome_veiculo = this.prompt("Digite o nome do veiculo: ")
                let addkm_veiculo = this.prompt("Quantos quilometros o veiculo já rodou? (apenas números): ")
                await this.veiculo.adiocionarVeiculo(addcpf_dono, addplaca_veiculo, addano_veiculo, addnome_veiculo, addkm_veiculo)
                console.log("Veiculo adicionado com Sucesso!!!")
                return this.exibirMenuVeiculo()

            case "4":
                let pergunta_placa= this.prompt("Digite a plca do veículo que deseja atualizar os dados: ")
                let cpf_novo= this.prompt("Digite o CPF do novo dono do veiculo (formato xxx.xxx.xxx-xx):")
                let ano_new= this.prompt("Digite o ano do veiculo: ")
                let nome_new= this.prompt("Digite o nome do veiculo: ")
                let km_new= this.prompt("Quantos quilometros o veiculo já rodou? (apenas números): ") 
                await this.veiculo.atualizarVeiculo(pergunta_placa, cpf_novo, ano_new, nome_new, km_new)
                return this.exibirMenuVeiculo()
            
            case "5":
                let deletarPlaca= this.prompt("DIgite a placa do veiculo que deseja deletar: ")
                await this.veiculo.deletarVeiculo(deletarPlaca)
                return this.exibirMenuVeiculo()
            

            case "6":
                console.log("Você saiu do menu Veículo")
                return manuPrincipal()
            default:
                console.log("Insira uma opção valida")
                return this.exibirMenuVeiculo()
        }
    }

}