const {ipcMain}=require('electron')
const {createMainWindow} = require('./janelaPrincipal');
const {createUserWindow} = require('./janelaPrincipal')

//CLIENTE
const {
    buscarCliente,
    atualizarCliente,
    inserirCliente,
    deleterCliente,
    verificarCPF,
    clienteNotificar,
}=require('./cliente/clienteDB')

function registrarClienteHandler(){
    ipcMain.handle('buscar-cliente',buscarCliente)
    ipcMain.handle('inserir-cliente',inserirCliente)
    ipcMain.handle('atualizar-cliente',atualizarCliente)
    ipcMain.handle('deletar-cliente',deleterCliente)
    ipcMain.handle('verificar-cpf', verificarCPF)
    ipcMain.handle('notificarCliente', clienteNotificar)
}
//---------------------------------

const{
    buscarVeiculo,
    inserirVeiculo,
    atualizarVeiculo,
}= require('./veiculo/veiculoDB')

function registrarVeiculoHandler(){
    ipcMain.handle('buscar-veiculo', buscarVeiculo)
    ipcMain.handle('inserir-veiculo', inserirVeiculo)
    ipcMain.handle('atualizar-veiculo', atualizarVeiculo)
}

//---------------------------------


//JENELAS
const { modalAbrirCliente,
        modalAbrirVeiculo,
 } = require('./janelaModal')


 function registrarJanela(){
    ipcMain.on('abrir-cliente',modalAbrirCliente)
    ipcMain.on('abrir-veiculo',modalAbrirVeiculo)

    ipcMain.on('abrir-user', createUserWindow)
    ipcMain.on('abrir-menu',createMainWindow)
    
}
//-----------------------------------


//LOGIN
const {
    validarLogin,
}= require('./login/loginDB');



function registrarLoginHandler(){
        ipcMain.handle('validar-login', validarLogin)
      
    }
//----------------------------------


//USER
  const {telaUsuario}= require('./user/userDB')  

    function registrarUserHandler(){
        ipcMain.handle('usuarios', telaUsuario)
    }
//--------------------------------


//HANDLERS
function registrarListeners(){
    registrarClienteHandler();
    registrarVeiculoHandler();
    registrarLoginHandler();
    registrarUserHandler()
    registrarJanela();
      
}

module.exports={
    registrarListeners
}