import PromptSync, { Prompt } from "prompt-sync";
import { PagamentosService } from "../service/PagamentoService";
import { MenuPrincipalView } from "./MenuPrincipalView";



async function manuPrincipal(){
    const menuDosMenus = new MenuPrincipalView()
    await menuDosMenus.menuPrimcipalView()
  }


export class PagamentoView {
    private prompt: Prompt;
    private pagamento: PagamentosService;

    constructor() {
        this.pagamento = new PagamentosService()
        this.prompt = PromptSync();
    }

    public async exibirMenuPagamento() {
        console.log("----------- Seja bem vindo ao menu de Pagamentos ----------")
        console.log("1- Listar pagamentos")
        console.log("2- Procurar pagamento")
        console.log("3- Adicionar pagamento")
        console.log("4- Atualizar pagamento")
        console.log("5- Deletar pagamento")
        console.log("6- Visualizar pagamentos pendendes")
        console.log("7- Visualizar pagametnos pagos")
        console.log("8- Sair")
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
                let adddata = this.prompt("Digite a data do pagamento (yyyy-mm-dd): ")
                let addmetodo = this.prompt("Digite o metodo, apenas pix, cartao e dinheiro: ")
                let addsituacao= this.prompt("Informe a situaçao (pago | pendente): ")
                let addVencimento= this.prompt("Informe a data de vencimetno (yyyy-mm-dd): ")
                await this.pagamento.adicionarPagamento(parseInt(addid), new Date(adddata), addmetodo, addsituacao, new Date (addVencimento))
                console.log("Pagamento adicionado com sucesso!!!")
                console.table(await this.pagamento.listarPagamentos())
                return this.exibirMenuPagamento()

            case "4":
                let perguntar_id = parseInt(this.prompt("Digite o id do serviço que deseja atualizar: "))
                let newData = this.prompt("Digite a data do pagamento (yyyy-mm-dd): ")
                let newMetodo = this.prompt("Digite o novo metodo, apenas pix, cartao e dinheiro:: ")
                let newSituacao= this.prompt("Digite a situação (pago | pendente): ")
                let newVencimento= this.prompt("Informe a data de vencimetno (yyyy-mm-dd): ")
                await this.pagamento.atualizarPagamento(Number(perguntar_id), new Date(newData), newMetodo, newSituacao, new Date(newVencimento))
                return this.exibirMenuPagamento()

            case "5":
                let perguntar_delet = parseInt(this.prompt("Digite o id do serviço que deseja deletar: "))
                await this.pagamento.deletarPagamento(perguntar_delet)
                return this.exibirMenuPagamento()

            case "6":
               const pagametnos = await this.pagamento.pagamentosPendentes()
               console.table(pagametnos)
               return await this.exibirMenuPagamento()
            
            case "7":
                const pagametnosPagos = await this.pagamento.pagamentosPagos()
                console.table(pagametnosPagos)
                return await this.exibirMenuPagamento()
             
            case "8":
                console.log("Você saiu do menu Pagamento")
                return manuPrincipal()
            default:
                console.log("Insira uma opção valida")
                return this.exibirMenuPagamento()
        }
    }
}
