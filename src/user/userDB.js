const db = require('../db')

async function telaUsuario(event, cpf_cliente){
console.log(event)
const resultado = await db.query(`SELECT   
  usuario.cpf_cliente as cpf_cliente,
  veiculo.placa_veiculo AS placa_veiculo,
  veiculo.nome_veiculo AS nome_veiculo,
  servico.trabalho_feito AS trabalho_feito,
  TO_CHAR (data, 'DD/MM/YYYY') AS data,
  servico.situacao AS situacao,
  servico.valor_servico AS valor
  
FROM servicos.servicos AS servico

JOIN servicos.veiculos AS veiculo
  ON servico.placa_veiculo_id = veiculo.placa_veiculo
  
JOIN servicos.usuarios AS usuario
  ON usuario.cpf_cliente = veiculo.cpf_dono
  
WHERE usuario.cpf_cliente =$1;
`,[cpf_cliente])
  return resultado.rows

}

module.exports={
    telaUsuario,

}