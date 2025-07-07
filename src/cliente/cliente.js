const selectTag = document.getElementById("caixaDrop");
const tabelaCliente = document.getElementById('clientesTableDados');

const modalCpfCliente = document.getElementById('cliente-cpf');
const modalNomeCliente = document.getElementById('cliente-nome');
const modalNascimentoCliente = document.getElementById('cliente-nascimento');
const modalNumeroCliente = document.getElementById('cliente-numero');
const modalCidadeCliente = document.getElementById('cliente-cidade');
const msg = document.getElementById('msg')

const dropDownSituacao = document.getElementById('situacao');

const botaoLimpar = document.getElementById('btn-limpar');
//const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');

botaoSalvar.addEventListener('click', inserirCliente);
//botaoExcluir.addEventListener('click', deleterCliente);
botaoLimpar.addEventListener('click', limpardados);

function notificar(cliente, dias) {
    new Notification('Alerta', {
        body: cliente + "  esteve na mecânica á " + dias + " dias"
    });
}
;

async function buscarInativo() {
    const retorno = await window.bancoDeDadosAPI.notificarCliente();
    notificar(retorno.nome, retorno.diferenca_em_dias)
    console.log(retorno)

}



function mostrarDetalhes(cpf, nome, nascimento, numero, cidade,) {
    modalCpfCliente.value = cpf;
    modalNomeCliente.value = nome;

    if (nascimento instanceof Date && !isNaN(nascimento)) {
        modalNascimentoCliente.value = nascimento.toISOString().slice(0, 10);
        //Ela verifica se o valor nascimento é uma data válida. Se for, formata a data no ;
        // formato AAAA-MM-DD (padrão HTML). Se não for válida, limpa o campo.;

    } else {
        modalNascimentoCliente.value = '';
    }
    //modalNascimentoCliente.value = nascimento.toISOString().slice(0, 10);
    modalNumeroCliente.value = numero;
    modalCidadeCliente.value = cidade;


}

async function limpardados() {
    mostrarDetalhes(' ', ' ', ' ', ' ', ' ', ' ')
}

async function inserirCliente() {
    const newNome = modalNomeCliente.value.trim();
    const newNascimento = modalNascimentoCliente.value.trim();
    const newNumero = modalNumeroCliente.value.trim();
    const newCidade = modalCidadeCliente.value.trim();
    const newSituacao = dropDownSituacao.value.trim();

    let cpfDigitado = modalCpfCliente.value.trim();
    let cpf = verificarCPFRegex(cpfDigitado); // ← formata corretamente

    // Atualiza o campo com o CPF formatado
    modalCpfCliente.value = cpf;

    // Verifica se o CPF existe e trata a inserção/atualização
    const cpfValido = await verificarcpf(cpf, newNome, newNascimento, newNumero, newCidade, newSituacao);

    // Se já foi tratado dentro da verificarcpf, não continua aqui
    if (!cpfValido) return;
        await window.bancoDeDadosAPI.inserirCliente(cpf, newNome, newNascimento, newNumero, newCidade,newSituacao);
        msg.textContent = "Cliente inserido com sucesso.";
        msg.style.color = "green";
    limpardados();
    carregarClientes();
}


async function verificarcpf(cpf, nome, nascimento, numero, cidade, situacao) {
    // Já está em modo edição? Então não precisa verificar
    if (modalCpfCliente.hasAttribute('readonly')) {
        return true;
    }

    // Verificase o CPF já existe
    let cpfExiste = await window.bancoDeDadosAPI.verificarCPF(cpf);

    if (cpfExiste) {
        await window.bancoDeDadosAPI.atualizarCliente(nome, nascimento, numero, cidade, situacao, cpf);
        msg.textContent = "Cliente atualizado com sucesso.";
        msg.style.color = "green";
        limpardados();
        carregarClientes();
        return false; // Não continue com a inserção
    }

    return true; // CPF ainda não existe, pode inserir
}


