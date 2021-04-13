require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

/*async function obtenerTodosLosUsuarios() {
   let usuarios = await sequelize.query('SELECT * FROM Users', { type: sequelize.QueryTypes.SELECT})
   return usuarios;
}*/


async function obtenerTodosLosUsuarios(paginacion) {
   console.log(paginacion);
   let whereUsuarios ='';
   if (paginacion.search.trim()!==''){
      whereUsuarios = `and  (first_name like'%${paginacion.search}%' or usr.last_name like'%${paginacion.search}%' or email like'%${paginacion.search}%' or profile like'%${paginacion.search}%' or password like'%${paginacion.search}%')`
   }
   const countUsr = await sequelize.query(`select count(*) total from Users usr ${whereUsuarios}`, {
      type: sequelize.QueryTypes.SELECT
   });

   const sqlUsuarios = `select first_name,usr.last_name,email,profile,password from Users usr ${whereUsuarios} limit ${paginacion.limit} offset ${paginacion.offset}`

   let usuarios = await sequelize.query(sqlUsuarios, {
      type: sequelize.QueryTypes.SELECT
   })
   const resultado = {
      total: countUsr[0].total,
      totalNotFiltered: countUsr[0].total,
      rows: usuarios

   }
   console.log(resultado);

   return resultado;
}



async function obtenerInformacionDeUsuario(data) {
   console.log (data);
    let usuarios = await sequelize.query('SELECT * FROM Users WHERE email = :email', 
    { replacements: {email: data}, type: sequelize.QueryTypes.SELECT })
    return usuarios;
}


async function crearUsuarios(data) {

   let usuarios = await sequelize.query('INSERT INTO Users (first_name, last_name, email, password, profile) VALUES (?,?,?,?,?)',
   {replacements : data}
   )
 return usuarios;
}

async function eliminarUsuarios(data) {
   let usuarios = await  sequelize.query('DELETE FROM Users WHERE email = ?',
   { replacements: data}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
  return usuarios;
}

async function actualizarUsuarios(data, email) {
   const {first_name, last_name, password, profile }=data
   let usuarios = await  sequelize.query('UPDATE Users SET first_name = :first_name, last_name= :last_name, password= :password, profile= :profile WHERE email= :email',
   { replacements: {first_name, last_name, password, profile, email}}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
  return usuarios;
}

module.exports = {obtenerTodosLosUsuarios, crearUsuarios, eliminarUsuarios, obtenerInformacionDeUsuario, actualizarUsuarios}
