const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')


function abrirCliente(){
    criarJanela('cliente.html');
}

module.exports={
    abrirCliente,
}