function verificarCPFRegex(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
        msg.textContent = 'O CPF deve ter 11 dígitos';
        msg.style.color = 'red';
        return null;
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}



/*async function deleterCliente() {
    const cpf = modalCpfCliente.value;
    console.log("vou deletar o cpf ", cpf);

    const retorno = await window.bancoDeDadosAPI.deleterCliente(cpf);

    //após deleção atualiza a lista de Clientes
    carregarClientes();
     mostrarDetalhes(' ',' ',' ',' ', ' ',' ')
}*/

async function atualizarCliente() {
    const newNome = modalNomeCliente.value;
    const newNascimento = modalNascimentoCliente.value;
    const newNumero = modalNumeroCliente.value;
    const newCidade = modalCidadeCliente.value;
    const newSituacao = dropDownSituacao.value
    const newCpf = modalCpfCliente.value;

    console.log("testantado atualizar")
    if (newCpf && newCpf === "") {
        console.log("Atualizando cliente...");
        const retorno = await window.bancoDeDadosAPI.atualizarCliente(
            newNome, newNascimento, newNumero, newCidade, newSituacao, newCpf
        );
        carregarClientes();
        mostrarDetalhes(' ', ' ', ' ', ' ', ' ', ' ');
    } else {

        await window.bancoDeDadosAPI.inserirCliente()
    }
}

async function carregarClientes() {
    const listaClientes = await window.bancoDeDadosAPI.buscarCliente();
    tabelaCliente.innerHTML = "";

    console.log(listaClientes)
    listaClientes.forEach(criarLinhaCliente);

    if (!listaClientes.length > 0) {

        tabelaCliente.textContent = "sem dados";
    }

    lucide.createIcons(); // renderiza os ícones do Lucide
}


function criarLinhaCliente(clientes) {
    //paragrafo.textContent = paragrafo.textContent + Cliente.nome

    //linha 
    const linha = document.createElement("tr");

    const celulaCpf = document.createElement("td");
    celulaCpf.textContent = clientes.cpf;
    linha.appendChild(celulaCpf);

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = clientes.nome;
    linha.appendChild(celulaNome);

    //Nascimento
    const celulaNascimento = document.createElement("td");
    celulaNascimento.textContent = clientes.nascimento.toLocaleDateString();
    linha.appendChild(celulaNascimento);

    const celulaNumero = document.createElement("td");
    celulaNumero.textContent = clientes.numero;
    linha.appendChild(celulaNumero);

    const celulaCidade = document.createElement("td");
    celulaCidade.textContent = clientes.cidade;
    linha.appendChild(celulaCidade);

    const celulaSituacao = document.createElement("td");
    celulaSituacao.textContent = clientes.situacao;
    linha.appendChild(celulaSituacao);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(
            clientes.cpf, 
            clientes.nome, 
            clientes.nascimento, 
            clientes.numero, 
            clientes.cidade, 
            clientes.situacao) }
    );
    botao.textContent = '';

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    const iconeLimpar = document.getElementById('ilimpar');
    iconeLimpar.setAttribute('data-lucide', 'circle-plus');

    const iconeSalvar = document.getElementById('isalvar');
    iconeSalvar.setAttribute('data-lucide', 'save');

    /*const iconelixo = document.getElementById('ilixo');
    iconelixo.setAttribute('data-lucide', 'trash-2');*/




    //final adiciono a linha criada com Nascimento,nome e botao à tabela
    tabelaCliente.appendChild(linha);

}

async function carregarTabela() {
    const opcao = ['Ativo', 'Inativo'];
    dropDownSituacao.innerHTML = "";

    opcao.forEach(situacao => {
        const option = document.createElement("option");
        option.value = situacao;
        option.textContent = situacao;
        dropDownSituacao.appendChild(option);
    });
}


carregarTabela();
carregarClientes();
buscarInativo();