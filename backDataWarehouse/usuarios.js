require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

async function obtenerTodosLosUsuarios() {

   let usuarios = await sequelize.query('SELECT * FROM Users', { type: sequelize.QueryTypes.SELECT})
   return usuarios;
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
}


module.exports = {obtenerTodosLosUsuarios, crearUsuarios, eliminarUsuarios, obtenerInformacionDeUsuario, actualizarUsuarios}
