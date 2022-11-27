const Pool = require('../config/db')

const searchKeywordsDetTrans = (keywords) => {
    return Pool.query("SELECT * FROM detail_transactions WHERE id || ' ' || total ILIKE $1", [`%${keywords}%`]);
};
const selectAllDetTransLimit = ({limit,offset,sort,sortby}) => {
    return Pool.query(`SELECT * FROM detail_transactions ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectAll = () => {
    return Pool.query(`SELECT * FROM detail_transactions`);
}
const select =(id)=>{
    return Pool.query(`SELECT * from detail_transactions where id='${id}'`);
}
const insert =(id , total, payment_id)=>{
    return Pool.query(`INSERT INTO detail_transactions(id, total, payment_id) VALUES('${id}', ${total}, '${payment_id}')`)
}
const update = (id, total, payment_id) => {
    return Pool.query(`UPDATE detail_transactions SET total=${total}, payment_id='${payment_id}' WHERE id='${id}'`)
}
const deleteDetTrans = (id) =>{
    return Pool.query(`DELETE FROM detail_transactions WHERE id='${id}';`)
}
const countDetTrans = () => {
    return Pool.query(`SELECT COUNT(*) FROM detail_transactions`);
}
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM detail_transactions WHERE id='${id}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    searchKeywordsDetTrans,
    selectAllDetTransLimit,
    selectAll,
    select,
    insert,
    update,
    deleteDetTrans,
    countDetTrans,
    findId
}