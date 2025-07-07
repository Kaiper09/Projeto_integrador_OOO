const db = require('../db')

async function validarLogin(event, login, senha){
    const resultado= await db.query('SELECT * FROM servicos.usuarios WHERE login=$1 and senha=$2',[login, senha])

    if(resultado.rows.length > 0){
        return resultado.rows[0]
    }
    return false
}

module.exports = {
    validarLogin,
    
}
