const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const {selectAllUsersLimit, findEmail,create, countUsers} = require('../models/users')
const commonHelper = require('../helper/common');
const authHelper = require('../helper/auth');

const UserController ={
  getAllUsersLimit: async(req, res) => {
    try{
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || "email"
      const sort = req.query.sort || "ASC"
      console.log(sort);
      const result = await selectAllUsersLimit({limit,offset,sort,sortby})
      const {rows: [count]} = await countUsers()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      const pagination ={     
            currentPage : page,
            limit:limit,
            totalData:totalData,
            totalPage:totalPage
          }
      commonHelper.response(res, result.rows, 200, "get All Limit data success",pagination)
    }catch(error){
      console.log(error);
    }
  },
 register : async(req,res,next)=>{
    try{
      const {email,password,fullname, role} = req.body;
      const {rowCount} = await findEmail(email)
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password);
      const id = uuidv4()
      if(rowCount){
        return next(createError(403,"Email is already used"))
      }
      const data={
        id,
        email,
        passwordHash,
        fullname,
        role
      }
      create(data)      
      .then(
        result => commonHelper.response(res, result.rows, 201, "Users created")
      )
      .catch(err => res.send(err)
      )
    }catch(error){
      console.log(error);
    }
  },
 
 login :async(req,res,next)=>{
    try{
      const {email,password} = req.body
      const {rows : [user]} = await findEmail(email)
        if(!user){
          return commonHelper.response(res,null,403,'Email is invalid')
        }
        const isValidPassword = bcrypt.compareSync(password, user.password)
        console.log(isValidPassword);
    
        if(!isValidPassword){
          return commonHelper.response(res,null,403,'Password is invalid')
        }
        delete user.password
        const payload = {
          email: user.email,
          role : user.role
        }
        user.token = authHelper.generateToken(payload)
        user.refreshToken = authHelper.generateRefreshToken(payload)

        commonHelper.response(res,user,201,'login is successful')
    }catch(error){
      console.log(error);
    }
  },
 profile :async(req,res,next)=>{
  const email = req.payload.email
  const {rows:[user]} = await findEmail(email)
  delete user.password
  commonHelper.response(res,user,200)
 },
 refreshToken : (req,res)=>{
  const refreshToken = req.body.refreshToken
  const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
  const payload ={
    email : decoded.email,
    role : decoded.role
  }
  const result ={
    token : authHelper.generateToken(payload),
    refreshToken : authHelper.generateRefreshToken(payload)
  }
  commonHelper.response(res,result,200)
}
}

module.exports = UserController 