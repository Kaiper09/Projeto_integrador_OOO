const tabelaVeiculo= document.getElementById('veiculosTable')

const modalCpfDono= document.getElementById('cpf-dono');
const modalPlaca= document.getElementById('veiculo-placa');
const modalAno= document.getElementById('veiculo-ano');
const modalNome= document.getElementById('veiculo-nome');
const modalKm= document.getElementById('veiculo-km')

const msg = document.getElementById('msg');

const botaoLimpar = document.getElementById('btn-limpar');
const botaoSalvar = document.getElementById('btn-salvar');

//botaoSalvar.addEventListener('click', inserirVeiculo);
botaoLimpar.addEventListener('click', limparDados);

function mostrarDetalhes(cpf_dono, placa, ano, nome, km){
    modalCpfDono.value= cpf_dono;
    modalPlaca.value= placa;
    modalAno.value= ano;
    modalNome.value= nome;
    modalKm.value= km;
}

function limparDados(){
    mostrarDetalhes(' ', ' ', ' ', ' ', ' ')
}

function criarLinhaVeiculo(veiculos){

    const linha= document.createElement("tr");

    const celulaCpf= document.createElement("td");
    celulaCpf.textContent= veiculos.cpf_dono;
    linha.appendChild(celulaCpf);

    const celulaPlaca= document.createElement("td");
    celulaPlaca.textContent= veiculos.placa_veiculo;
    linha.appendChild(celulaPlaca);

    const celulAno= document.createElement("td");
    celulAno.textContent= veiculos.ano;
    linha.appendChild(celulAno);

    const celulaNome= document.createElement("td");
    celulaNome.textContent= veiculos.nome_veiculo;
    linha.appendChild(celulaNome);

    const celulaKm= document.createElement("td");
    celulaKm.textContent= veiculos.km_veiculo;
    linha.appendChild(celulaKm);

    const celulaBotao= document.createElement("td");
    const botao= document.createElement("button");
    botao.addEventListener("click",
        function () {mostrarDetalhes(
            veiculos.cpf_dono,
            veiculos.placa_veiculo,
            veiculos.ano,
            veiculos.nome_veiculo,
            veiculos.km_veiculo
        )}
    );
    botao.textContent= '';

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    const iconeLimpar = document.getElementById('ilimpar');
    iconeLimpar.setAttribute('data-lucide', 'circle-plus');

    const iconeSalvar = document.getElementById('isalvar');
    iconeSalvar.setAttribute('data-lucide', 'save');


    tabelaCliente.appendChild(linha);

}