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

    async verificarCpf(cpf: string):Promise<boolean>{
        let lista : Cliente []
        lista = await this.repo.verificarCpf(cpf)
        return lista.length > 0
    }

    async atualizarCliente(nome, nascimento, numero, cidade, cpf) {
        if(nome = null){
            console.log("Nome inválido")
            return
        }

        if(numero.isNaN){
            console.log("Número inválido")
        return
        }

        if(cidade.isNaN){
            console.log("Cidade inválido")
            return
        }
        
    }
}
