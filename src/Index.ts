import { MenuPrincipalView } from "./view/MenuPrincipalView";

async function manuIndex(){
  const menuDosMenus = new MenuPrincipalView()
  await menuDosMenus.menuPrimcipalView()
}
manuIndex()


/*import { PagamentoView } from "./view/PagamentoView";
async function menuPagamento(){
  const pagamentosView = new PagamentoView()
  await pagamentosView.exibirMenuPagamento()
}
menuPagamento()*/

/*import { TrabalhoView } from "./view/TrabalhoView";
async function menuTrabalho(){
  const trabalhoView = new TrabalhoView()
  await trabalhoView.exibirMenuTrabalho()
}
menuTrabalho()*/
  
/*import { VeiculoView } from "./view/VeiculoView";

async function menutVeiculo(){
  const veiculoView = new VeiculoView()
  await veiculoView.exibirMenuVeiculo()
}

menutVeiculo()*/

/*import { ClienteView } from "./view/ClienteView";

async function menuCLiente() {
  const clienteView = new ClienteView(); 
  await clienteView.exibirMenu(); 
}

menuCLiente()*/

/*import { ClienteService } from "./service/ClienteService";

const servico = new ClienteService();

async function teste(){
  console.table(await servico.listarClientes());
}
  
teste()*/

/*import { ClienteService } from "./service/ClienteService";

const adiocionar1= new ClienteService()

async function adcionarteste() {
  adiocionar1.procurarUmCliente("763.143.413-65")
}

adcionarteste()*/

/*import { ClienteService } from "./service/ClienteService";

const adiocionar2= new ClienteService()

async function adcionarteste2() {
  adiocionar2.adicionarCliente("142.412.414-31", "Roberto", "1996-07-01", 9932567843, "Parobe")
}

adcionarteste2()*/

/*import { ClienteService } from "./service/ClienteService";

const achar = new ClienteService();

async function procurarCPF() {
  console.table(await achar.procurarClientes("038.116.710.06"))
  
}

procurarCPF()*/

/*import { VeiculoService } from "./service/VeiculoService";

const veiculo1 = new VeiculoService();

async function testeveiculo(){
  console.table(await veiculo1.listarVeiculo());
}

testeveiculo()*/

/*import { TrabalhoService } from "./service/TrabalhoService";

const trabalho1 = new TrabalhoService();

async function testetrabalho(){

  console.table(await trabalho1.listarTrabalho())
}

testetrabalho()*/
  
/*import { PagamentosService } from "./service/PagamentoService";
const pagamento1 = new PagamentosService();

async function testepagamento() {

  console.table(await pagamento1.listarPagamentos()) 
}

testepagamento()*/