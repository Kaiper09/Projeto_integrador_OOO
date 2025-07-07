const db= require('../db')

async function buscarPagamentos(){
    const resultado= await db.query(`
        SELECT pagamentos.* 
FROM servicos.pagamentos

JOIN servicos.servicos
ON pagamentos.id_servico= servicos.id_servico

JOIN servicos.veiculos
ON servicos.placa_veiculo_id= veiculos.placa_veiculo

JOIN servicos.clientes
ON veiculos.cpf_dono = clientes.cpf

WHERE clientes.situacao='ativo';`)
return resultado.rows
}

module.exports={
    buscarPagamentos,
}