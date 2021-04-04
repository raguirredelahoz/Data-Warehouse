require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

async function obtenerTodasLasCompanias(paginacion) {
   console.log(paginacion);
   let whereCompanias ='';
   if (paginacion.search.trim()!==''){
      whereCompanias = `and  (id_companias like'%${paginacion.search}%' or cmp.name like'%${paginacion.search}%' or address like'%${paginacion.search}%' or email like'%${paginacion.search}%' or city.name like'%${paginacion.search}%')`
   }
   const countCmp = await sequelize.query(`select count(*) total from Companies cmp, cities city where city.id=cmp.cities_id  ${whereCompanias}`, {
      type: sequelize.QueryTypes.SELECT
   });

   const sqlCompanias = `select id_companias,cmp.name,address,email,phone, city.name ciudad, cities_id from Companies cmp, cities city where city.id=cmp.cities_id  ${whereCompanias} limit ${paginacion.limit} offset ${paginacion.offset}`

   let companias = await sequelize.query(sqlCompanias, {
      type: sequelize.QueryTypes.SELECT
   })
   const resultado = {
      total: countCmp[0].total,
      totalNotFiltered: countCmp[0].total,
      rows: companias

   }
   console.log(resultado);

   return resultado;
}

async function crearCompanias(data) {

   let companias = await sequelize.query('INSERT INTO Companies (name, address, email, phone, cities_id) VALUES (?,?,?,?,?)', {
      replacements: data
   })
   return companias;
}

async function eliminarCompanias(data) {
   let companias = await sequelize.query('DELETE FROM Companies WHERE id_companias = ?', {
      replacements: data
   }).then(function (cambios) {
      console.log(cambios)
   })
   return companias
}

async function actualizarCompanias(data, id) {
   const {
      name,
      address,
      email,
      phone,
      cities_id
   } = data
   let companias = await sequelize.query('UPDATE Companies SET name = :name, address= :address, email= :email, phone= :phone, cities_id= :cities_id WHERE id_companias= :id', {
      replacements: {
         name,
         address,
         email,
         phone,
         cities_id,
         id
      }
   }).then(function (cambios) {
      console.log(cambios)
   })
   return companias
}


module.exports = {
   obtenerTodasLasCompanias,
   crearCompanias,
   eliminarCompanias,
   actualizarCompanias
}