const tabelaUser = document.getElementById('userTableDados')

const userCpf= document.getElementById('user-cpf');
const userPlaca= document.getElementById('user-placa');
const userVeiculo= document.getElementById('user-veiculo');
const userServico= document.getElementById('user-servico');
const userData= document.getElementById('user-data');
const userSituacao= document.getElementById('user-situacao');
const userValor= document.getElementById('user-valor')


// Função para formatar para o input (yyyy-mm-dd)
function formatarDataParaInput(data) {
    if (data instanceof Date && !isNaN(data)) {
        return data.toISOString().slice(0, 10);
    }
    return '';
}

// Função para formatar visualmente (dd/mm/yyyy)
function formatarDataParaTexto(data) {
    if (data instanceof Date && !isNaN(data)) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    return '';
}



async function carregarUser(){
    const cpfCliente = localStorage.getItem('cpf_cliente');

    const listaPerfil= await window.bancoDeDadosAPI. telaUsuario(cpfCliente)
    tabelaUser.innerHTML= "";
    
    console.log(listaPerfil)
    listaPerfil.forEach(criarLinhaUser);

    if(listaPerfil.lenght > 0){
        tabelaUser.textContent="Sem dados";
    }

     lucide.createIcons();
}

function criarLinhaUser(servico) {
    const linha= document.createElement("tr");

    const celulaCpf= document.createElement("td");
    celulaCpf.textContent= servico.cpf_cliente;
    linha.appendChild(celulaCpf);

    const placa= document.createElement("td");
    placa.textContent= servico.placa_veiculo;
    linha.appendChild(placa);

    const nomeVeiculo= document.createElement("td");
    nomeVeiculo.textContent= servico.nome_veiculo;
    linha.appendChild(nomeVeiculo);

    const servicoUser= document.createElement("td");
    servicoUser.textContent= servico.trabalho_feito
    linha.appendChild(servicoUser);

    const data=document.createElement("td");
    data.textContent=servico.data;
    linha.appendChild(data);

    const situacao= document.createElement("td");
    situacao.textContent= servico.situacao;
    linha.appendChild(situacao);

    const valor= document.createElement("td");
    valor.textContent=servico.valor;
    linha.appendChild(valor)

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(servico.cpf_cliente, servico.placa_veiculo,servico.nome_veiculo, servico.trabalho_feito,servico.data, servico.situacao, servico.valor  ) }
    );


    //final adiciono a linha criada com Nascimento,nome e botao à tabela
    tabelaUser.appendChild(linha);

}

carregarUser()

