export class Cliente {
    private cpf: string
    protected nome: string
    private nascimento: Date
    private numero: bigint
    private cidade: string




    constructor(cpf: string, nome: string, nascimento: Date, numero: bigint, cidade: string) {
        this.cpf = cpf;
        this.nome = nome;
        this.nascimento = nascimento;
        this.numero = numero;
        this.cidade = cidade;
    }

    public getCpf(): string {
        return this.cpf;
    }
}
