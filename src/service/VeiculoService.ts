import { VeiculoRepository } from "../repository/VeiculoRepository"
import { Veiculo } from "../entity/veiculo"

export class VeiculoService {
    private repo: VeiculoRepository

    constructor() {
        this.repo = new VeiculoRepository();
    }

    async listarVeiculo(): Promise<Veiculo[]> {
        return await this.repo.listarVeiculos();

    }

    async procurarVeiculo(placa_veiculo: string): Promise<Veiculo[]> {
        let listaVeiculos: Veiculo[] = []
        listaVeiculos = await this.repo.procurarVeiculo(placa_veiculo)


        if (listaVeiculos.length == 0) {
            throw new Error("Veiculo não encontrado!!!")
        }
        return listaVeiculos;
    }

    async adiocionarVeiculo(cpf_dono: string, placa_veiculo: string, ano: string, nome_veiculo: string, km_veiculo: string) {
         
        const regexPlaca1= /^[A-Za-z]{3}-\d{4}$/
        const regexPlaca2 = /^[A-Za-z]{2}\d{2}[A-Za-z]{1}\d{2}$/;
        if(regexPlaca1.test(placa_veiculo) || regexPlaca2.test(placa_veiculo)){
            console.log("Placa inválida, a placa deve estar no formato xxx-1234 ou xx12x34.")

        }

        if (!km_veiculo || isNaN(Number(km_veiculo)) || Number(km_veiculo) <= 0) {
            throw new Error("O KM do veículo deve ser um número maior que 0");
        }

        const regexAno = /^\d{4}$/;  
            if (!regexAno.test(ano)) {
                throw new Error("O ano deve ser composto por 4 dígitos numéricos");
        }

        const anoAtual = new Date().getFullYear();
        if (parseInt(ano) > anoAtual) {
            throw new Error(`O ano não pode ser maior que o ano atual!`);
        }

        const anoValido = /^[12]\d{3}$/;
        if (!anoValido.test(ano)) {
            throw new Error("Ano do veículo inválido");
        }

        if (!nome_veiculo || nome_veiculo.trim() === "") {
            throw new Error("Nome do veículo não pode ser vazio");
        }

        if (/\d/.test(nome_veiculo)) {
            console.log("Nome inválido! Não pode conter números.");
            return;
        }

        const km = parseFloat(km_veiculo);
        if (isNaN(km) || km < 0) {
            throw new Error("Quilometragem do veículo inválida");
        }

        await this.repo.adicionarVeiculo(cpf_dono, placa_veiculo, ano, nome_veiculo, km_veiculo)
        console.log("Veículo adicionado com sucesso")
    }

    async atualizarVeiculo(cpf_dono: string, placa_veiculo: string, ano: string, nome_veiculo: string, km_veiculo: string) {

        if (!km_veiculo || isNaN(Number(km_veiculo)) || Number(km_veiculo) <= 0) {
            throw new Error("O KM do veículo deve ser um número maior que 0");
        }

        const regexAno = /^\d{4}$/;  
            if (!regexAno.test(ano)) {
                throw new Error("O ano deve ser composto por 4 dígitos numéricos");
        }

        const anoAtual = new Date().getFullYear();
        if (parseInt(ano) > anoAtual) {
            throw new Error(`O ano não pode ser maior que o ano atual!`);
        }


        const anoValido = /^[12]\d{3}$/;
        if (!anoValido.test(ano)) {
           console.log("Ano do veículo inválido");
           return
        }

        if (!nome_veiculo || nome_veiculo.trim() === "") {
           console.log("Nome do veículo não pode ser vazio");
           return
        }

        if (/\d/.test(nome_veiculo)) {
            console.log("Nome inválido! Não pode conter números.");
            return;
        }

        const km = parseFloat(km_veiculo);
        if (isNaN(km) || km < 0) {
           console.log("Quilometragem do veículo inválida");
           return
        }
        await this.repo.atualizarVeiculo(placa_veiculo, cpf_dono, ano, nome_veiculo, km_veiculo)
        console.log("Veiculo atualizado com sucesso")

    }

    async deletarVeiculo(placa_veiculo: string){
        const veiculos = await this.listarVeiculo();
        const veiculoexistente = veiculos.find(veiculo => veiculo.getPlaca() === placa_veiculo)

        if(!veiculoexistente){
            console.log("Veiculo não encontrado");
            return;
        }

        await this.repo.deletarVeiculo(placa_veiculo);
        console.log("Veiculo deletado com sucesso")

    }

}