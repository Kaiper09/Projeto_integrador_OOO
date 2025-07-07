const db = require('../db')

async function buscarVeiculo() {
    const resultado = await db.query(
        `SELECT veiculos.* 
FROM servicos.veiculos

JOIN servicos.clientes
ON veiculos.cpf_dono = clientes.cpf

WHERE clientes.situacao='ativo';`)

    return resultado.rows
}

async function inserirVeiculo(event, cpf_dono, placa, ano, nomeV, km) {
    const resultado = await db.query(
        `INSERT INTO servicos.veiculos(
	cpf_dono, placa_veiculo, ano, nome_veiculo, km_veiculo)
	VALUES ($1, $2, $3, $4, $5); `, [cpf_dono, placa, ano, nomeV, km])
}

async function atualizarVeiculo(event, cpf_dono, ano, nomeV, km, placa) {
    const resultado = await db.query(`
        UPDATE servicos.veiculos
		SET cpf_dono=$2 ano=$3, nome_veiculo=$4, km_veiculo=$5
		WHERE placa_veiculo=$1;`, [cpf_dono, ano, nomeV, km, placa])
}


module.exports = {
    buscarVeiculo,
    inserirVeiculo,
    atualizarVeiculo,

}