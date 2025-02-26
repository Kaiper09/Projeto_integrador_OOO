import PromptSync, { Prompt } from "prompt-sync";
import { PagamentosService } from "../service/PagamentoService";


export class PagamentoView{
    private prompt: Prompt;
    private pagamento: PagamentosService ;

    constructor() {
        this.pagamento = new PagamentosService()
        this.prompt = PromptSync();
    }

    public async exibirMenuPagamento() {
        console.log("----------- Seja bem vindo ao menu de Pagamentos ----------")
        console.log("1- Listar pagamentos")
        console.log("2- Procurar pagamento")
        console.log("3- Adicionar pagamento")
        console.log("4- Sair")
        const pergunta = this.prompt("O que deseja fazer? (apenas núemeros!!!): ")

        switch (pergunta) {
            case "1":
                console.table(await this.pagamento.listarPagamentos());
                return this.exibirMenuPagamento()


            case "2":
                let digitarid = this.prompt("Digite o Id do serviço: ")
                console.table(await this.pagamento.procurarPagamento(parseInt(digitarid)))
                return this.exibirMenuPagamento()

            case "3":
                let addid = this.prompt("Digite o ID do novo pagamento: ")
                let adddata= this.prompt("Digite a data do pagamento: ")
                let addmetodo = this.prompt("Digite o metodo: ")
                let addvalor = this.prompt("Digite o valor: ")
                await this.pagamento.adicionarPagamento(parseInt(addid), adddata, addmetodo, addvalor)
                console.log("Pagamento adicionado com sucesso!!!")
                console.table(await this.pagamento.listarPagamentos())
                return this.exibirMenuPagamento()

            case "4":
                console.log("Você saiu")
                break
            default:
                console.log("Insira uma opção valida")
                return this.exibirMenuPagamento()
        }
    }
}
