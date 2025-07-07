const db= require('../db')

async function buscarServico(){
    const resultado= await db.query(`
        SELECT servicos.* 
FROM servicos.servicos

JOIN servicos.veiculos
on servicos.placa_veiculo_id= veiculos.placa_veiculo

JOIN servicos.clientes
ON veiculos.cpf_dono = clientes.cpf

WHERE clientes.situacao='ativo';`)
return resultado.rows
}

module.exports={
   buscarServico, 
}