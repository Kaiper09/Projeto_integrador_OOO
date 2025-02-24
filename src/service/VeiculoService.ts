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

    async adiocionarVeiculo(cpf_dono: string, placa_veiculo: string, ano: string, nome_veiculo: string, km_veiculo: string){
        
        await this.repo.adicionarVeiculo(cpf_dono,placa_veiculo,ano,nome_veiculo,km_veiculo)
    }

}