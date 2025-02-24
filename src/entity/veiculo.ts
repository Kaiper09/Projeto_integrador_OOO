export class Veiculo {
    private cpf_dono: string;
    private placa_veiculo: string;
    private ano: string;
    private nome_veiculo: string;
    private km_veiculo: number;


    constructor(cpf_dono: string, placa_veiculo: string, ano: string, nome_veiculo: string, km_veiculo: number){
        this.cpf_dono = cpf_dono;
        this.placa_veiculo = placa_veiculo;
        this.ano = ano;
        this.nome_veiculo = nome_veiculo;
        this.km_veiculo = km_veiculo;
    }
}