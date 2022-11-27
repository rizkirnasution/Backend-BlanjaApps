const Pool = require('../config/db')

const searchKeywordsProducts = (keywords) => {
    return Pool.query("SELECT * FROM products  WHERE name || ' ' || merk ILIKE $1", [`%${keywords}%`]);
};
const selectAllProductsLimit = ({limit,offset,sort,sortby}) => {
    return Pool.query(`SELECT * FROM products ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectAll = () => {
    return Pool.query(`SELECT products.id, products.name, products.stock, products.price, products.photo, products.descriptions, products.condition, products.merk, category.name as category_name, transactions.address as address_transactions FROM products INNER JOIN category ON products.category_id = category.id INNER JOIN transactions ON products.transactions_id = transactions.id;`);
}
const select =(id)=>{
    return Pool.query(`SELECT * FROM products where id='${id}'`);
}
const insert = (data) => {
    const { id,name,stock,price,photo,descriptions, category_id, transactions_id, merk, condition } = data
    return Pool.query(`INSERT INTO products(id,name,stock,price,photo,descriptions, category_id, transactions_id, merk, condition) VALUES('${id}','${name}',${stock},${price},'${photo}','${descriptions}', ${category_id}, ${transactions_id}, '${merk}', '${condition}')`)
  }
const update = (data) => {
    const { id, name, stock, price, photo, descriptions, category_id, transactions_id, merk, condition } = data
    return Pool.query(`UPDATE products SET name='${name}', stock=${stock}, price=${price}, photo='${photo}', descriptions='${descriptions}', category_id=${category_id}, transactions_id=${transactions_id}, merk='${merk}', condition='${condition}' WHERE id='${id}'`)
  }
const deleteProducts = (id) =>{
    return Pool.query(`DELETE FROM products WHERE id='${id}';`)
}
const countProducts = () => {
    return Pool.query(`SELECT COUNT(*) FROM products`);
}
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM products WHERE id='${id}'`, (error, result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    searchKeywordsProducts,
    selectAllProductsLimit,
    selectAll,
    select,
    insert,
    update,
    deleteProducts,
    countProducts,
    findId
}