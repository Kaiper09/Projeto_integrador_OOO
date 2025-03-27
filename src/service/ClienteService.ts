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

        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!regexCpf.test(cpf)) {
            console.log("CPF inválido! O CPF deve estar no formato xxx.xxx.xxx-xx.");
            return;
        }

        if (/\d/.test(nome)) {
            console.log("Nome inválido! Não pode conter números.");
            return;
        }

        if (isNaN(Number(numero))) {
           console.log("Número inválido, apneas núemros permetidos")  
        }

        const telefonevalidoAdd = numero.toString().length >= 10;
        if (!telefonevalidoAdd) {
            console.log("O número de celular deve ter pelo menos 10 dígitos!!!");
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
        console.log("CLiente adicionado com sucesso")
    }

    async atualizarCliente(cpf:string ,nome:string, nascimento: Date, numero: bigint, cidade:string,) {
        const clientes = await this.listarClientes();
        const clienteExistente = clientes.find(cliente => cliente.getCpf() === cpf);

        if (!clienteExistente) {
            console.log("CPF não encontrado");
            return; 
        }
        
        if (/\d/.test(nome)) {
            console.log("Nome inválido! Não pode conter números.");
            return;
        }

        if (isNaN(Number(numero))) {
            console.log("Número inválido")
            return
        }

        const telefonevalidoAdd = numero.toString().length >= 10;
        if (!telefonevalidoAdd) {
            throw new Error("O número de celular deve ter pelo menos 10 dígitos!!!");
        } 

        if (nascimento) {
            const dataNascimentoUsuario = new Date(nascimento);
            const datahoje = new Date();
            let idade = datahoje.getFullYear() - dataNascimentoUsuario.getFullYear();
            if (idade < 18) {
                console.log("O cliente deve ser maior de idade.");
                return;
            }

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
