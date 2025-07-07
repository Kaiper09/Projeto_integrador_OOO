const db = require('../db')

async function buscarCliente(){
    const resultado= await db.query('SELECT * FROM SERVICOS.CLIENTES')
    return resultado.rows

}
async function inserirCliente(event,cpf, nome, nascimento, numero, cidade, situacao) {
    //console.log(event)
    console.log('inserirnfo-cliente')
    console.log("vou inserir")
    const resultado = await db.query ('INSERT INTO SERVICOS.CLIENTES (cpf, nome, nascimento, numero, cidade, situacao) VALUES ($1, $2, $3, $4, $5, $6)',[cpf, nome, nascimento, numero, cidade, situacao])
    return resultado.rows
}

async function atualizarCliente(event, nome, nascimento, numero, cidade, situacao, cpf ) {
    //console.log(event)
    const resultado = await db.query ('UPDATE servicos.clientes SET nome=$1, nascimento=$2, numero=$3, cidade=$4, situacao=$5 WHERE cpf=$6',[nome,nascimento,numero,cidade, situacao,cpf])
    return resultado.rows
}

async function deleterCliente(event,cpf) {
    //console.log(event)
    console.log("vou deletar")
    const resultado = await db.query('DELETE FROM servicos.clientes WHERE cpf= $1',[cpf])
    return resultado.rows

}

async function verificarCPF(event, cpf) {
    const resultado = await db.query('SELECT cpf FROM servicos.clientes WHERE cpf = $1', [cpf])
    return resultado.rows.length > 0
}

async function clienteNotificar(){
    const resultado = await db.query(`

SELECT 
clientes.nome,
MAX (servicos.data) AS ultima_data,

CURRENT_DATE - MAX(servicos.data) AS diferenca_em_dias

FROM 
servicos.servicos
  
JOIN 
servicos.veiculos 
ON veiculos.placa_veiculo = servicos.placa_veiculo_id

JOIN 
servicos.clientes  
ON clientes.cpf = veiculos.cpf_dono

where LOWER (clientes.situacao)= 'ativo'

GROUP BY
clientes.nome

HAVING CURRENT_DATE - MAX(servicos.data) > 90

ORDER BY 
diferenca_em_dias DESC 
LIMIT 1
`)

return resultado.rows[0]
}


module.exports={
    clienteNotificar,
    buscarCliente,
    inserirCliente,
    atualizarCliente,
    deleterCliente,
    verificarCPF
}