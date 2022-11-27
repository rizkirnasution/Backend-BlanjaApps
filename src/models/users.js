const Pool = require('../config/db')

const selectAllUsersLimit = ({limit,offset,sort,sortby}) => {
  return Pool.query(`SELECT * FROM users ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const findEmail = (email) =>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT * FROM users WHERE email='${email}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
}
const create = (data)=>{
const {id,email,passwordHash,fullname,role}= data
    return  new Promise ((resolve,reject)=> 
    Pool.query(`INSERT INTO users(id, email,password,fullname, role) VALUES('${id}','${email}','${passwordHash}','${fullname}','${role}')`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
}

const countUsers = () => {
  return Pool.query(`SELECT COUNT(*) FROM users`);
}

module.exports = {
  selectAllUsersLimit,
  findEmail,
  create,
  countUsers
}