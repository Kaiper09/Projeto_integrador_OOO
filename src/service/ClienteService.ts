import { Cliente } from "../entity/cliente";
import { ClienteRepository } from "../repository/ClienteRepository"

//arquiterura/avaliação:
export class ClienteService{


    private repo : ClienteRepository

    constructor(){
        this.repo = new ClienteRepository();
    }
   
    async listarClientes():Promise<Cliente[]>{
        //console.table(this.repo.listarCliente())
        return await this.repo.listarCliente()
    }

    async procurarClientes(cpf: string):Promise<Cliente[]>{
        let listaClientes : Cliente[] = []
        listaClientes = await this.repo.procurarCliente(cpf)
        

        if(listaClientes.length == 0){
            throw new Error("Cliente não encontrado!!!")
        }
        return listaClientes;
    }

    async adicionarCliente(cpf:string,nome:string,nascimento:Date,numero:bigint,ciade:string){
        const telefonevalido = numero.toString().length >= 10;
    if (!telefonevalido) {
        throw new Error("O número de celular deve ter pelo menos 10 dígitos!!!");
    }
        await this.repo.adicionarCliente(cpf,nome,nascimento,numero,ciade)
    }

    async atualizarCliente(cpf:string,nome:string,nascimento:Date,numero:bigint,ciade:string){
        

        let listaClientes : Cliente[] = []
        let clienteAtual = await this.repo.procurarCliente(cpf)
        if(this.procurarClientes.length <=0){
            throw new Error("CPF não encopntrado")
        }
        return listaClientes
    }

    async procurarUmCliente(cpf: string):Promise<Cliente>{
        let cliente : Cliente
        cliente = await this.repo.procurarUmCliente(cpf)
        

        if(!cliente){
            throw new Error("Cliente não encontrado!!!")
        }
        return cliente;
    }
    

    
}