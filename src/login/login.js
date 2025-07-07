const login = document.getElementById('login');
const senha = document.getElementById('senha');
const btn_acessar = document.getElementById('acessar');
const msg = document.getElementById('msg');

btn_acessar.addEventListener('click', validarLogin);

async function validarLogin() {
    const usuario = login.value.trim().toLowerCase();
    const senhaDigitada = senha.value.trim();

    if (!usuario || !senhaDigitada) {
        msg.textContent = "Preencha login e senha.";
        msg.style.color = "red";
        return;
    }

    try {
        const retorno = await window.bancoDeDadosAPI.validarLogin(usuario, senhaDigitada);
        console.log(retorno);

        // mensagem para usuário não encontrado
        if (!retorno || !retorno.perfil) {
            msg.textContent = "Usuário ou senha inválidos.";
            msg.style.color = "red";
            return;
        }

       
        localStorage.setItem('perfil', retorno.perfil);
        localStorage.setItem('cpf_cliente', retorno.cpf_cliente);

        msg.textContent = ""; 

        if (retorno.perfil === 'adm') {
            await window.janelaAPI.abrirMenuPrincipal();
        } else {
            await window.janelaAPI.abrirUser();
        }

    } catch (err) {
        console.error("Erro ao validar login:", err);
        msg.textContent = "Erro ao validar login. Tente novamente.";
        msg.style.color = "red";
    }
}
