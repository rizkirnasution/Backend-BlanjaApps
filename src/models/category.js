const Pool = require('../config/db')

const searchKeywordsCategory = (keywords) => {
  return Pool.query("SELECT * FROM category WHERE id || ' ' || name ILIKE $1", [`%${keywords}%`]);
};
const selectAllCategoryLimit = ({limit,offset,sort,sortby}) => {
    return Pool.query(`SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectAll = () => {
    return Pool.query(`SELECT * FROM category`);
}
const select =(id)=>{
    return Pool.query(`select * from category where id='${id}'`);
}
const insert =(id, name)=>{
    return Pool.query(`INSERT INTO category(id, name) VALUES('${id}', '${name}')`);
}
const update = (id, name) => {
    return Pool.query(`UPDATE category SET name='${name}' WHERE id='${id}'`)
}
const deleteCategory = (id) =>{
    return Pool.query(`DELETE FROM category WHERE id='${id}';`)
}
const countCategory = () => {
    return Pool.query(`SELECT COUNT(*) FROM category`);
}
const findId =(id)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT id FROM category WHERE id='${id}'`,(error,result)=>{
    if(!error){
      resolve(result)
    }else{
      reject(error)
    }
  })
  )
}

module.exports = {
    searchKeywordsCategory,
    selectAllCategoryLimit,
    selectAll,
    select,
    insert,
    update,
    deleteCategory,
    countCategory,
    findId
}