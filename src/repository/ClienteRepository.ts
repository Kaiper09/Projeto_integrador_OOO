import { Pool } from "pg";
import { Database } from "./Database";
import { Cliente } from "../entity/cliente";



export class ClienteRepository{

    private pool : Pool;

    constructor (){
        this.pool = Database.iniciarConexao();
    }

     async listarCliente():Promise<Cliente[]>{
        const query = "SELECT * FROM SERVICOS.CLIENTES";
        const result = await this.pool.query(query);
        

        const listaClientes: Cliente[] = []

        for(const row of result.rows){
            const cliente= new Cliente(row.cpf, row.nome, row.nascimento, row.numero, row.cidade)
            listaClientes.push(cliente)
        }
        return listaClientes;
    }

    async procurarCliente(cpf: string):Promise<Cliente[]>{
        const query = "SELECT * FROM SERVICOS.CLIENTES WHERE cpf= $1";
        const result = await this.pool.query(query, [cpf]);

        const listaClientes: Cliente[] = []

        for(const row of result.rows){
            const cliente= new Cliente(row.cpf, row.nome, row.nascimento, row.numero, row.cidade)
            listaClientes.push(cliente)
        }
        return listaClientes;
    }

    async adicionarCliente(cpf: string, nome: string, nascimento: Date, numero: bigint, cidade: string){
        let query = "INSERT INTO SERVICOS.CLIENTES (cpf, nome, nascimento, numero, cidade) VALUES ($1, $2, $3, $4, $5)"
        await this.pool.query(query,[cpf, nome, nascimento, numero, cidade])
    }

    async atualizarCliente(cpf: string,nome:string, nascimento: Date, numero: bigint, cidade: string){
        let query= "UPDATE servicos.clientes SET nome=$1, nascimento=$2, numero=$3, cidade=$4 WHERE cpf=$5"
        await this.pool.query(query,[nome, nascimento, numero, cidade,cpf])
    }

    async deleterCliente(cpf: string){
        const query ="DELETE FROM servicos.clientes WHERE cpf= $1"
        await this.pool.query(query,[cpf])
        
    }
}