const { app, BrowserWindow } = require('electron');
const path = require('path');
const {creatLoginWindow} = require('./src/janelaPrincipal');

const {createMainWindow} = require('./src/janelaPrincipal');
const{registrarListeners} = require('./src/APPListeners');

if (process.env.NODE_ENV !== 'production') {
  try {
    require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
    });
  } catch (error) {
    console.error('electron-reload não foi carregado:', error);
  }
}

app.whenReady().then(function () {
 
  //createMainWindow();
  creatLoginWindow();
  registrarListeners();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });

}
);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});