require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

async function obtenerTodasLasCompanias(paginacion) {

   let companias = await sequelize.query( `select * from Companies limit ${paginacion.limit} offset ${paginacion.offset}`
   ,{ type: sequelize.QueryTypes.SELECT})
   return companias;
}

async function crearCompanias(data) {

   let companias = await sequelize.query('INSERT INTO Companies (name, address, email, phone, cities_id) VALUES (?,?,?,?,?)',
   {replacements : data}
   )
 return companias;
}

async function eliminarCompanias(data) {
   let companias = await  sequelize.query('DELETE FROM Companies WHERE email = ?',
   { replacements: data}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
  return companias
}

async function actualizarCompanias(data, email) {
   const {name, address, phone, cities_id }=data
   let companias = await  sequelize.query('UPDATE Companies SET name = :name, address= :address, phone= :phone, cities_id= :cities_id WHERE email= :email',
   { replacements: {name, address, phone, cities_id, email}}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
  return companias
}


module.exports = {obtenerTodasLasCompanias, crearCompanias, eliminarCompanias, actualizarCompanias}
