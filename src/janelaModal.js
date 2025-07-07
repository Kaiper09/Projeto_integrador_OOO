const {BrowserWindow} = require('electron')
const path = require('path');
const { createMainWindow } = require('./janelaPrincipal');
const { getJanelaPrincipal } = require('./janelaPrincipal');
const { console } = require('inspector');


function criarJanelaModal(telaPai, arquivoHtml) {
    const janela = new BrowserWindow({
        width: 1000,
        height: 600,

        
        modal: true,
        parent: telaPai,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janela.loadFile(arquivoHtml);

    return janela;
}


function modalAbrirCliente(){
     let mainWindow = getJanelaPrincipal();
    if(mainWindow){
        criarJanelaModal(mainWindow, './src/cliente/cliente.html')
    }else{
        console.warn("Não foi possível abrir a modal: Janela Principal não encontrada")
    }
}

function modalAbrirVeiculo(){
    let mainWindow = getJanelaPrincipal();
    if(mainWindow){
        criarJanelaModal(mainWindow, './src/veiculo/veiculo.html')
    }else{
        console.warn("Não foi possível abrir a modal: Janela Principal não encontrada")
    }
}




module.exports = {
    criarJanelaModal,
    createMainWindow,
    modalAbrirCliente,
    modalAbrirVeiculo,
    
};