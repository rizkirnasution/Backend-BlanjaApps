const Pool = require('../config/db')

const searchKeywordsPayment = (keywords) => {
    return Pool.query("SELECT * FROM payment WHERE id || ' ' || amount ILIKE $1", [`%${keywords}%`]);
}
const selectAllPaymentLimit = ({limit,offset,sort,sortby}) => {
    return Pool.query(`SELECT * FROM payment ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectAll = () => {
    return Pool.query(`SELECT * FROM payment`);
}
const select =(id)=>{
    return Pool.query(`SELECT * from payment where id='${id}'`);
}
const insert =(id, amount)=>{
    return Pool.query(`INSERT INTO payment(id,amount) VALUES('${id}', ${amount})`);
}
const update = (id, amount) => {
    return Pool.query(`UPDATE payment SET amount=${amount} WHERE id='${id}'`)
}
const deletePayment = (id) =>{
    return Pool.query(`DELETE FROM payment WHERE id='${id}';`)
}
const countPayment = () => {
    return Pool.query(`SELECT COUNT(*) FROM payment`);
}
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM payment WHERE id='${id}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
}
module.exports = {
    searchKeywordsPayment,
    selectAllPaymentLimit,
    selectAll,
    select,
    insert,
    update,
    deletePayment,
    countPayment,
    findId
}