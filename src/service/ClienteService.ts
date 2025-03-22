import { Cliente } from "../entity/cliente";
import { ClienteRepository } from "../repository/ClienteRepository"

//arquiterura/avaliação:
export class ClienteService {


    private repo: ClienteRepository

    constructor() {
        this.repo = new ClienteRepository();
    }

    async listarClientes(): Promise<Cliente[]> {
        //console.table(this.repo.listarCliente())
        return await this.repo.listarCliente()
    }

    async procurarClientes(cpf: string): Promise<Cliente[]> {
        let listaClientes: Cliente[] = []
        listaClientes = await this.repo.procurarCliente(cpf)


        if (listaClientes.length == 0) {
            throw new Error("Cliente não encontrado!!!")
        }
        return listaClientes;
    }

    async adicionarCliente(cpf: string, nome: string, nascimento: Date, numero: bigint, ciade: string) {
        
        const telefonevalido = numero.toString().length >= 10;
        if (!telefonevalido) {
            throw new Error("O número de celular deve ter pelo menos 10 dígitos!!!");
        } 
    
        if (!nome){
            console.log("Nome inválido")
            return
        }

        if (isNaN(Number(numero))) {
            console.log("Número inválido")
            return
        }

        if (nascimento) {
            const dataNascimento = new Date(nascimento);
            const hoje = new Date();
            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            if (idade < 18) {
                console.log("O cliente deve ser maior de idade.");
                return;
            }

        }

        await this.repo.adicionarCliente(cpf, nome, nascimento, numero, ciade)
    }


    async atualizarCliente(cpf:string ,nome:string, nascimento: Date, numero: bigint, cidade:string,) {
        const clientes = await this.listarClientes();

        const clienteExistente = clientes.find(cliente => cliente.getCpf() === cpf);

        if (!clienteExistente) {
            console.log("CPF não encontrado");
            return; 
        }
        
        if (!nome){
            console.log("Nome inválido")
            return
        }

        if (isNaN(Number(numero))) {
            console.log("Número inválido")
            return
        }

        if (nascimento) {
            const dataNascimento = new Date(nascimento);
            const hoje = new Date();
            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            if (idade < 18) {
                console.log("O cliente deve ser maior de idade.");
                return;
            }

        }

        const telefonevalido = numero.toString().length >= 10;
        if (!telefonevalido) {
            throw new Error("O número de celular deve ter pelo menos 10 dígitos!!!");
        }
       
        await this.repo.atualizarCliente(cpf, nome ,nascimento, numero, cidade)
        console.log("Cliente atualizadp com sucesso!!!")
    }

    async deletarCliente(cpf: string){
        const clientes = await this.listarClientes();

        const clienteExistente = clientes.find(cliente => cliente.getCpf() === cpf);

        if (!clienteExistente) {
            console.log("CPF não encontrado");
            return; 
        }
    
        await this.repo.deleterCliente(cpf);
        console.log("Cliente deletado com sucesso");
    }
}
