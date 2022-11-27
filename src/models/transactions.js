const Pool = require('../config/db')

const searchKeywordsTransactions = (keywords) => {
    return Pool.query("SELECT * FROM transactions  WHERE id || ' ' || address ILIKE $1", [`%${keywords}%`]);
};
const selectAllTransactionsLimit = ({limit,offset,sort,sortby}) => {
    return Pool.query(`SELECT * FROM transactions  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectAll = () => {
    return Pool.query(`SELECT transactions.address, detail_transactions.total as total, detail_transactions.payment_id as payment_id FROM transactions INNER JOIN detail_transactions ON transactions.detail_transactions_id = detail_transactions.id;`);
}
const select =(id)=>{
    return Pool.query(`SELECT * from transactions where id='${id}'`);
}
const insert =(id, address, detail_transactions_id)=>{
    return Pool.query(`INSERT INTO transactions(id, address, detail_transactions_id) VALUES('${id}', '${address}', '${detail_transactions_id}')`);
}
const update = (id, address, detail_transactions_id) => {
    return Pool.query(`UPDATE transactions SET address='${address}', detail_transactions_id='${detail_transactions_id}' WHERE id='${id}'`)
}
const deleteTransactions = (id) =>{
    return Pool.query(`DELETE FROM transactions WHERE id='${id}';`)
}
const countTransactions = () => {
    return Pool.query(`SELECT COUNT(*) FROM transactions`);
}
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM transactions WHERE id='${id}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    searchKeywordsTransactions,
    selectAllTransactionsLimit,
    selectAll,
    select,
    insert,
    update,
    deleteTransactions,
    countTransactions,
    findId
}