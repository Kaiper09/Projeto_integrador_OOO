

const { contextBridge, ipcRenderer } = require('electron')

// CLIENTE
function buscarCliente() {
    return ipcRenderer.invoke('buscar-cliente')
}

function atualizarCliente(nome, nascimento, numero, cidade, situacao , cpf) {
    return ipcRenderer.invoke('atualizar-cliente', nome, nascimento, numero, cidade, situacao, cpf)                                      
}

function inserirCliente(cpf, nome, nascimento, numero, cidade, situacao) {
    return ipcRenderer.invoke('inserir-cliente', cpf, nome, nascimento, numero, cidade, situacao )
}                                                   

function deleterCliente(cpf) {
    return ipcRenderer.invoke('deletar-cliente', cpf)
}

function verificarCPF(cpf){
    return ipcRenderer.invoke('verificar-cpf', cpf)
}

function notificarCliente(){
    return ipcRenderer.invoke('notificarCliente')
}
//---------------------------------------



// VEICULOS
function buscarVeiculo(){
    return ipcRenderer.invoke('buscar-veiculo')
}

function inserirVeiculo(cpf_dono, placa, ano, nomeV, km){
    return ipcRenderer.invoke('inserir-veiculo',cpf_dono, placa, ano, nomeV, km )
}

function atualizarVeiculo(cpf_dono, ano, nomeV, km, placa){
    return ipcRenderer.invoke('atualizar-veiculo',  cpf_dono, ano, nomeV, km, placa)
}

//---------------------------------------




//ABRIR JANELAS
function abrirUser(){
    ipcRenderer.send('abrir-user')
}

function abrirCliente(){
    ipcRenderer.send('abrir-cliente')
}

function abrirVeiculo(){
    ipcRenderer.send('abrir-veiculo')
}
 
//-------------------------------




// USUARIO E ADM
function validarLogin(usuario, senha){
    return ipcRenderer.invoke('validar-login', usuario, senha)
}

function telaUsuario(cpf_cliente){
    return ipcRenderer.invoke('usuarios', cpf_cliente)
}

//-------------------------------



contextBridge.exposeInMainWorld('bancoDeDadosAPI',

    {
        buscarCliente,
        atualizarCliente,
        inserirCliente,
        deleterCliente,
        verificarCPF,
        notificarCliente,

        //-------------------------------

        buscarVeiculo,
        inserirVeiculo,
        atualizarVeiculo,

        //-------------------------------
        
        validarLogin,
        telaUsuario,
        
       

    })



// ABRIR MENUS
function abrirMenuPrincipal(){
    ipcRenderer.send('abrir-menu')
    
}

function abrirUser(){
    ipcRenderer.send('abrir-user')
}

contextBridge.exposeInMainWorld('janelaAPI',
{
    abrirMenuPrincipal,
    abrirUser,
    abrirCliente,
    abrirVeiculo,
})