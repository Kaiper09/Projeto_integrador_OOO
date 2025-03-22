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
        const anoValido = /^[12]\d{3}$/;
        if (!anoValido.test(ano)) {
            throw new Error("Ano do veículo inválido");
        }


        if (!nome_veiculo || nome_veiculo.trim() === "") {
            throw new Error("Nome do veículo não pode ser vazio");
        }


        const km = parseFloat(km_veiculo);
        if (isNaN(km) || km < 0) {
            throw new Error("Quilometragem do veículo inválida");
        }

        await this.repo.adicionarVeiculo(cpf_dono, placa_veiculo, ano, nome_veiculo, km_veiculo)
    }

    async atualizarVeiculo(cpf_dono: string, placa_veiculo: string, ano: string, nome_veiculo: string, km_veiculo: string) {
        
        const anoValido = /^[12]\d{3}$/;
        if (!anoValido.test(ano)) {
            throw new Error("Ano do veículo inválido");
        }

        if (!nome_veiculo || nome_veiculo.trim() === "") {
            throw new Error("Nome do veículo não pode ser vazio");
        }

        const km = parseFloat(km_veiculo);
        if (isNaN(km) || km < 0) {
            throw new Error("Quilometragem do veículo inválida");
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