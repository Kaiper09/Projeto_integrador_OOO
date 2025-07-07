const { BrowserWindow } = require("electron");
const path = require("path");

let janelaPrincipal;
let janelaUser;
let janelaLogin;

function createMainWindow() {
  janelaPrincipal = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  janelaPrincipal.loadFile("./src/index.html");

 janelaPrincipal.on("closed", () => {
    janelaPrincipal = null; // limpa a referência
  });

  // Fecha a janela de login se estiver aberta
  if (janelaLogin) {
    janelaLogin.close();
  }

  return janelaPrincipal;
}


function createUserWindow() {
  janelaUser = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

   janelaUser.loadFile("./src/user/user.html");

  anelaUser.on("closed", () => {
    janelaUser = null; // limpa a referência
  });

  // Fecha a janela de login se estiver aberta
  if (janelaLogin) {
    janelaLogin.close();
  }

  return janelaUser;
}


function creatLoginWindow() {
  janelaLogin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  janelaLogin.loadFile('./src/login/login.html')
}

//----------------------------

function getJanelaPrincipal() {
  return janelaPrincipal;
}

function getJanelaLogin(){
  return janelaLogin;
}

function getJanelaUser(){
  return janelaUser;
}

//--------------------------

module.exports = {
  getJanelaPrincipal,

  getJanelaLogin,

  getJanelaUser,

  createMainWindow,

  creatLoginWindow,

  createUserWindow,


};
