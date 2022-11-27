const createError = require('http-errors')
const transactionsModel = require('../models/transactions')
const commonHelper = require('../helper/common')
const transactionsController = {  

  searchKeywordsTransactions: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await transactionsModel.searchKeywordsTransactions(keywords);
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllTransactionsLimit: async(req, res) => {
    try{
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || "address"
      const sort = req.query.sort || "ASC"
      console.log(sort);
      const result = await transactionsModel.selectAllTransactionsLimit({limit,offset,sort,sortby})
      const {rows: [count]} = await transactionsModel.countTransactions()
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
  getAllTransactions: (req, res) => {
    transactionsModel
    .selectAll()
      .then(
        result => commonHelper.response(res, result.rows, 200, "get All data success")
      )
      .catch(err => res.send(err)
      )
  },
  getTransactions: (req, res) => {
    const id = Number(req.params.id)
    transactionsModel.select(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch(err => res.send(err)
      )
  },
  insert: async(req, res) => {
    const { address, detail_transactions_id } = req.body
    const {rows: [count]} = await transactionsModel.countTransactions()
    const id = Number(count.count)+1;
    transactionsModel.insert(id, address, detail_transactions_id)
      .then(
        result => commonHelper.response(res, result.rows, 201, "Transactions created")
      )
      .catch(err => res.send(err)
      )
  },
  update: async(req, res, next) => {
    try{
      const id = Number(req.params.id)
      const {address, detail_transactions_id} = req.body
      const {rowCount} = await transactionsModel.findId(id)
      if(!rowCount){
        return next(createError(403,"ID is Not Found"))
      }
      transactionsModel.update(id, address, detail_transactions_id)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Transactions updated")
          )
          .catch(err => res.send(err)
          )
        }catch(error){
          console.log(error);
        }
  },
  delete: async(req, res, next) => {
    try{
      const id = Number(req.params.id)
      const {rowCount} = await transactionsModel.findId(id)
      if(!rowCount){
        return next(createError(403,"ID is Not Found"))
      }
      transactionsModel.deleteTransactions(id)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Transactions deleted")
        )
        .catch(err => res.send(err)
        )
    }catch(error){
        console.log(error);
    }
  }
}

module.exports = transactionsController
